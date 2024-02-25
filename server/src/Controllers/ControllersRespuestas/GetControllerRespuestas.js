const getControllerRespuestas = async (dbConnection, idRespuesta, opcion) => {
  try {
    const Respuestas = dbConnection.model('Respuestas');

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
