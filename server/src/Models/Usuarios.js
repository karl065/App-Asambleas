const {DataTypes} = require('sequelize');

/* El código que proporcionó está definiendo un modelo Sequelize para una tabla llamada "Usuarios" en
una base de datos. */
module.exports = (sequelize) => {
  sequelize.define(
    'Usuarios',
    {
      idUser: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      documento: {
        type: DataTypes.STRING,
      },
      primerNombre: {
        type: DataTypes.STRING,
      },
      segundoNombre: {
        type: DataTypes.STRING,
      },
      primerApellido: {
        type: DataTypes.STRING,
      },
      segundoApellido: {
        type: DataTypes.STRING,
      },
      correo: {
        type: DataTypes.STRING,
      },
      celular: {
        type: DataTypes.STRING,
      },
      torreMz: {
        type: DataTypes.STRING,
      },
      predio: {
        type: DataTypes.INTEGER,
      },
      parqueadero: {
        type: DataTypes.STRING,
      },
      coeficiente: {
        type: DataTypes.DECIMAL,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM(
          'SuperAdmin',
          'Admin',
          'Propietario',
          'Propietario-Empoderado',
          'Empoderado'
        ),
        allowNull: false,
      },
      userStatus: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
