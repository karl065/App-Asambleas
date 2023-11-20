const {Usuarios, Respuestas} = require('../../DB.js');

const putControllerUser = async (updateUser, idUser) => {
  try {
    await Usuarios.update(updateUser, {
      where: {idUser},
    });
    const usuario = await Usuarios.findByPk(idUser, {
      include: {
        model: Respuestas,
        as: 'respuestas',
      },
    });
    return usuario;
  } catch (error) {
    return error;
  }
};

module.exports = {putControllerUser};
