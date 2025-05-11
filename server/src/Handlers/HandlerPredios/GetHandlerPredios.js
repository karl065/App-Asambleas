import getControllerPredios from '../../Controllers/ControllersPredios/GetControllerPredios.js';
import conectarDB from '../../config/DB.js';

const getHandlerPredios = async (req, res) => {
	try {
		const { DBConectada } = req.query;
		const dbConnection = await conectarDB(DBConectada);
		const predios = await getControllerPredios(dbConnection);
		return res.status(200).json(predios);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default getHandlerPredios;
