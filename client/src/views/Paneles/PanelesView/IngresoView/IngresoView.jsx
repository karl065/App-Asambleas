import {useSelector} from 'react-redux';
import ConectarDBs from '../../../../components/ConectarDB/ConectarDBs';
import Quorum from '../../../../components/Quorum/Quorum';
import Preguntas from '../../../../components/Preguntas/Preguntas';
import {Link} from 'react-router-dom';

const IngresoView = () => {
  const DBConectada = useSelector((state) => state.asambleas.DBConectada);
  const preguntas = useSelector((state) => state.asambleas.preguntas);

  return (
    <div className="w-full h-full p-5 space-y-5 overflow-y-auto bg-black rounded-lg opacity-70">
      <div className="bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
        <div className="border-2 border-black rounded-lg md:space-y-6 sm:p-8">
          {DBConectada === 'DBAdmin' ? (
            <ConectarDBs />
          ) : (
            <div className="space-y-2">
              <div>
                <Quorum />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {preguntas.map((pregunta) => (
                  <div key={pregunta._id}>
                    <Link to={`/viewRespuestas?id=${pregunta._id}`}>
                      <Preguntas pregunta={pregunta} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IngresoView;
