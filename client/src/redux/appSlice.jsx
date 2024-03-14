import {createSlice} from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'asambleas',
  initialState: {
    usuarios: [],
    predios: [],
    login: [],
    preguntas: [],
    repuestas: [],
    DBS: [],
    roles: [],
    DBConectada: [],
    loading: false,
    usuariosActivos: 0,
    time: 0,
    mano: [],
    interventores: [],
    debate: '',
    temas: [],
    maxInterventores: 0,
    temaActual: '',
  },
  reducers: {
    cargarUsuariosSuccess: (state, action) => {
      state.usuarios = action.payload;
    },
    setLogin: (state, action) => {
      state.login = action.payload;
    },
    cargarDBs: (state, action) => {
      state.DBS = action.payload;
    },
    crearDB: (state, action) => {
      state.DBS = [...state.DBS, action.payload];
    },
    cargarPredios: (state, action) => {
      state.predios = action.payload;
    },
    actualizarUsuario: (state, action) => {
      const {_id, data} = action.payload;

      const index = state.usuarios.findIndex((usuario) => usuario._id === _id);

      if (index !== -1) {
        state.usuarios[index] = {
          ...state.usuarios[index],
          ...data,
        };
      }
    },
    cargarRoles: (state, action) => {
      state.roles = action.payload;
    },
    cargarPreguntas: (state, action) => {
      state.preguntas = action.payload;
    },
    actualizarPregunta: (state, action) => {
      const {idPregunta, data} = action.payload;

      const index = state.preguntas.findIndex(
        (pregunta) => pregunta._id === idPregunta
      );

      if (index !== -1) {
        state.preguntas[index] = {
          ...state.preguntas[index],
          ...data,
        };
      }
    },
    connectedDB: (state, action) => {
      state.DBConectada = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setActivos: (state, action) => {
      state.usuariosActivos = action.payload;
    },
    setTime: (state, action) => {
      state.time = action.payload;
    },
    cargarMano: (state, action) => {
      state.mano = action.payload;
    },
    setInterventores: (state, action) => {
      state.interventores = action.payload;
    },
    setDebate: (state, action) => {
      state.debate = action.payload;
    },
    setTemas: (state, action) => {
      state.temas = action.payload;
    },
    setMaxInterventores: (state, action) => {
      state.maxInterventores = action.payload;
    },
    setTemaActual: (state, action) => {
      state.temaActual = action.payload;
    },
  },
});

export const {
  cargarUsuariosSuccess,
  setLogin,
  cargarDBs,
  setTemaActual,
  crearDB,
  cargarPredios,
  actualizarUsuario,
  cargarRoles,
  cargarPreguntas,
  actualizarPregunta,
  connectedDB,
  setLoading,
  setActivos,
  setTime,
  cargarMano,
  setInterventores,
  setDebate,
  setTemas,
  setMaxInterventores,
} = appSlice.actions;
export default appSlice.reducer;
