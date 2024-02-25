const getControllerPreguntas = async (dbConnection, id) => {
  try {
    const Preguntas = dbConnection.model('Preguntas');
    if (id) {
      return await Preguntas.findById(id).populate('respuestas');
    }

    return await Preguntas.find().populate('respuestas');
  } catch (error) {
    return error;
  }
};

module.exports = {getControllerPreguntas};
