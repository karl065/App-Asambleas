const {default: mongoose} = require('mongoose');
const DBsAdmin = require('../../Models/DBs.js');
const {conectarDB} = require('../../config/DB.js');
const {superUser} = require('../../Root/Root.js');

const crearDB = async (DB) => {
  try {
    const db = new DBsAdmin(DB);
    const newDB = await db.save();
    await mongoose.disconnect();
    const {nombre} = DB;
    await conectarDB(nombre, ['DBsAdmin']);
    await superUser();
    return newDB;
  } catch (error) {
    return error;
  }
};

module.exports = {crearDB};
