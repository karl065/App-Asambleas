const {
  postControllerRespuestas,
} = require('../../Controllers/ControllersRespuestas/PostControllerRespuestas');

const postHandlerRespuestas = async (req, res) => {
  try {
    const respuestas = req.body;
    const preguntaCompleta = await postControllerRespuestas(respuestas);
    return res.status(200).json(preguntaCompleta);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = {postHandlerRespuestas};
