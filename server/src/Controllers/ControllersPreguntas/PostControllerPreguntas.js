const postControllerPreguntas = async (dbConnection, pregunta) => {
  try {
    const Preguntas = dbConnection.model('Preguntas');
    const nuevaPregunta = await Preguntas.create(pregunta);
    return nuevaPregunta;
  } catch (error) {
    return error;
  }
};

module.exports = {postControllerPreguntas};
