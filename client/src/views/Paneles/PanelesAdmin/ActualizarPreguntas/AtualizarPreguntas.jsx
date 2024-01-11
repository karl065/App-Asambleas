/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';
import Sidebar from '../../../../components/Sidebar/Sidebar';
import ConectarDBs from '../../../../components/ConectarDB/ConectarDBs';
import {useEffect, useState} from 'react';
import {alertSuccess} from '../../../../helpers/Alertas';
import {useLocation} from 'react-router-dom';

const ActualizarPreguntas = () => {
  const dispatch = useDispatch();

  const {search} = useLocation();
  const params = new URLSearchParams(search);
  const id = params.get('id');

  const preguntas = useSelector((state) => state.asambleas.preguntas);
  const [cantRespuestas, setCantRespuestas] = useState('');
  const [selectedPregunta, setSelectedPregunta] = useState('');

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
          respuesta: `Respuesta ${index + 1}`,
        })
      ),
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      alertSuccess('Pregunta Creada con Exito');
      setCantRespuestas('');
    },
  });

  // Función para habilitar los campos de respuesta según la cantidad seleccionada
  const renderRespuestasInputs = () => {
    const respuestasInputs = [];
    for (let i = 0; i < formik.values.cantidadRespuestas; i++) {
      const respuesta = formik.values.respuestas[i] || {}; // Acceder de manera segura
      respuestasInputs.push(
        <div key={i} className="space-y-2">
          <label
            className="text-white"
            htmlFor={`respuestas.${i}.opcion`}
          >{`Opcion ${respuesta.opcion || ''}.`}</label>
          <input
            type="text"
            id={`respuestas.${i}.respuesta`}
            name={`respuestas.${i}.respuesta`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={respuesta.respuesta || ''}
            className={`bg-blue-700 uppercase border-4 border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-black dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
              formik.touched.respuestas?.[i]?.respuesta &&
              formik.errors.respuestas?.[i]?.respuesta
                ? 'border-red-500'
                : ''
            }`}
            placeholder={`Respuesta ${respuesta.opcion || ''}`}
          />
          {formik.touched.respuestas?.[i]?.respuesta &&
            formik.errors.respuestas?.[i]?.respuesta && (
              <div className="text-red-500 text-xs">
                {formik.errors.respuestas[i].respuesta}
              </div>
            )}
        </div>
      );
    }

    return respuestasInputs;
  };

  const handleCantidadRespuestasChange = (e) => {
    const newValue = e.target.value;
    setCantRespuestas(newValue);
    formik.setFieldValue('cantidadRespuestas', newValue);
    formik.setFieldValue(
      'respuestas',
      Array.from({length: parseInt(newValue) || 0}, (_, index) => ({
        opcion: String.fromCharCode(65 + index),
        respuesta: `Respuesta ${index + 1}`,
      }))
    );
  };

  const handlePreguntaSelectChange = (e) => {
    setSelectedPregunta(
      preguntas.find((pregunta) => pregunta.pregunta === e.target.value)
    );
  };

  useEffect(() => {
    if (id) {
      setSelectedPregunta(preguntas.find((pregunta) => pregunta._id === id));
    }
  }, []);

  useEffect(() => {
    if (selectedPregunta) {
      formik.setValues({
        pregunta: selectedPregunta.pregunta,
        cantidadRespuestas: selectedPregunta.respuestas.length,
        respuestas: selectedPregunta.respuestas.map((respuesta, index) => ({
          opcion: String.fromCharCode(65 + index),
          respuesta: respuesta.respuesta,
        })),
      });
      setCantRespuestas(selectedPregunta.respuestas.length);
    }
  }, [selectedPregunta]);
  return (
    <div className="flex p-2 ">
      <Sidebar />
      <div className="bg-black opacity-70 w-full ml-2 rounded-lg p-5 space-y-5 overflow-y-auto">
        <div className=" bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
          <div className="md:space-y-6 sm:p-8 border-2 border-black rounded-lg">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Actualizar Pregunta
            </h1>
            <ConectarDBs />
            <select
              name="preguntas"
              id="preguntas"
              className="bg-blue-700 uppercase border-4 border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-black dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handlePreguntaSelectChange}
            >
              <option value="">Seleccionar una pregunta</option>
              {preguntas.map((pregunta) => (
                <option value={pregunta.pregunta} key={pregunta._id}>
                  {pregunta.pregunta}
                </option>
              ))}
            </select>
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
                  {renderRespuestasInputs()}
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

export default ActualizarPreguntas;
