const {
  deleteControllerPreguntas,
} = require('../../Controllers/ControllersPreguntas/DeleteControllerPreguntas');

const deleteHandlerPreguntas = async (req, res) => {
  try {
    const {id} = req.params;
    const pregunta = await deleteControllerPreguntas(id);
    return res.status(200).json(pregunta);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = {deleteHandlerPreguntas};
