import putControllerUser from '../../Controllers/ControllersUsers/PutControllerUsers.js';
import conectarDB from '../../config/DB.js';

const putUsersHandler = async (req, res) => {
	try {
		const { id } = req.params;
		const { DBConectada, updateUser } = req.body;
		const dbConnection = await conectarDB(DBConectada);
		const usuarioActualizado = await putControllerUser(
			dbConnection,
			updateUser,
			id
		);
		return res.status(200).json(usuarioActualizado);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default putUsersHandler;
