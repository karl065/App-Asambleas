const {
  ControllerConexionDB,
} = require('../Controllers/ControllersDB/ControllerConexionDB.js');
const {
  GetControllerDB,
} = require('../Controllers/ControllersDB/GetControllerDB.js');
const {
  getControllerIntervenciones,
} = require('../Controllers/ControllersIntervenciones/GetControllerIntervenciones.js');
const {
  getControllerPreguntas,
} = require('../Controllers/ControllersPreguntas/GetControllerPreguntas.js');
const {
  getControllerUsers,
} = require('../Controllers/ControllersUsers/GetControllersUsers.js');
const {conectarDB} = require('../config/DB.js');

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
      const dbConnection = await conectarDB(DBConectada);
      const usuarios = await getControllerUsers(dbConnection);
      io.to(DBConectada).emit('login', usuarios);
    });

    socket.on('timer', async (data) => {
      io.to(data.DBConectada).emit('timer', data.time);
    });

    socket.on('mano', async (data) => {
      io.to(data.DBConectada).emit('mano', data.data);
    });

    socket.on('setDebate', async (data) => {
      io.to(data.DBConectada).emit('setDebate', data.debate);
    });

    socket.on('setearMano', async (data) => {
      io.to(data.DBConectada).emit('setearMano', data.data);
    });
    socket.on('setearInterventores', async (data) => {
      io.to(data.DBConectada).emit('setearInterventores', data.data);
    });

    socket.on('crearPreguntas', async (DBConectada) => {
      const dbConnection = await conectarDB(DBConectada);
      // Emitir el evento solo a los clientes en la sala correspondiente
      const preguntas = await getControllerPreguntas(dbConnection);
      io.to(DBConectada).emit('crearPreguntas', preguntas);
    });

    socket.on('actualizarPreguntas', async (DBConectada) => {
      const dbConnection = await conectarDB(DBConectada);
      // Emitir el evento solo a los clientes en la sala correspondiente
      const preguntas = await getControllerPreguntas(dbConnection);
      io.to(DBConectada).emit('actualizarPreguntas', preguntas);
    });

    socket.on('setTemas', async (DBConectada) => {
      const dbConnection = await conectarDB(DBConectada);

      const intervenciones = await getControllerIntervenciones(dbConnection);

      io.to(DBConectada).emit('setTemas', intervenciones);
    });

    socket.on('logoutUsuario', async (DBConectada) => {
      const dbConnection = await conectarDB(DBConectada);
      // Realizar la actualización de usuarios aquí
      const usuarios = await getControllerUsers(dbConnection);
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
