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
  },
  reducers: {
    cargarUsuariosSuccess: (state, action) => {
      state.usuarios = action.payload;
    },
    login: (state, action) => {
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
  },
});

export const {
  cargarUsuariosSuccess,
  login,
  cargarDBs,
  crearDB,
  cargarPredios,
  actualizarUsuario,
  cargarRoles,
  cargarPreguntas,
  actualizarPregunta,
} = appSlice.actions;
export default appSlice.reducer;
