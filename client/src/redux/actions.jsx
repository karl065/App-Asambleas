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
  login,
  setLoading,
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

        dispatch(cargarDBs(response.data));
        navigate('/admin');
      }

      await new Promise((resolve) => {
        socket.emit('login', (usuariosActualizados) => {
          dispatch(cargarUsuariosSuccess(usuariosActualizados));
          resolve();
        });
      });
    }
    dispatch(setLoading(false));
    dispatch(connectedDB(data.connectedDB));
    dispatch(login(data));
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
            navigate('/admin');
            localStorage.setItem('connect', data.connectedDB);
            dispatch(connectedDB(data.connectedDB));
            const response = await axios.get(`${server.api.baseURL}DB`, {
              headers: {
                'x-auth-token': token,
              },
            });
            dispatch(cargarDBs(response.data));

            alertSuccess(`Bienvenido de nuevo ${data.primerNombre}`);
          }

          socket.emit('login', (usuariosActualizados) => {
            dispatch(cargarUsuariosSuccess(usuariosActualizados));
          });
        }

        dispatch(connectedDB(data.connectedDB));
        dispatch(login(data));
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

export const logout = async (dispatch, navigate, idUser) => {
  try {
    if (idUser) {
      await axios.put(`${server.api.baseURL}users/${idUser}`, {
        userStatus: false,
      });
      socket.emit('logoutUsuario', (usuariosActualizados) => {
        // Manejar la respuesta del servidor y actualizar el estado
        dispatch(cargarUsuariosSuccess(usuariosActualizados));
      });
      localStorage.removeItem('token');
      localStorage.removeItem('connect');
      dispatch(login([]));
      dispatch(cargarUsuariosSuccess([]));
      dispatch(cargarDBs([]));
      navigate && navigate('/');
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('connect');
      dispatch(login([]));
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
    await axios.put(`${server.api.baseURL}users/${idUser}`, dataUpdate);
    socket.emit('login', (usuariosActualizados) => {
      dispatch(cargarUsuariosSuccess(usuariosActualizados));
    });
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
    }
    socket.emit('crearPreguntas', (preguntas) => {
      dispatch(cargarPreguntas(preguntas));
    });
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
    await axios.put(`${server.api.baseURL}preguntas/${idPregunta}`, dataUpdate);
    socket.emit('actualizarPreguntas', (preguntas) => {
      dispatch(cargarPreguntas(preguntas));
    });
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
    await axios.put(
      `${server.api.baseURL}respuestas/${idRespuesta}`,
      dataUpdate
    );
    socket.emit('actualizarPreguntas', (preguntas) => {
      dispatch(cargarPreguntas(preguntas));
    });
  } catch (error) {
    console.log({error: error.message});
  }
};

export const eliminarRespuestas = async (dispatch, idRespuesta) => {
  try {
    await axios.delete(`${server.api.baseURL}respuestas/${idRespuesta}`);

    socket.emit('crearPreguntas', (preguntas) => {
      dispatch(cargarPreguntas(preguntas));
    });
  } catch (error) {
    console.log(error);
  }
};
export const eliminarPreguntas = async (dispatch, idPregunta) => {
  try {
    await axios.delete(`${server.api.baseURL}preguntas/${idPregunta}`);

    socket.emit('crearPreguntas', (preguntas) => {
      dispatch(cargarPreguntas(preguntas));
    });
  } catch (error) {
    console.log(error);
  }
};

export const votar = async (dispatch, idUser, idRespuesta) => {
  try {
    const {data} = await axios.put(
      `${server.api.baseURL}votaciones?idUser=${idUser}&idRespuesta=${idRespuesta}`
    );
    alertSuccess(data.message);
    socket.emit('actualizarPreguntas', (preguntas) => {
      dispatch(cargarPreguntas(preguntas));
    });
  } catch (error) {
    const {data} = error.response;
    alertWarning(data);
  }
};
