const {
  postControllerPreguntas,
} = require('../../Controllers/ControllersPreguntas/PostControllerPreguntas');
const {conectarDB} = require('../../config/DB');

const postHandlerPreguntas = async (req, res) => {
  try {
    const {DBConectada, pregunta} = req.body;
    const dbConnection = await conectarDB(DBConectada);
    const preguntaCreada = await postControllerPreguntas(
      dbConnection,
      pregunta
    );
    return res.status(200).json(preguntaCreada);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = {postHandlerPreguntas};
