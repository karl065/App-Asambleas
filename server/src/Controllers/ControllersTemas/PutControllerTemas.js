const putControllerTemas = async (dbConnection, tema, idTema) => {
	try {
		const Temas = dbConnection.model('Temas');
		const Usuarios = dbConnection.model('Usuarios');

		let temaActualizado;

		if (tema.usuario) {
			temaActualizado = await Temas.findByIdAndUpdate(
				idTema,
				{ $addToSet: { usuarios: tema.usuario } },
				{ new: true }
			);

			await Usuarios.findByIdAndUpdate(
				tema.usuario,
				{ $addToSet: { temas: idTema } },
				{ new: true }
			);
			return temaActualizado;
		}
		temaActualizado = await Temas.findByIdAndUpdate(idTema, tema);
		return temaActualizado;
	} catch (error) {
		return error;
	}
};

export default putControllerTemas;
