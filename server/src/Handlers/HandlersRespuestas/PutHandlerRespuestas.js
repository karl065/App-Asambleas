const {
  putControllerRespuestas,
} = require('../../Controllers/ControllersRespuestas/PutControllerRespuestas');

const putHandlerRespuestas = async (req, res) => {
  try {
    const {id} = req.params;
    const updateRespuesta = req.body;
    const repuestaActualizada = await putControllerRespuestas(
      updateRespuesta,
      id
    );
    return res.status(200).json(repuestaActualizada);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = {putHandlerRespuestas};
