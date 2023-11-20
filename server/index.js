require('dotenv').config();
const {PORT} = process.env;
const {conn} = require('./src/DB.js');
const {superUser} = require('./src/Root/Root.js');
const server = require('./src/server.js');
//
conn.sync().then(() => {
  server.listen(PORT, async () => {
    superUser();
    console.log(`Corriendo en el puerto: ${PORT}`);
  });
});
