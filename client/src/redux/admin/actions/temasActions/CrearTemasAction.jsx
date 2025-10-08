import axios from 'axios';
import server from '../../../../conexiones/conexiones.jsx';

export const crearTemasAction = async (tema, DBConectada) => {
	try {
		await axios.post(`${server.api.baseURL}temas`, {
			DBConectada,
			temas: tema,
		});
	} catch (error) {
		console.log(error);
	}
};
