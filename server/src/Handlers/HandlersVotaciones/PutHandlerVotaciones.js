const {
  putControllerVotaciones,
} = require('../../Controllers/ControllersVotaciones/PutControllerVotaciones');
const {conectarDB} = require('../../config/DB');

const putHandlerVotaciones = async (req, res) => {
  try {
    const {idUser, idRespuesta, DBConectada} = req.query;

    const dbConnection = await conectarDB(DBConectada);

    const respuesta = await putControllerVotaciones(
      dbConnection,
      idUser,
      idRespuesta
    );

    return res.status(200).json(respuesta);
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = {putHandlerVotaciones};
