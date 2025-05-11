const deleteControllerUsuarios = async (dbConnection, idUser) => {
	try {
		const Usuarios = dbConnection.model('Usuarios');

		const usuario = await Usuarios.findById(idUser);
		await Usuarios.findByIdAndDelete(idUser);
		return usuario;
	} catch (error) {
		return error;
	}
};

export default deleteControllerUsuarios;
