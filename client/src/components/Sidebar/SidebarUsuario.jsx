/* eslint-disable react-hooks/exhaustive-deps */
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../redux/actions';
import {useCallback} from 'react';
import {
  FaHome,
  FaUserEdit,
  FaUserPlus,
  FaQuestionCircle,
  FaSignOutAlt,
} from 'react-icons/fa';

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
          logout(dispatch, null, propietario._id, login.connectedDB);
        });
      }
      logout(dispatch, navigate, login._id, login.connectedDB);
    },
    [dispatch, navigate, login._id]
  );

  return (
    <div className="w-[100px] lg:w-auto">
      <nav className="p-2 bg-black rounded-lg  opacity-70">
        <div className="rounded-lg shadow  border bg-gray-800 border-gray-700">
          <div className="flex justify-center p-2 border-2 border-black rounded-lg">
            <div className=" lg:p-2 lg:w-full">
              <div className="font-bold text-white uppercase hidden lg:block">
                <span>
                  {login.role} {login.primerNombre} {login.primerApellido}
                </span>
              </div>
              <hr className="lg:my-2 border-2 hidden lg:block" />
              <ul className="lg:m2">
                <li
                  className={`flex w-full ${
                    location.pathname === '/usuario'
                      ? 'opacity-60 cursor-not-allowed'
                      : ''
                  } `}
                >
                  {location.pathname === '/usuario' ? (
                    <span className="flex-grow text-white flex justify-center lg:justify-normal ">
                      <h1 className="hidden lg:block">Inicio</h1>
                      <div className="rounded-full flex justify-center bg-green-900 w-[40px] h-[40px] items-center lg:hidden">
                        <FaHome size={24} />
                      </div>
                    </span>
                  ) : (
                    <Link to="/usuario" className="flex-grow text-white">
                      <span className="flex-grow text-white flex justify-center lg:justify-normal ">
                        <h1 className="hidden lg:block">Inicio</h1>
                        <div className="rounded-full flex justify-center bg-green-700 w-[40px] h-[40px] items-center lg:hidden">
                          <FaHome style={{color: 'white'}} size={24} />
                        </div>
                      </span>
                    </Link>
                  )}
                </li>
                <hr className="my-2 invisible" />
                <li
                  className={`flex w-full invisible ${
                    location.pathname === '/ActualizarDatos'
                      ? 'opacity-60 cursor-not-allowed'
                      : ''
                  } `}
                >
                  {location.pathname === '/ActualizarDatos' ? (
                    <span className="flex-grow text-white flex justify-center lg:justify-normal">
                      <h1 className="hidden lg:block">
                        Actualizar Datos / Dar Poder
                      </h1>
                      <div className="rounded-full flex justify-center bg-green-900 w-[40px] h-[40px] items-center lg:hidden">
                        <FaUserEdit size={24} />
                      </div>
                    </span>
                  ) : (
                    <Link
                      to="/ActualizarDatos"
                      className="flex-grow text-white"
                    >
                      <span className="flex-grow text-white flex justify-center lg:justify-normal ">
                        <h1 className="hidden lg:block">
                          Actualizar Datos / Dar Poder
                        </h1>
                        <div className="rounded-full flex justify-center bg-green-700 w-[40px] h-[40px] items-center lg:hidden">
                          <FaUserEdit style={{color: 'white'}} size={24} />
                        </div>
                      </span>
                    </Link>
                  )}
                </li>
                <hr className="my-2 invisible" />
                <li
                  className={`flex w-full invisible ${
                    location.pathname === '/CrearEmpoderado'
                      ? 'opacity-60 cursor-not-allowed'
                      : ''
                  } `}
                >
                  {location.pathname === '/CrearEmpoderado' ? (
                    <span className="flex-grow text-white flex justify-center lg:justify-normal">
                      <h1 className="hidden lg:block">Crear Empoderado</h1>
                      <div className="rounded-full flex justify-center bg-green-900 w-[40px] h-[40px] items-center lg:hidden">
                        <FaUserPlus size={24} />
                      </div>
                    </span>
                  ) : (
                    <Link
                      to="/CrearEmpoderado"
                      className="flex-grow text-white"
                    >
                      <span className="flex-grow text-white flex justify-center lg:justify-normal ">
                        <h1 className="hidden lg:block">Crear Empoderado</h1>
                        <div className="rounded-full flex justify-center bg-green-700 w-[40px] h-[40px] items-center lg:hidden">
                          <FaUserPlus style={{color: 'white'}} size={24} />
                        </div>
                      </span>
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
                    <span className="flex-grow text-white flex justify-center lg:justify-normal">
                      <h1 className="hidden lg:block">Responder Preguntas</h1>
                      <div className="rounded-full flex justify-center bg-green-900 w-[40px] h-[40px] items-center lg:hidden">
                        <FaQuestionCircle size={24} />
                      </div>
                    </span>
                  ) : (
                    <Link
                      to="/ResponderPreguntas"
                      className="flex-grow text-white"
                    >
                      <span className="flex-grow text-white flex justify-center lg:justify-normal ">
                        <h1 className="hidden lg:block">Responder Preguntas</h1>
                        <div className="rounded-full flex justify-center bg-green-700 w-[40px] h-[40px] items-center lg:hidden">
                          <FaQuestionCircle
                            style={{color: 'white'}}
                            size={24}
                          />
                        </div>
                      </span>
                    </Link>
                  )}
                </li>
                <hr className="my-2" />
                <li className="flex w-full">
                  <button
                    type="submit"
                    onClick={(e) => handleLogout(e)}
                    className="w-full text-white bg-red-600 hover:bg-red-700 py-2 rounded-lg"
                  >
                    <Link to="/">
                      <span className="flex-grow text-white flex justify-center ">
                        <h1 className="hidden lg:block">Salir</h1>
                        <FaSignOutAlt
                          className="lg:hidden"
                          style={{color: 'white'}}
                          size={24}
                        />
                      </span>
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
