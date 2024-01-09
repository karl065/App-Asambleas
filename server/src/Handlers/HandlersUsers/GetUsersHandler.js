const {
  getControllerUsers,
} = require('../../Controllers/ControllersUsers/GetControllersUsers');

const getHandlerUsers = async (req, res) => {
  try {
    const {
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

    const usuarios = await getControllerUsers(
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
