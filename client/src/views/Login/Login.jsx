import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';
import {filtroUsuarios, loginSuccess} from '../../redux/actions';
import {useNavigate} from 'react-router-dom';
import {CirclesWithBar, FallingLines} from 'react-loader-spinner';
import {setLoading} from '../../redux/appSlice';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.asambleas.loading);

  const validationSchema = Yup.object({
    documento: Yup.string().required('Campo obligatorio'),
    password: Yup.string().required('Campo obligatorio'),
  });

  const formik = useFormik({
    initialValues: {
      documento: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(setLoading(true));
      loginSuccess(values, dispatch, navigate);
      filtroUsuarios({obtenerEnum: true}, dispatch);
    },
  });

  return (
    <div className="flex items-center justify-center uppercase bg-opacity-50 border-2 border-black rounded-lg w-max h-max bg-gray-50 dark:bg-gray-900 md:p-10 lg:p-10 dark:bg-opacity-50">
      <div className="bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 border-2 border-black rounded-lg md:space-y-6 sm:p-8">
          {loading ? (
            <>
              <div className="flex items-center justify-center ">
                <CirclesWithBar
                  color="blue"
                  barColor="white"
                  innerCircleColor="#9e99c4"
                />
              </div>
              <div className="flex items-center">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Iniciando Sesión
                </h1>
                <FallingLines
                  color="blue"
                  width="50"
                  visible={true}
                  ariaLabel="falling-circles-loading"
                />
              </div>
            </>
          ) : (
            <>
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Iniciar Sesión
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={formik.handleSubmit}
              >
                <div>
                  <input
                    type="text"
                    name="documento"
                    id="documento"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.documento}
                    className={`bg-blue-700 border-4 font-bold border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-black dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                      formik.touched.documento && formik.errors.documento
                        ? 'border-red-500'
                        : ''
                    }`}
                    placeholder="Documento"
                  />
                  {formik.touched.documento && formik.errors.documento ? (
                    <div className="text-xs text-red-500">
                      {formik.errors.documento}
                    </div>
                  ) : null}
                </div>
                <div>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    placeholder="Contraseña"
                    className={`bg-blue-700 border-4 font-bold border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-black dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                      formik.touched.password && formik.errors.password
                        ? 'border-red-500'
                        : ''
                    }`}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-xs text-red-500">
                      {formik.errors.password}
                    </div>
                  ) : null}
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Acceder
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
