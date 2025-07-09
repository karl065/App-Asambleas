/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-case-declarations */
import { useState } from 'react';
import Tabla from '../../../../components/Tabla/Tabla.jsx';
import { FcCollapse } from 'react-icons/fc';
import { FcExpand } from 'react-icons/fc';
import Switch from '@mui/material/Switch';
import { PiNotePencilFill } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
import ConectarDBs from '../../../../components/ConectarDB/ConectarDBs.jsx';
import { useNavigate } from 'react-router-dom';
import { actualizarUsuariosAction } from '../../../../redux/admin/actions/usuariosActions/ActualizarUsuarioAction.jsx';

const GestionarConjunto = () => {
	const usuarios = useSelector((state) => state.usuarios.usuarios);
	const DBConectada = useSelector((state) => state.conectarDB.DBConectada);
	const predios = useSelector((state) => state.usuarios.predios);

	const dispatch = useDispatch();

	const navigate = useNavigate();
	const [usuariosVisible, setUsuariosVisible] = useState(false);
	const [prediosVisible, setPrediosVisible] = useState(false);

	const handleIconButton = (doc) => {
		navigate(`/actualizarUsuario?doc=${doc}`);
	};

	const columnsUsers = [
		{ Header: 'DOCUMENTO', accessor: 'documento' },
		{ Header: 'PRIMER NOMBRE', accessor: 'primerNombre' },
		{ Header: 'PRIMER APELLIDO', accessor: 'primerApellido' },
		{ Header: 'CORREO', accessor: 'correo' },
		{ Header: 'CELULAR', accessor: 'celular' },
		{
			Header: 'STATUS',
			accessor: 'userStatus',
			Cell: ({ row }) => (
				<div className="flex items-center justify-center">
					<Switch
						checked={row.original.userStatus}
						color="primary"
						onChange={() =>
							actualizarUsuariosAction(
								row.original._id,
								{
									DBConectada,
									updateUser: { userStatus: !row.original.userStatus },
								},
								dispatch
							)
						}
						inputProps={{ 'aria-label': 'controlled' }}
						className="px-1 bg-green-200 rounded-full"
					/>
				</div>
			),
		},
		{ Header: 'ROLE', accessor: 'role' },
		{
			Header: 'ACCIONES',
			accessor: 'icon',
			Cell: ({ row }) => (
				<button
					className="p-2 bg-yellow-400 rounded-full"
					onClick={() => handleIconButton(row.original.documento)}>
					<PiNotePencilFill style={{ color: 'white' }} size={24} />
				</button>
			),
		},
	];

	const data = Array.isArray(usuarios)
		? usuarios.map((item) => ({ ...item, icon: 'icono' }))
		: [];

	const columnsPredios = [
		{ Header: 'TORRE/MZ', accessor: 'torreMz' },
		{ Header: 'PREDIO', accessor: 'predio' },
		{ Header: 'PARQUEADERO', accessor: 'parqueadero' },
		{ Header: 'COEFICIENTE', accessor: 'coeficiente' },
	];

	const handleTablaUsuario = () => {
		setUsuariosVisible(!usuariosVisible);
	};
	const handleTablaPredio = () => {
		setPrediosVisible(!prediosVisible);
	};

	return (
		<div className="flex">
			<div className="w-full p-5 space-y-5 overflow-y-auto bg-black rounded-lg opacity-70">
				<div className="bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
					<div className="border-2 border-black rounded-lg md:space-y-6 sm:p-8">
						<ConectarDBs />
						<div>
							<button onClick={handleTablaUsuario}>
								{usuariosVisible ? <FcCollapse /> : <FcExpand />}
							</button>
							<label className="text-white uppercase"> Usuarios</label>
							<div>
								{usuariosVisible && (
									<Tabla
										columns={columnsUsers}
										data={data}
										className="max-h-96"
									/>
								)}
							</div>
						</div>
						<div>
							<button onClick={handleTablaPredio}>
								{prediosVisible ? <FcCollapse /> : <FcExpand />}
							</button>
							<label className="text-white uppercase"> predios</label>
							<div>
								{prediosVisible && (
									<Tabla
										columns={columnsPredios}
										data={predios}
										className="max-h-96"
									/>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GestionarConjunto;
