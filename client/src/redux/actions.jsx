/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import {
  actualizarPregunta,
  actualizarUsuario,
  cargarDBs,
  cargarPredios,
  cargarPreguntas,
  cargarRoles,
  cargarUsuariosSuccess,
  crearDB,
  login,
} from './appSlice';
import server from '../conexiones/conexiones';
import io from 'socket.io-client';
import {alertInfo, alertSuccess} from '../helpers/Alertas';

let socket;

export const cargarUsuarios = async (dispatch) => {
  try {
    const {data} = await axios.get(`${server.api.baseURL}users`);
    dispatch(cargarUsuariosSuccess(data));
  } catch (error) {
    console.error(error);
  }
};

export const filtroUsuarios = async (dataFilter, dispatch) => {
  try {
    const queryString = Object.keys(dataFilter)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(dataFilter[key])}`
      )
      .join('&');
    const {data} = await axios.get(`${server.api.baseURL}users?${queryString}`);
    if (dataFilter.obtenerEnum) dispatch(cargarRoles(data));
  } catch (error) {
    console.log(error);
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
      filtroUsuarios({obtenerEnum: true}, dispatch);
    }
  } catch (error) {
    const {msg} = error.response.data;
    if (msg === 'Token no valido') {
      localStorage.removeItem('token');
      alertInfo('Tu sesión ha expirado');
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
    alertSuccess('Conjunto Creado correctamente');
  } catch (error) {
    console.log({error: error.message});
  }
};

export const crearUsuariosDBs = async (usuarios, predios, dispatch) => {
  try {
    if (usuarios) {
      const {data} = await axios.post(`${server.api.baseURL}users`, usuarios);

      dispatch(cargarUsuariosSuccess(data));
    }
    if (predios) {
      const {data} = await axios.post(`${server.api.baseURL}predios`, predios);
      dispatch(cargarPredios(data));
    }
    alertSuccess('Conjunto cargado correctamente');
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
    getPreguntas(dispatch);
    dispatch(cargarUsuariosSuccess(response.data));
    const {data} = await axios.get(`${server.api.baseURL}predios`);
    dispatch(cargarPredios(data));
    return msg.data.msg;
  } catch (error) {
    console.log(error);
  }
};

export const actualizarUsuarios = async (idUser, dataUpdate, dispatch) => {
  try {
    const {data} = await axios.put(
      `${server.api.baseURL}users/${idUser}`,
      dataUpdate
    );

    dispatch(actualizarUsuario({_id: idUser, data}));
  } catch (error) {
    console.log(error);
  }
};

export const crearPreguntas = async (pregunta, dispatch, idPregunta) => {
  try {
    if (idPregunta) {
      const promises = pregunta.map(async (respuesta) => {
        respuesta.idPregunta = idPregunta;
        await axios.post(`${server.api.baseURL}respuestas`, respuesta);
      });

      await Promise.all(promises);

      const response = await axios.get(`${server.api.baseURL}preguntas`);

      dispatch(cargarPreguntas(response.data));
    } else {
      const {respuestas} = pregunta;
      const {data} = await axios.post(`${server.api.baseURL}preguntas`, {
        pregunta: pregunta.pregunta,
      });
      const promises = respuestas.map(async (respuesta) => {
        respuesta.idPregunta = data._id;
        await axios.post(`${server.api.baseURL}respuestas`, respuesta);
      });

      await Promise.all(promises);

      const response = await axios.get(`${server.api.baseURL}preguntas`);

      dispatch(cargarPreguntas(response.data));
    }
  } catch (error) {
    console.log(error);
  }
};

export const getPreguntas = async (dispatch) => {
  try {
    const {data} = await axios.get(`${server.api.baseURL}preguntas`);
    dispatch(cargarPreguntas(data));
  } catch (error) {
    console.log(error);
  }
};

export const actualizarPreguntas = async (idPregunta, dataUpdate, dispatch) => {
  try {
    const {data} = await axios.put(
      `${server.api.baseURL}preguntas/${idPregunta}`,
      dataUpdate
    );
    dispatch(actualizarPregunta({idPregunta: idPregunta, data}));
    alertSuccess('Pregunta Actualizada con exito');
  } catch (error) {
    console.log({error: error.message});
  }
};

export const actualizarRespuestas = async (
  idRespuesta,
  dataUpdate,
  dispatch
) => {
  try {
    const response = await axios.put(
      `${server.api.baseURL}respuestas/${idRespuesta}`,
      dataUpdate
    );
    const {data} = await axios.get(
      `${server.api.baseURL}preguntas?id=${response.data.idPregunta}`
    );
    dispatch(actualizarPregunta({idPregunta: data._id, data}));
  } catch (error) {
    console.log({error: error.message});
  }
};
