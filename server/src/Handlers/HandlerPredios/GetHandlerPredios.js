const {
  getControllerPredios,
} = require('../../Controllers/ControllersPredios/GetControllerPredios');

const getHandlerPredios = async (req, res) => {
  try {
    const predios = await getControllerPredios();
    return res.status(200).json(predios);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = {getHandlerPredios};
