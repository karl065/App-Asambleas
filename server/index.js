require('dotenv').config();
const {PORT} = process.env;

const {httpServer, io} = require('./src/server.js');
const {socket} = require('./src/socket/socket.js');

// Pasa el servidor HTTP a listen en lugar del servidor Express
httpServer.listen(PORT, async () => {
  console.log(`Corriendo en el puerto: ${PORT}`);
});
socket(io);
