/* eslint-disable react-hooks/exhaustive-deps */
import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect} from 'react';
import {alertSuccess} from '../../helpers/Alertas';
import {setActivos} from '../../redux/appSlice';
import Pie from '../Pie/Pie';

const Quorum = () => {
  const usuarios = useSelector((state) => state.asambleas.usuarios);
  const dispatch = useDispatch();

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

        if (porcentajeUsuarios > 51) {
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
    <div className="flex-col flex lg:flex-row items-center justify-center space-y-2 lg:space-x-2 uppercase">
      <div className="border-2 rounded-lg">
        <Pie percent={porcentajeUsuarios} porcentajeData={porcentajeUsuarios} />
      </div>
      <div className="p-5 space-y-5 overflow-y-auto font-extrabold text-white bg-black rounded-lg opacity-70">
        <div className="bg-white text-black rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
          <div className="border-2 border-black rounded-lg space-y-2 lg:space-y-6 p-2 lg:p-8">
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

            <div>
              <hr className="border-4 rounded-2xl" />
              <h1>Total de Propietarios: {propietarios.length}</h1>

              <hr className=" border-4 rounded-2xl" />
              <h1>Propietarios Conectados: {usuariosEnTrue}</h1>

              <hr className="border-4 rounded-2xl" />
              <h1>
                Propietarios Desconectados:{' '}
                {propietarios.length - usuariosEnTrue}
              </h1>
              <hr className="border-4 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quorum;
