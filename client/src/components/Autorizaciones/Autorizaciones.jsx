/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alertSuccess } from '../../helpers/Alertas';
import { actualizarUsuariosAction } from '../../redux/admin/actions/usuariosActions/ActualizarUsuarioAction';

const Autorizaciones = ({ idUser }) => {
	const usuarios = useSelector((state) => state.usuarios.usuarios);
	const DBConectada = useSelector((state) => state.conectarDB.DBConectada);
	const dispatch = useDispatch();
	const [poder, setPoder] = useState(false);
	const [idAutorizado, setIdAutorizado] = useState('');

	const handleAsignar = () => {
		const dataUpdate = {
			DBConectada,
			updateUser: { autorizado: idAutorizado },
		};
		actualizarUsuariosAction(idUser, dataUpdate, dispatch);
		alertSuccess('Empoderado Asignado');
	};

	const handleSelectChange = (e) => {
		setIdAutorizado(e.target.value);
	};

	return (
		<div className="space-y-2">
			<div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem] space-x-2">
				<input
					className={`rounded-xl ${
						idUser
							? 'form-checkbox text-primary-600 transition duration-150 ease-in-out cursor-pointer '
							: 'opacity-60 cursor-not-allowed'
					}`}
					type="checkbox"
					checked={poder}
					onChange={(e) => {
						setPoder(e.target.checked);
					}}
					id="checkboxChecked"
					disabled={!idUser}
				/>
				<label
					className={`uppercase text-white ${
						idUser
							? 'inline-block pl-[0.15rem] hover:cursor-pointer '
							: 'opacity-60 cursor-not-allowed'
					}`}
					htmlFor="checkboxChecked">
					Dar Poder
				</label>
			</div>
			{poder && (
				<div className="flex flex-col space-y-2 lg:flex-row lg:space-y-0 lg:space-x-2 ">
					<select
						name="Autorizacion"
						id="Autorizacion"
						className=" uppercase border-4  sm:text-sm rounded-lg block p-2.5 bg-gray-700 border-black placeholder-white text-white focus:ring-blue-500 focus:border-blue-500"
						onChange={handleSelectChange}
						value={idAutorizado}>
						<option value="">Seleccione Empoderado</option>
						{usuarios
							.filter(
								(usuario) =>
									!['SuperAdmin', 'Admin', 'Presidente'].includes(
										usuario.role
									) && usuario._id !== idUser
							)
							.map((usuario) => (
								<option value={usuario._id} key={usuario._id}>
									{usuario.primerNombre + ' ' + usuario.primerApellido}
								</option>
							))}
					</select>
					<button
						type="button"
						onClick={handleAsignar}
						className="p-2 text-sm font-medium text-center text-white rounded-lg bg-primary-600 focus:ring-4 focus:outline-none hover:bg-primary-700 focus:ring-primary-800">
						Asignar
					</button>
				</div>
			)}
		</div>
	);
};

export default Autorizaciones;
