import axios from 'axios';
import server from '../../../../conexiones/conexiones.jsx';
import { crearDB } from '../../slices/dbSlice.jsx';
import { alertSuccess } from '../../../../helpers/Alertas.jsx';
import { setDBConectada } from '../../../shared/slices/conectarDBSlices.jsx';

export const crearDBsAction = async (token, dispatch, DB) => {
	try {
		const { data } = await axios.post(`${server.api.baseURL}DB`, DB, {
			headers: {
				'x-auth-token': token,
			},
		});

		dispatch(crearDB(data));
		alertSuccess('Conjunto Creado correctamente');
		dispatch(setDBConectada(DB.nombre));
	} catch (error) {
		console.log({ error: error.message });
	}
};
