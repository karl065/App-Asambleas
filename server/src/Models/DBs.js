// Models/DBs.js
const mongoose = require('mongoose');

const dbsSchema = new mongoose.Schema(
  {
    nombre: String,
  },
  {
    autoCreate: false,
  }
);

const DBsAdmin = mongoose.model('DBsAdmin', dbsSchema);

module.exports = DBsAdmin;
