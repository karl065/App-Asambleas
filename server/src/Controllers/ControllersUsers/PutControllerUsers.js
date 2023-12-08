const Usuarios = require('../../Models/Usuarios');
const Respuestas = require('../../Models/Respuestas'); // Asegúrate de tener el modelo de Respuestas configurado
const bcryptjs = require('bcryptjs');

const putControllerUser = async (updateUser, idUser) => {
  try {
    const {autorizado} = updateUser;

    // Verifica si se proporcionó un idEmpoderado
    if (autorizado) {
      // Cambia el rol del usuario B a 'Propietario-Empoderado'
      await Usuarios.updateOne(
        {_id: autorizado},
        {role: 'Propietario-Empoderado'}
      );

      // Asocia el usuario B con el usuario A (autorizador) sin borrar los anteriores
      const usuarioAutorizador = await Usuarios.findById(idUser);
      const usuarioAutorizado = await Usuarios.findById(autorizado);

      // Agrega el usuario autorizador a la lista de autorizadores del usuario autorizado
      usuarioAutorizado.autorizador.push(usuarioAutorizador);
      usuarioAutorizador.autorizados.push(usuarioAutorizado);

      await usuarioAutorizador.save();
      await usuarioAutorizado.save();
    }

    if (updateUser.password) {
      const password = await bcryptjs.hash(updateUser.password, 10);
      updateUser.password = password;
    }

    // Actualiza el usuario
    await Usuarios.updateOne({_id: idUser}, updateUser);

    // Obtiene el usuario actualizado
    const usuario = await Usuarios.findById(idUser, '-password')
      .populate('respuestas')
      .populate({
        path: 'autorizador',
        select: '-password',
      })
      .populate({
        path: 'autorizados',
        select: '-password',
      });

    return usuario;
  } catch (error) {
    return error;
  }
};

module.exports = {putControllerUser};
