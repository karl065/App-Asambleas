/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import {cargarUsuariosSuccess, login} from './appSlice';
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
