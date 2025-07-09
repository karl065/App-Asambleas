import axios from 'axios';
import server from '../../../../conexiones/conexiones.jsx';
import { actualizarUsuario } from '../../slices/usuariosSlice.jsx';

export const actualizarUsuariosAction = async (
	idUser,
	dataUpdate,
	dispatch
) => {
	try {
		const { data } = await axios.put(
			`${server.api.baseURL}users/${idUser}`,
			dataUpdate
		);

		dispatch(actualizarUsuario({ _id: idUser, data: dataUpdate.updateUser }));
	} catch (error) {
		console.log(error);
	}
};
