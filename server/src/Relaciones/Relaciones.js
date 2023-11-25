const relaciones = (models) => {
  const {Usuarios, Preguntas, Respuestas, Empoderados} = models;

  // Relación muchos a muchos entre Usuarios y Respuestas
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

  // Relación de auto-asociación
  Usuarios.belongsToMany(Usuarios, {
    through: 'UsuariosAutorizaciones',
    foreignKey: 'idUserAutorizador',
    otherKey: 'idUserAutorizado',
    as: 'autorizados',
  });

  Usuarios.belongsToMany(Usuarios, {
    through: 'UsuariosAutorizaciones',
    foreignKey: 'idUserAutorizado',
    otherKey: 'idUserAutorizador',
    as: 'autorizador',
  });

  // Relación de uno a muchos entre Preguntas y Respuestas
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
    Empoderados,
  };
};

module.exports = {relaciones};
