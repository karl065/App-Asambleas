const {
  ControllerConexionDB,
} = require('../Controllers/ControllersDB/ControllerConexionDB.js');
const {
  GetControllerDB,
} = require('../Controllers/ControllersDB/GetControllerDB.js');
const {
  getControllerPreguntas,
} = require('../Controllers/ControllersPreguntas/GetControllerPreguntas.js');
const {
  getControllerUsers,
} = require('../Controllers/ControllersUsers/GetControllersUsers.js');

const socket = (io) => {
  io.on('connection', async (socket) => {
    console.log(`Un cliente se ha conectado. ID: ${socket.id}`);

    socket.on('joinRoom', async (room) => {
      // Unirse a la sala correspondiente
      socket.join(room);
      console.log(
        `El cliente con ID: ${socket.id} se ha conectado a la sala ${room}. `
      );
    });

    socket.on('login', async (DBConectada) => {
      const usuarios = await getControllerUsers();
      io.to(DBConectada).emit('login', usuarios);
    });

    socket.on('timer', async (data) => {
      io.to(data.DBConectada).emit('timer', data.time);
    });

    socket.on('crearPreguntas', async (DBConectada) => {
      // Emitir el evento solo a los clientes en la sala correspondiente
      const preguntas = await getControllerPreguntas();
      io.to(DBConectada).emit('crearPreguntas', preguntas);
    });

    socket.on('actualizarPreguntas', async (DBConectada) => {
      // Emitir el evento solo a los clientes en la sala correspondiente
      const preguntas = await getControllerPreguntas();
      io.to(DBConectada).emit('actualizarPreguntas', preguntas);
    });

    socket.on('logoutUsuario', async (DBConectada) => {
      // Realizar la actualización de usuarios aquí
      const usuarios = await getControllerUsers();
      // Emitir el evento 'cargarUsuario' después de actualizar
      io.to(DBConectada).emit('logoutUsuario', usuarios);
    });

    // Manejar desconexiones
    socket.on('disconnect', () => {
      console.log(`El cliente ${socket.id} se ha desconectado.`);
    });
  });
};

module.exports = {socket};
