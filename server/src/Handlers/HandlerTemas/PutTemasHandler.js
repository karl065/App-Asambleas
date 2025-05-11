import putControllerTemas from '../../Controllers/ControllersTemas/PutControllerTemas.js';
import conectarDB from '../../config/DB.js';

const putHandlerTemas = async (req, res) => {
	try {
		const { id } = req.params;

		const { DBConectada, dataUpdate } = req.body;

		const dbConnection = await conectarDB(DBConectada);

		const tema = await putControllerTemas(dbConnection, dataUpdate, id);

		return res.status(200).json(tema);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default putHandlerTemas;
