import ControllerConexionDB from '../Controllers/ControllersDB/ControllerConexionDB.js';
import GetControllerDB from '../Controllers/ControllersDB/GetControllerDB.js';
import getControllerTemas from '../Controllers/ControllersTemas/GetControllerTemas.js';
import getControllerPreguntas from '../Controllers/ControllersPreguntas/GetControllerPreguntas.js';
import getControllerUsers from '../Controllers/ControllersUsers/GetControllersUsers.js';
import conectarDB from '../config/DB.js';

const socket = (io) => {
	io.on('connection', async (socket) => {
		console.log(`Un cliente se ha conectado. ID: ${socket.id}`);

		socket.on('joinRoom', async (room) => {
			// Unirse a la sala correspondiente
			socket.join(room);
			console.log(
				`El cliente con ID: ${socket.id} se ha conectado a la sala ${room}. `
			);
		});

		socket.on('login', async (DBConectada) => {
			const dbConnection = await conectarDB(DBConectada);
			const usuarios = await getControllerUsers(dbConnection);
			io.to(DBConectada).emit('login', usuarios);
		});

		socket.on('timer', async (data) => {
			io.to(data.DBConectada).emit('timer', data.time);
		});

		socket.on('mano', async (data) => {
			io.to(data.DBConectada).emit('mano', data.data);
		});

		socket.on('setDebate', async (data) => {
			io.to(data.DBConectada).emit('setDebate', data.debate);
		});

		socket.on('setearMano', async (data) => {
			io.to(data.DBConectada).emit('setearMano', data.data);
		});
		socket.on('setearInterventores', async (data) => {
			io.to(data.DBConectada).emit('setearInterventores', data.data);
		});

		socket.on('crearPreguntas', async (DBConectada) => {
			const dbConnection = await conectarDB(DBConectada);
			// Emitir el evento solo a los clientes en la sala correspondiente
			const preguntas = await getControllerPreguntas(dbConnection);
			io.to(DBConectada).emit('crearPreguntas', preguntas);
		});

		socket.on('actualizarPreguntas', async (DBConectada) => {
			const dbConnection = await conectarDB(DBConectada);
			// Emitir el evento solo a los clientes en la sala correspondiente
			const preguntas = await getControllerPreguntas(dbConnection);
			io.to(DBConectada).emit('actualizarPreguntas', preguntas);
		});

		socket.on('setTemas', async (DBConectada) => {
			const dbConnection = await conectarDB(DBConectada);

			const temas = await getControllerTemas(dbConnection);

			io.to(DBConectada).emit('setTemas', temas);
		});

		socket.on('logoutUsuario', async (DBConectada) => {
			const dbConnection = await conectarDB(DBConectada);
			// Realizar la actualización de usuarios aquí
			const usuarios = await getControllerUsers(dbConnection);
			// Emitir el evento 'cargarUsuario' después de actualizar
			io.to(DBConectada).emit('logoutUsuario', usuarios);
		});

		// Manejar desconexiones
		socket.on('disconnect', () => {
			console.log(`El cliente ${socket.id} se ha desconectado.`);
		});
	});
};

export default socket;
