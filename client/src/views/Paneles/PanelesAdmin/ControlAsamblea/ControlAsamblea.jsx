import {useSelector} from 'react-redux';
import ConectarDBs from '../../../../components/ConectarDB/ConectarDBs';
import Quorum from '../../../../components/Quorum/Quorum';
import Preguntas from '../../../../components/Preguntas/Preguntas';
import {useState} from 'react';
import {FcCollapse, FcExpand} from 'react-icons/fc';

const ControlAsamblea = () => {
  const dbConnected = useSelector((state) => state.asambleas.DBConectada);
  const preguntas = useSelector((state) => state.asambleas.preguntas);
  const [quorumView, setQuorumView] = useState(false);
  const [preguntasView, setPreguntasView] = useState(false);

  const handleQuorumView = () => {
    setQuorumView(!quorumView);
  };
  const handlePreguntasView = () => {
    setPreguntasView(!preguntasView);
  };

  return (
    <div className="flex">
      <div className="bg-black opacity-70 w-full rounded-lg p-5 space-y-5 overflow-y-auto">
        <div className=" bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
          <div className="md:space-y-6 sm:p-8 border-2 border-black rounded-lg">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Monitoreo de Asambleas
            </h1>
            <ConectarDBs />
            <div className="w-full space-y-2">
              {' '}
              <div className="w-full flex-col space-y-2">
                <div>
                  <button
                    onClick={handleQuorumView}
                    disabled={dbConnected === 'DBAdmin'}
                    title={
                      dbConnected !== 'DBAdmin'
                        ? 'Quorum'
                        : 'Seleccione un Conjunto'
                    }
                  >
                    {quorumView ? <FcCollapse /> : <FcExpand />}
                  </button>
                  <label className="text-white uppercase"> Quorum</label>
                </div>
                {quorumView && (
                  <div className="uppercase bg-white p-2 rounded-lg shadow-md inline-block ">
                    <div className="border-2 border-black p-2 w-full h-full rounded-lg bg-black text-white space-y-2">
                      <Quorum />
                    </div>
                  </div>
                )}
              </div>
              <div>
                <button
                  onClick={handlePreguntasView}
                  disabled={dbConnected === 'DBAdmin'}
                  title={
                    dbConnected !== 'DBAdmin'
                      ? 'Preguntas'
                      : 'Seleccione un Conjunto'
                  }
                >
                  {preguntasView ? <FcCollapse /> : <FcExpand />}
                </button>
                <label className="text-white uppercase"> Preguntas</label>
                {preguntasView && (
                  <div className="flex space-x-2">
                    {preguntas.map((pregunta) => (
                      <div key={pregunta._id}>
                        <Preguntas pregunta={pregunta} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlAsamblea;
