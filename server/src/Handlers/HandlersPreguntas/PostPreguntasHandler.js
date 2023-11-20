const {
  postControllerPreguntas,
} = require('../../Controllers/ControllersPreguntas/PostControllerPreguntas');

const postHandlerPreguntas = async (req, res) => {
  try {
    const pregunta = req.body;
    const preguntaCreada = await postControllerPreguntas(pregunta);
    return res.status(200).json(preguntaCreada);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = {postHandlerPreguntas};
