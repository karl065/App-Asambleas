const DBsAdmin = require('../../Models/DBs.js');

const GetControllerDB = async () => {
  try {
    const DBs = await DBsAdmin.find();
    return DBs;
  } catch (error) {
    return error;
  }
};

module.exports = {GetControllerDB};
