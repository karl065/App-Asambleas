const {
  ControllerConexionDB,
} = require('../../Controllers/ControllersDB/ControllerConexionDB');

const conexionDB = async (req, res) => {
  try {
    const {nombre} = req.body;
    const msg = await ControllerConexionDB(nombre);
    return res.status(200).json(msg);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = {conexionDB};
