/* eslint-disable react-hooks/exhaustive-deps */
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const login = useSelector((state) => state.asambleas.login);
  const role = login.role;

  console.log(login);

  useEffect(() => {
    if (
      role === 'Propietario' ||
      role === 'Propietario-Empoderado' ||
      role === 'Empoderado'
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
          <hr className="border-2" />
          <div className="sidebar-brand-text mx-3">
            <span> </span>
          </div>
          <ul className="navbar-nav text-light" id="accordionSidebar">
            <li
              className={`nav-item ${
                location.pathname === '/admin'
                  ? 'opacity-60 cursor-not-allowed'
                  : ''
              }`}
            >
              {location.pathname === '/admin' ? (
                <span className="ml-2 text-white">Conjuntos</span>
              ) : (
                <Link to="/admin" className="text-white">
                  <span className="ml-2">Conjuntos</span>
                </Link>
              )}
            </li>
            {role !== 'Empleados' ? (
              <>
                <hr className="sidebar-divider my-2" />
                <li
                  className={`nav-item ${
                    location.pathname === '/adminUsers' ? 'active' : ''
                  }`}
                >
                  <Link to="/adminUsers" className="text-white">
                    <span className="ml-2"> Usuarios</span>
                  </Link>
                </li>
                {role === 'SuperUser' ? (
                  <>
                    <hr className="sidebar-divider my-2" />
                    <li
                      className={`nav-item ${
                        location.pathname === '/adminNewUser' ? 'active' : ''
                      }`}
                    >
                      <Link to="/adminNewUser" className="text-white">
                        <span className="ml-2"> Crear Usuario</span>
                      </Link>
                    </li>
                  </>
                ) : null}

                <hr className="sidebar-divider my-2" />
                <li
                  className={`nav-item ${
                    location.pathname === '/adminSales' ? 'active' : ''
                  }`}
                >
                  <Link to="/adminSales" className="text-white">
                    <span className="ml-2"> Ventas</span>
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
              </>
            ) : null}
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
