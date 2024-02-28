/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import {
  cargarDBs,
  cargarPredios,
  cargarPreguntas,
  cargarRoles,
  cargarUsuariosSuccess,
  connectedDB,
  crearDB,
  setLoading,
  setLogin,
} from './appSlice';
import server from '../conexiones/conexiones';
import {alertInfo, alertSuccess, alertWarning} from '../helpers/Alertas';
import {isTokenExpired} from '../helpers/Verificacion';
import {socket} from '../helpers/Socket';

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
      localStorage.setItem('connect', data.connectedDB);
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
        if (data.role === 'View') {
          dispatch(cargarDBs(response.data));
          navigate('/view');
        } else {
          dispatch(cargarDBs(response.data));
          navigate('/admin');
        }
      }
      if (userLogin.documento !== 'View') {
        socket.emit('joinRoom', data.connectedDB);
        socket.emit('login', data.connectedDB);
        socket.on('login', (data) => {
          dispatch(cargarUsuariosSuccess(data));
        });
      }
    }

    dispatch(setLoading(false));
    dispatch(connectedDB(data.connectedDB));
    dispatch(setLogin(data));
  } catch (error) {
    const {data} = error.response;
    alertWarning(data);
    dispatch(setLoading(false));
  }
};

export const reLogin = async (token, dispatch, navigate) => {
  try {
    if (token) {
      const expirado = isTokenExpired(token);

      if (expirado.expired || expirado === true) {
        alertInfo('Sesion expirada');
        const {user} = expirado;
        user ? logout(dispatch, navigate, user.id) : logout(dispatch, navigate);
      } else {
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
            localStorage.setItem('connect', data.connectedDB);
            dispatch(connectedDB(data.connectedDB));
            const response = await axios.get(`${server.api.baseURL}DB`, {
              headers: {
                'x-auth-token': token,
              },
            });
            dispatch(cargarDBs(response.data));
            if (data.role === 'View') {
              navigate('/view');
            } else {
              navigate('/admin');
            }

            alertSuccess(`Bienvenido de nuevo ${data.primerNombre}`);
          }
          if (data.documento !== 'View') {
            socket.emit('joinRoom', data.connectedDB);
            socket.emit('login', data.connectedDB);
          }
        }

        dispatch(connectedDB(data.connectedDB));
        dispatch(setLogin(data));
        filtroUsuarios({obtenerEnum: true}, dispatch);
      }
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

export const logout = async (dispatch, navigate, idUser, DBConectada) => {
  try {
    if (idUser) {
      const dataUpdate = {
        DBConectada,
        updateUser: {
          userStatus: false,
        },
      };
      await axios.put(`${server.api.baseURL}users/${idUser}`, dataUpdate);
      socket.emit('logoutUsuario', DBConectada);
      localStorage.removeItem('token');
      localStorage.removeItem('connect');
      dispatch(setLogin([]));
      dispatch(cargarUsuariosSuccess([]));
      dispatch(cargarDBs([]));
      navigate && navigate('/');
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('connect');
      dispatch(setLogin([]));
      dispatch(cargarUsuariosSuccess([]));
      dispatch(cargarDBs([]));
      navigate && navigate('/');
    }
  } catch (error) {
    console.log({error: error});
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
    dispatch(connectedDB(DB.nombre));
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

    socket.emit('joinRoom', DB.nombre);
    const response = await axios.get(
      `${server.api.baseURL}users?DBConectada=${DB.nombre}`
    );
    getPreguntas(DB.nombre, dispatch);

    dispatch(cargarUsuariosSuccess(response.data));
    const {data} = await axios.get(
      `${server.api.baseURL}predios?DBConectada=${DB.nombre}`
    );
    dispatch(cargarPredios(data));
    return msg.data.msg;
  } catch (error) {
    console.log(error);
  }
};

export const actualizarUsuarios = async (idUser, dataUpdate) => {
  try {
    await axios.put(`${server.api.baseURL}users/${idUser}`, dataUpdate);
    socket.emit('logoutUsuario', dataUpdate.DBConectada);
  } catch (error) {
    console.log(error);
  }
};

export const crearPreguntas = async (
  preguntas,
  dispatch,
  idPregunta,
  DBConectada
) => {
  try {
    const {respuestas, pregunta} = preguntas;
    if (idPregunta) {
      const RespuestasIdPreguntas = preguntas.map((respuesta) => {
        respuesta.idPregunta = idPregunta;
        return respuesta;
      });

      const postRespuestas = {
        DBConectada,
        respuestas: RespuestasIdPreguntas,
      };

      await axios.post(`${server.api.baseURL}respuestas`, postRespuestas);
    } else {
      const dataPreguntas = {
        DBConectada,
        pregunta: {pregunta: pregunta},
      };
      const {data} = await axios.post(
        `${server.api.baseURL}preguntas`,
        dataPreguntas
      );
      const RespuestasIdPreguntas = respuestas.map((respuesta) => {
        respuesta.idPregunta = data._id;
        return respuesta;
      });
      const postRespuestas = {
        DBConectada,
        respuestas: RespuestasIdPreguntas,
      };

      await axios.post(`${server.api.baseURL}respuestas`, postRespuestas);
    }
    socket.emit('crearPreguntas', DBConectada);
  } catch (error) {
    console.log(error);
  }
};

export const getPreguntas = async (DB, dispatch) => {
  try {
    const {data} = await axios.get(
      `${server.api.baseURL}preguntas?DBConectada=${DB}`
    );
    dispatch(cargarPreguntas(data));
  } catch (error) {
    console.log(error);
  }
};

export const actualizarPreguntas = async (
  idPregunta,
  dataUpdate,
  dispatch,
  DBConectada
) => {
  try {
    const dataPregunta = {
      DBConectada,
      updatePregunta: dataUpdate,
    };
    await axios.put(
      `${server.api.baseURL}preguntas/${idPregunta}`,
      dataPregunta
    );
    socket.emit('crearPreguntas', DBConectada);
    socket.on('crearPreguntas', (data) => {
      dispatch(cargarPreguntas(data));
    });
  } catch (error) {
    console.log({error: error.message});
  }
};

export const actualizarRespuestas = async (
  idRespuesta,
  dataUpdate,
  dispatch,
  DBConectada
) => {
  try {
    const dataRespuestas = {
      DBConectada,
      updateRespuestas: dataUpdate,
    };
    await axios.put(
      `${server.api.baseURL}respuestas/${idRespuesta}`,
      dataRespuestas
    );
    socket.emit('crearPreguntas', DBConectada);
    socket.on('crearPreguntas', (data) => {
      dispatch(cargarPreguntas(data));
    });
  } catch (error) {
    console.log({error: error.message});
  }
};

export const eliminarRespuestas = async (
  dispatch,
  idRespuesta,
  DBConectada
) => {
  try {
    await axios.delete(
      `${server.api.baseURL}respuestas/${idRespuesta}?DBConectada=${DBConectada}`
    );

    socket.emit('crearPreguntas', DBConectada);
  } catch (error) {
    console.log(error);
  }
};
export const eliminarPreguntas = async (dispatch, idPregunta, DBConectada) => {
  try {
    await axios.delete(
      `${server.api.baseURL}preguntas/${idPregunta}?DBConectada=${DBConectada}`
    );

    socket.emit('crearPreguntas', DBConectada);
  } catch (error) {
    console.log(error);
  }
};

export const votar = async (dispatch, idUser, idRespuesta, DBConectada) => {
  try {
    const {data} = await axios.put(
      `${server.api.baseURL}votaciones?idUser=${idUser}&idRespuesta=${idRespuesta}&DBConectada=${DBConectada}`
    );
    alertSuccess(data.message);
    socket.emit('crearPreguntas', DBConectada);
  } catch (error) {
    const {data} = error.response;
    alertWarning(data);
  }
};

export const setTimer = async (time, DBConectada) => {
  try {
    socket.emit('timer', {time, DBConectada});
  } catch (error) {
    console.log(error);
  }
};

export const cargarManos = async (data, DBConectada) => {
  try {
    socket.emit('mano', {data, DBConectada});
  } catch (error) {
    console.log(error);
  }
};

export const setManos = async (data, DBConectada) => {
  try {
    socket.emit('setearMano', {data, DBConectada});
  } catch (error) {
    console.log(error);
  }
};
export const setInterventoresAction = async (data, DBConectada) => {
  try {
    socket.emit('setearInterventores', {data, DBConectada});
  } catch (error) {
    console.log(error);
  }
};
