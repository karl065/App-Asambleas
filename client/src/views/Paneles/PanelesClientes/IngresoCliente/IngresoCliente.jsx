/* eslint-disable react-hooks/exhaustive-deps */

import Quorum from '../../../../components/Quorum/Quorum';

const IngresoCliente = () => {
  return (
    <div className="flex ">
      <div className="bg-black opacity-70 w-full rounded-lg p-5 space-y-5">
        <div className=" bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
          <div className="md:space-y-6 sm:p-8 border-2 border-black rounded-lg">
            <Quorum />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngresoCliente;
