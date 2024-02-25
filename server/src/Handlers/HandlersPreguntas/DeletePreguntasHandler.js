const {
  deleteControllerPreguntas,
} = require('../../Controllers/ControllersPreguntas/DeleteControllerPreguntas');
const {conectarDB} = require('../../config/DB');

const deleteHandlerPreguntas = async (req, res) => {
  try {
    const {id} = req.params;

    const {DBConectada} = req.query;

    const dbConnection = await conectarDB(DBConectada);

    const pregunta = await deleteControllerPreguntas(dbConnection, id);

    return res.status(200).json(pregunta);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = {deleteHandlerPreguntas};
