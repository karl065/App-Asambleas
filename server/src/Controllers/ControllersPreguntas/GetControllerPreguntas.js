const {Preguntas, Respuestas} = require('../../DB.js');

const getControllerPreguntas = async (id) => {
  try {
    if (id)
      return await Preguntas.findByPk(id, {
        include: {
          model: Respuestas,
          as: 'respuestas',
        },
      });

    return await Preguntas.findAll({
      include: {
        model: Respuestas,
        as: 'respuestas',
      },
    });
  } catch (error) {
    return error;
  }
};

module.exports = {getControllerPreguntas};
