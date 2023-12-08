const Preguntas = require('../../Models/Preguntas');
const Respuestas = require('../../Models/Respuestas');

const getControllerPreguntas = async (id) => {
  try {
    if (id) {
      return await Preguntas.findById(id).populate('respuestas');
    }

    return await Preguntas.find().populate('respuestas');
  } catch (error) {
    return error;
  }
};

module.exports = {getControllerPreguntas};
