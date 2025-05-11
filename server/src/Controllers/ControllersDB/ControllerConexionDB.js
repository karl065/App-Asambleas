import { mongoose } from 'mongoose';
import conectarDB from '../../config/DB.js';

const ControllerConexionDB = async (DB) => {
	try {
		if (DB === 'DBAdmin') {
			await mongoose.disconnect();
			await conectarDB(DB);
			return { msg: `La conexión con ${DB} fue exitosa.` };
		} else {
			await mongoose.disconnect();
			await conectarDB(DB);
			return { msg: `La conexión con ${DB} fue exitosa.` };
		}
	} catch (error) {
		return error;
	}
};

export default ControllerConexionDB;
