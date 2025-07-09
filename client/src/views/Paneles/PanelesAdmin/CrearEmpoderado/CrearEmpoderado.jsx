/* eslint-disable react-hooks/exhaustive-deps */
import {useFormik} from 'formik';
import {actualizarUsuarios, crearUsuariosDBs} from '../../../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';
import {useEffect, useState} from 'react';
import {alertSuccess} from '../../../../helpers/Alertas';
import {useNavigate} from 'react-router-dom';

const CrearEmpoderado = () => {
  const login = useSelector((state) => state.asambleas.login);
  const usuarios = useSelector((state) => state.asambleas.usuarios);
  const DBConectada = useSelector((state) => state.asambleas.DBConectada);
  const [usuarioCreado, setUsuarioCreado] = useState('');
  const [documentoCreado, setDocumentoCreado] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    documento: Yup.string().required('Debe colocar su documento'),
    primerNombre: Yup.string().required('Debe colocar su primer nombre'),
    primerApellido: Yup.string().required('Debe colocar su primer apellido'),
    correo: Yup.string().required('El correo es obligatorio'),
    celular: Yup.string().required('Numero de celular requerido'),
    password: Yup.string().required('Debe asignar una contraseña'),
  });

  const formik = useFormik({
    initialValues: {
      documento: '',
      primerNombre: '',
      segundoNombre: '',
      primerApellido: '',
      segundoApellido: '',
      correo: '',
      celular: '',
      password: '',
      role: 'Empoderado',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, {resetForm}) => {
      setDocumentoCreado(values.documento);
      const dataUpdate = {
        DBConectada,
        usuarios: values,
      };
      await crearUsuariosDBs(dataUpdate, null, dispatch);
      resetForm();
    },
  });

  useEffect(() => {
    const usuarioBuscado = usuarios.find(
      (usuario) => usuario.documento === documentoCreado
    );
    setUsuarioCreado(usuarioBuscado);
  }, [usuarios]);

  useEffect(() => {
    if (usuarioCreado) {
      const dataUpdate = {
        DBConectada,
        updateUser: {autorizado: usuarioCreado._id},
      };
      actualizarUsuarios(login._id, dataUpdate);
      alertSuccess('Empoderado Creado y Asignado');
      navigate('/usuario');
    }
  }, [usuarioCreado]);

  return (
    <div className="flex w-[310px] lg:w-auto">
      <div className="bg-black opacity-70 w-full rounded-lg p-5 space-y-5 overflow-y-auto">
        <div className="rounded-lg shadow border bg-gray-800 border-gray-700">
          <div className="space-y-2 p-2 lg:p-8 border-2  rounded-lg">
            <h1 className="text-xl font-bold leading-tight tracking-tight lg:text-2xl text-white">
              Crear Empoderado
            </h1>
            <form className="space-x-2" onSubmit={formik.handleSubmit}>
              <div className="flex flex-col lg:flex-row">
                <div className="justify-center items-center p-2 space-y-2">
                  <div className="relative">
                    <input
                      type="text"
                      name="documento"
                      id="documento"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.documento}
                      className={`uppercase border-4 sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700  placeholder-white text-white focus:ring-blue-500 focus:border-blue-500 ${
                        formik.touched.documento && formik.errors.documento
                          ? 'border-red-500'
                          : ''
                      }`}
                      placeholder="Documento"
                    />
                    <div
                      className={`text-xs bg-black border-2 rounded-lg p-2 text-red-500 absolute top-full z-10 ${
                        formik.touched.documento && formik.errors.documento
                          ? 'visible'
                          : 'hidden'
                      }`}
                    >
                      {formik.errors.documento}
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      name="primerNombre"
                      id="primerNombre"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.primerNombre}
                      className={`uppercase border-4   sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700  placeholder-white text-white focus:ring-blue-500 focus:border-blue-500 ${
                        formik.touched.primerNombre &&
                        formik.errors.primerNombre
                          ? 'border-red-500'
                          : ''
                      }`}
                      placeholder="Primer Nombre"
                    />
                    <div
                      className={`text-xs bg-black border-2 rounded-lg p-2 text-red-500 absolute top-full z-10 ${
                        formik.touched.primerNombre &&
                        formik.errors.primerNombre
                          ? 'visible'
                          : 'hidden'
                      }`}
                    >
                      {formik.errors.primerNombre}
                    </div>
                  </div>
                </div>
                <div className="justify-center items-center p-2 space-y-2">
                  <div className="relative">
                    <input
                      type="text"
                      name="segundoNombre"
                      id="segundoNombre"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.segundoNombre}
                      className={` uppercase border-4   sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700  placeholder-white text-white focus:ring-blue-500 focus:border-blue-500 ${
                        formik.touched.segundoNombre &&
                        formik.errors.segundoNombre
                          ? 'border-red-500'
                          : ''
                      }`}
                      placeholder="Segundo Nombre"
                    />
                    <div
                      className={`text-xs bg-black border-2 rounded-lg p-2 text-red-500 absolute top-full z-10 ${
                        formik.touched.segundoNombre &&
                        formik.errors.segundoNombre
                          ? 'visible'
                          : 'hidden'
                      }`}
                    >
                      {formik.errors.segundoNombre}
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      name="primerApellido"
                      id="primerApellido"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.primerApellido}
                      className={` uppercase border-4   sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700  placeholder-white text-white focus:ring-blue-500 focus:border-blue-500 ${
                        formik.touched.primerApellido &&
                        formik.errors.primerApellido
                          ? 'border-red-500'
                          : ''
                      }`}
                      placeholder="Primer Apellido"
                    />
                    <div
                      className={`text-xs bg-black border-2 rounded-lg p-2 text-red-500 absolute top-full z-10 ${
                        formik.touched.primerApellido &&
                        formik.errors.primerApellido
                          ? 'visible'
                          : 'hidden'
                      }`}
                    >
                      {formik.errors.primerApellido}
                    </div>
                  </div>
                </div>
                <div className="justify-center items-center p-2 space-y-2">
                  <div className="relative">
                    <input
                      type="text"
                      name="segundoApellido"
                      id="segundoApellido"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.segundoApellido}
                      className={` uppercase border-4   sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700  placeholder-white text-white focus:ring-blue-500 focus:border-blue-500 ${
                        formik.touched.segundoApellido &&
                        formik.errors.segundoApellido
                          ? 'border-red-500'
                          : ''
                      }`}
                      placeholder="Segundo Apellido"
                    />
                    <div
                      className={`text-xs bg-black border-2 rounded-lg p-2 text-red-500 absolute top-full z-10 ${
                        formik.touched.segundoApellido &&
                        formik.errors.segundoApellido
                          ? 'visible'
                          : 'hidden'
                      }`}
                    >
                      {formik.errors.segundoApellido}
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      name="correo"
                      id="correo"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.correo}
                      className={` uppercase border-4   sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700  placeholder-white text-white focus:ring-blue-500 focus:border-blue-500 ${
                        formik.touched.correo && formik.errors.correo
                          ? 'border-red-500'
                          : ''
                      }`}
                      placeholder="Correo"
                    />
                    <div
                      className={`text-xs bg-black border-2 rounded-lg p-2 text-red-500 absolute top-full z-10 ${
                        formik.touched.correo && formik.errors.correo
                          ? 'visible'
                          : 'hidden'
                      }`}
                    >
                      {formik.errors.correo}
                    </div>
                  </div>
                </div>
                <div className="justify-center items-center p-2 space-y-2">
                  <div className="relative">
                    <input
                      type="text"
                      name="celular"
                      id="celular"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.celular}
                      className={` uppercase border-4   sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700  placeholder-white text-white focus:ring-blue-500 focus:border-blue-500 ${
                        formik.touched.celular && formik.errors.celular
                          ? 'border-red-500'
                          : ''
                      }`}
                      placeholder="Celular"
                    />
                    <div
                      className={`text-xs bg-black border-2 rounded-lg p-2 text-red-500 absolute top-full z-10 ${
                        formik.touched.celular && formik.errors.celular
                          ? 'visible'
                          : 'hidden'
                      }`}
                    >
                      {formik.errors.celular}
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      placeholder="Contraseña Nueva"
                      className={` uppercase border-4 border-gray-300  sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700  placeholder-white text-white focus:ring-blue-500 focus:border-blue-500 ${
                        formik.touched.password && formik.errors.password
                          ? 'border-red-500'
                          : ''
                      }`}
                    />
                    <div
                      className={`text-xs bg-black border-2 rounded-lg p-2 text-red-500 absolute top-full z-10 ${
                        formik.touched.password && formik.errors.password
                          ? 'visible'
                          : 'hidden'
                      }`}
                    >
                      {formik.errors.password}
                    </div>
                  </div>
                </div>
                <div className="justify-center items-center p-2 space-y-2">
                  <div>
                    <button
                      type="submit"
                      className="w-full text-white focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
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

export default CrearEmpoderado;
