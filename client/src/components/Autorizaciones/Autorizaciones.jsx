/* eslint-disable react/prop-types */

import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {actualizarUsuarios} from '../../redux/actions';
import {alertSuccess} from '../../helpers/Alertas';

const Autorizaciones = ({idUser}) => {
  const usuarios = useSelector((state) => state.asambleas.usuarios);
  const dispatch = useDispatch();
  const [poder, setPoder] = useState(false);
  const [idAutorizado, setIdAutorizado] = useState('');

  const handleAsignar = () => {
    actualizarUsuarios(idUser, {autorizado: idAutorizado}, dispatch);
    alertSuccess('Empoderado Asignado');
  };

  const handleSelectChange = (e) => {
    setIdAutorizado(e.target.value);
  };

  return (
    <div>
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
        <div className="flex space-x-2">
          <select
            name="Autorizacion"
            id="Autorizacion"
            className="bg-blue-700 uppercase border-4 border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-black dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Asignar
          </button>
        </div>
      )}
    </div>
  );
};

export default Autorizaciones;
