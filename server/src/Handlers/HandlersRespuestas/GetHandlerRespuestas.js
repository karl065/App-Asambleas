const {
  getControllerRespuestas,
} = require('../../Controllers/ControllersRespuestas/GetControllerRespuestas');
const {conectarDB} = require('../../config/DB');

const getHandleRespuestas = async (req, res) => {
  try {
    const {idRespuesta, opcion, DBConectada} = req.query;

    const dbConnection = await conectarDB(DBConectada);

    const respuestas = await getControllerRespuestas(
      dbConnection,
      idRespuesta,
      opcion
    );
    return res.status(200).json(respuestas);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = {getHandleRespuestas};
