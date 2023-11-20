const {Preguntas, Respuestas} = require('../../DB.js');

const postControllerRespuestas = async (respuestas) => {
  try {
    const nuevaRespuesta = await Respuestas.create(respuestas);
    const preguntaCompleta = await Preguntas.findByPk(
      nuevaRespuesta.idPregunta,
      {
        include: [
          {
            model: Respuestas,
            as: 'respuestas',
          },
        ],
      }
    );
    return preguntaCompleta;
  } catch (error) {
    return error;
  }
};

module.exports = {postControllerRespuestas};
