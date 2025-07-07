import { jwtDecode } from 'jwt-decode';
import { adminLogoutAction } from '../redux/admin/actions/adminLogoutAction';
import { alertInfo } from './Alertas';

export const isTokenExpired = (token, dispatch, navigate, DBConectada) => {
	try {
		const decodedToken = jwtDecode(token);

		const currentTime = Date.now() / 1000; // Convertir a segundos
		const expired = decodedToken.exp < currentTime;

		if (expired) {
			localStorage.removeItem('token');
			localStorage.removeItem('connect');
			alertInfo('Tu sesión ha expirado, por favor inicia sesión nuevamente.');
			if (
				decodedToken.user.role === 'Admin' ||
				decodedToken.user.role === 'SuperAdmin' ||
				decodedToken.user.role === 'View' ||
				decodedToken.user.role === 'Presidente'
			) {
				adminLogoutAction(
					dispatch,
					navigate,
					decodedToken.user._id,
					DBConectada
				);
			}
		}

		return expired;
	} catch (error) {
		// Manejar cualquier error al decodificar el token
		console.error('Error al decodificar el token', error);
		return true; // Tratar como expirado en caso de error
	}
};
