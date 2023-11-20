const {DataTypes} = require('sequelize');

/* El código que proporcionó está definiendo un modelo Sequelize para una tabla llamada "Usuarios" en
una base de datos. */
module.exports = (sequelize) => {
  sequelize.define('Preguntas', {
    idPregunta: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    pregunta: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
