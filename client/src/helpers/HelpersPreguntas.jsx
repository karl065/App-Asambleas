import {actualizarPreguntas, actualizarRespuestas} from '../redux/actions';

// Función para obtener las respuestas que han cambiado
export const getRespuestasCambiadas = (
  respuestasOriginales,
  respuestasNuevas
) => {
  return respuestasNuevas
    .map((respuestaNueva, index) => {
      const respuestaOriginal = respuestasOriginales[index] || {};

      if (respuestaOriginal.respuesta !== respuestaNueva.respuesta) {
        return {
          idRespuesta: respuestaOriginal._id,
          dataUpdate: {respuesta: respuestaNueva.respuesta},
        };
      }

      return null;
    })
    .filter(Boolean);
};

// Función para actualizar la pregunta y respuestas
export const actualizarPreguntaYRespuestas = async (
  selectedPregunta,
  idPregunta,
  values,
  respuestasCambiadas,
  dispatch
) => {
  // Actualizar la pregunta si ha cambiado
  if (selectedPregunta.pregunta !== values.pregunta) {
    await actualizarPreguntas(
      idPregunta,
      {pregunta: values.pregunta},
      dispatch
    );
  }

  // Actualizar las respuestas cambiadas
  respuestasCambiadas.forEach(async ({idRespuesta, dataUpdate}) => {
    await actualizarRespuestas(idRespuesta, dataUpdate, dispatch);
  });
};
