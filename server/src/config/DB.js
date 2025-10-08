import { createConnection } from 'mongoose';
import registrarModelos from './../utils/db/registrarModelos.js';
import dotenv from 'dotenv';
dotenv.config();

const { DB_MONGODB } = process.env;

const mongoOption = {
	maxPoolSize: 200,
	maxConnecting: 200,
	serverSelectionTimeoutMS: 10000,
};

const conectarDB = async (DB) => {
	try {
		let dbName;

		let conn;

		if (DB) {
			dbName = DB.replace(/\s/g, '_');

			conn = createConnection(`${DB_MONGODB}${dbName}`, mongoOption);

			await registrarModelos(conn, DB); // Se pasa el nombre original para la lógica condicional

			console.log(`MongoDB Conectado en: ${dbName}`);
			return conn;
		} else {
			throw new Error('No se proporcionó un nombre de base de datos');
		}
	} catch (error) {
		console.error('Error al conectar DB:', error.message);
		throw error;
	}
};

export default conectarDB;
