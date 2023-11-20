const relaciones = (models) => {
  const {Usuarios, Preguntas, Respuestas} = models;

  Usuarios.belongsToMany(Respuestas, {
    through: 'UsuariosRespuestas',
    foreignKey: 'idUsuario',
    otherKey: 'idRespuesta',
    as: 'respuestas',
  });

  Respuestas.belongsToMany(Usuarios, {
    through: 'UsuariosRespuestas',
    foreignKey: 'idRespuesta',
    otherKey: 'idUsuario',
    as: 'usuarios',
  });

  Preguntas.hasMany(Respuestas, {
    foreignKey: 'idPregunta',
    as: 'respuestas',
  });
  Respuestas.belongsTo(Preguntas, {
    foreignKey: 'idPregunta',
    as: 'preguntas',
  });
  return {
    Usuarios,
    Preguntas,
    Respuestas,
  };
};

module.exports = {relaciones};
