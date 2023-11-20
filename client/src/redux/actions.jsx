import axios from 'axios';
import {cargarUsuariosSuccess} from './appSlice';
import server from '../conexiones/conexiones';

export const cargarUsuarios = () => async (dispatch) => {
  try {
    const {data} = await axios.get(`${server.api.baseURL}users`);
    dispatch(cargarUsuariosSuccess(data));
  } catch (error) {
    console.error(error);
  }
};
