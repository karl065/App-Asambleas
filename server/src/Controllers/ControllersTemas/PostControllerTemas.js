const postControllerTemas = async (dbConnection, tema) => {
	try {
		const Temas = dbConnection.model('Temas');

		const nuevoTema = await Temas.create(tema);

		return nuevoTema;
	} catch (error) {
		return error;
	}
};

export default postControllerTemas;
