const mongoose = require('mongoose');
const {superUser} = require('../Root/Root');
const {DB_MONGODB} = process.env;

const conectarDB = async (DB, excludeModels = []) => {
  try {
    const connection = await mongoose.connect(`${DB_MONGODB}${DB}`);
    console.log(`MongoDB Conectado en: ${DB}`);

    // Obtener una lista de todos los modelos registrados
    const allModels = Object.keys(mongoose.models);
    // Filtrar los modelos que deben excluirse
    const modelsToExclude = allModels.filter((model) =>
      excludeModels.includes(model)
    );

    // Desregistrar los modelos excluidos
    for (const modelName of modelsToExclude) {
      const collection = modelName.toLowerCase();

      // Verificar si la colección aún existe
      const collectionExists = await connection.connection.db
        .listCollections({name: collection})
        .hasNext();

      // Eliminar referencias en otras colecciones y documentos relacionados
      console.log('Esto es 27', collectionExists);
      if (collectionExists) {
        if (collection === 'preguntas') {
          // Eliminar referencias a preguntas en la colección de respuestas
          await connection.connection
            .model('Respuestas')
            .updateMany(
              {idPregunta: {$exists: true}},
              {$unset: {idPregunta: 1}}
            );
        } else if (collection === 'respuestas') {
          // Eliminar referencias a respuestas en la colección de preguntas
          await connection.connection
            .model('Preguntas')
            .updateMany(
              {respuestas: {$exists: true}},
              {$unset: {respuestas: 1}}
            );
        }
        // Finalmente, eliminar la colección
        await connection.connection.dropCollection(collection);
        console.log(`Modelos excluidos: ${excludeModels.join(', ')}`);
      }
    }

    await superUser();
  } catch (error) {
    console.log({error: error});
    process.exit(1);
  }
};

module.exports = {conectarDB};
