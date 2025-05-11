import getControllerUsers from '../../Controllers/ControllersUsers/GetControllersUsers.js';
import conectarDB from '../../config/DB.js';

const getHandlerUsers = async (req, res) => {
	try {
		const {
			DBConectada,
			documento,
			primerNombre,
			segundoNombre,
			primerApellido,
			segundoApellido,
			correo,
			celular,
			torreMz,
			predio,
			parqueadero,
			coeficiente,
			role,
			userStatus,
			obtenerEnum,
		} = req.query;
		console.log('handler: ', DBConectada);
		const dbConnection = await conectarDB(DBConectada);

		const usuarios = await getControllerUsers(
			dbConnection,
			documento,
			primerNombre,
			segundoNombre,
			primerApellido,
			segundoApellido,
			correo,
			celular,
			torreMz,
			predio,
			parqueadero,
			coeficiente,
			role,
			userStatus,
			obtenerEnum
		);
		return res.status(200).json(usuarios);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default getHandlerUsers;
