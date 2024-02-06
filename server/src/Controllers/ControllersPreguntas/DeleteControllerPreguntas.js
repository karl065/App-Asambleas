const Preguntas = require('../../Models/Preguntas');
const Respuestas = require('../../Models/Respuestas');

const deleteControllerPreguntas = async (idPregunta) => {
  try {
    // Paso 1: Obtener las ID de las respuestas asociadas a la pregunta
    const pregunta = await Preguntas.findById(idPregunta);
    const respuestasAsociadas = pregunta.respuestas;

    // Paso 2: Eliminar la pregunta
    await Preguntas.findByIdAndDelete(idPregunta);

    // Paso 3: Eliminar las respuestas asociadas
    await Respuestas.deleteMany({_id: {$in: respuestasAsociadas}});

    return pregunta;
  } catch (error) {
    return error;
  }
};

module.exports = {deleteControllerPreguntas};
