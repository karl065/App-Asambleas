/* eslint-disable react-hooks/exhaustive-deps */

import {useSelector} from 'react-redux';
import Tabla from '../../../../components/Tabla/Tabla';
import {FcAutomatic} from 'react-icons/fc';

const IngresoAdmin = () => {
  // const usuarios = useSelector((state) => state.asambleas.usuarios);
  const DBS = useSelector((state) => state.asambleas.DBS);

  const handleIconButton = () => {
    alert('Funcionalidad en desarrollo');
  };

  const columns = [
    {Header: 'ID', accessor: '_id'},
    {Header: 'Nombre', accessor: 'nombre'},
    {
      Header: 'Editar',
      accessor: 'icon',
      Cell: () => (
        <button onClick={handleIconButton}>
          <FcAutomatic size={24} />
        </button>
      ),
    },
  ];

  // Modifica los datos para agregar la información del icono a cada fila
  const data = Array.isArray(DBS)
    ? DBS.map((item) => ({...item, icon: 'icono'}))
    : [];

  return (
    <div className="flex">
      <div className="bg-black opacity-70 w-full rounded-lg p-5 space-y-5">
        <div className=" bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
          <div className="md:space-y-6 sm:p-8 border-2 border-black rounded-lg">
            <Tabla columns={columns} data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngresoAdmin;
