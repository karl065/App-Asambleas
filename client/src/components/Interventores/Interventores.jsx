/* eslint-disable react/prop-types */
import {useSelector} from 'react-redux';
import Tabla from '../Tabla/Tabla';

const Interventores = () => {
  const interventores = useSelector((state) => state.asambleas.interventores);

  const columnasInterventores = [
    {Header: 'NOMBRE', accessor: 'nombre'},
    {Header: 'TORRE/MZ', accessor: 'torreMz'},
    {Header: 'PREDIO', accessor: 'predio'},
  ];

  return (
    <div className="w-full">
      <Tabla
        columns={columnasInterventores}
        data={interventores}
        className="w-full"
      />
    </div>
  );
};

export default Interventores;
