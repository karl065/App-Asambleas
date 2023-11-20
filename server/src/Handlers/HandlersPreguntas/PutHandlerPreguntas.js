const {
  putControllerPreguntas,
} = require('../../Controllers/ControllersPreguntas/PutControllerPreguntas');

const putHandlerPreguntas = async (req, res) => {
  try {
    const {id} = req.params;
    const updatePregunta = req.body;
    const preguntaActualizada = await putControllerPreguntas(
      updatePregunta,
      id
    );
    return res.status(200).json(preguntaActualizada);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};
module.exports = {putHandlerPreguntas};
