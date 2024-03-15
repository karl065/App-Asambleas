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
  const DBConectada = useSelector((state) => state.asambleas.DBConectada);

  const handleVotar = () => {
    if (!voto) {
      alertWarning('Selecciones una respuesta');
      return;
    }
    votar(dispatch, login._id, voto, DBConectada);
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
    <div className="flex w-[310px] lg:w-auto">
      <div className="w-full p-5 space-y-5 overflow-y-auto bg-black rounded-lg opacity-70">
        <div className="rounded-lg shadow border bg-gray-800 border-gray-700">
          <div className="border-2 border-black rounded-lg space-y-3 lg:space-y-6 p-2 lg:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight lg:text-2xl text-white">
              Seleccione una Respuesta
            </h1>
            <div className="text-white uppercase flex p-2 justify-center font-extrabold underline underline-offset-8 decoration-4">
              <label>{pregunta.pregunta}</label>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-2">
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
                className=" text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800 uppercase"
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
