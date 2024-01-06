const {default: mongoose} = require('mongoose');
const {
  default: GetControllerDB,
} = require('../Controllers/ControllersDB/GetControllerDB.js');
const Usuarios = require('../Models/Usuarios.js');
const {conectarDB} = require('../config/DB.js');

const authenticatedUser = async ({id, role}) => {
  try {
    if (role === 'SuperAdmin') {
      await mongoose.disconnect();
      await conectarDB('DBAdmin', ['Preguntas', 'Respuestas', 'Predios']);
      const user = await Usuarios.findById(id)
        .select('-password')
        .populate('respuestas')
        .populate('autorizador')
        .populate('autorizado');

      if (!user) throw new Error('User not found');

      return user;
    } else {
      await conectarDB('DBAdmin', ['Preguntas', 'Respuestas', 'Predios']);
      const DBs = await GetControllerDB();
      let user;
      for (let i = 1; i < DBs.length; i++) {
        await mongoose.disconnect();
        await conectarDB(DBs[i].nombre, ['DBsAdmin']);
        user = await Usuarios.findById(id)
          .select('-password')
          .populate('respuestas')
          .populate('autorizador')
          .populate('autorizado')
          .populate('predios');
        console.log(user);
        if (user) break;
      }
      return user;
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {authenticatedUser};
