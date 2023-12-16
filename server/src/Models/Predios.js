const mongoose = require('mongoose');

const prediosSchema = new mongoose.Schema(
  {
    torreMz: String,
    predio: Number,
    parqueadero: String,
    coeficiente: Number,
    usuario: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuarios',
      },
    ],
  },
  {timestamps: false}
);
