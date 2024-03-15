/* eslint-disable react-hooks/exhaustive-deps */

import {useSelector} from 'react-redux';
import Quorum from '../../../../components/Quorum/Quorum';

const IngresoCliente = () => {
  const usuarios = useSelector((state) => state.asambleas.usuarios);

  return (
    <div className="flex w-[310px] lg:w-auto">
      <div className="bg-black opacity-70 w-full rounded-lg p-5 space-y-5">
        <div className="rounded-lg shadow border bg-gray-800 border-gray-700">
          <div className="border-2 border-black rounded-lg p-2">
            {usuarios.length > 0 ? <Quorum /> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngresoCliente;
