import axios from 'axios';
import server from '../../../conexiones/conexiones.jsx';

export const logout = async (dispatch, navigate, idUser, DBConectada) => {
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

		localStorage.removeItem('token');
		localStorage.removeItem('connect');

		dispatch({ type: 'RESET_ALL_STATE' });

		navigate && navigate('/');
	} catch (error) {
		console.log({ error: error });
	}
};
