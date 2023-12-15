const {
  default: GetControllerDB,
} = require('../Controllers/ControllersDB/GetControllerDB.js');
const Usuarios = require('../Models/Usuarios.js');
const {conectarDB} = require('../config/DB.js');

const authenticatedUser = async ({id, role}) => {
  try {
    if (role === 'SuperAdmin') {
      conectarDB('DBAdmin');
      const user = await Usuarios.findById(id)
        .select('-password')
        .populate('respuestas')
        .populate('autorizador')
        .populate('autorizados');

      if (!user) throw new Error('User not found');

      return user;
    } else {
      conectarDB('DBAdmin');
      const DBS = await GetControllerDB();
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {authenticatedUser};
