import {createSlice} from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'asambleas',
  initialState: {
    usuarios: [],
    login: [],
    preguntas: [],
    repuestas: [],
    DBS: [],
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
  },
});

export const {cargarUsuariosSuccess, login, cargarDBs, crearDB} =
  appSlice.actions;
export default appSlice.reducer;
