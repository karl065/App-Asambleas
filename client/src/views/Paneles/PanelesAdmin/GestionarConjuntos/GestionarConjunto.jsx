/* eslint-disable react/prop-types */
/* eslint-disable no-case-declarations */
import Sidebar from '../../../../components/Sidebar/Sidebar';
import {useState} from 'react';
import Tabla from '../../../../components/Tabla/Tabla';
import {FcCollapse} from 'react-icons/fc';
import {FcExpand} from 'react-icons/fc';
import Switch from '@material-ui/core/Switch';
import {PiNotePencilFill} from 'react-icons/pi';
import {useDispatch, useSelector} from 'react-redux';
import ConectarDBs from '../../../../components/ConectarDB/ConectarDBs';
import {actualizarUsuarios} from '../../../../redux/actions';

const GestionarConjunto = () => {
  const predios = useSelector((state) => state.asambleas.predios);
  const usuarios = useSelector((state) => state.asambleas.usuarios);
  const dispatch = useDispatch();
  const [usuariosVisible, setUsuariosVisible] = useState(false);
  const [prediosVisible, setPrediosVisible] = useState(false);

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
            onChange={() =>
              actualizarUsuarios(
                row.original._id,
                {
                  userStatus: !row.original.userStatus,
                },
                dispatch
              )
            }
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

  return (
    <div className="flex p-2 ">
      <Sidebar />
      <div className="bg-black opacity-70 w-full m-2 rounded-lg p-5 space-y-5 overflow-y-auto">
        <ConectarDBs />
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
