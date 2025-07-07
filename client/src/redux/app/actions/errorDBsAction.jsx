import { setErrorDBs } from '../slices/errorSlices/errorDBsSlice';

export const errorDBsActions = async (errorDBs, dispatch) => {
	dispatch(setErrorDBs(errorDBs));
};
