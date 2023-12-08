const Usuarios = require('../../Models/Usuarios.js');

const deleteControllerUsuarios = async (idUser) => {
  try {
    const usuario = await Usuarios.findById(idUser);
    await Usuarios.findByIdAndDelete(idUser);
    return usuario;
  } catch (error) {
    return error;
  }
};

module.exports = {deleteControllerUsuarios};
