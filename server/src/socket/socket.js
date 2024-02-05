const {
  getControllerPreguntas,
} = require('../Controllers/ControllersPreguntas/GetControllerPreguntas.js');
const {
  getControllerUsers,
} = require('../Controllers/ControllersUsers/GetControllersUsers.js');

const socket = (io) => {
  io.on('connection', (socket) => {
    console.log(`Un cliente se ha conectado. ID: ${socket.id}`);

    const cargarUsuarios = async () => {
      const usuarios = await getControllerUsers();
      io.emit('cargarUsuario', usuarios);
      return usuarios;
    };

    socket.on('login', async (callback) => {
      const usuariosActualizados = await cargarUsuarios();
      io.emit('cargarUsuario', usuariosActualizados);
      callback(usuariosActualizados);
    });

    const cargarPreguntas = async () => {
      const preguntas = await getControllerPreguntas(null);
      io.emit('cargarPreguntas', preguntas);
      return preguntas;
    };

    socket.on('crearPreguntas', async (callback) => {
      const preguntasActualizadas = await cargarPreguntas();
      io.emit('cargarPreguntas', preguntasActualizadas);
      callback(preguntasActualizadas);
    });

    // Manejar evento 'logoutUsuario'
    socket.on('logoutUsuario', async (callback) => {
      // Realizar la actualización de usuarios aquí
      const usuariosActualizados = await cargarUsuarios();
      // Emitir el evento 'cargarUsuario' después de actualizar
      io.emit('cargarUsuario', usuariosActualizados);
      // Llamar al callback con los usuarios actualizados
      callback(usuariosActualizados);
    });

    // Manejar desconexiones
    socket.on('disconnect', () => {
      console.log(`El cliente ${socket.id} se ha desconectado.`);
    });
  });
};

module.exports = {socket};
