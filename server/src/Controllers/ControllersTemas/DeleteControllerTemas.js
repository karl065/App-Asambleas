const deleteControllerTemas = async (dbConnection, idTemas) => {
	try {
		const Temas = dbConnection.model('Temas');
		const Usuarios = dbConnection.model('Usuarios');

		// Paso 1: Obtener las ID de las usuarios asociadas a la intervención
		const temas = await Temas.findById(idTemas);
		const usuariosAsociadas = temas.usuarios;

		// Paso 2: Eliminar la usuarios
		await Temas.findByIdAndDelete(idTemas);

		// Paso 3: Eliminar las temas asociadas
		await Usuarios.deleteMany({ _id: { in: usuariosAsociadas } });

		return temas;
	} catch (error) {
		return error;
	}
};

export default deleteControllerTemas;
