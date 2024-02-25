const deleteControllerRespuestas = async (dbConnection, idRespuesta) => {
  try {
    const Respuestas = dbConnection.model('Respuestas');
    const Preguntas = dbConnection.model('Preguntas');

    // Buscar la respuesta por su ID
    const respuesta = await Respuestas.findById(idRespuesta);

    if (!respuesta) {
      return {error: 'Respuesta no encontrada'};
    }

    // Obtener la pregunta asociada a la respuesta
    const pregunta = await Preguntas.findById(respuesta.idPregunta);

    // Eliminar la respuesta
    await Respuestas.findByIdAndDelete(idRespuesta);

    // Si hay una referencia a la pregunta, quitar la respuesta de la lista de respuestas
    if (pregunta) {
      pregunta.respuestas.pull(idRespuesta);
      await pregunta.save();
    }

    return respuesta;
  } catch (error) {
    return {error: error.message || 'Error al eliminar la respuesta'};
  }
};

module.exports = {deleteControllerRespuestas};
