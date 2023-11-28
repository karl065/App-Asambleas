/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import {Route, Routes} from 'react-router-dom';
import {IngresoAdmin, IngresoCliente, Login} from './views';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<IngresoAdmin />} />
        <Route path="/usuario" element={<IngresoCliente />} />
      </Routes>
    </div>
  );
}

export default App;
