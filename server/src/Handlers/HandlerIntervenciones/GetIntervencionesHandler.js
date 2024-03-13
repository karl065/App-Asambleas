const {
  getControllerIntervenciones,
} = require('../../Controllers/ControllersIntervenciones/GetControllerIntervenciones');
const {conectarDB} = require('../../config/DB');

const getHandlerIntervenciones = async (req, res) => {
  try {
    const {DBConectada, datos} = req.query;
    const dbConnection = await conectarDB(DBConectada);

    const intervenciones = await getControllerIntervenciones(
      dbConnection,
      datos
    );

    return res.status(200).json(intervenciones);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = {getHandlerIntervenciones};
