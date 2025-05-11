import putControllerPreguntas from '../../Controllers/ControllersPreguntas/PutControllerPreguntas.js';
import conectarDB from '../../config/DB.js';

const putHandlerPreguntas = async (req, res) => {
	try {
		const { id } = req.params;
		const { DBConectada, updatePregunta } = req.body;

		const dbConnection = await conectarDB(DBConectada);

		const preguntaActualizada = await putControllerPreguntas(
			dbConnection,
			updatePregunta,
			id
		);
		return res.status(200).json(preguntaActualizada);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};
export default putHandlerPreguntas;
