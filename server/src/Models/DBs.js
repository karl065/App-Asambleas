import mongoose from 'mongoose';

const dbsSchema = new mongoose.Schema(
	{
		nombre: String,
	},
	{
		autoCreate: false,
	}
);

export default dbsSchema;
