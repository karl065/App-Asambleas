import {useSelector} from 'react-redux';
import ConectarDBs from '../../../components/ConectarDB/ConectarDBs';

const IngresoView = () => {
  const DBConectada = useSelector((state) => state.asambleas.DBConectada);
  return (
    <div className="w-full h-full p-5 space-y-5 overflow-y-auto bg-black rounded-lg opacity-70">
      <div className="bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
        <div className="border-2 border-black rounded-lg md:space-y-6 sm:p-8">
          {DBConectada === 'DBAdmin' && <ConectarDBs />}
        </div>
      </div>
    </div>
  );
};

export default IngresoView;
