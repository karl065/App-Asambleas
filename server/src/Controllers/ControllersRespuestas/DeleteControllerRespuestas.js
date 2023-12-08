const Respuestas = require('../../Models/Respuestas');

const deleteControllerRespuestas = async (idRespuesta) => {
  try {
    const respuesta = await Respuestas.findById(idRespuesta);
    await Respuestas.findByIdAndDelete(idRespuesta);
    return respuesta;
  } catch (error) {
    return error;
  }
};

module.exports = {deleteControllerRespuestas};
