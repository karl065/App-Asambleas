const DBsAdmin = require('../../Models/DBs.js');

const crearDB = async (DB) => {
  try {
    const db = new DBsAdmin(DB);
    const newDB = await db.save();
    return newDB;
  } catch (error) {
    return error;
  }
};

module.exports = {crearDB};
