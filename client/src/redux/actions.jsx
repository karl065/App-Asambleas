/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import {
  cargarDBs,
  cargarPredios,
  cargarUsuariosSuccess,
  crearDB,
  login,
} from './appSlice';
import server from '../conexiones/conexiones';
import io from 'socket.io-client';

let socket;

export const cargarUsuarios = () => async (dispatch) => {
  try {
    const {data} = await axios.get(`${server.api.baseURL}users`);
    dispatch(cargarUsuariosSuccess(data));
  } catch (error) {
    console.error(error);
  }
};

export const loginSuccess = async (userLogin, dispatch, navigate) => {
  try {
    const {data} = await axios.post(`${server.api.baseURL}auth`, userLogin);
    if (data) {
      localStorage.setItem('token', data.token);
      if (
        data.role === 'Propietario' ||
        data.role === 'Propietario-Empoderado' ||
        data.role === 'Empoderado'
      ) {
        navigate('/usuario');
      } else {
        const response = await axios.get(`${server.api.baseURL}DB`, {
          headers: {
            'x-auth-token': data.token,
          },
        });
        dispatch(cargarDBs(response.data));
        navigate('/admin');
      }
      socket = io(server.api.baseURL);
      socket.on('cargarUsuario', (data) => {
        dispatch(cargarUsuariosSuccess(data));
      });
    }
    dispatch(login(data));
  } catch (error) {
    console.log({error: error.message});
  }
};

export const reLogin = async (token, dispatch, navigate) => {
  try {
    if (token) {
      const {data} = await axios.get(`${server.api.baseURL}auth`, {
        headers: {
          'x-auth-token': token,
        },
      });
      if (data) {
        if (
          data.role === 'Propietario' ||
          data.role === 'Propietario-Empoderado' ||
          data.role === 'Empoderado'
        ) {
          navigate('/usuario');
        } else {
          navigate('/admin');
          const response = await axios.get(`${server.api.baseURL}DB`, {
            headers: {
              'x-auth-token': token,
            },
          });
          dispatch(cargarDBs(response.data));
        }
        socket = io(server.api.baseURL);
        socket.on('cargarUsuario', (data) => {
          dispatch(cargarUsuariosSuccess(data));
        });
      }
      dispatch(login(data));
    }
  } catch (error) {
    const {msg} = error.response.data;
    if (msg === 'Token no valido') {
      localStorage.removeItem('token');
      alert('Tu sesión ha expirado');
      navigate('/');
    }
    if (msg === 'No hay token') navigate('/');
  }
};

export const logout = async (dispatch, navigate, idUser) => {
  try {
    if (idUser) {
      await axios.put(`${server.api.baseURL}users/${idUser}`, {
        userStatus: false,
      });
    }
    if (socket) {
      socket.disconnect();
    }
    localStorage.removeItem('token');
    dispatch(login([]));
    dispatch(cargarUsuariosSuccess([]));
    dispatch(cargarDBs([]));
    navigate('/');
  } catch (error) {
    console.log({error: error.message});
  }
};

export const crearDBs = async (token, dispatch, DB) => {
  try {
    const {data} = await axios.post(`${server.api.baseURL}DB`, DB, {
      headers: {
        'x-auth-token': token,
      },
    });

    dispatch(crearDB(data));
  } catch (error) {
    console.log({error: error.message});
  }
};

export const crearUsuariosDBs = async (usuarios, predios, dispatch) => {
  try {
    const response = await axios.post(`${server.api.baseURL}users`, usuarios);
    dispatch(cargarUsuariosSuccess(response.data));
    console.log('Esto es response Carga de usuarios', response);
    const {data} = await axios.post(`${server.api.baseURL}predios`, predios);
    dispatch(cargarPredios(data));
  } catch (error) {
    console.log(error);
  }
};

export const conectarDB = async (DB, dispatch, token) => {
  try {
    const msg = await axios.post(`${server.api.baseURL}DB/conexion`, DB, {
      headers: {
        'x-auth-token': token,
      },
    });
    const response = await axios.get(`${server.api.baseURL}users`);
    dispatch(cargarUsuariosSuccess(response.data));
    const {data} = await axios.get(`${server.api.baseURL}predios`);
    dispatch(cargarPredios(data));
    alert(msg.data.msg);
  } catch (error) {
    console.log(error);
  }
};
