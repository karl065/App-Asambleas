require('dotenv').config();
const {PORT} = process.env;
const {conn} = require('./src/DB.js');
const {superUser} = require('./src/Root/Root.js');
const {httpServer, io} = require('./src/server.js');
const {socket} = require('./src/socket/socket.js');

conn.sync().then(() => {
  // Pasa el servidor HTTP a listen en lugar del servidor Express
  httpServer.listen(PORT, async () => {
    superUser();
    console.log(`Corriendo en el puerto: ${PORT}`);
  });
  socket(io);
});
