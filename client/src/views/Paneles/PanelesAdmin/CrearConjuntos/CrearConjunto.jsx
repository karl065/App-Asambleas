import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import ExcelUploader from '../../../../components/ExcelUploader/ExcelUploader';
import { useEffect, useState } from 'react';
import Tabla from '../../../../components/Tabla/Tabla';
import { FcCollapse, FcExpand } from 'react-icons/fc';
import { alertInfo, alertSuccess } from '../../../../helpers/Alertas';
import { crearDBsAction } from '../../../../redux/admin/actions/dbActions/crearDBAction';
import { crearUsuariosDBsAction } from '../../../../redux/admin/actions/usuariosActions/CrearUsuarioAction';

const CrearConjunto = () => {
	const DBConectada = useSelector((state) => state.conectarDB.DBConectada);
	const [usuarios, setUsuarios] = useState([]);
	const [predios, setPredios] = useState([]);
	const [db, setDb] = useState('');
	const [usuariosVisible, setUsuariosVisible] = useState(false);
	const [prediosVisible, setPrediosVisible] = useState(false);

	const dispatch = useDispatch();
	const DBS = useSelector((state) => state.db.DBs);
	const token = localStorage.getItem('token');
	const validationSchema = Yup.object({
		nombre: Yup.string()
			.required('Nombre de conjunto obligatorio')
			.test('nombre-único', 'Este Conjunto ya existe', function (value) {
				const conjunto = DBS.some((conj) => conj.nombre === value);
				return !conjunto;
			}),
	});
	const handleUpload = (excelData) => {
		const keys = excelData[0];
		const usuariosData = [];
		const prediosData = [];

		for (let i = 1; i < excelData.length; i++) {
			let usuario = {};
			let predio = {};
			for (let j = 0; j < keys.length; j++) {
				const key = keys[j];
				const value = excelData[i][j];
				switch (key) {
					case 'DOCUMENTO':
						usuario.documento = value.toString();
						predio.documento = value.toString();
						break;
					case 'PRIMER NOMBRE':
						usuario.primerNombre = value ? value.trim() : '';
						break;
					case 'SEGUNDO NOMBRE':
						usuario.segundoNombre = value ? value.trim() : '';
						break;
					case 'PRIMER APELLIDO':
						usuario.primerApellido = value ? value.trim() : '';
						break;
					case 'SEGUNDO APELLIDO':
						usuario.segundoApellido = value ? value.trim() : '';
						break;
					case 'CORREO':
						usuario.correo = value ? value.trim() : 'Sin Correo';
						break;
					case 'CELULAR':
						usuario.celular = value ? value : 0;
						break;
					case 'TORRE - MZ':
						predio.torreMz = value ? value.trim() : '';
						break;
					case 'PREDIO':
						predio.predio = value ? value : '';
						break;
					case 'PQ':
						predio.parqueadero = value ? value : '';
						break;
					case 'COEFICIENTE':
						predio.coeficiente = parseFloat(value);
						break;
					default:
						break;
				}
			}

			const existeUsuario = usuariosData.some(
				(u) => u.documento === usuario.documento
			);
			if (!existeUsuario) usuariosData.push(usuario);
			prediosData.push(predio);
		}
		setUsuarios(usuariosData);
		setPredios(prediosData);
	};
	const columnsUsers = [
		{ Header: 'DOCUMENTO', accessor: 'documento' },
		{ Header: 'PRIMER NOMBRE', accessor: 'primerNombre' },
		{ Header: 'SEGUNDO NOMBRE', accessor: 'segundoNombre' },
		{ Header: 'PRIMER APELLIDO', accessor: 'primerApellido' },
		{ Header: 'SEGUNDO APELLIDO', accessor: 'segundoApellido' },
		{ Header: 'CORREO', accessor: 'correo' },
		{ Header: 'CELULAR', accessor: 'celular' },
	];

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
	const formik = useFormik({
		initialValues: {
			nombre: '',
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			setDb(values.nombre);
			crearDBsAction(token, dispatch, values);
		},
	});

	const handleCargarDatos = () => {
		if (db) {
			if (usuarios.length !== 0 || predios.length !== 0) {
				const datosUsuarios = { DBConectada, usuarios };
				const datosPredios = { DBConectada, predios };
				crearUsuariosDBsAction(datosUsuarios, datosPredios, dispatch);
				alertSuccess('Conjunto cargado correctamente');
			} else {
				alertInfo('No hay datos para cargar');
			}
		} else {
			alertInfo('Crear una base de datos primero');
		}
	};

	useEffect(() => {
		setPredios([]);
		setUsuarios([]);
	}, [db]);
	return (
		<div className="flex">
			<div className="w-full p-5 space-y-5 bg-black rounded-lg opacity-70">
				<form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
					<div>
						<input
							type="text"
							name="nombre"
							id="nombre"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.nombre}
							className={`bg-blue-700 uppercase border-4 border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-black dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
								formik.touched.nombre && formik.errors.nombre
									? 'border-red-500'
									: ''
							}`}
							placeholder="nombre"
						/>
						{formik.touched.nombre && formik.errors.nombre ? (
							<div className="text-xs text-red-500">{formik.errors.nombre}</div>
						) : null}
					</div>
					<button
						type="submit"
						className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
						Crear DB
					</button>
				</form>
				<div>
					<div className="flex items-center justify-center space-x-4 ">
						<label className="flex-1 text-white">{db}</label>
						<ExcelUploader onUpload={handleUpload} />
						<div className="flex items-center justify-center flex-1">
							<button
								type="submit"
								className=" text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
								onClick={handleCargarDatos}>
								Cargar Datos
							</button>
						</div>
					</div>
					<div>
						<button onClick={handleTablaUsuario}>
							{usuariosVisible ? <FcCollapse /> : <FcExpand />}
						</button>
						<label className="text-white uppercase"> Usuarios</label>
						<div>
							{usuariosVisible && (
								<Tabla
									columns={columnsUsers}
									data={usuarios}
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
	);
};

export default CrearConjunto;
