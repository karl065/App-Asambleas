const {
  postControllerPredios,
} = require('../../Controllers/ControllersPredios/PostControllerPredios');

const postHandlerPredios = async (req, res) => {
  try {
    const predios = req.body;
    const prediosUsuarios = await postControllerPredios(predios);

    return res.status(200).json(prediosUsuarios);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = {postHandlerPredios};
