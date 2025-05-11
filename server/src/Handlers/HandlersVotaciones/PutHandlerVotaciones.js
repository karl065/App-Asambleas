import putControllerVotaciones from '../../Controllers/ControllersVotaciones/PutControllerVotaciones.js';
import conectarDB from '../../config/DB.js';

const putHandlerVotaciones = async (req, res) => {
	try {
		const { idUser, idRespuesta, DBConectada } = req.query;

		const dbConnection = await conectarDB(DBConectada);

		const respuesta = await putControllerVotaciones(
			dbConnection,
			idUser,
			idRespuesta
		);

		return res.status(200).json(respuesta);
	} catch (error) {
		return res.status(400).json(error);
	}
};

export default putHandlerVotaciones;
