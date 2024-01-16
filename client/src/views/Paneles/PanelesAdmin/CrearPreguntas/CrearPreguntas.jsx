import {useFormik} from 'formik';
import {useDispatch} from 'react-redux';
import * as Yup from 'yup';

import ConectarDBs from '../../../../components/ConectarDB/ConectarDBs';
import {useState} from 'react';
import {crearPreguntas} from '../../../../redux/actions';
import {alertSuccess} from '../../../../helpers/Alertas';
import RespuestasInputs from '../../../../components/CatnRespuestas/CantRespuestas';

const CrearPreguntas = () => {
  const dispatch = useDispatch();
  const [cantRespuestas, setCantRespuestas] = useState('');

  const validationSchema = Yup.object({
    pregunta: Yup.string().required('Campo obligatorio'),
    cantidadRespuestas: Yup.number()
      .required('Campo obligatorio')
      .positive('Debe ser un número positivo')
      .integer('Debe ser un número entero'),
    respuestas: Yup.array().of(
      Yup.object().shape({
        opcion: Yup.string().required('Campo obligatorio'),
        respuesta: Yup.string().required('Campo obligatorio'),
      })
    ),
  });

  const formik = useFormik({
    initialValues: {
      pregunta: '',
      cantidadRespuestas: cantRespuestas,
      respuestas: Array.from(
        {length: parseInt(cantRespuestas) || 0},
        (_, index) => ({
          opcion: String.fromCharCode(65 + index),
          respuesta: ``,
        })
      ),
    },
    validationSchema: validationSchema,
    onSubmit: async (values, {resetForm}) => {
      await crearPreguntas(values, dispatch);
      alertSuccess('Pregunta Creada con Exito');
      setCantRespuestas('');
      resetForm();
    },
  });

  const handleCantidadRespuestasChange = (e) => {
    const newValue = e.target.value;
    setCantRespuestas(newValue);
    formik.setFieldValue('cantidadRespuestas', newValue);
    formik.setFieldValue(
      'respuestas',
      Array.from({length: parseInt(newValue) || 0}, (_, index) => ({
        opcion: String.fromCharCode(65 + index),
        respuesta: ``,
      }))
    );
  };

  return (
    <div className="flex p-2 ">
      <div className="bg-black opacity-70 w-full rounded-lg p-5 space-y-5 overflow-y-auto">
        <div className=" bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
          <div className="md:space-y-6 sm:p-8 border-2 border-black rounded-lg">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Crear Pregunta
            </h1>
            <ConectarDBs />
            <form className="space-x-2" onSubmit={formik.handleSubmit}>
              <div className="flex">
                <div className="justify-center items-center p-2 space-y-2">
                  <div>
                    <input
                      type="text"
                      name="pregunta"
                      id="pregunta"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.pregunta}
                      className={`bg-blue-700 uppercase border-4 border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-black dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                        formik.touched.pregunta && formik.errors.pregunta
                          ? 'border-red-500'
                          : ''
                      }`}
                      placeholder="Pregunta"
                    />
                    {formik.touched.pregunta && formik.errors.pregunta ? (
                      <div className="text-red-500 text-xs">
                        {formik.errors.pregunta}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <input
                      type="number"
                      name="cantidadRespuestas"
                      id="cantidadRespuestas"
                      onChange={handleCantidadRespuestasChange}
                      onBlur={formik.handleBlur}
                      value={cantRespuestas}
                      className={`bg-blue-700 uppercase border-4 border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-black dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                        formik.touched.cantidadRespuestas &&
                        formik.errors.cantidadRespuestas
                          ? 'border-red-500'
                          : ''
                      }`}
                      placeholder="Cant. de respuestas"
                    />
                    {formik.touched.cantidadRespuestas &&
                    formik.errors.cantidadRespuestas ? (
                      <div className="text-red-500 text-xs">
                        {formik.errors.cantidadRespuestas}
                      </div>
                    ) : null}
                  </div>
                  <RespuestasInputs
                    values={formik.values.respuestas}
                    touched={formik.touched.respuestas}
                    errors={formik.errors}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
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

export default CrearPreguntas;
