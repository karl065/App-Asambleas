const {Usuarios, Respuestas} = require('../../DB.js');

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

    await Usuarios.update(updateUser, {
      where: {idUser},
    });

    const usuario = await Usuarios.findByPk(idUser, {
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
