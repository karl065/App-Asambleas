import putControllerRespuestas from '../../Controllers/ControllersRespuestas/PutControllerRespuestas.js';
import conectarDB from '../../config/DB.js';

const putHandlerRespuestas = async (req, res) => {
	try {
		const { id } = req.params;
		const { DBConectada, updateRespuestas } = req.body;
		const dbConnection = await conectarDB(DBConectada);

		const repuestaActualizada = await putControllerRespuestas(
			dbConnection,
			updateRespuestas,
			id
		);
		return res.status(200).json(repuestaActualizada);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default putHandlerRespuestas;
