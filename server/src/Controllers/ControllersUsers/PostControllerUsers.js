const bcryptjs = require('bcryptjs');

const crearUsuario = async (dbConnection, usuarios) => {
  try {
    const Usuarios = dbConnection.model('Usuarios');
    // Asegúrate de que siempre trabajas con un arrays
    const usuariosArray = Array.isArray(usuarios) ? usuarios : [usuarios];

    // Usar Promise.all para ejecutar operaciones en paralelo
    const nuevosUsuarios = await Promise.all(
      usuariosArray.map(async (usuario) => {
        const {documento, password} = usuario;

        if (!password) {
          if (documento) {
            const passwordDoc = await bcryptjs.hash(documento, 10);
            usuario.password = passwordDoc;
          }
        } else {
          const passwordPass = await bcryptjs.hash(password, 10);
          usuario.password = passwordPass;
        }

        if (!usuario.role) usuario.role = 'Propietario';

        const nuevoUsuario = new Usuarios(usuario);
        return nuevoUsuario.save();
      })
    );
    return nuevosUsuarios;
  } catch (error) {
    return error;
  }
};

module.exports = {crearUsuario};
