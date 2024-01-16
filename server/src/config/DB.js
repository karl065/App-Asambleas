const mongoose = require('mongoose');
const {superUser} = require('../Root/Root');
const {
  GetControllerDB,
} = require('../Controllers/ControllersDB/GetControllerDB');
const {waitForCollectionsExists} = require('../helper/Collections');
const {DB_MONGODB} = process.env;

const conectarDB = async (DB, excludeModels = []) => {
  try {
    await mongoose.disconnect();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    let connection;
    if (DB === 'DBAdmin') {
      connection = await mongoose.connect(`${DB_MONGODB}${DB}`);
      connection.connection.set('poolSize', 10);
      console.log(`MongoDB Conectado en: ${DB}`);
      const DBS = await GetControllerDB();
      let dbExists;
      if (Array.isArray(DBS)) dbExists = DBS.some((db) => db.nombre === DB);

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
      DB = DB.replace(/\s/g, '_');
      connection = await mongoose.connect(`${DB_MONGODB}${DB}`);
      connection.connection.set('poolSize', 10);
      console.log(`MongoDB Conectado en: ${DB}`);

      // Obtener una lista de todos los modelos registrados
      const allModels = Object.keys(connection.connection.models);
      // Filtrar los modelos que deben excluirse
      const modelsToExclude = allModels.filter((model) =>
        excludeModels.includes(model)
      );
      // Crear una promesa para cada colección a excluir
      const excludePromises = modelsToExclude.map(async (modelName) => {
        let collection = modelName.toLowerCase();
        collection = collection + 's';

        // Esperar hasta que la colección exista antes de intentar eliminarla
        await waitForCollectionsExists(connection, collection);

        // Finalmente, eliminar la colección
        await connection.connection.dropCollection(collection);
        console.log(`Colección excluida: ${collection}`);
      });

      // Esperar a que se completen todas las promesas antes de continuar
      await Promise.all(excludePromises);
    }
  } catch (error) {
    console.log({error: error.message});
  }
};

module.exports = {conectarDB};
