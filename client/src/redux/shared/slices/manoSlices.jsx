import { createSlice } from '@reduxjs/toolkit';

const manoSlice = createSlice({
	name: 'mano',
	initialState: {
		mano: [],
	},
	reducers: {
		cargarMano: (state, action) => {
			state.mano = action.payload;
		},
	},
});
export const { cargarMano } = manoSlice.actions;
export default manoSlice.reducer;
