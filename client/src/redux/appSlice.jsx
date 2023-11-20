import {createSlice} from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'asambleas',
  initialState: {
    usuarios: [],
    preguntas: [],
    repuestas: [],
  },
  reducers: {
    cargarUsuariosSuccess: (state, action) => {
      state.usuarios = action.payload;
    },
  },
});

export const {cargarUsuariosSuccess} = appSlice.actions;
export default appSlice.reducer;
