const {
  getControllerRespuestas,
} = require('../../Controllers/ControllersRespuestas/GetControllerRespuestas');

const getHandleRespuestas = async (req, res) => {
  try {
    const {idRespuesta, opcion} = req.query;
    const respuestas = await getControllerRespuestas(idRespuesta, opcion);
    return res.status(200).json(respuestas);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = {getHandleRespuestas};
