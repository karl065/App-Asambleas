const Usuarios = require('../../Models/Usuarios');

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
      ...(documento && {documento: new RegExp(documento, 'i')}),
      ...(primerNombre && {primerNombre: new RegExp(primerNombre, 'i')}),
      ...(segundoNombre && {segundoNombre: new RegExp(segundoNombre, 'i')}),
      ...(primerApellido && {primerApellido: new RegExp(primerApellido, 'i')}),
      ...(segundoApellido && {
        segundoApellido: new RegExp(segundoApellido, 'i'),
      }),
      ...(correo && {correo: new RegExp(correo, 'i')}),
      ...(celular && {celular: new RegExp(celular, 'i')}),
      ...(torreMz && {torreMz: new RegExp(torreMz, 'i')}),
      ...(predio && {predio: new RegExp(predio, 'i')}),
      ...(parqueadero && {parqueadero: new RegExp(parqueadero, 'i')}),
      ...(coeficiente && {coeficiente}),
      ...(role && {role: new RegExp(role, 'i')}),
      ...(userStatus !== undefined && {userStatus}),
    };

    const usuarios = await Usuarios.find(
      Object.keys(whereConditions).length > 0 ? whereConditions : {}
    )
      .select('-password') // Excluye el campo de contraseña
      .populate({
        path: 'respuestas',
        model: 'Respuestas',
      })
      .populate({
        path: 'autorizador',
        select: '-password', // Excluye el campo de contraseña
      })
      .populate({
        path: 'autorizados',
        select: '-password', // Excluye el campo de contraseña
      })
      .populate({
        path: 'predios',
        model: 'Predios',
      });

    return usuarios;
  } catch (error) {
    return error;
  }
};

module.exports = {getControllerUsers};
