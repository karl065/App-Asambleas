import {PiNotePencilFill} from 'react-icons/pi';
import {Link} from 'react-router-dom';

/* eslint-disable react/prop-types */
const CardsPreguntas = ({preguntas}) => {
  // Ordenar las respuestas por la propiedad "opcion"
  const respuestasOrdenadas = preguntas.respuestas.slice().sort((a, b) => {
    // Comparar las opciones como cadenas para orden alfabético
    return a.opcion.localeCompare(b.opcion);
  });

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
        <div className="mt-5">
          <Link to={`/ActualizarPreguntas?id=${preguntas._id}`}>
            <PiNotePencilFill style={{color: 'blue'}} size={24} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardsPreguntas;
