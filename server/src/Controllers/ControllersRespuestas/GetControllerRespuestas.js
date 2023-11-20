const {Preguntas, Respuestas} = require('../../DB.js');

const getControllerRespuestas = async (idRespuesta, opcion) => {
  try {
    const whereConditions = {
      ...(idRespuesta && {idRespuesta}),
      ...(opcion && {opcion}),
    };
    const respuestas = await Respuestas.findAll({
      where:
        Object.keys(whereConditions).length > 0 ? whereConditions : undefined,
      include: [
        {
          model: Preguntas,
          as: 'preguntas',
        },
      ],
    });
    return respuestas;
  } catch (error) {
    return error;
  }
};

module.exports = {getControllerRespuestas};
