const mongoose = require('mongoose');
const {superUser, viewUser} = require('../Root/Root');
const {
  GetControllerDB,
} = require('../Controllers/ControllersDB/GetControllerDB');
const {DB_MONGODB} = process.env;

const conectarDB = async (DB) => {
  try {
    await mongoose.disconnect();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    let connection;
    DB = DB.replace(/\s/g, '_');
    connection = await mongoose.connect(`${DB_MONGODB}${DB}`);
    connection.connection.set('maxPoolSize', 200);
    console.log(`MongoDB Conectado en: ${DB}`);
    if (DB === 'DBAdmin') {
      const DBS = await GetControllerDB();
      let dbExists;
      if (Array.isArray(DBS)) dbExists = DBS.some((db) => db.nombre === DB);

      if (dbExists === false) {
        await superUser(DB);
        await viewUser();
      }
    }
  } catch (error) {
    console.error('Error:', error.message);
    console.error('Stack trace:', error.stack);
  }
};

module.exports = {conectarDB};
