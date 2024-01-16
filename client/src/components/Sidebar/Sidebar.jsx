/* eslint-disable react-hooks/exhaustive-deps */
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../redux/actions';
import {useCallback} from 'react';

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const login = useSelector((state) => state.asambleas.login);

  const handleLogout = useCallback(
    (e) => {
      e.preventDefault();
      logout(dispatch, navigate, login.id);
    },
    [dispatch, navigate, login.id]
  );

  useEffect(() => {
    if (
      login.role === 'Propietario' ||
      login.role === 'Propietario-Empoderado' ||
      login.role === 'Empoderado'
    )
      navigate('/usuario');
  }, []);

  return (
    <div>
      <nav className=" bg-black opacity-70 rounded-lg p-2 ">
        <div className=" bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
          <div className="p-2 border-2 border-black rounded-lg justify-center flex">
            <div className="p-2">
              <div className="text-white font-bold">
                <span>{login.primerNombre}</span>
              </div>
              <hr className="my-2 border-2" />

              <ul className="m2">
                <li
                  className={`flex w-full ${
                    location.pathname === '/admin'
                      ? 'opacity-60 cursor-not-allowed'
                      : ''
                  } `}
                >
                  {location.pathname === '/admin' ? (
                    <span className=" text-white flex-grow ">Conjuntos</span>
                  ) : (
                    <Link to="/admin" className="text-white flex-grow">
                      <span>Conjuntos</span>
                    </Link>
                  )}
                </li>

                <hr className="my-2" />
                <li
                  className={`flex w-full ${
                    location.pathname === '/CrearConjunto'
                      ? 'opacity-60 cursor-not-allowed'
                      : ''
                  }`}
                >
                  {location.pathname === '/CrearConjunto' ? (
                    <span className=" text-white flex-grow">
                      Crear Conjunto
                    </span>
                  ) : (
                    <Link to="/CrearConjunto" className="text-white flex-grow">
                      <span>Crear Conjunto</span>
                    </Link>
                  )}
                </li>
                <hr className="my-2" />
                <li
                  className={`flex w-full ${
                    location.pathname === '/GestionarConjunto'
                      ? 'opacity-60 cursor-not-allowed'
                      : ''
                  }`}
                >
                  {location.pathname === '/GestionarConjunto' ? (
                    <span className=" text-white flex-grow">
                      Gestionar Conjunto
                    </span>
                  ) : (
                    <Link
                      to="/GestionarConjunto"
                      className="text-white flex-grow"
                    >
                      <span>Gestionar Conjunto</span>
                    </Link>
                  )}
                </li>
                <hr className="my-2" />
                <li
                  className={`flex w-full ${
                    location.pathname === '/CrearUsuario'
                      ? 'opacity-60 cursor-not-allowed'
                      : ''
                  }`}
                >
                  {location.pathname === '/CrearUsuario' ? (
                    <span className=" text-white flex-grow">Crear Usuario</span>
                  ) : (
                    <Link to="/CrearUsuario" className="text-white flex-grow">
                      <span>Crear Usuario</span>
                    </Link>
                  )}
                </li>
                <hr className="my-2" />
                <li
                  className={`flex w-full ${
                    location.pathname === '/actualizarUsuario'
                      ? 'opacity-60 cursor-not-allowed'
                      : ''
                  }`}
                >
                  {location.pathname === '/actualizarUsuario' ? (
                    <span className=" text-white flex-grow">
                      Actualizar Usuario
                    </span>
                  ) : (
                    <Link
                      to="/actualizarUsuario"
                      className="text-white flex-grow"
                    >
                      <span>Actualizar Usuario</span>
                    </Link>
                  )}
                </li>
                <hr className="my-2" />
                <li
                  className={`flex w-full ${
                    location.pathname === '/CrearPredio'
                      ? 'opacity-60 cursor-not-allowed'
                      : ''
                  }`}
                >
                  {location.pathname === '/CrearPredio' ? (
                    <span className=" text-white flex-grow">Crear Predio</span>
                  ) : (
                    <Link to="/CrearPredio" className="text-white flex-grow">
                      <span>Crear Predio</span>
                    </Link>
                  )}
                </li>
                <hr className="my-2" />
                <li
                  className={`flex w-full ${
                    location.pathname === '/CrearPreguntas'
                      ? 'opacity-60 cursor-not-allowed'
                      : ''
                  }`}
                >
                  {location.pathname === '/CrearPreguntas' ? (
                    <span className=" text-white flex-grow">
                      Crear Preguntas
                    </span>
                  ) : (
                    <Link to="/CrearPreguntas" className="text-white flex-grow">
                      <span>Crear Preguntas</span>
                    </Link>
                  )}
                </li>
                <hr className="my-2" />
                <li
                  className={`flex w-full ${
                    location.pathname === '/GestionarPreguntas'
                      ? 'opacity-60 cursor-not-allowed'
                      : ''
                  }`}
                >
                  {location.pathname === '/GestionarPreguntas' ? (
                    <span className=" text-white flex-grow">
                      Gestionar Preguntas
                    </span>
                  ) : (
                    <Link
                      to="/GestionarPreguntas"
                      className="text-white flex-grow"
                    >
                      <span>Gestionar Preguntas</span>
                    </Link>
                  )}
                </li>
                <hr className="my-2" />
                <li
                  className={`flex w-full ${
                    location.pathname === '/ActualizarPreguntas'
                      ? 'opacity-60 cursor-not-allowed'
                      : ''
                  }`}
                >
                  {location.pathname === '/ActualizarPreguntas' ? (
                    <span className=" text-white flex-grow">
                      Actualizar Preguntas
                    </span>
                  ) : (
                    <Link
                      to="/ActualizarPreguntas"
                      className="text-white flex-grow"
                    >
                      <span>Actualizar Preguntas</span>
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

export default Sidebar;
