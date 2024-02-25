/* eslint-disable react-hooks/exhaustive-deps */
import {useFormik} from 'formik';
import * as Yup from 'yup';
import Autorizaciones from '../../../../components/Autorizaciones/Autorizaciones';
import {actualizarUsuarios} from '../../../../redux/actions';
import {useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {alertSuccess} from '../../../../helpers/Alertas';

const ActualizarDatos = () => {
  const login = useSelector((state) => state.asambleas.login);
  const DBConectada = useSelector((state) => state.asambleas.DBConectada);

  const [idUser, setIdUser] = useState('');
  const [usuario, setUsuario] = useState({
    documento: '',
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    correo: '',
    celular: '',
  });

  const handleSetUser = () => {
    setIdUser(login._id);
    const usuarioFiltrado = {
      documento: login?.documento || '',
      primerNombre: login?.primerNombre || '',
      segundoNombre: login?.segundoNombre || '',
      primerApellido: login?.primerApellido || '',
      segundoApellido: login?.segundoApellido || '',
      correo: login?.correo || '',
      celular: login?.celular || '',
    };

    setUsuario({...usuarioFiltrado});

    formik.setValues({...usuarioFiltrado});
  };

  const validationSchema = Yup.object({
    documento: Yup.string().required('Campo obligatorio'),
    primerNombre: Yup.string().required('Campo obligatorio'),
    primerApellido: Yup.string().required('Campo obligatorio'),
    correo: Yup.string().required('Campo obligatorio'),
    celular: Yup.string().required('Campo obligatorio'),
  });

  const formik = useFormik({
    initialValues: usuario,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (!values.password) {
        const dataUpdate = {
          DBConectada,
          updateUser: {
            documento: values.documento,
            primerNombre: values.primerNombre,
            segundoNombre: values.segundoNombre,
            primerApellido: values.primerApellido,
            segundoApellido: values.segundoApellido,
            correo: values.correo,
            celular: values.celular,
          },
        };
        await actualizarUsuarios(idUser, dataUpdate);
      } else {
        const dataUpdate = {
          DBConectada,
          updateUser: values,
        };
        await actualizarUsuarios(idUser, dataUpdate);
      }
      alertSuccess('Actualizado con exito');
    },
  });

  useEffect(() => {
    handleSetUser();
  }, [login]);
  return (
    <div className="flex">
      <div className="bg-black opacity-70 w-full rounded-lg p-5 space-y-5 overflow-y-auto">
        <div className=" bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
          <div className="space-y-2 sm:p-8 border-2 border-black rounded-lg">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Actualizar Datos
            </h1>
            <form className="space-x-2" onSubmit={formik.handleSubmit}>
              <div className="flex">
                <div className="justify-center items-center p-2 space-y-2">
                  <div>
                    <input
                      type="text"
                      name="documento"
                      id="documento"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.documento}
                      className={`bg-blue-700 uppercase border-4 border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-black dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                        formik.touched.documento && formik.errors.documento
                          ? 'border-red-500'
                          : ''
                      }`}
                      placeholder="Documento"
                    />
                    {formik.touched.documento && formik.errors.documento ? (
                      <div className="text-red-500 text-xs">
                        {formik.errors.documento}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="primerNombre"
                      id="primerNombre"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.primerNombre}
                      className={`bg-blue-700 uppercase border-4 border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-black dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                        formik.touched.primerNombre &&
                        formik.errors.primerNombre
                          ? 'border-red-500'
                          : ''
                      }`}
                      placeholder="Primer Nombre"
                    />
                    {formik.touched.primerNombre &&
                    formik.errors.primerNombre ? (
                      <div className="text-red-500 text-xs">
                        {formik.errors.primerNombre}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="justify-center items-center p-2 space-y-2">
                  <div>
                    <input
                      type="text"
                      name="segundoNombre"
                      id="segundoNombre"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.segundoNombre}
                      className={`bg-blue-700 uppercase border-4 border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-black dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                        formik.touched.segundoNombre &&
                        formik.errors.segundoNombre
                          ? 'border-red-500'
                          : ''
                      }`}
                      placeholder="Segundo Nombre"
                    />
                    {formik.touched.segundoNombre &&
                    formik.errors.segundoNombre ? (
                      <div className="text-red-500 text-xs">
                        {formik.errors.segundoNombre}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="primerApellido"
                      id="primerApellido"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.primerApellido}
                      className={`bg-blue-700 uppercase border-4 border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-black dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                        formik.touched.primerApellido &&
                        formik.errors.primerApellido
                          ? 'border-red-500'
                          : ''
                      }`}
                      placeholder="Primer Apellido"
                    />
                    {formik.touched.primerApellido &&
                    formik.errors.primerApellido ? (
                      <div className="text-red-500 text-xs">
                        {formik.errors.primerApellido}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="justify-center items-center p-2 space-y-2">
                  <div>
                    <input
                      type="text"
                      name="segundoApellido"
                      id="segundoApellido"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.segundoApellido}
                      className={`bg-blue-700 uppercase border-4 border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-black dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                        formik.touched.segundoApellido &&
                        formik.errors.segundoApellido
                          ? 'border-red-500'
                          : ''
                      }`}
                      placeholder="Segundo Apellido"
                    />
                    {formik.touched.segundoApellido &&
                    formik.errors.segundoApellido ? (
                      <div className="text-red-500 text-xs">
                        {formik.errors.segundoApellido}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="correo"
                      id="correo"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.correo}
                      className={`bg-blue-700 uppercase border-4 border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-black dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                        formik.touched.correo && formik.errors.correo
                          ? 'border-red-500'
                          : ''
                      }`}
                      placeholder="Correo"
                    />
                    {formik.touched.correo && formik.errors.correo ? (
                      <div className="text-red-500 text-xs">
                        {formik.errors.correo}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="justify-center items-center p-2 space-y-2">
                  <div>
                    <input
                      type="text"
                      name="celular"
                      id="celular"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.celular}
                      className={`bg-blue-700 uppercase border-4 border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-black dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                        formik.touched.celular && formik.errors.celular
                          ? 'border-red-500'
                          : ''
                      }`}
                      placeholder="Celular"
                    />
                    {formik.touched.celular && formik.errors.celular ? (
                      <div className="text-red-500 text-xs">
                        {formik.errors.celular}
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
                      placeholder="Contraseña Nueva"
                      className={`bg-gray-50 uppercase border-4 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-black dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                        formik.touched.password && formik.errors.password
                          ? 'border-red-500'
                          : ''
                      }`}
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <div className="text-red-500 text-xs">
                        {formik.errors.password}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="justify-center items-center p-2 space-y-2">
                  <div>
                    <button
                      type="submit"
                      className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Actualizar
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <Autorizaciones idUser={idUser} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActualizarDatos;
