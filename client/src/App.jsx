/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import {Route, Routes, useNavigate} from 'react-router-dom';
import {
  CrearConjunto,
  CrearUsuarios,
  GestionarConjunto,
  IngresoAdmin,
  IngresoCliente,
  Login,
} from './views';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {logout, reLogin} from './redux/actions';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (!token) logout(dispatch, navigate);
    reLogin(token, dispatch, navigate);
  }, []);
  return (
    <div className="w-screen h-screen">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<IngresoAdmin />} />
        <Route path="/CrearConjunto" element={<CrearConjunto />} />
        <Route path="/GestionarConjunto" element={<GestionarConjunto />} />
        <Route path="/CrearUsuario" element={<CrearUsuarios />} />
        <Route path="/usuario" element={<IngresoCliente />} />
      </Routes>
    </div>
  );
}

export default App;
