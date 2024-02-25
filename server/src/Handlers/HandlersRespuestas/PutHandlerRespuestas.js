const {
  putControllerRespuestas,
} = require('../../Controllers/ControllersRespuestas/PutControllerRespuestas');
const {conectarDB} = require('../../config/DB');

const putHandlerRespuestas = async (req, res) => {
  try {
    const {id} = req.params;
    const {DBConectada, updateRespuestas} = req.body;
    const dbConnection = await conectarDB(DBConectada);

    const repuestaActualizada = await putControllerRespuestas(
      dbConnection,
      updateRespuestas,
      id
    );
    return res.status(200).json(repuestaActualizada);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = {putHandlerRespuestas};
