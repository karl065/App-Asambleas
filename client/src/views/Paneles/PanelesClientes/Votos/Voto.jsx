/* eslint-disable react-hooks/exhaustive-deps */
import {useDispatch, useSelector} from 'react-redux';
import {paramsLocations} from '../../../../helpers/Params';
import {useEffect, useState} from 'react';
import {votar} from '../../../../redux/actions';
import {useNavigate} from 'react-router-dom';
import {alertWarning} from '../../../../helpers/Alertas';

const Voto = () => {
  const id = paramsLocations('id');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const preguntas = useSelector((state) => state.asambleas.preguntas);
  const login = useSelector((state) => state.asambleas.login);
  const [pregunta, setPregunta] = useState('');
  const [voto, setVoto] = useState('');

  const handleVotar = () => {
    if (!voto) {
      alertWarning('Selecciones una respuesta');
      return;
    }
    votar(dispatch, login._id, voto);
    navigate('/ResponderPreguntas');
  };

  const handleSelectVoto = (idRespuesta) => {
    setVoto(idRespuesta);
  };

  useEffect(() => {
    if (id) {
      setPregunta(preguntas.find((pregunta) => pregunta._id === id));
    }
  }, []);

  return (
    <div className="flex">
      <div className="w-full p-5 space-y-5 overflow-y-auto bg-black rounded-lg opacity-70">
        <div className="bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
          <div className="border-2 border-black rounded-lg md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Seleccione una Respuesta
            </h1>
            <div className="text-white uppercase flex justify-center font-extrabold underline underline-offset-8 decoration-4">
              <label>{pregunta.pregunta}</label>
            </div>
            <div className="space-x-2 flex justify-center">
              {pregunta.respuestas?.map((respuesta) => (
                <div
                  className="uppercase bg-white inline-block max-w-md p-2 rounded-lg shadow-md"
                  key={respuesta._id}
                >
                  <div className="border-2 border-black p-2 w-full h-full rounded-lg bg-black text-white space-x-2">
                    <label>{respuesta.respuesta}</label>
                    <input
                      className="rounded-xl form-checkbox text-primary-600 transition duration-150 ease-in-out cursor-pointer"
                      type="checkbox"
                      checked={voto === respuesta._id}
                      onChange={() => handleSelectVoto(respuesta._id)}
                      id={`checkbox_${respuesta._id}`}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleVotar}
                type="submit"
                className=" text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 uppercase"
              >
                Enviar Voto
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Voto;
