import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {conectarDB} from '../../redux/actions';
import {alertSuccess} from '../../helpers/Alertas';
import {connectedDB, setLoading} from '../../redux/appSlice';
import {InfinitySpin} from 'react-loader-spinner';

const ConectarDBs = () => {
  const dispatch = useDispatch();
  const DBS = useSelector((state) => state.asambleas.DBS);
  const loading = useSelector((state) => state.asambleas.loading);
  const token = localStorage.getItem('token');

  const validationSchema = Yup.object({
    nombre: Yup.string().required('Nombre de conjunto obligatorio'),
  });

  const formik = useFormik({
    initialValues: {
      nombre: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      dispatch(setLoading(true));
      const msg = await conectarDB(values, dispatch, token);
      localStorage.setItem('connect', values.nombre);
      dispatch(connectedDB(values.nombre));
      dispatch(setLoading(false));
      alertSuccess(msg);
    },
  });
  return (
    <div>
      <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
        <div className="flex space-x-4 items-center justify-center ">
          <div className="flex-1">
            <select
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
            >
              <option value="">Seleccionar Conjunto</option>
              {DBS.map((conjunto) => (
                <option value={conjunto.nombre} key={conjunto._id}>
                  {conjunto.nombre}
                </option>
              ))}
            </select>
            {formik.touched.nombre && formik.errors.nombre && (
              <div className="text-red-500 text-xs">{formik.errors.nombre}</div>
            )}
          </div>
          {loading ? (
            <div>
              <InfinitySpin
                visible={true}
                width="100"
                color="blue"
                ariaLabel="infinity-spin-loading"
              />
            </div>
          ) : (
            ''
          )}
          <div className="flex-1  flex justify-center items-center">
            <button
              type="submit"
              className=" text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Conectar DB
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ConectarDBs;
