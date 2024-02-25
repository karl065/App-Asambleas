const putControllerPreguntas = async (
  dbConnection,
  updatePregunta,
  idPregunta
) => {
  try {
    const Preguntas = dbConnection.model('Preguntas');
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
