

import mongoose from 'mongoose';

const dbsSchema = new mongoose.Schema(
  {
    nombre: String,
  },
  {
    autoCreate: false,
  }
);

// const DBsAdmin = mongoose.model('DBsAdmin', dbsSchema);

// export default DBsAdmin;

export default dbsSchema;
