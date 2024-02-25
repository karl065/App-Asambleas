const postControllerRespuestas = async (dbConnection, respuestas) => {
  try {
    const Respuestas = dbConnection.model('Respuestas');
    const Preguntas = dbConnection.model('Preguntas');

    // Asegúrate de que siempre trabajas con un array de respuestas
    const respuestasArray = Array.isArray(respuestas)
      ? respuestas
      : [respuestas];

    // Array para almacenar los IDs de las nuevas respuestas
    const nuevasRespuestasIds = [];

    // Crear cada respuesta y guardar su ID
    for (const respuesta of respuestasArray) {
      const nuevaRespuesta = await Respuestas.create(respuesta);
      nuevasRespuestasIds.push(nuevaRespuesta._id);
    }

    // Asociar las respuestas con la pregunta
    const pregunta = await Preguntas.findByIdAndUpdate(
      respuestasArray[0].idPregunta,
      {$push: {respuestas: nuevasRespuestasIds}},
      {new: true}
    ).populate('respuestas');

    return pregunta;
  } catch (error) {
    return error;
  }
};

module.exports = {postControllerRespuestas};
