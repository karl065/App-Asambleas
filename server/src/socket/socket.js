const {
  getControllerPreguntas,
} = require('../Controllers/ControllersPreguntas/GetControllerPreguntas.js');
const {
  getControllerUsers,
} = require('../Controllers/ControllersUsers/GetControllersUsers.js');

const socket = (io) => {
  io.on('connection', async (socket) => {
    console.log(`Un cliente se ha conectado. ID: ${socket.id}`);

    socket.on('login', async (callback) => {
      const usuarios = await getControllerUsers();
      io.emit('login', usuarios);
      callback(usuarios);
    });

    socket.on('crearPreguntas', async (callback) => {
      const preguntas = await getControllerPreguntas();
      io.emit('crearPreguntas', preguntas);
      callback(preguntas);
    });

    socket.on('actualizarPreguntas', async (callback) => {
      const preguntas = await getControllerPreguntas();
      io.emit('actualizarPreguntas', preguntas);
      callback(preguntas);
    });

    // Manejar evento 'logoutUsuario'
    socket.on('logoutUsuario', async (callback) => {
      // Realizar la actualización de usuarios aquí
      const usuarios = await getControllerUsers();
      // Emitir el evento 'cargarUsuario' después de actualizar
      io.emit('logoutUsuario', usuarios);
      // Llamar al callback con los usuarios actualizados
      callback(usuarios);
    });

    // Manejar desconexiones
    socket.on('disconnect', () => {
      console.log(`El cliente ${socket.id} se ha desconectado.`);
    });
  });
};

module.exports = {socket};
