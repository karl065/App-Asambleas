/* eslint-disable react/prop-types */
/* eslint-disable no-case-declarations */
import Sidebar from '../../../../components/Sidebar/Sidebar';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';
import {useState} from 'react';
import Tabla from '../../../../components/Tabla/Tabla';
import {FcCollapse} from 'react-icons/fc';
import {FcExpand} from 'react-icons/fc';
import {conectarDB} from '../../../../redux/actions';
import Switch from '@material-ui/core/Switch';
import {PiNotePencilFill} from 'react-icons/pi';

const GestionarConjunto = () => {
  const predios = useSelector((state) => state.asambleas.predios);
  const usuarios = useSelector((state) => state.asambleas.usuarios);
  const [usuariosVisible, setUsuariosVisible] = useState(false);
  const [prediosVisible, setPrediosVisible] = useState(false);
  const dispatch = useDispatch();
  const DBS = useSelector((state) => state.asambleas.DBS);
  const token = localStorage.getItem('token');
  const validationSchema = Yup.object({
    nombre: Yup.string().required('Nombre de conjunto obligatorio'),
  });

  const handleIconButton = () => {
    alert('Funcionalidad en desarrollo');
  };

  const columnsUsers = [
    {Header: 'DOCUMENTO', accessor: 'documento'},
    {Header: 'PRIMER NOMBRE', accessor: 'primerNombre'},
    {Header: 'PRIMER APELLIDO', accessor: 'primerApellido'},
    {Header: 'CORREO', accessor: 'correo'},
    {Header: 'CELULAR', accessor: 'celular'},
    {
      Header: 'STATUS',
      accessor: 'userStatus',
      Cell: ({row}) => (
        <div className="flex items-center justify-center">
          <Switch
            checked={row.original.userStatus}
            color="primary"
            inputProps={{'aria-label': 'controlled'}}
            className="bg-green-200 rounded-full px-1"
          />
        </div>
      ),
    },
    {Header: 'ROLE', accessor: 'role'},
    {
      Header: 'ACCIONES',
      accessor: 'icon',
      Cell: () => (
        <button onClick={handleIconButton}>
          <PiNotePencilFill style={{color: 'yellow'}} size={24} />
        </button>
      ),
    },
  ];

  const data = Array.isArray(usuarios)
    ? usuarios.map((item) => ({...item, icon: 'icono'}))
    : [];

  const columnsPredios = [
    {Header: 'TORRE/MZ', accessor: 'torreMz'},
    {Header: 'PREDIO', accessor: 'predio'},
    {Header: 'PARQUEADERO', accessor: 'parqueadero'},
    {Header: 'COEFICIENTE', accessor: 'coeficiente'},
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
      conectarDB(values, dispatch, token);
    },
  });

  return (
    <div className="flex p-2 ">
      <Sidebar />
      <div className="bg-black opacity-70 w-full m-2 rounded-lg p-5 space-y-5 overflow-y-auto">
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
                {DBS.map((conjunto) => (
                  <option value={conjunto.nombre} key={conjunto._id}>
                    {conjunto.nombre}
                  </option>
                ))}
              </select>
              {formik.touched.nombre && formik.errors.nombre && (
                <div className="text-red-500 text-xs">
                  {formik.errors.nombre}
                </div>
              )}
            </div>
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
        <div>
          <button onClick={handleTablaUsuario}>
            {usuariosVisible ? <FcCollapse /> : <FcExpand />}
          </button>
          <label className="text-white uppercase"> Usuarios</label>
          <div>
            {usuariosVisible && (
              <Tabla columns={columnsUsers} data={data} className="max-h-96" />
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
  );
};

export default GestionarConjunto;
