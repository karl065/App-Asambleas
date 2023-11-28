const {Usuarios, Respuestas} = require('../../DB.js');
const {Op} = require('sequelize');

const getControllerUsers = async (
  documento,
  primerNombre,
  segundoNombre,
  primerApellido,
  segundoApellido,
  correo,
  celular,
  torreMz,
  predio,
  parqueadero,
  coeficiente,
  role,
  userStatus
) => {
  try {
    const whereConditions = {
      ...(documento && {documento: {[Op.iLike]: `%${documento}%`}}),
      ...(primerNombre && {primerNombre: {[Op.iLike]: `%${primerNombre}%`}}),
      ...(segundoNombre && {segundoNombre: {[Op.iLike]: `%${segundoNombre}%`}}),
      ...(primerApellido && {
        primerApellido: {[Op.iLike]: `%${primerApellido}%`},
      }),
      ...(segundoApellido && {
        segundoApellido: {[Op.iLike]: `%${segundoApellido}%`},
      }),
      ...(correo && {correo: {[Op.iLike]: `%${correo}%`}}),
      ...(celular && {celular: {[Op.iLike]: `%${celular}%`}}),
      ...(torreMz && {torreMz: {[Op.iLike]: `%${torreMz}%`}}),
      ...(predio && {predio: {[Op.iLike]: `%${predio}%`}}),
      ...(parqueadero && {parqueadero: {[Op.iLike]: `%${parqueadero}%`}}),
      ...(coeficiente && {coeficiente}),
      ...(role && {role: {[Op.iLike]: `%${role}%`}}),
      ...(userStatus !== undefined && {userStatus}),
    };

    const usuarios = await Usuarios.findAll({
      attributes: {exclude: ['password']},
      where:
        Object.keys(whereConditions).length > 0 ? whereConditions : undefined,
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

    return usuarios;
  } catch (error) {
    return error;
  }
};

module.exports = {getControllerUsers};
