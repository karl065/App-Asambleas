const registrarModelos = async (conn, dbName) => {
	try {
		// const dbName = dbNameRaw.replace(/\s/g, '_');

		const load = async (name, path) => {
			try {
				const { default: schema } = await import(path);
				conn.model(name, schema);
			} catch (err) {
				console.error(`Error cargando el modelo ${name}:`, err.message);
				throw err; // Lanza para que se pueda detectar el fallo si es necesario
			}
		};

		await load('Usuarios', '../../Models/Usuarios.js');

		if (dbName === 'DBAdmin') {
			await load('DBsAdmin', '../../Models/DBs.js');
		} else {
			await load('Predios', '../../Models/Predios.js');
			await load('Preguntas', '../../Models/Preguntas.js');
			await load('Respuestas', '../../Models/Respuestas.js');
			await load('Temas', '../../Models/Temas.js');
		}
	} catch (error) {
		console.error(
			`Error al registrar modelos para la base de datos ${dbNameRaw}:`,
			error.message
		);
		throw error;
	}
};

export default registrarModelos;
