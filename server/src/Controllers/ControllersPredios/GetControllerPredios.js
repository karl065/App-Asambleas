const Predios = require('../../Models/Predios.js');

const getControllerPredios = async () => {
  try {
    const predios = await Predios.find().populate('idUsuario');
    return predios;
  } catch (error) {
    return error;
  }
};

module.exports = {getControllerPredios};
