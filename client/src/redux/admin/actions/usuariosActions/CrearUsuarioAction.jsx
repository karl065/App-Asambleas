import axios from 'axios';
import server from '../../../../conexiones/conexiones.jsx';
import {
	agregarUsuario,
	cargarPredios,
	cargarUsuarios,
} from '../../slices/usuariosSlice.jsx';
import { alertSuccess } from '../../../../helpers/Alertas.jsx';

export const crearUsuariosDBsAction = async (usuarios, predios, dispatch) => {
	try {
		if (usuarios) {
			const { data } = await axios.post(`${server.api.baseURL}users`, usuarios);

			Array.isArray(usuarios)
				? dispatch(cargarUsuarios(data))
				: dispatch(agregarUsuario(data));
		}
		if (predios) {
			const { data } = await axios.post(
				`${server.api.baseURL}predios`,
				predios
			);
			dispatch(cargarPredios(data));
		}
		if (predios && usuarios) {
			alertSuccess('Conjunto cargado correctamente');
		} else if (usuarios && !predios) {
			alertSuccess('Usuario creado correctamente');
		}
	} catch (error) {
		console.log(error);
	}
};
