import conectarDB from '../config/DB.js';
import GetControllerDB from '../Controllers/ControllersDB/GetControllerDB.js';
import getControllerUsers from '../Controllers/ControllersUsers/GetControllersUsers.js';

const authenticatedUser = async ({ id, role, connectedDB }) => {
	try {
		// Establecer la conexión a la base de datos
		const dbConnection = await conectarDB(connectedDB);
		const Usuarios = dbConnection.model('Usuarios');

		// Si la conexión se establece correctamente, realizar la consulta
		if (dbConnection) {
			// Realizar la consulta utilizando el modelo Usuarios
			let user = await Usuarios.findById(id).select('-password');
			let DBs;
			let roles;
			if (role === 'Admin' || role === 'SuperAdmin') {
				// Si el usuario es Admin o SuperAdmin, obtener todas las bases de datos
				DBs = await GetControllerDB(dbConnection);
				roles = await getControllerUsers({ dbConnection, obtenerEnum: true });
			}

			// Convertir el usuario a un objeto
			const userObject = user.toObject();

			// Agregar el nombre de la base de datos conectada al objeto usuario
			userObject.connectedDB = connectedDB;
			userObject.DBs = DBs;
			userObject.roles = roles;

			// Devolver el objeto usuario
			return userObject;
		} else {
			// Manejar el caso donde la conexión no se estableció correctamente
			throw new Error('Error al establecer la conexión a la base de datos');
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export default authenticatedUser;
