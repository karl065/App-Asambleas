const {
  GetControllerDB,
} = require('../../Controllers/ControllersDB/GetControllerDB');

const getHandlerDB = async (req, res) => {
  try {
    const {dbConnection} = req.user;
    const DBs = await GetControllerDB(dbConnection);
    return res.status(200).json(DBs);
  } catch (error) {
    return res.status(401).json({error: error.message});
  }
};

module.exports = {getHandlerDB};
