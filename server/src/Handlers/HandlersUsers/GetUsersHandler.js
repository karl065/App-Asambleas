const {
  getControllerUsers,
} = require('../../Controllers/ControllersUsers/GetControllersUsers');

const getHandlerUsers = async (req, res) => {
  try {
    const {
      documento,
      nombre,
      torreMz,
      predio,
      parqueadero,
      coeficiente,
      userStatus,
    } = req.query;

    const usuarios = await getControllerUsers(
      documento,
      nombre,
      torreMz,
      predio,
      parqueadero,
      coeficiente,
      userStatus
    );
    return res.status(200).json(usuarios);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = {getHandlerUsers};
