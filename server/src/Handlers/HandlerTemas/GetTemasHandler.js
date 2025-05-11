import getControllerTemas from '../../Controllers/ControllersTemas/GetControllerTemas.js';
import conectarDB from '../../config/DB.js';

const getHandlerTemas = async (req, res) => {
	try {
		const { DBConectada, datos } = req.query;
		const dbConnection = await conectarDB(DBConectada);

		const temas = await getControllerTemas(dbConnection, datos);

		return res.status(200).json(temas);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default getHandlerTemas;
