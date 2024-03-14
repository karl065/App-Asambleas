/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {useSelector} from 'react-redux';
import Tabla from '../Tabla/Tabla';
import {useEffect, useState} from 'react';
import {alertIntervenciones} from '../../helpers/Alertas';
import {actualizarTemas} from '../../redux/actions';

const Interventores = () => {
  const DBConectada = useSelector((state) => state.asambleas.DBConectada);
  const interventores = useSelector((state) => state.asambleas.interventores);
  const time = useSelector((state) => state.asambleas.time);
  const [prevTime, setPrevTime] = useState(0);
  const [prevInterventores, setPrevInterventores] = useState(
    interventores.length
  );
  const debate = useSelector((state) => state.asambleas.debate);
  const maxInterventores = useSelector(
    (state) => state.asambleas.maxInterventores
  );
  const temaActual = useSelector((state) => state.asambleas.temaActual);

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

  useEffect(() => {
    setPrevInterventores(interventores.length);

    if (maxInterventores === prevInterventores) {
      actualizarTemas(temaActual, {temaCompleto: true}, DBConectada);
    }
  }, [interventores]);

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
