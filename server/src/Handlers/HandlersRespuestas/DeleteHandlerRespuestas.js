const {
  deleteControllerRespuestas,
} = require('../../Controllers/ControllersRespuestas/DeleteControllerRespuestas');

const deleteHandlerRespuestas = async (req, res) => {
  try {
    const {id} = req.params;
    const respuesta = await deleteControllerRespuestas(id);
    return res.status(200).json(respuesta);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = {deleteHandlerRespuestas};
