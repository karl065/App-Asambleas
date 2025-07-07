import axios from 'axios';
import { setLogin } from '../slices/loginSlice';
import { cargarPredios, cargarUsuarios } from '../slices/usuariosSlice';
import server from '../../../conexiones/conexiones';

export const adminLogoutAction = async (
	dispatch,
	navigate,
	idUser,
	DBConectada
) => {
	try {
		if (idUser) {
			const dataUpdate = {
				DBConectada,
				updateUser: {
					userStatus: false,
				},
			};
			await axios.put(`${server.api.baseURL}users/${idUser}`, dataUpdate);
		}
		dispatch(setLogin([]));
		dispatch(cargarUsuarios([]));
		dispatch(cargarPredios([]));
	} catch (error) {
		console.log(error);
	}
};
