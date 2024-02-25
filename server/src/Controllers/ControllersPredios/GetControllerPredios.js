const getControllerPredios = async (dbConnection) => {
  try {
    const Predios = dbConnection.model('Predios');
    const predios = await Predios.find();
    return predios;
  } catch (error) {
    return error;
  }
};

module.exports = {getControllerPredios};
