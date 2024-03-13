const putControllerIntervenciones = async (dbConnection, tema, idTema) => {
  try {
    const Intervenciones = dbConnection.model('Intervenciones');
    const Usuarios = dbConnection.model('Usuarios');

    let temaActualizado;

    if (tema.usuario) {
      temaActualizado = await Intervenciones.findByIdAndUpdate(
        idTema,
        {$addToSet: {usuarios: tema.usuario}},
        {new: true}
      );

      await Usuarios.findByIdAndUpdate(
        tema.usuario,
        {$addToSet: {intervenciones: idTema}},
        {new: true}
      );
      return temaActualizado;
    }
    temaActualizado = await Intervenciones.findByIdAndUpdate(idTema, tema);
    return temaActualizado;
  } catch (error) {
    return error;
  }
};

module.exports = {putControllerIntervenciones};
