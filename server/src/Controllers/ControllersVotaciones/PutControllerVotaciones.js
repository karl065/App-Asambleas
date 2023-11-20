const {Usuarios, Respuestas} = require('../../DB.js');

const putControllerVotaciones = async (idUser, idRespuesta) => {
  try {
    const usuario = await Usuarios.findByPk(idUser);
    const respuesta = await Respuestas.findByPk(idRespuesta);
    await usuario.addRespuestas(respuesta);
    await respuesta.increment('conteo');
    return {message: 'Respuesta elegida Exitosamente'};
  } catch (error) {
    return error;
  }
};

module.exports = {putControllerVotaciones};
