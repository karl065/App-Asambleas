const Preguntas = require('../../Models/Preguntas');

const postControllerPreguntas = async (pregunta) => {
  try {
    const nuevaPregunta = await Preguntas.create(pregunta);
    return nuevaPregunta;
  } catch (error) {
    return error;
  }
};

module.exports = {postControllerPreguntas};
