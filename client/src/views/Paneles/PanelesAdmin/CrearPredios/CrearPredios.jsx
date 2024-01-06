import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';
import Sidebar from '../../../../components/Sidebar/Sidebar';
import ConectarDBs from '../../../../components/ConectarDB/ConectarDBs';
import {crearUsuariosDBs} from '../../../../redux/actions';

const CrearPredios = () => {
  const usuarios = useSelector((state) => state.asambleas.usuarios);

  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    torreMz: Yup.string().required('Campo obligatorio'),
    predio: Yup.string().required('Campo obligatorio'),
    parqueadero: Yup.string().required('Campo obligatorio'),
    coeficiente: Yup.string().required('Campo obligatorio'),
    usuario: Yup.string().required('Campo obligatorio'),
  });

  const formik = useFormik({
    initialValues: {
      torreMz: '',
      predio: '',
      parqueadero: '',
      coeficiente: '',
      usuario: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, {resetForm}) => {
      await crearUsuariosDBs(null, values, dispatch);
      resetForm();
    },
  });

  return (
    <div className="flex p-2 ">
      <Sidebar />
      <div className="bg-black opacity-70 w-full ml-2 rounded-lg p-5 space-y-5 overflow-y-auto">
        <div className=" bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
          <div className="md:space-y-6 sm:p-8 border-2 border-black rounded-lg">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Crear Predio
            </h1>
            <ConectarDBs />
            <form className="space-x-2" onSubmit={formik.handleSubmit}>
              <div className="flex">
                <div className="justify-center items-center p-2 space-y-2">
                  <div>
                    <input
                      type="text"
                      name="torreMz"
                      id="torreMz"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.torreMz}
                      className={`bg-blue-700 uppercase border-4 border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-black dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                        formik.touched.torreMz && formik.errors.torreMz
                          ? 'border-red-500'
                          : ''
                      }`}
                      placeholder="Torre/Manzana"
                    />
                    {formik.touched.torreMz && formik.errors.torreMz ? (
                      <div className="text-red-500 text-xs">
                        {formik.errors.torreMz}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="predio"
                      id="predio"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.predio}
                      className={`bg-blue-700 uppercase border-4 border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-black dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                        formik.touched.predio && formik.errors.predio
                          ? 'border-red-500'
                          : ''
                      }`}
                      placeholder="Predio"
                    />
                    {formik.touched.predio && formik.errors.predio ? (
                      <div className="text-red-500 text-xs">
                        {formik.errors.predio}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="justify-center items-center p-2 space-y-2">
                  <div>
                    <input
                      type="text"
                      name="parqueadero"
                      id="parqueadero"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.parqueadero}
                      className={`bg-blue-700 uppercase border-4 border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-black dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                        formik.touched.parqueadero && formik.errors.parqueadero
                          ? 'border-red-500'
                          : ''
                      }`}
                      placeholder="Parqueadero"
                    />
                    {formik.touched.parqueadero && formik.errors.parqueadero ? (
                      <div className="text-red-500 text-xs">
                        {formik.errors.parqueadero}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <input
                      type="number"
                      name="coeficiente"
                      id="coeficiente"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.coeficiente}
                      className={`bg-blue-700 uppercase border-4 border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-black dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                        formik.touched.coeficiente && formik.errors.coeficiente
                          ? 'border-red-500'
                          : ''
                      }`}
                      placeholder="Coeficiente"
                    />
                    {formik.touched.coeficiente && formik.errors.coeficiente ? (
                      <div className="text-red-500 text-xs">
                        {formik.errors.coeficiente}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="justify-center items-center p-2 space-y-2">
                  <div className="flex-1">
                    <select
                      name="usuario"
                      id="usuario"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.usuario}
                      className={`bg-blue-700 uppercase border-4 border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-black dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                        formik.touched.usuario && formik.errors.usuario
                          ? 'border-red-500'
                          : ''
                      }`}
                    >
                      <option value="">Asignar Usuario</option>
                      {usuarios
                        .filter(
                          (usuario) =>
                            usuario.role === 'Propietario' ||
                            usuario.role === 'Propietario-Empoderado'
                        )
                        .map((usuario) => (
                          <option value={usuario._id} key={usuario._id}>
                            {usuario.primerNombre}
                          </option>
                        ))}
                    </select>
                    {formik.touched.usuario && formik.errors.usuario && (
                      <div className="text-red-500 text-xs">
                        {formik.errors.usuario}
                      </div>
                    )}
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Crear
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrearPredios;
