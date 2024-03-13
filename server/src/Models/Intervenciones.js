const mongoose = require('mongoose');

const intervencionesSchema = new mongoose.Schema(
  {
    usuarios: [
      {
        type: mongoose.Schema.Types.ObjectId,
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

intervencionesSchema.path('usuarios').validate(
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

module.exports = intervencionesSchema;
