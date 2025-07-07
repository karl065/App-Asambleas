import { createSlice } from '@reduxjs/toolkit';

const conectarDBSlice = createSlice({
	name: 'conectarDB',
	initialState: {
		DBConectada: '',
	},
	reducers: {
		setDBConectada: (state, action) => {
			state.DBConectada = action.payload;
		},
	},
});

export const { setDBConectada } = conectarDBSlice.actions;
export default conectarDBSlice.reducer;
