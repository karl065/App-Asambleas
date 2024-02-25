const {
  getControllerUsers,
} = require('../../Controllers/ControllersUsers/GetControllersUsers');
const {conectarDB} = require('../../config/DB');

const getHandlerUsers = async (req, res) => {
  try {
    const {
      DBConectada,
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
      userStatus,
      obtenerEnum,
    } = req.query;

    const dbConnection = await conectarDB(DBConectada);

    const usuarios = await getControllerUsers(
      dbConnection,
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
      userStatus,
      obtenerEnum
    );
    return res.status(200).json(usuarios);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = {getHandlerUsers};
