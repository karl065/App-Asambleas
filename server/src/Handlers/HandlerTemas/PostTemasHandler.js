import postControllerTemas from '../../Controllers/ControllersTemas/PostControllerTemas.js';
import conectarDB from '../../config/DB.js';

const postHandlerTemas = async (req, res) => {
	try {
		const { DBConectada, temas } = req.body;

		const dbConnection = await conectarDB(DBConectada);

		const nuevoTema = await postControllerTemas(dbConnection, temas);

		return res.status(200).json(nuevoTema);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default postHandlerTemas;
