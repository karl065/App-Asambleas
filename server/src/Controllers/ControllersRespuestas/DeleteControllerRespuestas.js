const {Respuestas} = require('../../DB.js');

const deleteControllerRespuestas = async (idRespuesta) => {
  try {
    const respuesta = await Respuestas.findByPk(idRespuesta);
    await Respuestas.destroy({where: {idRespuesta}});
    return respuesta;
  } catch (error) {
    return error;
  }
};

module.exports = {deleteControllerRespuestas};
