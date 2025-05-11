const putControllerRespuestas = async (
	dbConnection,
	updateRespuesta,
	idRespuesta
) => {
	try {
		const Respuestas = dbConnection.model('Respuestas');
		await Respuestas.findByIdAndUpdate(idRespuesta, updateRespuesta);
		const respuestaActualizada = await Respuestas.findById(idRespuesta);
		return respuestaActualizada;
	} catch (error) {
		return error;
	}
};

export default putControllerRespuestas;
