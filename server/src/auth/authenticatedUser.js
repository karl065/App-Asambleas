const {default: mongoose} = require('mongoose');
const Usuarios = require('../Models/Usuarios.js');
const {conectarDB} = require('../config/DB.js');

const authenticatedUser = async ({id, role, connectedDB}) => {
  try {
    await conectarDB(
      connectedDB,
      role === 'SuperAdmin'
        ? ['Preguntas', 'Respuestas', 'Predios']
        : ['DBsAdmin']
    );

    let user = await Usuarios.findById(id).select('-password');

    const userObject = user.toObject();
    userObject.connectedDB = connectedDB;
    return userObject;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {authenticatedUser};
