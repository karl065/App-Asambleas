import { mongoose } from 'mongoose';
import conectarDB from '../../config/DB.js';

const crearDB = async (DB) => {
	try {
		let dbConnection;
		dbConnection = await conectarDB('DBAdmin');
		const DBsAdmin = dbConnection.model('DBsAdmin');
		const db = new DBsAdmin(DB);
		const newDB = await db.save();
		await mongoose.disconnect();
		const { nombre } = DB;
		dbConnection = await conectarDB(nombre);
		return newDB;
	} catch (error) {
		return error;
	}
};

export default crearDB;
