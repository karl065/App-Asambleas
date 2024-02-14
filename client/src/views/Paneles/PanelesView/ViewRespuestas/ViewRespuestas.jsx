import {useSelector} from 'react-redux';
import {paramsLocations} from '../../../../helpers/Params';
import Preguntas from '../../../../components/Preguntas/Preguntas';
import {useEffect, useState} from 'react';

const ViewRespuestas = () => {
  const [pregunta, setPregunta] = useState([]);
  const id = paramsLocations('id');
  const preguntas = useSelector((state) => state.asambleas.preguntas);

  useEffect(() => {
    setPregunta(preguntas.find((pregunta) => pregunta._id === id));
  }, [id, preguntas]);

  return (
    <div className="w-full h-full p-5 space-y-5 overflow-y-auto bg-black rounded-lg opacity-70">
      <div className="bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
        <div className="border-2 border-black rounded-lg md:space-y-6 sm:p-8 text-white uppercase justify-center flex">
          <Preguntas pregunta={pregunta} />
        </div>
      </div>
    </div>
  );
};

export default ViewRespuestas;
