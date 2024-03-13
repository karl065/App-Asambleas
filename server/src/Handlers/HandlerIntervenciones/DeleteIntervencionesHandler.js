const {
  deleteControllerIntervenciones,
} = require('../../Controllers/ControllersIntervenciones/DeleteControllerIntervenciones');
const {conectarDB} = require('../../config/DB');

const deleteHandlerIntervenciones = async (req, res) => {
  try {
    const {id} = req.params;
    const {DBConectada} = req.query;

    const dbConnection = await conectarDB(DBConectada);

    const tema = await deleteControllerIntervenciones(dbConnection, id);

    return res.status(200).json(tema);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = {deleteHandlerIntervenciones};
