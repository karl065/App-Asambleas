import postControllerRespuestas from '../../Controllers/ControllersRespuestas/PostControllerRespuestas.js';
import conectarDB from '../../config/DB.js';

const postHandlerRespuestas = async (req, res) => {
	try {
		const { DBConectada, respuestas } = req.body;
		const dbConnection = await conectarDB(DBConectada);
		const preguntaCompleta = await postControllerRespuestas(
			dbConnection,
			respuestas
		);
		return res.status(200).json(preguntaCompleta);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default postHandlerRespuestas;
