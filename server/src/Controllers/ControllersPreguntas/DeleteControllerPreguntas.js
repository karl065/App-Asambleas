const {Preguntas} = require('../../DB.js');

const deleteControllerPreguntas = async (idPregunta) => {
  try {
    const pregunta = await Preguntas.findByPk(idPregunta);
    await Preguntas.destroy({where: {idPregunta}});
    return pregunta;
  } catch (error) {
    return error;
  }
};

module.exports = {deleteControllerPreguntas};
