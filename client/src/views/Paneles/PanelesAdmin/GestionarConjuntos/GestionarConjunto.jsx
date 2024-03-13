/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-case-declarations */
import {useState} from 'react';
import Tabla from '../../../../components/Tabla/Tabla';
import {FcCollapse} from 'react-icons/fc';
import {FcExpand} from 'react-icons/fc';
import Switch from '@mui/material/Switch';
import {PiNotePencilFill} from 'react-icons/pi';
import {useSelector} from 'react-redux';
import ConectarDBs from '../../../../components/ConectarDB/ConectarDBs';
import {actualizarUsuarios} from '../../../../redux/actions';
import {useNavigate} from 'react-router-dom';

const GestionarConjunto = () => {
  const predios = useSelector((state) => state.asambleas.predios);
  const usuarios = useSelector((state) => state.asambleas.usuarios);
  const DBConectada = useSelector((state) => state.asambleas.DBConectada);
  const navigate = useNavigate();
  const [usuariosVisible, setUsuariosVisible] = useState(false);
  const [prediosVisible, setPrediosVisible] = useState(false);

  const handleIconButton = (doc) => {
    navigate(`/actualizarUsuario?doc=${doc}`);
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
              actualizarUsuarios(row.original._id, {
                DBConectada,
                updateUser: {userStatus: !row.original.userStatus},
              })
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
      Cell: ({row}) => (
        <button
          className="bg-yellow-400 p-2 rounded-full"
          onClick={() => handleIconButton(row.original.documento)}
        >
          <PiNotePencilFill style={{color: 'white'}} size={24} />
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
    <div className="flex">
      <div className="bg-black opacity-70 w-full  rounded-lg p-5 space-y-5 overflow-y-auto">
        <div className=" bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
          <div className="md:space-y-6 sm:p-8 border-2 border-black rounded-lg">
            <ConectarDBs />
            <div>
              <button onClick={handleTablaUsuario}>
                {usuariosVisible ? <FcCollapse /> : <FcExpand />}
              </button>
              <label className="text-white uppercase"> Usuarios</label>
              <div>
                {usuariosVisible && (
                  <Tabla
                    columns={columnsUsers}
                    data={data}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestionarConjunto;
