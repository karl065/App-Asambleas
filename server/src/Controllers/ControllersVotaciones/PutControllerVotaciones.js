const Usuarios = require('../../Models/Usuarios');
const Respuestas = require('../../Models/Respuestas');
const Preguntas = require('../../Models/Preguntas');

const putControllerVotaciones = async (idUser, idRespuesta) => {
  try {
    const usuario = await Usuarios.findById(idUser);
    const respuesta = await Respuestas.findById(idRespuesta);
    const pregunta = await Preguntas.findById(respuesta.idPregunta);

    // Verificar si el usuario ya ha respondido a la pregunta
    const usuarioHaRespondido = pregunta.respuestas.some((resp) =>
      usuario.respuestas.includes(resp._id)
    );

    if (usuarioHaRespondido) {
      throw new Error('No se puede responder dos veces la misma pregunta');
    }

    if (
      usuario.role === 'Propietario-Empoderado' ||
      usuario.role === 'Empoderado'
    ) {
      usuario.autorizador.map(async (user) => {
        const usuarioAutorizador = await Usuarios.findById(user);
        usuarioAutorizador.respuestas.push(respuesta);
        await usuarioAutorizador.save();
        await Respuestas.findByIdAndUpdate(idRespuesta, {$inc: {conteo: 1}});
      });
    }
    // Asociar la respuesta al usuario
    usuario.respuestas.push(respuesta);
    await usuario.save();

    // Incrementar el conteo en la respuesta
    await Respuestas.findByIdAndUpdate(idRespuesta, {$inc: {conteo: 1}});

    return {message: 'Respuesta elegida Exitosamente'};
  } catch (error) {
    throw error.message;
  }
};

module.exports = {putControllerVotaciones};
