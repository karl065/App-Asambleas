const waitForCollectionsExists = async (
  connection,
  collection,
  maxAttempts = 2
) => {
  let attempts = 0;
  let collectionExists = false;

  while (!collectionExists && attempts < maxAttempts) {
    collectionExists = await connection.connection.db
      .listCollections({name: collection})
      .hasNext();

    attempts++;
    if (!collectionExists) {
      // Esperar 1 segundo antes de volver a intentar
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  return collectionExists;
};

module.exports = {waitForCollectionsExists};
