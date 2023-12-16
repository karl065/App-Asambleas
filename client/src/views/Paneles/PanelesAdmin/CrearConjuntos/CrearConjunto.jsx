import Sidebar from '../../../../components/Sidebar/Sidebar';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';
import {useNavigate} from 'react-router-dom';
import {crearDBs} from '../../../../redux/actions';

const CrearConjunto = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const DBS = useSelector((state) => state.asambleas.DBS);
  const token = localStorage.getItem('token');
  const validationSchema = Yup.object({
    nombre: Yup.string()
      .required('Nombre de conjunto obligatorio')
      .test('nombre-único', 'Este Conjunto ya existe', function (value) {
        const conjunto = DBS.some((conj) => conj.nombre === value);
        return !conjunto;
      }),
  });

  const formik = useFormik({
    initialValues: {
      nombre: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      crearDBs(token, dispatch, navigate, values);
    },
  });
  return (
    <div className="flex p-2 ">
      <Sidebar />
      <div className="bg-black opacity-70 w-full m-2 rounded-lg p-5 space-y-5">
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
              <div className="text-red-500 text-xs">{formik.errors.nombre}</div>
            ) : null}
          </div>
          <button
            type="submit"
            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Crear
          </button>
        </form>
      </div>
    </div>
  );
};

export default CrearConjunto;
