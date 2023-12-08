const Usuarios = require('../Models/Usuarios');

const authenticatedUser = async (idUser) => {
  try {
    const user = await Usuarios.findById(idUser)
      .populate('respuestas')
      .populate('autorizador')
      .populate('autorizados');

    if (!user) throw new Error('User not found');

    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {authenticatedUser};
