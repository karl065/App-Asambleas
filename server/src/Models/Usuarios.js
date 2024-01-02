const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema(
  {
    documento: String,
    primerNombre: String,
    segundoNombre: String,
    primerApellido: String,
    segundoApellido: String,
    correo: String,
    celular: Number,
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [
        'SuperAdmin',
        'Admin',
        'Propietario',
        'Propietario-Empoderado',
        'Empoderado',
        'Presidente',
      ],
      required: true,
    },
    userStatus: {
      type: Boolean,
      default: false,
      required: true,
    },
    respuestas: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Respuestas',
      },
    ],
    autorizador: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuarios',
      },
    ],
    autorizados: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuarios',
      },
    ],
    predios: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Predios',
      },
    ],
  },
  {timestamps: false}
);

const UsuarioModel = mongoose.model('Usuarios', usuarioSchema);

module.exports = UsuarioModel;
