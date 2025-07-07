import { createSlice } from '@reduxjs/toolkit';

const errorDBsSlice = createSlice({
	name: 'errorDBs',
	initialState: {
		errorDBs: [],
	},
	reducers: {
		setErrorDBs: (state, action) => {
			state.errorDBs = action.payload;
		},
	},
});

export const { setErrorDBs } = errorDBsSlice.actions;
export default errorDBsSlice.reducer;
