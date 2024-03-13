const postControllerIntervenciones = async (dbConnection, tema) => {
  try {
    const Intervenciones = dbConnection.model('Intervenciones');

    const nuevoTema = await Intervenciones.create(tema);

    return nuevoTema;
  } catch (error) {
    return error;
  }
};

module.exports = {postControllerIntervenciones};
