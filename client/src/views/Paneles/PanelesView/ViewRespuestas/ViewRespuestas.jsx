/* eslint-disable react-hooks/exhaustive-deps */
import {useSelector} from 'react-redux';
import {paramsLocations} from '../../../../helpers/Params';
import {useEffect, useState} from 'react';
import Preguntas from '../../../../components/Preguntas/Preguntas';

const ViewRespuestas = () => {
  const [pregunta, setPregunta] = useState(null);
  const [totalVotos, setTotalVotos] = useState(0);
  const id = paramsLocations('id');
  const preguntas = useSelector((state) => state.asambleas.preguntas);
  const usuariosActivos = useSelector(
    (state) => state.asambleas.usuariosActivos
  );
  useEffect(() => {
    const preguntaEncontrada = preguntas.find(
      (pregunta) => pregunta._id === id
    );

    if (preguntaEncontrada) {
      let votos = 0;
      for (let conteo of preguntaEncontrada.respuestas) {
        votos = votos + conteo.conteo;
      }
      setTotalVotos(votos);
      setPregunta(preguntaEncontrada);
    }
  }, [id, preguntas]);

  return (
    <div className="w-full h-full p-5 space-y-5 overflow-y-auto bg-black rounded-lg opacity-70">
      <div className="bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
        <div className="border-2 border-black rounded-lg md:space-y-6 space-x-2 sm:p-8 text-white uppercase justify-center flex">
          {pregunta && <Preguntas pregunta={pregunta} />}
          <div className="bg-white inline-block h-min p-2 rounded-lg shadow-md">
            <div className="border-2 border-black p-2  rounded-lg font-bold bg-black text-white space-y-2">
              {pregunta &&
                pregunta.respuestas.map((respuesta) => (
                  <div key={respuesta._id}>
                    <label>
                      Votos por {respuesta.respuesta}: {respuesta.conteo}
                    </label>
                  </div>
                ))}
              <label>Total de votos: {totalVotos}</label>
              <br />
              <label>Votos faltantes: {usuariosActivos - totalVotos}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewRespuestas;
