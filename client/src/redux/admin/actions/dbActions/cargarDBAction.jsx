import { cargarDBs } from '../../slices/dbSlice';

export const cargarDBAction = (dbs, dispatch) => {
	dispatch(cargarDBs(dbs));
};
