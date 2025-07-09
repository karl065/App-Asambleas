import axios from 'axios';
import server from '../../../conexiones/conexiones';
import { setErrorUsuarios } from '../../app/slices/errorSlices/errorUsuariosSlice';
import { cargarRoles } from '../slices/rolesSlice';
import { cargarUsuarios } from '../slices/usuariosSlice';

export const adminFiltrosUsuariosAction = async (dataFilter, dispatch) => {
	try {
		const queryString = Object.keys(dataFilter)
			.map(
				(key) =>
					`${encodeURIComponent(key)}=${encodeURIComponent(dataFilter[key])}`
			)
			.join('&');
		const { data } = await axios.get(
			`${server.api.baseURL}users?${queryString}`
		);

		if (dataFilter.obtenerEnum) {
			dispatch(cargarRoles(data));
		} else {
			dispatch(cargarUsuarios(data));
		}
	} catch (error) {
		dispatch(setErrorUsuarios(error.response.data.msg));
		console.error('Error en adminFiltrosUsuariosAction:', error);
	}
};
