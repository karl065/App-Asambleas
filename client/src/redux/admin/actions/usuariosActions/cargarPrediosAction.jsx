import axios from 'axios';
import server from '../../../../conexiones/conexiones';
import { cargarPredios } from '../../slices/usuariosSlice';

export const cargarPrediosAction = async (dispatch, DBConectada) => {
	try {
		const queryString = new URLSearchParams(DBConectada).toString();

		const { data } = await axios.get(
			`${server.api.baseURL}predios?${queryString}`
		);

		if (data) {
			dispatch(cargarPredios(data));
		}
	} catch (error) {
		console.error('Error al cargar usuarios:', error);
	}
};
