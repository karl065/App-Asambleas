/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import Sidebar from '../../../../components/Sidebar/Sidebar';

const IngresoCliente = () => {
  const usuarios = useSelector((state) => state.asambleas.usuarios);
  const [totalCoeficiente, setTotalCoeficiente] = useState(0);
  console.log(usuarios);
  useEffect(() => {
    if (usuarios.length > 0) {
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
    }
  }, [usuarios]);
  useEffect(() => {
    console.log('mas 1 ', totalCoeficiente);
  }, [totalCoeficiente]);
  return (
    <div className="flex p-2 ">
      <Sidebar />
      <h1>Soy ingreso</h1>
    </div>
  );
};

export default IngresoCliente;
