/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import {
  ActualizarDatos,
  ActualizarPreguntas,
  ActualizarUsuarios,
  ControlAsamblea,
  CrearConjunto,
  CrearEmpoderado,
  CrearPredios,
  CrearPreguntas,
  CrearUsuarios,
  GestionarConjunto,
  GestionarPreguntas,
  IngresoAdmin,
  IngresoCliente,
  IngresoView,
  Login,
  ResponderPreguntas,
  ViewRespuestas,
  Voto,
} from './views';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {logout, reLogin} from './redux/actions';
import Sidebar from './components/Sidebar/Sidebar';
import NavBar from './components/NavBar/NavBar';
import SidebarUsuario from './components/Sidebar/SidebarUsuario';
import {socket} from './helpers/Socket';
import {cargarPreguntas, cargarUsuariosSuccess} from './redux/appSlice';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = useSelector((state) => state.asambleas.login);
  const {pathname} = useLocation();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      logout(dispatch, navigate);
    } else {
      reLogin(token, dispatch, navigate);
    }
    socket.emit('joinRoom', login.connectedDB);
    socket.on('login', (data) => {
      dispatch(cargarUsuariosSuccess(data));
    });
    socket.on('logoutUsuario', (data) => {
      dispatch(cargarUsuariosSuccess(data));
    });
    socket.on('crearPreguntas', (data) => {
      dispatch(cargarPreguntas(data));
    });

    return () => {
      socket.off('login');
      socket.off('logoutUsuario');
      socket.off('crearPreguntas');
    };
  }, []);

  return (
    <div className="w-screen h-screen max-h-[calc(100vh-2rem)] overflow-y-auto flex p-2 space-x-2">
      {pathname !== '/' ? (
        login.role !== 'SuperAdmin' && login.role !== 'Admin' ? (
          login.role !== 'View' ? (
            <SidebarUsuario />
          ) : (
            ''
          )
        ) : (
          <Sidebar />
        )
      ) : (
        ''
      )}
      <div
        className={`w-full h-full space-y-2 ${
          pathname === '/' ? 'flex items-center justify-center' : ''
        }`}
      >
        {pathname !== '/' ? <NavBar /> : ''}
        <div className={pathname !== '/' ? 'flex-1 overflow-y-auto' : ''}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/admin" element={<IngresoAdmin />} />
            <Route path="/CrearConjunto" element={<CrearConjunto />} />
            <Route path="/GestionarConjunto" element={<GestionarConjunto />} />
            <Route path="/CrearUsuario" element={<CrearUsuarios />} />
            <Route path="/CrearPredio" element={<CrearPredios />} />
            <Route path="/usuario" element={<IngresoCliente />} />
            <Route path="/actualizarUsuario" element={<ActualizarUsuarios />} />
            <Route path="/CrearPreguntas" element={<CrearPreguntas />} />
            <Route
              path="/GestionarPreguntas"
              element={<GestionarPreguntas />}
            />
            <Route
              path="/ActualizarPreguntas"
              element={<ActualizarPreguntas />}
            />
            <Route path="/ControlAsambleas" element={<ControlAsamblea />} />
            <Route path="/ActualizarDatos" element={<ActualizarDatos />} />
            <Route path="/CrearEmpoderado" element={<CrearEmpoderado />} />
            <Route
              path="/ResponderPreguntas"
              element={<ResponderPreguntas />}
            />
            <Route path="/Voto" element={<Voto />} />
            <Route path="/view" element={<IngresoView />} />
            <Route path="/viewRespuestas" element={<ViewRespuestas />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
