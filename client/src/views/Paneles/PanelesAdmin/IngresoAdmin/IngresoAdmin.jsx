/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import Sidebar from '../../../../components/Sidebar/Sidebar';
import Tabla from '../../../../components/Tabla/Tabla';
import {FcAutomatic} from 'react-icons/fc';

const IngresoAdmin = () => {
  const usuarios = useSelector((state) => state.asambleas.usuarios);
  const DBS = useSelector((state) => state.asambleas.DBS);
  const [totalCoeficiente, setTotalCoeficiente] = useState(0);

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
  const data = DBS.map((item) => ({...item, icon: 'icono'}));

  useEffect(() => {
    const sumaCoeficientes = usuarios.reduce((total, usuario) => {
      if (usuario.userStatus) {
        if (usuario.role !== 'SuperAdmin' || usuario.role !== 'Admin') {
          const coeficiente = parseFloat(usuario.coeficiente) || 0;
          return total + coeficiente;
        }
      }
      return total;
    }, 0);

    setTotalCoeficiente(sumaCoeficientes);
  }, [usuarios]);
  useEffect(() => {
    console.log('mas 1 ', totalCoeficiente);
  }, [totalCoeficiente]);
  return (
    <div className="flex p-2 ">
      <Sidebar />
      <div className="bg-black opacity-70 w-full m-2 rounded-lg p-5 space-y-5">
        <Tabla columns={columns} data={data} />
      </div>
    </div>
  );
};

export default IngresoAdmin;
