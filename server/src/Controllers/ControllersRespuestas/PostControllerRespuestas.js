const Respuestas = require('../../Models/Respuestas');
const Preguntas = require('../../Models/Preguntas');

const postControllerRespuestas = async (respuestas) => {
  try {
    const nuevaRespuesta = await Respuestas.create(respuestas);

    // Asociar la respuesta con la pregunta
    const pregunta = await Preguntas.findByIdAndUpdate(
      nuevaRespuesta.idPregunta,
      {$push: {respuestas: nuevaRespuesta._id}},
      {new: true}
    ).populate('respuestas');

    return pregunta;
  } catch (error) {
    return error;
  }
};

module.exports = {postControllerRespuestas};
