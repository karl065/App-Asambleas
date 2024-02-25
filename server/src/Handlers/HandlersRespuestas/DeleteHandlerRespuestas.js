const {
  deleteControllerRespuestas,
} = require('../../Controllers/ControllersRespuestas/DeleteControllerRespuestas');
const {conectarDB} = require('../../config/DB');

const deleteHandlerRespuestas = async (req, res) => {
  try {
    const {id} = req.params;
    const {DBConectada} = req.query;
    const dbConnection = await conectarDB(DBConectada);
    const respuesta = await deleteControllerRespuestas(dbConnection, id);
    return res.status(200).json(respuesta);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = {deleteHandlerRespuestas};
