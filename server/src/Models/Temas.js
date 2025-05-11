

import { Schema } from 'mongoose';

const temasSchema = new Schema(
	{
		usuarios: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Usuarios',
			},
		],
		maxInterventores: {
			type: Number,
			required: true,
		},
		tema: {
			type: String,
			required: true,
		},
		temaCompleto: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
		autoCreate: false,
	}
);

temasSchema.path('usuarios').validate(
	(value) => {
		if (value.length > 0) {
			return value.length <= this.maxInterventores;
		}
		return true;
	},
	(maxInterventores) => {
		return `La cantidad máxima de interventores es de ${maxInterventores}`;
	}
);

export default temasSchema;
