import postControllerPreguntas from '../../Controllers/ControllersPreguntas/PostControllerPreguntas.js';
import conectarDB from '../../config/DB.js';

const postHandlerPreguntas = async (req, res) => {
	try {
		const { DBConectada, pregunta } = req.body;
		const dbConnection = await conectarDB(DBConectada);
		const preguntaCreada = await postControllerPreguntas(
			dbConnection,
			pregunta
		);
		return res.status(200).json(preguntaCreada);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default postHandlerPreguntas;
