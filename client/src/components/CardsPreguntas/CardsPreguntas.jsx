import {PiNotePencilFill} from 'react-icons/pi';
import {FcDeleteRow} from 'react-icons/fc';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {eliminarPreguntas} from '../../redux/actions';

/* eslint-disable react/prop-types */
const CardsPreguntas = ({preguntas}) => {
  const dispatch = useDispatch();

  const login = useSelector((state) => state.asambleas.login);

  // Ordenar las respuestas por la propiedad "opcion"
  const respuestasOrdenadas = preguntas.respuestas.slice().sort((a, b) => {
    // Comparar las opciones como cadenas para orden alfabético
    return a.opcion.localeCompare(b.opcion);
  });

  const handleEliminarPregunta = async () => {
    await eliminarPreguntas(dispatch, preguntas._id);
  };

  return (
    <div className="uppercase bg-white inline-block max-w-md p-2 rounded-lg shadow-md">
      <div className="border-2 border-black p-2 w-full h-full rounded-lg bg-black text-white">
        <h1 className="font-bold">{preguntas.pregunta}</h1>
        <hr className="border-t-2 border-white" />
        <div>
          {respuestasOrdenadas.map((respuesta) => (
            <div key={respuesta._id} className="flex space-x-2">
              <h2 className="font-bold">{`${respuesta.opcion}.`}</h2>
              <h2>{respuesta.respuesta}</h2>
            </div>
          ))}
        </div>
        {login.role === 'SuperAdmin' || login.role === 'Admin' ? (
          <div className="mt-5 flex space-x-2">
            <Link to={`/ActualizarPreguntas?id=${preguntas._id}`}>
              <PiNotePencilFill style={{color: 'blue'}} size={24} />
            </Link>
            <button onClick={handleEliminarPregunta}>
              <FcDeleteRow style={{color: 'blue'}} size={24} />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CardsPreguntas;
