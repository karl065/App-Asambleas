/* eslint-disable react-hooks/exhaustive-deps */

import {useSelector} from 'react-redux';
import Quorum from '../../../../components/Quorum/Quorum';

const IngresoCliente = () => {
  const usuarios = useSelector((state) => state.asambleas.usuarios);

  return (
    <div className="flex ">
      <div className="bg-black opacity-70 w-full rounded-lg p-5 space-y-5">
        <div className=" bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
          <div className="border-2 border-black rounded-lg">
            {usuarios.length > 0 ? <Quorum /> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngresoCliente;
