import axios from 'axios';
import { alertWarning } from '../../../helpers/Alertas';
import { loadingAction } from '../../app/actions/loadingAction';
import { cargarDBAction } from './dbActions/cargarDBAction';

export const adminLoginAction = async (userLogin, dispatch, navigate) => {
	try {
		const { data } = await axios.post(`${server.api.baseURL}auth`, userLogin);

		if (data) {
			localStorage.setItem('token', data.token);
			localStorage.setItem('connect', data.connectedDB);
			cargarDBAction(data.DBs, dispatch);
			data.role === 'View' ? navigate('/view') : navigate('/admin');
		}
	} catch (error) {
		const { data } = error.response;
		alertWarning(data);
		loadingAction(false, dispatch);
	}
};
