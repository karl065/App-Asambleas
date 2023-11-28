import {createSlice} from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'asambleas',
  initialState: {
    usuarios: [],
    login: [],
    preguntas: [],
    repuestas: [],
  },
  reducers: {
    cargarUsuariosSuccess: (state, action) => {
      state.usuarios = action.payload;
    },
    login: (state, action) => {
      state.login = action.payload;
    },
  },
});

export const {cargarUsuariosSuccess, login} = appSlice.actions;
export default appSlice.reducer;
