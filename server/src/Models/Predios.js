const mongoose = require('mongoose');

const prediosSchema = new mongoose.Schema(
  {
    torreMz: String,
    predio: String,
    parqueadero: String,
    coeficiente: Number,
    idUsuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuarios', // Nombre del modelo al que estás haciendo referencia
      required: true,
    },
  },
  {
    timestamps: false,
    autoCreate: false,
  }
);

// const PrediosModel = mongoose.model('Predios', prediosSchema);

// module.exports = PrediosModel;

module.exports = prediosSchema;
