import axios from 'axios';
import server from '../../../conexiones/conexiones';
import { setDBConectada } from '../slices/conectarDBSlices';
import { errorDBsActions } from '../../app/actions/errorDBsAction';

export const conectarDBAction = async (DB, dispatch, token) => {
	try {
		const { data } = await axios.post(`${server.api.baseURL}DB/conexion`, DB, {
			headers: {
				'x-auth-token': token,
			},
		});

		if (data) {
			dispatch(setDBConectada(DB.nombre));
			return data;
		}
	} catch (error) {
		errorDBsActions(error, dispatch);
		console.error('Error al conectar a la base de datos:', error);
	}
};
