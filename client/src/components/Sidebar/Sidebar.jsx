/* eslint-disable react-hooks/exhaustive-deps */
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const login = useSelector((state) => state.asambleas.login);

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
              {location.pathname === '/CrearConjunto' ? (
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
              className={`nav-item ${
                location.pathname === '/adminNewUser' ? 'active' : ''
              }`}
            >
              <Link to="/adminNewUser" className="text-white">
                <span className="ml-2"> Crear Usuario</span>
              </Link>
            </li>
            <hr className="sidebar-divider my-2" />
            <li
              className={`nav-item ${
                location.pathname === '/adminNewDeportes' ? 'active' : ''
              }`}
            >
              <Link to="/adminNewDeportes" className="text-white">
                <span className="ml-2"> Crear Deporte</span>
              </Link>
            </li>
            <hr className="sidebar-divider my-2" />
            <li
              className={`nav-item ${
                location.pathname === '/adminNewMarca' ? 'active' : ''
              }`}
            >
              <Link to="/adminNewMarca" className="text-white">
                <span className="ml-2"> Crear Marca</span>
              </Link>
            </li>
            <hr className="sidebar-divider my-2" />
            <li
              className={`nav-item ${
                location.pathname === '/adminNewCategory' ? 'active' : ''
              }`}
            >
              <Link to="/adminNewCategory" className="text-white">
                <span className="ml-2"> Crear Categoria</span>
              </Link>
            </li>
            <hr className="sidebar-divider my-2" />
            <li
              className={`nav-item ${
                location.pathname === '/adminNewProduct' ? 'active' : ''
              }`}
            >
              <Link to="/adminNewProduct" className="text-white">
                <span className="ml-2"> Crear Producto</span>
              </Link>
            </li>

            <hr className="sidebar-divider my-2" />
            <li
              className={`nav-item ${
                location.pathname === '/adminEditProd' ? 'active' : ''
              }`}
            >
              <Link to="/adminEditProd" className="text-white">
                <span className="ml-2"> Editar Producto</span>
              </Link>
            </li>
            <hr className="sidebar-divider my-2" />
            <li
              className={`nav-item ${
                location.pathname === '/adminQuestions' ? 'active' : ''
              }`}
            >
              <Link to="/adminQuestions" className="text-white">
                <span className="ml-2"> Preguntas</span>
              </Link>
            </li>
            <hr className="sidebar-divider my-2" />
            <li className="nav-item">
              <Link to="/" className="text-white">
                <span className="ml-2"> Salir</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
