const Preguntas = require('../../Models/Preguntas');
const Respuestas = require('../../Models/Respuestas');

const putControllerPreguntas = async (updatePregunta, idPregunta) => {
  try {
    await Preguntas.findByIdAndUpdate(idPregunta, updatePregunta);
    const preguntaActualizada = await Preguntas.findById(idPregunta).populate(
      'respuestas'
    );
    return preguntaActualizada;
  } catch (error) {
    return error;
  }
};

module.exports = {putControllerPreguntas};
