const {
  getControllerPredios,
} = require('../../Controllers/ControllersPredios/GetControllerPredios');
const {conectarDB} = require('../../config/DB');

const getHandlerPredios = async (req, res) => {
  try {
    const {DBConectada} = req.query;
    const dbConnection = await conectarDB(DBConectada);
    const predios = await getControllerPredios(dbConnection);
    return res.status(200).json(predios);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = {getHandlerPredios};
