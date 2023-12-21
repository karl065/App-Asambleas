const {default: mongoose} = require('mongoose');
const {conectarDB} = require('../../config/DB');

const ControllerConexionDB = async (DB) => {
  try {
    if (DB === 'DBAdmin') {
      await mongoose.disconnect();
      await conectarDB(DB, ['Preguntas', 'Respuestas', 'Predios']);
      return {msg: `La conexión con ${DB} fue exitosa.`};
    } else {
      await mongoose.disconnect();
      await conectarDB(DB, ['DBsAdmin']);
      return {msg: `La conexión con ${DB} fue exitosa.`};
    }
  } catch (error) {
    return error;
  }
};

module.exports = {ControllerConexionDB};
