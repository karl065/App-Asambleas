import axios from 'axios';
import { alertSuccess, alertWarning } from '../../../helpers/Alertas';
import { loadingAction } from '../../app/actions/loadingAction';
import { cargarDBAction } from './dbActions/cargarDBAction';
import server from '../../../conexiones/conexiones';
import { adminFiltrosUsuariosAction } from './adminFiltrosUsuariosAction';
import { setLogin } from '../slices/loginSlice';
import { setDBConectada } from '../../shared/slices/conectarDBSlices';
import { setLoading } from '../../app/slices/loadingSlice';

export const adminLoginAction = async (userLogin, dispatch, navigate) => {
	try {
		const { data } = await axios.post(`${server.api.baseURL}auth`, userLogin);

		if (data) {
			localStorage.setItem('token', data.token);
			localStorage.setItem('connect', data.connectedDB);
			dispatch(setLogin(data));
			dispatch(setDBConectada(data.connectedDB));

			adminFiltrosUsuariosAction(
				{ obtenerEnum: true, DBConectada: data.connectedDB },
				dispatch
			);
			cargarDBAction(data.DBs, dispatch);
			data.role === 'View' ? navigate('/view') : navigate('/admin');
			loadingAction(false, dispatch);

			alertSuccess(`Bienvenido ${data.primerNombre}`);
		}
	} catch (error) {
		const { data } = error;
		alertWarning(data);
		loadingAction(false, dispatch);
	}
};
