const {Respuestas, Preguntas} = require('../../DB.js');

const putControllerRespuestas = async (updateRespuesta, idRespuesta) => {
  try {
    await Respuestas.update(updateRespuesta, {where: {idRespuesta}});
    const respuestaActualizada = await Respuestas.findByPk(idRespuesta, {
      include: {
        model: Preguntas,
        as: 'preguntas',
      },
    });
    return respuestaActualizada;
  } catch (error) {
    return error;
  }
};

module.exports = {putControllerRespuestas};
