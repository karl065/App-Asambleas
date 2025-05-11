import bcryptjs from 'bcryptjs';

const putControllerUser = async (dbConnection, updateUser, idUser) => {
	try {
		const Usuarios = dbConnection.model('Usuarios');

		const { autorizado } = updateUser;

		// Verifica si se proporcionó un idEmpoderado
		if (autorizado) {
			// Cambia el rol del usuario B a 'Propietario-Empoderado'
			const usuario = await Usuarios.findById(autorizado);
			if (usuario.role === 'Propietario') {
				await Usuarios.updateOne(
					{ _id: autorizado },
					{ role: 'Propietario-Empoderado' }
				);
			}

			// Asocia el usuario B con el usuario A (autorizador) sin borrar los anteriores
			const usuarioAutorizador = await Usuarios.findById(idUser);
			const usuarioAutorizado = await Usuarios.findById(autorizado);

			// Agrega el usuario autorizador a la lista de autorizadores del usuario autorizado
			usuarioAutorizado.autorizador.push(usuarioAutorizador);
			usuarioAutorizador.autorizado = usuarioAutorizado;

			await usuarioAutorizador.save();
			await usuarioAutorizado.save();
		}

		if (updateUser.password) {
			const password = await bcryptjs.hash(updateUser.password, 10);
			updateUser.password = password;
		}

		// Actualiza el usuario
		await Usuarios.updateOne({ _id: idUser }, updateUser);

		// Obtiene el usuario actualizado
		const usuario = await Usuarios.findById(idUser, '-password')
			.populate('respuestas')
			.populate({
				path: 'autorizador',
				select: '-password',
			})
			.populate({
				path: 'autorizado',
				select: '-password',
			});

		return usuario;
	} catch (error) {
		return error;
	}
};

export default putControllerUser;
