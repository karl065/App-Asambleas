import axios from 'axios';
import { alertInfo, alertSuccess } from '../../../helpers/Alertas';
import { isTokenExpired } from '../../../helpers/Verificacion';
import { conectarDBAction } from '../../shared/actions/conectarDBAction';
import { setLogin } from '../slices/loginSlice';
import { cargarDBAction } from './dbActions/cargarDBAction';
import server from '../../../conexiones/conexiones';
import { cargarUsuariosAction } from './usuariosActions/cargarUsuariosAction';
import { adminFiltrosUsuariosAction } from './adminFiltrosUsuariosAction';
import { cargarPrediosAction } from './usuariosActions/cargarPrediosAction';
import { setDBConectada } from '../../shared/slices/conectarDBSlices';

export const adminReloginAction = async (
	token,
	DBconectada,
	dispatch,
	navigate
) => {
	try {
		if (token) {
			const expirado = isTokenExpired(token, dispatch, navigate, DBconectada);
			if (!expirado) {
				const { data } = await axios.get(`${server.api.baseURL}auth`, {
					headers: {
						'x-auth-token': token,
					},
				});

				if (data) {
					dispatch(setLogin(data));
					dispatch(setDBConectada(DBconectada));
					cargarDBAction(data.DBs, dispatch);
					cargarUsuariosAction(dispatch, { DBConectada: DBconectada });
					cargarPrediosAction(dispatch, {
						DBConectada: DBconectada,
					});
					adminFiltrosUsuariosAction(
						{ obtenerEnum: true, DBConectada: data.connectedDB },
						dispatch
					);
				}
				if (data.role === 'View') {
					navigate('/view');
				} else {
					navigate('/admin');
				}
				alertSuccess(`Bienvenido de nuevo ${data.primerNombre}`);
			}
		}
	} catch (error) {
		console.log(error);
		const { msg } = error.response.data;
		if (msg === 'Token no valido') {
			localStorage.removeItem('token');
			alertInfo('Tu sesión ha expirado, por favor inicia sesión nuevamente.');
			navigate('/');
		} else if (msg === 'No hay token') navigate('/');
	}
};
