const mongoose = require('mongoose');
const {superUser} = require('../Root/Root');
const {
  default: GetControllerDB,
} = require('../Controllers/ControllersDB/GetControllerDB');
const {DB_MONGODB} = process.env;

const conectarDB = async (DB, excludeModels = []) => {
  try {
    if (DB === 'DBAdmin') {
      const connection = await mongoose.connect(`${DB_MONGODB}${DB}`);
      console.log(`MongoDB Conectado en: ${DB}`);
      const DBS = await GetControllerDB();
      const dbExists = DBS.some((db) => db.nombre === DB);

      // Obtener una lista de todos los modelos registrados
      const allModels = Object.keys(connection.connection.models);
      // Filtrar los modelos que deben excluirse
      const modelsToExclude = allModels.filter((model) =>
        excludeModels.includes(model)
      );

      // Desregistrar los modelos excluidos
      for (const modelName of modelsToExclude) {
        const collection = modelName.toLowerCase();
        // Verificar si la colección aún existe
        let collectionExists = false;
        let attempts = 0;
        const maxAttempts = 2;

        // Esperar hasta que la colección exista
        while (!collectionExists && attempts < maxAttempts) {
          collectionExists = await connection.connection.db
            .listCollections({name: collection})
            .hasNext();
          attempts++;
        }
        if (collectionExists) {
          // Eliminar referencias en otras colecciones y documentos relacionados
          if (collection === 'respuestas') {
            // Eliminar referencias a respuestas en la colección de preguntas
            await connection.connection
              .model('Preguntas')
              .updateMany(
                {respuestas: {$exists: true}},
                {$unset: {respuestas: 1}}
              );
          }
          if (collection === 'preguntas') {
            // Eliminar referencias a preguntas en la colección de respuestas
            await connection.connection
              .model('Respuestas')
              .updateMany(
                {idPregunta: {$exists: true}},
                {$unset: {idPregunta: 1}}
              );
          }

          // Finalmente, eliminar la colección
          await connection.connection.dropCollection(collection);
          console.log(`Colección excluida: ${collection}`);
        }
      }
      if (dbExists === false) {
        await superUser(DB);
      }
    } else {
      const connection = await mongoose.connect(`${DB_MONGODB}${DB}`);
      console.log(`MongoDB Conectado en: ${DB}`);

      // Obtener una lista de todos los modelos registrados
      const allModels = Object.keys(connection.connection.models);
      // Filtrar los modelos que deben excluirse
      const modelsToExclude = allModels.filter((model) =>
        excludeModels.includes(model)
      );
      // Desregistrar los modelos excluidos
      for (const modelName of modelsToExclude) {
        const collection = modelName.toLowerCase();
        // Verificar si la colección aún existe
        let collectionExists = false;

        // Esperar hasta que la colección exista
        while (!collectionExists) {
          collectionExists = await connection.connection.db
            .listCollections({name: collection})
            .hasNext();

          if (!collectionExists) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
          }
        }
        await connection.connection.dropCollection(collection);
        console.log(`Colección excluida: ${collection}`);
      }
    }
  } catch (error) {
    console.log({error: error});
    process.exit(1);
  }
};

module.exports = {conectarDB};
