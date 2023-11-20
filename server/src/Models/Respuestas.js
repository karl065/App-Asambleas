const {DataTypes} = require('sequelize');

/* El código que proporcionó está definiendo un modelo Sequelize para una tabla llamada "Usuarios" en
una base de datos. */
module.exports = (sequelize) => {
  sequelize.define('Respuestas', {
    idRespuesta: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    opcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    respuesta: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    conteo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  });
};
