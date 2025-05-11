import crearDB from '../../Controllers/ControllersDB/PostControllerDB.js';

const postHandlerDB = async (req, res) => {
	try {
		const nameDB = req.body;
		const DB = await crearDB(nameDB);

		return res.status(200).json(DB);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default postHandlerDB;
