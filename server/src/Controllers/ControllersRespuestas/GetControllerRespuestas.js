const Respuestas = require('../../Models/Respuestas');

const getControllerRespuestas = async (idRespuesta, opcion) => {
  try {
    const whereConditions = {
      ...(idRespuesta && {_id: idRespuesta}),
      ...(opcion && {opcion}),
    };

    const respuestas = await Respuestas.find(whereConditions);
    return respuestas;
  } catch (error) {
    return error;
  }
};

module.exports = {getControllerRespuestas};
