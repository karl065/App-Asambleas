/* eslint-disable react-hooks/exhaustive-deps */
import {useDispatch, useSelector} from 'react-redux';
import CardsPreguntas from '../../../../components/CardsPreguntas/CardsPreguntas';
import {useEffect} from 'react';
import {getPreguntas} from '../../../../redux/actions';
import {Link} from 'react-router-dom';

const ResponderPreguntas = () => {
  const preguntas = useSelector((state) => state.asambleas.preguntas);
  const DBConectada = useSelector((state) => state.asambleas.DBConectada);

  const dispatch = useDispatch();

  useEffect(() => {
    getPreguntas(DBConectada, dispatch);
  }, [dispatch]);

  return (
    <div className="flex w-[310px] lg:w-auto">
      <div className="w-full p-5 space-y-5 overflow-y-auto bg-black rounded-lg opacity-70">
        <div className="bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
          <div className="border-2 border-black rounded-lg space-y-2 lg:space-y-6 p-2 lg:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Responder Preguntas
            </h1>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {preguntas &&
                Array.isArray(preguntas) &&
                preguntas.map((pregunta) => (
                  <div key={pregunta._id}>
                    <Link to={`/Voto?id=${pregunta._id}`}>
                      <CardsPreguntas preguntas={pregunta} />
                    </Link>
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
