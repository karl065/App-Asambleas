const {
  putControllerPreguntas,
} = require('../../Controllers/ControllersPreguntas/PutControllerPreguntas');
const {conectarDB} = require('../../config/DB');

const putHandlerPreguntas = async (req, res) => {
  try {
    const {id} = req.params;
    const {DBConectada, updatePregunta} = req.body;

    const dbConnection = await conectarDB(DBConectada);

    const preguntaActualizada = await putControllerPreguntas(
      dbConnection,
      updatePregunta,
      id
    );
    return res.status(200).json(preguntaActualizada);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};
module.exports = {putHandlerPreguntas};
