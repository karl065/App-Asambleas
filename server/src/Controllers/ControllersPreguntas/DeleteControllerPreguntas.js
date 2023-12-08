const Preguntas = require('../../Models/Preguntas');

const deleteControllerPreguntas = async (idPregunta) => {
  try {
    const pregunta = await Preguntas.findById(idPregunta);
    await Preguntas.findByIdAndDelete(idPregunta);
    return pregunta;
  } catch (error) {
    return error;
  }
};

module.exports = {deleteControllerPreguntas};
