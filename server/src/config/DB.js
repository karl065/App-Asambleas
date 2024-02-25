const mongoose = require('mongoose');
const {DB_MONGODB} = process.env;

const mongoOption = {
  maxPoolSize: 200,
  maxConnecting: 200,
};

const conectarDB = async (DB) => {
  try {
    if (DB === 'DBAdmin') {
      const conn = mongoose.createConnection(`${DB_MONGODB}${DB}`, mongoOption);
      console.log(`MongoDB Conectado en: ${DB}`);
      conn.model('Usuarios', require('../Models/Usuarios'));
      conn.model('DBsAdmin', require('../Models/DBs'));
      return conn;
    }
    if (DB) DB = DB.replace(/\s/g, '_');
    const conn = mongoose.createConnection(`${DB_MONGODB}${DB}`, mongoOption);
    conn.model('Usuarios', require('../Models/Usuarios'));
    conn.model('Predios', require('../Models/Predios'));
    conn.model('Preguntas', require('../Models/Preguntas'));
    conn.model('Respuestas', require('../Models/Respuestas'));

    return conn;
  } catch (error) {
    console.error('Error:', error.message);
    console.error('Stack trace:', error.stack);
  }
};

module.exports = {conectarDB};
