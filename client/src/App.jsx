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
  CrearTema,
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
import {
  cargarMano,
  cargarPreguntas,
  cargarUsuariosSuccess,
  setDebate,
  setInterventores,
  setTemas,
  setTime,
} from './redux/appSlice';
import {alertInfo} from './helpers/Alertas';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = useSelector((state) => state.asambleas.login);
  const mano = useSelector((state) => state.asambleas.mano);
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

    socket.on('timer', (data) => {
      dispatch(setTime(data));
    });
    socket.on('setearMano', (data) => {
      dispatch(cargarMano(data));
    });
    socket.on('setearInterventores', (data) => {
      dispatch(setInterventores(data));
    });

    socket.on('setDebate', (data) => {
      dispatch(setDebate(data));
    });

    socket.on('setTemas', (data) => {
      dispatch(setTemas(data));
    });

    return () => {
      socket.off('login');
      socket.off('logoutUsuario');
      socket.off('crearPreguntas');
      socket.off('timer');
      socket.off('setearMano');
      socket.off('setearInterventores');
      socket.off('setDebate');
      socket.off('setTemas');
    };
  }, []);

  useEffect(() => {
    socket.on('mano', (data) => {
      const manoActual = [...mano];
      const idExiste = manoActual.some(
        (usuario) => usuario.id === String(data.id)
      );

      if (!idExiste) {
        manoActual.push(data);
      }
      dispatch(cargarMano(manoActual));
      if (login._id !== data.id) {
        alertInfo(data.nombre);
      }
    });

    return () => {
      socket.off('mano');
    };
  }, [login, mano]);

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
            <Route path="/crearTema" element={<CrearTema />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
