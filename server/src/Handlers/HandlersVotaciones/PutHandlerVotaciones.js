const {
  putControllerVotaciones,
} = require('../../Controllers/ControllersVotaciones/PutControllerVotaciones');

const putHandlerVotaciones = async (req, res) => {
  try {
    const {idUser, idRespuesta} = req.query;
    console.log(idUser);
    const respuesta = await putControllerVotaciones(idUser, idRespuesta);
    return res.status(200).json(respuesta);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = {putHandlerVotaciones};
