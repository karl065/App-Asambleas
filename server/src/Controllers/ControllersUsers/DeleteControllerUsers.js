const {Usuarios} = require('../../DB.js');

const deleteControllerUsuarios = async (idUser) => {
  try {
    const usuario = await Usuarios.findByPk(idUser);
    await Usuarios.destroy({where: {idUser}});
    return usuario;
  } catch (error) {
    return error;
  }
};

module.exports = {deleteControllerUsuarios};
