const {
  putControllerIntervenciones,
} = require('../../Controllers/ControllersIntervenciones/PutControllerIntervenciones');
const {conectarDB} = require('../../config/DB');

const putHandlerIntervenciones = async (req, res) => {
  try {
    const {id} = req.params;

    const {DBConectada, dataUpdate} = req.body;

    const dbConnection = await conectarDB(DBConectada);

    const tema = await putControllerIntervenciones(
      dbConnection,
      dataUpdate,
      id
    );

    return res.status(200).json(tema);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = {putHandlerIntervenciones};
