const getControllerTemas = async (dbConnection) => {
	try {
		const Temas = dbConnection.model('Temas');
		const temas = await Temas.find().populate('usuarios');
		return temas;
	} catch (error) {
		return error;
	}
};

export default getControllerTemas;
