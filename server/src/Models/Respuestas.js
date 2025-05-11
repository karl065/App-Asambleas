

import mongoose from 'mongoose';

const respuestaSchema = new mongoose.Schema(
  {
    opcion: {
      type: String,
      required: true,
    },
    respuesta: {
      type: String,
      required: true,
    },
    conteo: {
      type: Number,
      required: true,
      default: 0,
    },
    idPregunta: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Preguntas', // Nombre del modelo al que estás haciendo referencia
      required: true,
    },
  },
  {
    autoCreate: false,
  }
);

// const RespuestasModel = mongoose.model('Respuestas', respuestaSchema);

// export default RespuestasModel;

export default respuestaSchema;
