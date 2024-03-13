const deleteControllerIntervenciones = async (
  dbConnection,
  idIntervenciones
) => {
  try {
    const Intervenciones = dbConnection.model('Intervenciones');
    const Usuarios = dbConnection.model('Usuarios');

    // Paso 1: Obtener las ID de las usuarios asociadas a la intervención
    const intervenciones = await Intervenciones.findById(idIntervenciones);
    const usuariosAsociadas = intervenciones.usuarios;

    // Paso 2: Eliminar la usuarios
    await Intervenciones.findByIdAndDelete(idIntervenciones);

    // Paso 3: Eliminar las intervenciones asociadas
    await Usuarios.deleteMany({_id: {in: usuariosAsociadas}});

    return intervenciones;
  } catch (error) {
    return error;
  }
};

module.exports = {deleteControllerIntervenciones};
