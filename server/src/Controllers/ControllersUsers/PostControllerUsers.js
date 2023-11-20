const {Usuarios} = require('../../DB.js');
const bcryptjs = require('bcryptjs');

const crearUsuario = async (usuario) => {
  try {
    const {documento} = usuario;
    if (documento) {
      const password = await bcryptjs.hash(documento, 10);
      usuario.password = password;
      usuario.role = 'Propietario';
      const newUser = await Usuarios.create(usuario);
      return newUser;
    }
  } catch (error) {
    return error;
  }
};

module.exports = {crearUsuario};
