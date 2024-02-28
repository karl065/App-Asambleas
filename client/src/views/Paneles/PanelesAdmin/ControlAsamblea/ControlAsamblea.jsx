import {useSelector} from 'react-redux';
import ConectarDBs from '../../../../components/ConectarDB/ConectarDBs';
import Quorum from '../../../../components/Quorum/Quorum';
import Preguntas from '../../../../components/Preguntas/Preguntas';
import {useState} from 'react';
import {FcCollapse, FcExpand} from 'react-icons/fc';
import Timer from '../../../../components/Timer/Timer';
import LevantaronMano from '../../../../components/LevantaronMano/LevantaronMano';
import Interventores from '../../../../components/Interventores/Interventores';

const ControlAsamblea = () => {
  const dbConnected = useSelector((state) => state.asambleas.DBConectada);
  const preguntas = useSelector((state) => state.asambleas.preguntas);
  const [quorumView, setQuorumView] = useState(false);
  const [preguntasView, setPreguntasView] = useState(false);
  const [manoView, setManoView] = useState(false);
  const [interventoresView, setInterventoresView] = useState(false);

  const handleQuorumView = () => {
    setQuorumView(!quorumView);
  };
  const handlePreguntasView = () => {
    setPreguntasView(!preguntasView);
  };

  const handlerManoView = () => {
    setManoView(!manoView);
  };

  const handlerInterventoresView = () => {
    setInterventoresView(!interventoresView);
  };

  return (
    <div className="flex font-bold">
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
                    <div className="border-2 flex justify-center border-black p-2 w-full h-full rounded-lg bg-black text-white space-y-2">
                      <Quorum />
                      <div className="p-5 space-y-5 overflow-y-auto font-extrabold text-white bg-black rounded-lg opacity-70">
                        <div className="bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
                          <div className="border-2 border-black rounded-lg md:space-y-6 sm:p-8">
                            <Timer />
                          </div>
                        </div>
                      </div>
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
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {preguntas.map((pregunta) => (
                      <div key={pregunta._id}>
                        <Preguntas pregunta={pregunta} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="w-full space-y-2">
                <button
                  onClick={handlerManoView}
                  disabled={dbConnected === 'DBAdmin'}
                  title={
                    dbConnected !== 'DBAdmin'
                      ? 'Preguntas'
                      : 'Seleccione un Conjunto'
                  }
                >
                  {manoView ? <FcCollapse /> : <FcExpand />}
                </button>
                <label className="text-white uppercase">
                  {' '}
                  Levantaron la mano
                </label>

                {manoView && (
                  <div>
                    <LevantaronMano />
                  </div>
                )}
              </div>
              <div className="w-full space-y-2">
                <button
                  onClick={handlerInterventoresView}
                  disabled={dbConnected === 'DBAdmin'}
                  title={
                    dbConnected !== 'DBAdmin'
                      ? 'Preguntas'
                      : 'Seleccione un Conjunto'
                  }
                >
                  {interventoresView ? <FcCollapse /> : <FcExpand />}
                </button>
                <label className="text-white uppercase"> Interventores</label>

                {interventoresView && (
                  <div>
                    <Interventores />
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
