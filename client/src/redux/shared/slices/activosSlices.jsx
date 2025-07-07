import { createSlice } from '@reduxjs/toolkit';

const activosSlice = createSlice({
	name: 'activos',
	initialState: {
		activos: 0,
	},
	reducers: {
		setActivos: (state, action) => {
			state.activos = action.payload;
		},
	},
});

export const { setActivos } = activosSlice.actions;
export default activosSlice.reducer;
