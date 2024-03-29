import {useSelector} from 'react-redux';
import ConectarDBs from '../../../../components/ConectarDB/ConectarDBs';

import CardsPreguntas from '../../../../components/CardsPreguntas/CardsPreguntas';

const GestionarPreguntas = () => {
  const preguntas = useSelector((state) => state.asambleas.preguntas);

  return (
    <div className="flex">
      <div className="bg-black opacity-70 w-full rounded-lg p-5 space-y-5 overflow-y-auto">
        <div className=" bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
          <div className="md:space-y-6 sm:p-8 border-2 border-black rounded-lg">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Gestionar Preguntas
            </h1>
            <ConectarDBs />
            <div className="flex mt-0 flex-wrap space-x-2 space-y-2">
              {preguntas &&
                preguntas.map((pregunta) => (
                  <div key={pregunta._id} className="w-1/4">
                    <CardsPreguntas preguntas={pregunta} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestionarPreguntas;
