/* eslint-disable no-case-declarations */
import Sidebar from '../../../../components/Sidebar/Sidebar';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';
import {useNavigate} from 'react-router-dom';
import ExcelUploader from '../../../../components/ExcelUploader/ExcelUploader';
import {useState} from 'react';
import Tabla from '../../../../components/Tabla/Tabla';
import {FcCollapse} from 'react-icons/fc';
import {FcExpand} from 'react-icons/fc';

const GestionarConjunto = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [predios, setPredios] = useState([]);
  const [usuariosVisible, setUsuariosVisible] = useState(false);
  const [prediosVisible, setPrediosVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const DBS = useSelector((state) => state.asambleas.DBS);
  const token = localStorage.getItem('token');
  const validationSchema = Yup.object({
    DB: Yup.string().required('Nombre de conjunto obligatorio'),
  });

  const handleUpload = (excelData) => {
    const keys = excelData[0];
    const usuariosData = [];
    const prediosData = [];

    for (let i = 1; i < excelData.length; i++) {
      let usuario = {};
      let predio = {};
      for (let j = 0; j < keys.length; j++) {
        const key = keys[j];
        const value = excelData[i][j];
        switch (key) {
          case 'DOCUMENTO':
            usuario.documento = value.toString();
            break;
          case 'PRIMER NOMBRE':
            usuario.primerNombre = value ? value.trim() : '';
            break;
          case 'SEGUNDO NOMBRE':
            usuario.segundoNombre = value ? value.trim() : '';
            break;
          case 'PRIMER APELLIDO':
            usuario.primerApellido = value ? value.trim() : '';
            break;
          case 'SEGUNDO APELLIDO':
            usuario.primerApellido = value ? value.trim() : '';
            break;
          case 'CORREO':
            usuario.correo = value ? value.trim() : 'Sin Correo';
            break;
          case 'CELULAR':
            usuario.celular = value ? value.trim() : 'Sin Celular';
            break;
          case 'TORRE - MZ':
            predio.torreMz = value ? value.trim() : '';
            break;
          case 'PREDIO':
            predio.predio = value ? value : '';
            break;
          case 'PQ':
            predio.parqueadero = value ? value : '';
            break;
          case 'COEFICIENTE':
            predio.coeficiente = parseFloat(value);
            break;
          default:
            break;
        }
      }
      usuariosData.push(usuario);
      prediosData.push(predio);
    }
    setUsuarios(usuariosData);
    setPredios(prediosData);
  };

  const columnsUsers = [
    {Header: 'DOCUMENTO', accessor: 'documento'},
    {Header: 'PRIMER NOMBRE', accessor: 'primerNombre'},
    {Header: 'SEGUNDO NOMBRE', accessor: 'segundoNombre'},
    {Header: 'PRIMER APELLIDO', accessor: 'primerApellido'},
    {Header: 'SEGUNDO APELLIDO', accessor: 'segundoApellido'},
    {Header: 'CORREO', accessor: 'correo'},
    {Header: 'CELULAR', accessor: 'celular'},
  ];

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
    onSubmit: (values) => {},
  });
  console.log(usuarios);
  console.log(predios);
  return (
    <div className="flex p-2 ">
      <Sidebar />
      <div className="bg-black opacity-70 w-full m-2 rounded-lg p-5 space-y-5 overflow-y-auto">
        <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
          <div className="flex space-x-4 items-center justify-center ">
            <div className="flex-1">
              <select
                name="DB"
                id="DB"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.DB}
                className={`bg-blue-700 uppercase border-4 border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-black dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                  formik.touched.DB && formik.errors.DB ? 'border-red-500' : ''
                }`}
              >
                {DBS.map((conjunto) => (
                  <option value={conjunto.nombre} key={conjunto._id}>
                    {conjunto.nombre}
                  </option>
                ))}
              </select>
              {formik.touched.DB && formik.errors.DB && (
                <div className="text-red-500 text-xs">{formik.errors.DB}</div>
              )}
            </div>
            <ExcelUploader onUpload={handleUpload} />
            <div className="flex-1  flex justify-center items-center">
              <button
                type="submit"
                className=" text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Cargar Datos
              </button>
            </div>
          </div>
          <div>
            <button onClick={handleTablaUsuario}>
              {usuariosVisible ? <FcCollapse /> : <FcExpand />}
            </button>
            <label className="text-white uppercase"> Usuarios</label>
            <div>
              {usuariosVisible && (
                <Tabla
                  columns={columnsUsers}
                  data={usuarios}
                  className="max-h-96"
                />
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
        </form>
      </div>
    </div>
  );
};

export default GestionarConjunto;
