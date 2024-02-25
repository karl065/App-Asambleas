const {
  getControllerPreguntas,
} = require('../../Controllers/ControllersPreguntas/GetControllerPreguntas');
const {conectarDB} = require('../../config/DB');

const getHandlerPreguntas = async (req, res) => {
  try {
    const {DBConectada, id} = req.query;

    const dbConnection = await conectarDB(DBConectada);
    const preguntas = await getControllerPreguntas(dbConnection, id);
    return res.status(200).json(preguntas);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = {getHandlerPreguntas};
