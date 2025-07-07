import getControllerUsers from '../../Controllers/ControllersUsers/GetControllersUsers.js';
import conectarDB from '../../config/DB.js';

const getHandlerUsers = async (req, res) => {
	try {
		const filtros = req.query;

		const dbConnection = await conectarDB(filtros.DBConectada);

		filtros.dbConnection = dbConnection;

		const usuarios = await getControllerUsers(filtros);
		return res.status(200).json(usuarios);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default getHandlerUsers;
