

import mongoose from 'mongoose';

const preguntaSchema = new mongoose.Schema(
  {
    pregunta: {
      type: String,
      required: true,
    },
    respuestas: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Respuestas',
      },
    ],
  },
  {
    autoCreate: false,
  }
);

export default preguntaSchema;
