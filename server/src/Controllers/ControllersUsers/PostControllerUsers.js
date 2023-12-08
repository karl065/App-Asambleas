const Usuarios = require('../../Models/Usuarios.js');
const bcryptjs = require('bcryptjs');

const crearUsuario = async (usuario) => {
  try {
    const {documento, password} = usuario;
    if (!password) {
      if (documento) {
        const passwordDoc = await bcryptjs.hash(documento, 10);
        usuario.password = passwordDoc;
        if (!usuario.role) usuario.role = 'Propietario';
        const usuarios = new Usuarios(usuario);
        const newUser = await usuarios.save();
        return newUser;
      }
    }
    const passwordPass = await bcryptjs.hash(password, 10);
    usuario.password = passwordPass;
    if (!usuario.role) usuario.role = 'Propietario';
    const usuarios = new Usuarios(usuario);
    const newUser = await usuarios.save();
    return newUser;
  } catch (error) {
    return error;
  }
};

module.exports = {crearUsuario};
