/* eslint-disable react-hooks/exhaustive-deps */
import {useDispatch, useSelector} from 'react-redux';
import {VictoryLabel, VictoryPie} from 'victory';
import {useState, useEffect} from 'react';
import {alertSuccess} from '../../helpers/Alertas';
import {setActivos} from '../../redux/appSlice';

const Quorum = () => {
  const usuarios = useSelector((state) => state.asambleas.usuarios);
  const dispatch = useDispatch();

  const [percent, setPercent] = useState(0);
  const [porcentajeUsuarios, setPorcentajeUsuarios] = useState(0);
  const [sumaCoeficientes, setSumaCoeficientes] = useState(0);
  const [usuariosEnTrue, setUsuariosEnTrue] = useState('');
  const db = useSelector((state) => state.asambleas.DBConectada);

  const propietarios = usuarios.filter(
    (usuario) =>
      usuario.role === 'Propietario' ||
      usuario.role === 'Propietario-Empoderado'
  );

  useEffect(() => {
    const fetchData = () => {
      if (db !== 'DBAdmin' && usuarios) {
        const usuariosQuorum = usuarios.filter(
          (usuario) =>
            usuario.userStatus &&
            (usuario.role === 'Propietario' ||
              usuario.role === 'Propietario-Empoderado')
        );

        setSumaCoeficientes(
          usuariosQuorum.reduce(
            (total, usuario) => total + usuario.predios[0].coeficiente,
            0
          )
        );

        const porcentaje = (usuariosQuorum.length / propietarios.length) * 100;

        setPorcentajeUsuarios(porcentaje);

        setUsuariosEnTrue(usuariosQuorum.length);

        setPercent(porcentaje);

        if (porcentaje > 51) {
          alertSuccess('Quorum Alcanzado');
        }
      }
    };

    fetchData();
  }, [db, usuarios]);

  useEffect(() => {
    dispatch(setActivos(usuariosEnTrue));
  }, [usuariosEnTrue]);

  return (
    <div className="flex items-center justify-center space-x-10 uppercase">
      <div className="border-2 rounded-lg">
        <svg viewBox="0 0 400 400" width="100%" height="100%">
          <VictoryPie
            standalone={false}
            animate={{duration: 1000}}
            width={400}
            height={400}
            data={[
              {x: 'Quórum', y: percent},
              {x: 'Faltante', y: 100 - percent},
            ]}
            innerRadius={120}
            cornerRadius={25}
            labels={() => null}
            style={{
              data: {
                fill: ({datum}) =>
                  datum.x === 'Quórum'
                    ? porcentajeUsuarios > 50
                      ? 'green'
                      : 'red'
                    : 'transparent',
              },
            }}
          />
          <VictoryLabel
            textAnchor="middle"
            verticalAnchor="middle"
            x={200}
            y={200}
            text={`${Math.round(percent)}%`}
            style={{
              fontSize: 45,
              fontWeight: 'bold',
              stroke: 'white',
              fill: porcentajeUsuarios > 50 ? 'green' : 'red',
            }}
          />
        </svg>
      </div>
      <div className="p-5 space-y-5 overflow-y-auto font-extrabold text-white bg-black rounded-lg opacity-70">
        <div className="bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
          <div className="border-2 border-black rounded-lg md:space-y-6 sm:p-8">
            <div
              className={`bg-white rounded-lg p-1 ${
                porcentajeUsuarios > 51 ? 'text-green-800' : 'text-red-700'
              }`}
            >
              <div className="p-1 bg-black rounded-lg ">
                <div className="p-1 bg-white rounded-lg">
                  <h1>Quórum: {porcentajeUsuarios.toFixed(0)}%</h1>
                  <h1>Coeficiente Total: {sumaCoeficientes}</h1>
                </div>
              </div>
            </div>
            <p>
              <br />
              Total de Propietarios: {propietarios.length}
              <br />
              Propietarios Conectados: {usuariosEnTrue}
              <br />
              Propietarios Desconectados: {propietarios.length - usuariosEnTrue}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quorum;
