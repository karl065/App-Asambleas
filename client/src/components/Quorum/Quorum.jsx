import {useSelector} from 'react-redux';
import {VictoryLabel, VictoryPie} from 'victory';
import {useState, useEffect} from 'react';
import {alertSuccess} from '../../helpers/Alertas';

const Quorum = () => {
  const usuarios = useSelector((state) => state.asambleas.usuarios);
  const [data, setData] = useState([]);
  const [porcentajeUsuarios, setPorcentajeUsuarios] = useState(0);
  const [sumaCoeficientes, setSumaCoeficientes] = useState(0);
  const [usuariosEnTrue, setUsuariosEnTrue] = useState('');
  const db = useSelector((state) => state.asambleas.DBConectada);

  useEffect(() => {
    const fetchData = () => {
      if (db !== 'DBAdmin' && usuarios) {
        const usuariosQuorum = usuarios.filter((usuario) => usuario.userStatus);

        setSumaCoeficientes(
          usuariosQuorum.reduce(
            (total, usuario) => total + usuario.predios[0].coeficiente,
            0
          )
        );

        const porcentaje = (usuariosQuorum.length / usuarios.length) * 100;

        setPorcentajeUsuarios(porcentaje);

        setUsuariosEnTrue(usuariosQuorum.length);

        setData([
          {x: 'Quórum', y: porcentaje},
          {x: 'Faltante', y: 100 - porcentaje},
        ]);
      }
    };

    fetchData();
  }, [db, usuarios]);

  useEffect(() => {
    if (porcentajeUsuarios > 51) alertSuccess('Quorum Alcanzado');
  }, [porcentajeUsuarios]);

  return (
    <div className="flex items-center space-x-4 uppercase">
      <div>
        <VictoryPie
          data={data}
          colorScale={['green', 'red']}
          labels={({datum}) => `${datum.x}: ${datum.y.toFixed(0)}%`}
          labelComponent={<VictoryLabel style={{fill: 'white'}} />}
        />
      </div>
      <div className="bg-black opacity-70 rounded-lg p-5 space-y-5 overflow-y-auto font-extrabold text-white">
        <div className=" bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
          <div className="md:space-y-6 sm:p-8 border-2 border-black rounded-lg">
            <div
              className={`bg-white rounded-lg p-1 ${
                porcentajeUsuarios > 51 ? 'text-green-800' : 'text-red-700'
              }`}
            >
              <div className="bg-black rounded-lg p-1 ">
                <div className="bg-white rounded-lg p-1">
                  <h1>Quórum: {porcentajeUsuarios.toFixed(0)}%</h1>
                  <h1>Coeficiente Total: {sumaCoeficientes}</h1>
                </div>
              </div>
            </div>
            <p>
              <br />
              Total de Propietarios: {usuarios.length}
              <br />
              Propietarios Conectados: {usuariosEnTrue}
              <br />
              Propietarios Desconectados: {usuarios.length - usuariosEnTrue}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quorum;
