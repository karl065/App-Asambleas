/* eslint-disable react-hooks/exhaustive-deps */
import {useSelector} from 'react-redux';
import ConectarDBs from '../../../../components/ConectarDB/ConectarDBs';
import Quorum from '../../../../components/Quorum/Quorum';
import Preguntas from '../../../../components/Preguntas/Preguntas';
import {Link} from 'react-router-dom';
import Timer from '../../../../components/Timer/Timer';
import Tabla from '../../../../components/Tabla/Tabla';

const IngresoView = () => {
  const DBConectada = useSelector((state) => state.asambleas.DBConectada);
  const preguntas = useSelector((state) => state.asambleas.preguntas);
  const interventores = useSelector((state) => state.asambleas.interventores);
  const debate = useSelector((state) => state.asambleas.debate);

  const columnasInterventores = [
    {Header: 'NOMBRE', accessor: 'nombre'},
    {Header: 'TORRE/MZ', accessor: 'torreMz'},
    {Header: 'PREDIO', accessor: 'predio'},
  ];

  return (
    <div className="w-full h-full p-5 space-y-5 overflow-y-auto bg-black rounded-lg opacity-70">
      <div className="bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
        <div className="border-2 border-black rounded-lg md:space-y-6 sm:p-8">
          {DBConectada === 'DBAdmin' ? (
            <ConectarDBs />
          ) : (
            <div className="space-y-2">
              <hr className="border-4 rounded-2xl" />
              <div>
                <Quorum />
              </div>
              <hr className="border-4 rounded-2xl" />
              <div className="flex p-2 justify-between">
                <div className="flex-1 flex-col flex space-y-2 items-center justify-center border p-2">
                  {debate && (
                    <h1 className="text-white animate-bounce uppercase border rounded-lg font-bold p-2 relative bg-gradient-to-r from-gray-600 via-black to-gray-600">
                      {debate}
                    </h1>
                  )}

                  <div className="border p-2  rounded-lg w-full">
                    <Tabla
                      columns={columnasInterventores}
                      data={interventores}
                      firstRowClass={'text-green-500'}
                    />
                  </div>
                </div>
                <div className="flex flex-1 justify-center items-center p-2">
                  <Timer />
                </div>
              </div>
              <hr className="border-4 rounded-2xl" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {preguntas.map((pregunta) => (
                  <div key={pregunta._id}>
                    <Link to={`/viewRespuestas?id=${pregunta._id}`}>
                      <Preguntas pregunta={pregunta} />
                    </Link>
                  </div>
                ))}
              </div>
              <hr className="border-4 rounded-2xl" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IngresoView;
