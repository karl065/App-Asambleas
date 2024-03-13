const getControllerIntervenciones = async (dbConnection) => {
  try {
    const Intervenciones = dbConnection.model('Intervenciones');
    const intervenciones = await Intervenciones.find().populate('usuarios');
    return intervenciones;
  } catch (error) {
    return error;
  }
};

module.exports = {getControllerIntervenciones};
