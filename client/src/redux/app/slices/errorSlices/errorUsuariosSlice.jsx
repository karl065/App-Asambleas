import { createSlice } from '@reduxjs/toolkit';

const errorUsuariosSlice = createSlice({
	name: 'errorUsuarios',
	initialState: {
		errorUsuarios: [],
	},
	reducers: {
		setErrorUsuarios: (state, action) => {
			state.errorUsuarios = action.payload;
		},
		clearErrorUsuarios: (state) => {
			state.errorUsuarios = [];
		},
	},
});

export const { setErrorUsuarios, clearErrorUsuarios } =
	errorUsuariosSlice.actions;
export default errorUsuariosSlice.reducer;
