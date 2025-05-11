import { mongoose } from 'mongoose';
import conectarDB from '../config/DB.js';

import jwt from 'jsonwebtoken';

const { SECRETA } = process.env;

const authMiddle = async (req, res, next) => {
	try {
		const token = req.header('x-auth-token');
		if (!token) {
			return res.status(400).json({ msg: 'No hay token' });
		}
		const decoded = jwt.verify(token, SECRETA);
		const dbConnection = await conectarDB(decoded.user.connectedDB);
		decoded.user.dbConnection = dbConnection;
		req.user = decoded.user;
		next();
	} catch (error) {
		mongoose.disconnect();
		return res.status(400).json({ msg: 'Token no valido' });
	}
};

export default authMiddle;
