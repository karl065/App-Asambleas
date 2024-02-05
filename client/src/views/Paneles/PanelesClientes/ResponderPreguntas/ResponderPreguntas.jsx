import {useDispatch, useSelector} from 'react-redux';
import CardsPreguntas from '../../../../components/CardsPreguntas/CardsPreguntas';
import {useEffect} from 'react';
import {getPreguntas} from '../../../../redux/actions';

const ResponderPreguntas = () => {
  const preguntas = useSelector((state) => state.asambleas.preguntas);
  const dispatch = useDispatch();

  useEffect(() => {
    getPreguntas(dispatch);
  }, [dispatch]);

  return (
    <div className="flex">
      <div className="w-full p-5 space-y-5 overflow-y-auto bg-black rounded-lg opacity-70">
        <div className="bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
          <div className="border-2 border-black rounded-lg md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Responder Preguntas
            </h1>
            <div className="flex mt-0 flex-wrap space-x-2 space-y-2">
              {preguntas &&
                Array.isArray(preguntas) &&
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

export default ResponderPreguntas;
