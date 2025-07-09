import axios from 'axios';
import { cargarUsuarios } from '../../slices/usuariosSlice.jsx';
import server from '../../../../conexiones/conexiones.jsx';

export const cargarUsuariosAction = async (dispatch, DBConectada) => {
	try {
		const queryString = new URLSearchParams(DBConectada).toString();
		const { data } = await axios.get(
			`${server.api.baseURL}users?${queryString}`
		);
		if (data) {
			dispatch(cargarUsuarios(data));
		}
	} catch (error) {
		console.log('Error al cargar usuarios:', error);
	}
};
