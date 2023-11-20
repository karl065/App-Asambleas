const {
  getControllerPreguntas,
} = require('../../Controllers/ControllersPreguntas/GetControllerPreguntas');

const getHandlerPreguntas = async (req, res) => {
  try {
    const {id} = req.query;
    const preguntas = await getControllerPreguntas(id);
    return res.status(200).json(preguntas);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = {getHandlerPreguntas};
