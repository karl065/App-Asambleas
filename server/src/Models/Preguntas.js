const mongoose = require('mongoose');

const preguntaSchema = new mongoose.Schema({
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
});

const PreguntasModel = mongoose.model('Preguntas', preguntaSchema);

module.exports = PreguntasModel;
