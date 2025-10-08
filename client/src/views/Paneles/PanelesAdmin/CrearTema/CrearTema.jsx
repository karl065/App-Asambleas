import { useFormik } from 'formik';
import * as Yup from 'yup';
import ConectarDBs from '../../../../components/ConectarDB/ConectarDBs.jsx';
import { useSelector } from 'react-redux';
import { crearTemasAction } from '../../../../redux/admin/actions/temasActions/CrearTemasAction.jsx';
import { alertSuccess } from '../../../../helpers/Alertas.jsx';

const CrearTema = () => {
	const DBConectada = useSelector((state) => state.conectarDB.DBConectada);

	const validationSchema = Yup.object({
		tema: Yup.string().required('El tema es obligatorio'),
		maxInterventores: Yup.string().required(
			'La cantidad de interventores es obligatoria'
		),
	});

	const formik = useFormik({
		initialValues: {
			tema: '',
			maxInterventores: 0,
		},
		validationSchema: validationSchema,
		onSubmit: async (values, { resetForm }) => {
			crearTemasAction(values, DBConectada);
			alertSuccess('Tema creado con éxito');
			resetForm();
		},
	});

	return (
		<div className="flex">
			<div className="w-full p-5 space-y-5 overflow-y-auto bg-black rounded-lg opacity-70">
				<div className="bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
					<div className="border-2 border-black rounded-lg md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							Crear Tema
						</h1>
						<ConectarDBs />
						<form
							className="flex items-center justify-center space-x-2"
							onSubmit={formik.handleSubmit}>
							<div className="flex items-center justify-center p-2 space-x-2">
								<div className="relative">
									<label className="text-white uppercase">nombre tema</label>
									<input
										type="text"
										name="tema"
										id="tema"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.tema}
										className={`bg-blue-700 uppercase border-4 border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-black dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
											formik.touched.tema && formik.errors.tema
												? 'border-red-500'
												: ''
										}`}
										placeholder="Tema"
									/>
									<div
										className={`text-xs bg-black font-bold border-2 rounded-lg p-2 text-red-500 absolute top-full z-10 ${
											formik.touched.tema && formik.errors.tema
												? 'visible'
												: 'hidden'
										}`}>
										{formik.errors.tema}
									</div>
								</div>
								<div className="relative">
									<label className="text-white uppercase">
										Cant. de interventores
									</label>
									<input
										type="number"
										name="maxInterventores"
										id="maxInterventores"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.maxInterventores}
										className={`bg-blue-700 uppercase border-4 border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600  block w-auto p-2.5 dark:bg-gray-700 dark:border-black dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
											formik.touched.maxInterventores &&
											formik.errors.maxInterventores
												? 'border-red-500'
												: ''
										}`}
										placeholder="Cant. interventores"
									/>
									<div
										className={`text-xs font-bold bg-black border-2 rounded-lg p-2 text-red-500 absolute top-full z-10 ${
											formik.touched.maxInterventores &&
											formik.errors.maxInterventores
												? 'visible'
												: 'hidden'
										}`}>
										{formik.errors.maxInterventores}
									</div>
								</div>
								<div>
									<button
										type="submit"
										className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
										Crear
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CrearTema;
