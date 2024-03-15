/* eslint-disable react/prop-types */

import {useState} from 'react';
import {useSelector} from 'react-redux';
import {actualizarUsuarios} from '../../redux/actions';
import {alertSuccess} from '../../helpers/Alertas';

const Autorizaciones = ({idUser}) => {
  const usuarios = useSelector((state) => state.asambleas.usuarios);
  const DBConectada = useSelector((state) => state.asambleas.DBConectada);
  const [poder, setPoder] = useState(false);
  const [idAutorizado, setIdAutorizado] = useState('');

  const handleAsignar = () => {
    const dataUpdate = {
      DBConectada,
      updateUser: {autorizado: idAutorizado},
    };
    actualizarUsuarios(idUser, dataUpdate);
    alertSuccess('Empoderado Asignado');
  };

  const handleSelectChange = (e) => {
    setIdAutorizado(e.target.value);
  };

  return (
    <div className="space-y-2">
      <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem] space-x-2">
        <input
          className={`rounded-xl ${
            idUser
              ? 'form-checkbox text-primary-600 transition duration-150 ease-in-out cursor-pointer '
              : 'opacity-60 cursor-not-allowed'
          }`}
          type="checkbox"
          checked={poder}
          onChange={(e) => {
            setPoder(e.target.checked);
          }}
          id="checkboxChecked"
          disabled={!idUser}
        />
        <label
          className={`uppercase text-white ${
            idUser
              ? 'inline-block pl-[0.15rem] hover:cursor-pointer '
              : 'opacity-60 cursor-not-allowed'
          }`}
          htmlFor="checkboxChecked"
        >
          Dar Poder
        </label>
      </div>
      {poder && (
        <div className="flex-col flex lg:flex-row space-y-2 lg:space-y-0 lg:space-x-2 ">
          <select
            name="Autorizacion"
            id="Autorizacion"
            className=" uppercase border-4  sm:text-sm rounded-lg block p-2.5 bg-gray-700 border-black placeholder-white text-white focus:ring-blue-500 focus:border-blue-500"
            onChange={handleSelectChange}
            value={idAutorizado}
          >
            <option value="">Seleccione Empoderado</option>
            {usuarios
              .filter(
                (usuario) =>
                  !['SuperAdmin', 'Admin', 'Presidente'].includes(usuario.role)
              )
              .map((usuario) => (
                <option value={usuario._id} key={usuario._id}>
                  {usuario.primerNombre + ' ' + usuario.primerApellido}
                </option>
              ))}
          </select>
          <button
            type="button"
            onClick={handleAsignar}
            className="text-white bg-primary-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm p-2 text-center  hover:bg-primary-700 focus:ring-primary-800"
          >
            Asignar
          </button>
        </div>
      )}
    </div>
  );
};

export default Autorizaciones;
