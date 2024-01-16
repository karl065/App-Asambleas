import {BiX} from 'react-icons/bi';

const RespuestasInputs = ({
  values,
  touched,
  errors,
  onChange,
  onBlur,
  handleEliminarRespuestas,
}) => {
  return values.map((respuesta, index) => (
    <div key={index} className="justify-center items-center space-x-2">
      <hr />
      <div className="flex w-full">
        <div>
          <label
            className="text-white"
            htmlFor={`respuestas.${index}.opcion`}
          >{`Opcion ${respuesta.opcion || ''}.`}</label>
          <input
            type="text"
            id={`respuestas.${index}.respuesta`}
            name={`respuestas.${index}.respuesta`}
            onChange={onChange}
            onBlur={onBlur}
            value={respuesta.respuesta}
            className={`bg-blue-700 uppercase border-4 w-max border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-black dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
              touched?.respuestas?.[index]?.respuesta &&
              errors?.respuestas?.[index]?.respuesta
                ? 'border-red-500'
                : ''
            }`}
            placeholder={`Respuesta ${respuesta.opcion || ''}`}
          />
          {touched?.respuestas?.[index]?.respuesta &&
            errors?.respuestas?.[index]?.respuesta && (
              <div className="text-red-500 text-xs">
                {errors.respuestas[index].respuesta}
              </div>
            )}
        </div>
        <div className="flex p-4 w-full  justify-center ">
          <button
            type="button"
            className="text-red-500 bg-blue-700 uppercase sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:placeholder-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
            onClick={() => handleEliminarRespuestas(index)}
          >
            <BiX size={24} />
          </button>
        </div>
      </div>
    </div>
  ));
};

export default RespuestasInputs;
