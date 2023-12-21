const {
  getControllerUsers,
} = require('../Controllers/ControllersUsers/GetControllersUsers.js');

const socket = (io) => {
  io.on('connection', (socket) => {
    console.log(`Un cliente se ha conectado. ID: ${socket.id}`);

    const cargarUsuarios = async () => {
      const usuarios = await getControllerUsers();
      io.emit('cargarUsuario', usuarios);
    };
    cargarUsuarios();

    // Manejar desconexiones
    socket.on('disconnect', () => {
      console.log(`El cliente ${socket.id} se ha desconectado.`);
    });
  });
};

module.exports = {socket};
