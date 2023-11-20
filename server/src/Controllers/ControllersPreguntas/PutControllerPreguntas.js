const {Preguntas, Respuestas} = require('../../DB.js');

const putControllerPreguntas = async (updatePregunta, idPregunta) => {
  try {
    await Preguntas.update(updatePregunta, {where: {idPregunta}});
    const preguntaActualizada = await Preguntas.findByPk(idPregunta, {
      include: {
        model: Respuestas,
        as: 'respuestas',
      },
    });
    return preguntaActualizada;
  } catch (error) {
    return error;
  }
};

module.exports = {putControllerPreguntas};
