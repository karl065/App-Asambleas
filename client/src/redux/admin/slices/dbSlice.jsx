import { createSlice } from '@reduxjs/toolkit';

const dbSlice = createSlice({
	name: 'DB',
	initialState: {
		DBs: [],
	},
	reducers: {
		cargarDBs: (state, action) => {
			state.DBs = action.payload;
		},
		crearDB: (state, action) => {
			state.DBs = [...state.DBs, action.payload];
		},
	},
});

export const { cargarDBs, crearDB } = dbSlice.actions;
export default dbSlice.reducer;
