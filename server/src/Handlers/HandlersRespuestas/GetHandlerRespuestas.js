import getControllerRespuestas from '../../Controllers/ControllersRespuestas/GetControllerRespuestas.js';
import conectarDB from '../../config/DB.js';

const getHandleRespuestas = async (req, res) => {
	try {
		const { idRespuesta, opcion, DBConectada } = req.query;

		const dbConnection = await conectarDB(DBConectada);

		const respuestas = await getControllerRespuestas(
			dbConnection,
			idRespuesta,
			opcion
		);
		return res.status(200).json(respuestas);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default getHandleRespuestas;
