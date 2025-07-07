import { createSlice } from '@reduxjs/toolkit';

const preguntasSlices = createSlice({
	name: 'preguntas',
	initialState: {
		preguntas: [],
	},
	reducers: {
		cargarPreguntas: (state, action) => {
			state.preguntas = action.payload;
		},
	},
});

export const { cargarPreguntas } = preguntasSlices.actions;
export default preguntasSlices.reducer;
