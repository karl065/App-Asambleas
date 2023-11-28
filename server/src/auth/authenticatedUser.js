const {Usuarios, Respuestas} = require('../DB.js');

/**
 * La función `authenticatedUser` recupera un usuario por su ID y devuelve el objeto de usuario, o un
 * mensaje de error si hay un error.
 * @param idUser - El parámetro `idUser` es el ID del usuario que desea autenticar.
 * @returns La función `authenticatedUser` devuelve el objeto de usuario si se encuentra en la base de
 * datos, o un mensaje de error si hubo un error al recuperar al usuario.
 */
const authenticatedUser = async (idUser) => {
  try {
    const user = await Usuarios.findByPk(idUser, {
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

    if (!user) throw new Error('User not found');

    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {authenticatedUser};
