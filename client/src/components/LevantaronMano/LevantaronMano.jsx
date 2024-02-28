/* eslint-disable react/prop-types */
import {useSelector} from 'react-redux';
import Tabla from '../Tabla/Tabla';
import {FcCheckmark} from 'react-icons/fc';
import {setInterventoresAction, setManos} from '../../redux/actions';
import {alertInfo} from '../../helpers/Alertas';

const LevantaronMano = () => {
  const mano = useSelector((state) => state.asambleas.mano);
  const usuarios = useSelector((state) => state.asambleas.usuarios);
  const interventores = useSelector((state) => state.asambleas.interventores);
  const DBConectada = useSelector((state) => state.asambleas.DBConectada);

  const filtroRepetidos = {};
  const listaMano = mano
    .map((usuario) => {
      const nombre = usuario.nombre.replace(/✋/g, '').trim();

      if (!filtroRepetidos[nombre]) {
        filtroRepetidos[nombre] = true;
        return {id: usuario.id, nombre};
      }

      return null;
    })
    .filter(Boolean);

  const handleAceptarIntervenciones = (usuario) => {
    const actualIntervenciones = [...interventores];
    const idExiste = actualIntervenciones.some(
      (usuarioInter) => usuarioInter.id === usuario.id
    );
    if (!idExiste) {
      actualIntervenciones.push(usuario);
      setInterventoresAction(actualIntervenciones, DBConectada);
      const nuevoMano = mano.filter((user) => user.id !== usuario.id);
      setManos(nuevoMano, DBConectada);
    } else {
      alertInfo('Usuario en espera de intervención');
    }
  };

  const columnasMano = [
    {Header: 'NOMBRE', accessor: 'nombre'},
    {Header: 'TORRE/MZ', accessor: 'torreMz'},
    {Header: 'PREDIO', accessor: 'predio'},
    {
      Header: 'ACCIONES',
      accessor: 'icon',
      Cell: ({row}) => (
        <button onClick={() => handleAceptarIntervenciones(row.original)}>
          <FcCheckmark />
        </button>
      ),
    },
  ];

  const data = Array.isArray(listaMano)
    ? listaMano.map((item) => ({
        ...item,
        torreMz:
          usuarios.find((usuario) => usuario._id === item.id)?.predios[0]
            .torreMz || 'Torre/Mz no encontrada',
        predio:
          usuarios.find((usuario) => usuario._id === item.id)?.predios[0]
            .predio || 'Torre/Mz no encontrada',
      }))
    : [];

  return (
    <div className="w-full">
      <Tabla columns={columnasMano} data={data} className="w-full" />
    </div>
  );
};

export default LevantaronMano;
