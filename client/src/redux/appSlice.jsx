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
      const newDBs = action.payload.filter((newDB) => {
        // Verificar si ya existe una DB con el mismo nombre
        return !state.DBS.some(
          (existingDB) => existingDB.nombre === newDB.nombre
        );
      });
      state.DBS = [...state.DBS, ...newDBs];
    },
  },
});

export const {cargarUsuariosSuccess, login, cargarDBs} = appSlice.actions;
export default appSlice.reducer;
