const {Usuarios} = require('../../DB.js');

const getControllerUsers = async (
  documento,
  nombre,
  torreMz,
  predio,
  parqueadero,
  coeficiente,
  userStatus
) => {
  try {
    const whereConditions = {
      ...(documento && {documento}),
      ...(nombre && {nombre}),
      ...(torreMz && {torreMz}),
      ...(predio && {predio}),
      ...(parqueadero && {parqueadero}),
      ...(coeficiente && {coeficiente}),
      ...(userStatus !== undefined && {userStatus}),
    };

    const usuarios = await Usuarios.findAll({
      where:
        Object.keys(whereConditions).length > 0 ? whereConditions : undefined,
    });

    return usuarios;
  } catch (error) {
    return error;
  }
};

module.exports = {getControllerUsers};
