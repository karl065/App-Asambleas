import { createSlice } from '@reduxjs/toolkit';

const interventoresSlice = createSlice({
	name: 'interventores',
	initialState: {
		interventores: [],
	},
	reducers: {
		cargarInterventores: (state, action) => {
			state.interventores = action.payload;
		},
	},
});

export const { cargarInterventores } = interventoresSlice.actions;
export default interventoresSlice.reducer;
