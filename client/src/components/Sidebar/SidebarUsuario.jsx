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
      logout(dispatch, navigate, login._id);
    },
    [dispatch, navigate, login._id]
  );

  return (
    <div>
      <nav className="p-2 bg-black rounded-lg  opacity-70">
        <div className="bg-white rounded-lg shadow  dark:border dark:bg-gray-800 dark:border-gray-700">
          <div className="flex justify-center p-2 border-2 border-black rounded-lg">
            <div className="p-2">
              <div className="font-bold text-white uppercase">
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
                    <span className="flex-grow text-white ">Inicio</span>
                  ) : (
                    <Link to="/usuario" className="flex-grow text-white">
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
                    <span className="flex-grow text-white ">
                      Actualizar Datos / Dar Poder
                    </span>
                  ) : (
                    <Link
                      to="/ActualizarDatos"
                      className="flex-grow text-white"
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
                    <span className="flex-grow text-white ">
                      Crear Empoderado
                    </span>
                  ) : (
                    <Link
                      to="/CrearEmpoderado"
                      className="flex-grow text-white"
                    >
                      <span>Crear Empoderado</span>
                    </Link>
                  )}
                </li>
                <hr className="my-2" />
                <li
                  className={`flex w-full ${
                    location.pathname === '/ResponderPreguntas'
                      ? 'opacity-60 cursor-not-allowed'
                      : ''
                  } `}
                >
                  {location.pathname === '/ResponderPreguntas' ? (
                    <span className="flex-grow text-white ">
                      Responder Preguntas
                    </span>
                  ) : (
                    <Link
                      to="/ResponderPreguntas"
                      className="flex-grow text-white"
                    >
                      <span>Responder Preguntas</span>
                    </Link>
                  )}
                </li>
                <hr className="my-2" />
                <li className="flex w-full">
                  <button
                    type="submit"
                    onClick={(e) => handleLogout(e)}
                    className="flex-grow text-white"
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
