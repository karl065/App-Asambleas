/* eslint-disable react/prop-types */
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useSelector} from 'react-redux';
import Tabla from '../Tabla/Tabla';
import {FaCheck} from 'react-icons/fa6';
import {setInterventoresAction, setManos} from '../../redux/actions';
import {alertInfo} from '../../helpers/Alertas';

const LevantaronMano = () => {
  const mano = useSelector((state) => state.asambleas.mano);
  const usuarios = useSelector((state) => state.asambleas.usuarios);
  const interventores = useSelector((state) => state.asambleas.interventores);
  const DBConectada = useSelector((state) => state.asambleas.DBConectada);
  const temas = useSelector((state) => state.asambleas.temas);

  const validationSchema = Yup.object({
    tema: Yup.string().required('Tiene que elegir un tema obligatoriamente'),
  });

  const formik = useFormik({
    initialValues: {
      tema: '',
    },
    validationSchema: validationSchema,
  });

  const filtroRepetidos = {};
  const listaMano = mano
    .map((usuario) => {
      const nombre = usuario.nombre.replace(/✋/g, '').trim();

      if (!filtroRepetidos[nombre]) {
        filtroRepetidos[nombre] = true;
        return {id: usuario.id, nombre};
      }

      return null;
    })
    .filter(Boolean);

  const handleAceptarIntervenciones = (usuario) => {
    const actualIntervenciones = [...interventores];
    const idExiste = actualIntervenciones.some(
      (usuarioInter) => usuarioInter.id === usuario.id
    );
    if (!idExiste) {
      actualIntervenciones.push(usuario);
      setInterventoresAction(actualIntervenciones, DBConectada);
      const nuevoMano = mano.filter((user) => user.id !== usuario.id);
      setManos(nuevoMano, DBConectada);
    } else {
      alertInfo('Usuario en espera de intervención');
    }
  };

  const columnasMano = [
    {Header: 'NOMBRE', accessor: 'nombre'},
    {Header: 'TORRE/MZ', accessor: 'torreMz'},
    {Header: 'PREDIO', accessor: 'predio'},
    {
      Header: 'ACCIONES',
      accessor: 'icon',
      Cell: ({row}) => (
        <button
          type="submit"
          className="bg-green-500 rounded-full p-2"
          onClick={() => handleAceptarIntervenciones(row.original)}
          title="Aceptar intervención"
        >
          <FaCheck style={{color: 'white'}} />
        </button>
      ),
    },
  ];

  const data = Array.isArray(listaMano)
    ? listaMano.map((item) => ({
        ...item,
        torreMz:
          usuarios.find((usuario) => usuario._id === item.id)?.predios[0]
            .torreMz || 'Torre/Mz no encontrada',
        predio:
          usuarios.find((usuario) => usuario._id === item.id)?.predios[0]
            .predio || 'Torre/Mz no encontrada',
      }))
    : [];

  return (
    <div className="w-full space-y-2">
      <div>
        <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
          <div className="flex space-x-4 items-center justify-center ">
            <div className="flex-1 relative">
              <select
                name="tema"
                id="tema"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.tema}
                className={`bg-blue-700 uppercase border-4 border-black inline-block text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-black dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                  formik.touched.tema && formik.errors.tema
                    ? 'border-red-500'
                    : ''
                }`}
              >
                <option value="">Seleccione un tema</option>
                {temas.map((tema) => (
                  <option value={tema._id} key={tema._id}>
                    {tema.tema}
                  </option>
                ))}
              </select>
              <div
                className={`text-xs bg-black font-bold border-2 rounded-lg p-2 text-red-500 absolute top-full z-10 ${
                  formik.touched.tema && formik.errors.tema
                    ? 'visible'
                    : 'hidden'
                }`}
              >
                {formik.errors.tema}
              </div>
            </div>
          </div>
          <Tabla columns={columnasMano} data={data} className="w-full" />
        </form>
      </div>
    </div>
  );
};

export default LevantaronMano;
