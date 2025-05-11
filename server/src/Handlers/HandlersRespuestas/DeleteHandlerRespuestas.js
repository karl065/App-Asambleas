import deleteControllerRespuestas from '../../Controllers/ControllersRespuestas/DeleteControllerRespuestas.js';
import conectarDB from '../../config/DB.js';

const deleteHandlerRespuestas = async (req, res) => {
	try {
		const { id } = req.params;
		const { DBConectada } = req.query;
		const dbConnection = await conectarDB(DBConectada);
		const respuesta = await deleteControllerRespuestas(dbConnection, id);
		return res.status(200).json(respuesta);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default deleteHandlerRespuestas;
