import { createConnection } from 'mongoose';
import registrarModelos from './../utils/db/registrarModelos.js';
import dotenv from 'dotenv';
dotenv.config();

const { DB_MONGODB } = process.env;

const mongoOption = {
	maxPoolSize: 200,
	maxConnecting: 200,
};

const conectarDB = async (DB) => {
	try {
		console.log(DB);
		const dbName = DB.replace(/\s/g, '_');

		const conn = createConnection(`${DB_MONGODB}${dbName}`, mongoOption);

		await registrarModelos(conn, DB); // Se pasa el nombre original para la lógica condicional

		console.log(`MongoDB Conectado en: ${dbName}`);
		return conn;
	} catch (error) {
		console.error('Error al conectar DB:', error.message);
		throw error;
	}
};

export default conectarDB;
