const {Usuarios, Respuestas} = require('../../DB.js');
const {Op} = require('sequelize');

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
      ...(documento && {documento: {[Op.iLike]: `%${documento}%`}}),
      ...(nombre && {nombre: {[Op.iLike]: `%${nombre}%`}}),
      ...(torreMz && {torreMz: {[Op.iLike]: `%${torreMz}%`}}),
      ...(predio && {predio: {[Op.iLike]: `%${predio}%`}}),
      ...(parqueadero && {parqueadero: {[Op.iLike]: `%${parqueadero}%`}}),
      ...(coeficiente && {coeficiente}),
      ...(userStatus !== undefined && {userStatus}),
    };

    const usuarios = await Usuarios.findAll({
      where:
        Object.keys(whereConditions).length > 0 ? whereConditions : undefined,
      include: {
        model: Respuestas,
        as: 'respuestas',
      },
    });

    return usuarios;
  } catch (error) {
    return error;
  }
};

module.exports = {getControllerUsers};
