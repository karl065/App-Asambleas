/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {useSelector} from 'react-redux';
import Tabla from '../Tabla/Tabla';
import {useEffect, useState} from 'react';
import {alertIntervenciones} from '../../helpers/Alertas';

const Interventores = () => {
  const DBConectada = useSelector((state) => state.asambleas.DBConectada);
  const interventores = useSelector((state) => state.asambleas.interventores);
  const time = useSelector((state) => state.asambleas.time);
  const [prevTime, setPrevTime] = useState(0);
  const debate = useSelector((state) => state.asambleas.debate);

  const columnasInterventores = [
    {Header: 'NOMBRE', accessor: 'nombre'},
    {Header: 'TORRE/MZ', accessor: 'torreMz'},
    {Header: 'PREDIO', accessor: 'predio'},
  ];
  useEffect(() => {
    if (prevTime !== 0 && time === 0 && interventores.length > 0) {
      if (debate) {
        alertIntervenciones(DBConectada, interventores, debate);
      }
    }
    setPrevTime(time);
  }, [time, debate]);
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
