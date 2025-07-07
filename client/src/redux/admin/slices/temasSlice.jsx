import { createSlice } from '@reduxjs/toolkit';

const temasSlice = createSlice({
	name: 'temas',
	initialState: {
		temas: [],
		temaActual: '',
	},
	reducers: {
		cargarTemas: (state, action) => {
			state.temas = action.payload;
		},
		setTemaActual: (state, action) => {
			state.temaActual = action.payload;
		},
		agregarTema: (state, action) => {
			state.temas.push(action.payload);
		},
		actualizarTema: (state, action) => {
			const { idTema, data } = action.payload;
			const index = state.temas.findIndex((tema) => tema._id === idTema);
			if (index !== -1) {
				state.temas[index] = { ...state.temas[index], ...data };
			}
		},
	},
});

export const { cargarTemas, setTemaActual, agregarTema, actualizarTema } =
	temasSlice.actions;
export default temasSlice.reducer;
