const {Usuarios, Respuestas} = require('../../DB.js');
const bcryptjs = require('bcryptjs');

const putControllerUser = async (updateUser, idUser) => {
  try {
    const {autorizado} = updateUser;

    // Verifica si se proporcionó un idEmpoderado
    if (autorizado) {
      // Cambia el rol del usuario B a 'Propietario-Empoderado'
      await Usuarios.update(
        {role: 'Propietario-Empoderado'},
        {where: {idUser: autorizado}}
      );

      // Asocia el usuario B con el usuario A (autorizador) sin borrar los anteriores
      const usuarioAutorizador = await Usuarios.findByPk(idUser);
      const usuarioAutorizado = await Usuarios.findByPk(autorizado);

      // Agrega el usuario autorizador a la lista de autorizadores del usuario autorizado
      await usuarioAutorizado.addAutorizador(usuarioAutorizador);
      await usuarioAutorizador.addAutorizados(usuarioAutorizado);
    }

    if (updateUser.password) {
      const password = await bcryptjs.hash(updateUser.password, 10);
      updateUser.password = password;
      await Usuarios.update(updateUser, {
        where: {idUser},
      });
      const usuario = await Usuarios.findByPk(idUser, {
        attributes: {exclude: ['password']},
        include: [
          {
            model: Respuestas,
            as: 'respuestas',
          },
          {
            model: Usuarios,
            attributes: {exclude: ['password']},
            as: 'autorizador', // Incluye el usuario autorizador
          },
          {
            model: Usuarios,
            attributes: {exclude: ['password']},
            as: 'autorizados', // Incluye los usuarios autorizados
          },
        ],
      });

      return usuario;
    }

    await Usuarios.update(updateUser, {
      where: {idUser},
    });

    const usuario = await Usuarios.findByPk(idUser, {
      attributes: {exclude: ['password']},
      include: [
        {
          model: Respuestas,
          as: 'respuestas',
        },
        {
          model: Usuarios,
          as: 'autorizador', // Incluye el usuario autorizador
        },
        {
          model: Usuarios,
          as: 'autorizados', // Incluye los usuarios autorizados
        },
      ],
    });

    return usuario;
  } catch (error) {
    return error;
  }
};

module.exports = {putControllerUser};
