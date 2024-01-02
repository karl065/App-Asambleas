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
      <nav className=" bg-black opacity-70 rounded-lg">
        <div className="p-3">
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
                <span className=" text-white flex-grow">Crear Conjunto</span>
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
                <Link to="/GestionarConjunto" className="text-white flex-grow">
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
      </nav>
    </div>
  );
};

export default Sidebar;
