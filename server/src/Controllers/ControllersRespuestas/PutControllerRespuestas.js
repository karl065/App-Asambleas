const Respuestas = require('../../Models/Respuestas');
const Preguntas = require('../../Models/Preguntas');

const putControllerRespuestas = async (updateRespuesta, idRespuesta) => {
  try {
    await Respuestas.findByIdAndUpdate(idRespuesta, updateRespuesta);
    const respuestaActualizada = await Respuestas.findById(idRespuesta);
    return respuestaActualizada;
  } catch (error) {
    return error;
  }
};

module.exports = {putControllerRespuestas};
