/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react';
import './App.css';
import {useDispatch, useSelector} from 'react-redux';
import {cargarUsuarios} from './redux/actions';
import {Route, Routes} from 'react-router-dom';
import {Login} from './views';

function App() {
  const usuarios = useSelector((state) => state.asambleas.usuarios);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cargarUsuarios());
  }, [dispatch]);

  useEffect(() => {
    if (usuarios) {
      console.log(usuarios);
    }
  }, [usuarios]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
