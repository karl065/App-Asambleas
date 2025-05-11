import DeleteControllerTemas from '../../Controllers/ControllersTemas/DeleteControllerTemas.js';
import conectarDB from '../../config/DB.js';

const deleteHandlerIntervenciones = async (req, res) => {
	try {
		const { id } = req.params;
		const { DBConectada } = req.query;

		const dbConnection = await conectarDB(DBConectada);

		const tema = await DeleteControllerTemas(dbConnection, id);

		return res.status(200).json(tema);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default deleteHandlerIntervenciones;
