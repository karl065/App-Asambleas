/* eslint-disable react-hooks/exhaustive-deps */
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../redux/actions';
import {useCallback} from 'react';

const SidebarUsuario = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const login = useSelector((state) => state.asambleas.login);

  const handleLogout = useCallback(
    (e) => {
      e.preventDefault();
      if (login && login.autorizador && login.autorizador.length > 0) {
        login.autorizador.map((propietario) => {
          logout(dispatch, null, propietario._id);
        });
      }
      logout(dispatch, navigate, login.id);
    },
    [dispatch, navigate, login.id]
  );

  return (
    <div>
      <nav className=" bg-black opacity-70 rounded-lg p-2 ">
        <div className=" bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
          <div className="p-2 border-2 border-black rounded-lg justify-center flex">
            <div className="p-2">
              <div className="text-white font-bold uppercase">
                <span>
                  {login.role} {login.primerNombre} {login.primerApellido}
                </span>
              </div>
              <hr className="my-2 border-2" />
              <ul className="m2">
                <li
                  className={`flex w-full ${
                    location.pathname === '/usuario'
                      ? 'opacity-60 cursor-not-allowed'
                      : ''
                  } `}
                >
                  {location.pathname === '/usuario' ? (
                    <span className=" text-white flex-grow ">Inicio</span>
                  ) : (
                    <Link to="/usuario" className="text-white flex-grow">
                      <span>Inicio</span>
                    </Link>
                  )}
                </li>
                <hr className="my-2" />
                <li
                  className={`flex w-full ${
                    location.pathname === '/ActualizarDatos'
                      ? 'opacity-60 cursor-not-allowed'
                      : ''
                  } `}
                >
                  {location.pathname === '/ActualizarDatos' ? (
                    <span className=" text-white flex-grow ">
                      Actualizar Datos / Dar Poder
                    </span>
                  ) : (
                    <Link
                      to="/ActualizarDatos"
                      className="text-white flex-grow"
                    >
                      <span>Actualizar Datos / Dar Poder</span>
                    </Link>
                  )}
                </li>
                <hr className="my-2" />
                <li
                  className={`flex w-full ${
                    location.pathname === '/CrearEmpoderado'
                      ? 'opacity-60 cursor-not-allowed'
                      : ''
                  } `}
                >
                  {location.pathname === '/CrearEmpoderado' ? (
                    <span className=" text-white flex-grow ">
                      Crear Empoderado
                    </span>
                  ) : (
                    <Link
                      to="/CrearEmpoderado"
                      className="text-white flex-grow"
                    >
                      <span>Crear Empoderado</span>
                    </Link>
                  )}
                </li>
                <hr className="my-2" />
                <li className="flex w-full">
                  <button
                    type="submit"
                    onClick={(e) => handleLogout(e)}
                    className="text-white flex-grow"
                  >
                    <Link to="/">
                      <span>Salir</span>
                    </Link>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default SidebarUsuario;
