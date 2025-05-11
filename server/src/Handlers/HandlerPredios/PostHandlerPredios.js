import postControllerPredios from '../../Controllers/ControllersPredios/PostControllerPredios.js';
import conectarDB from '../../config/DB.js';

const postHandlerPredios = async (req, res) => {
	try {
		const { DBConectada, predios } = req.body;
		const dbConnection = await conectarDB(DBConectada);
		const prediosUsuarios = await postControllerPredios(dbConnection, predios);

		return res.status(200).json(prediosUsuarios);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default postHandlerPredios;
