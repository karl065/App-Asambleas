/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import {cargarDBs, cargarUsuariosSuccess, crearDB, login} from './appSlice';
import server from '../conexiones/conexiones';
import io from 'socket.io-client';

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
      const socket = io(server.api.baseURL);
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
          const response = await axios.get(`${server.api.baseURL}DB`, {
            headers: {
              'x-auth-token': token,
            },
          });
          dispatch(cargarDBs(response.data));
          navigate('/admin');
        }
        const socket = io(server.api.baseURL);
        socket.on('cargarUsuario', (data) => {
          dispatch(cargarUsuariosSuccess(data));
        });
      }
      dispatch(login(data));
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const crearDBs = async (token, dispatch, navigate, DB) => {
  try {
    const {data} = await axios.post(`${server.api.baseURL}DB`, DB, {
      headers: {
        'x-auth-token': token,
      },
    });

    dispatch(crearDB(data));
    navigate('/admin');
  } catch (error) {
    console.log({error: error.message});
  }
};
