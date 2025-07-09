import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cargarManos, logout } from '../../redux/actions';
import { GoMoveToStart } from 'react-icons/go';
import { alertInfo } from '../../helpers/Alertas';

const NavBar = () => {
	const connectedDB = useSelector((state) => state.conectarDB.DBConectada);
	const login = useSelector((state) => state.adminLogin.login);
	const interventores = useSelector(
		(state) => state.interventores.interventores
	);
	const mano = useSelector((state) => state.mano.mano);

	const location = useLocation();

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLevantarMano = () => {
		const actualIntervenciones = [...interventores];
		const idExiste = actualIntervenciones.some(
			(usuarioInter) => usuarioInter.id === login._id
		);
		const idMano = mano.some((usuarioMano) => usuarioMano.id === login._id);
		if (idExiste) {
			alertInfo('Espere su turno para intervenir');
		} else {
			if (idMano) {
				alertInfo('!Su solicitud esta en proceso por favor espere');
			} else {
				cargarManos(
					{
						id: login._id,
						nombre: `${login.primerNombre} ${login.primerApellido} ✋`,
					},
					connectedDB,
					dispatch
				);
				alertInfo('¡Levantaste la mano, espera tu turno!');
			}
		}
	};

	const handleLogOut = (e) => {
		e.preventDefault();
		logout(dispatch, navigate, login._id, connectedDB);
	};

	return (
		<div className="flex w-[310px] lg:w-auto h-auto items-center justify-center">
			<div className="flex justify-center w-full p-2 bg-black rounded-lg opacity-70">
				<div className="w-full bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
					<div className="flex justify-center p-2 border-2 border-black rounded-lg">
						<div
							className={`${
								login.role === 'View'
									? 'flex flex-1 justify-end p-2'
									: 'flex flex-1 justify-center p-2'
							}`}>
							<h1 className="text-sm font-bold text-black uppercase dark:text-white lg:text-lg">{`Conjunto ${connectedDB}`}</h1>
						</div>
						{login.role === 'View' && (
							<div className="flex justify-end flex-1 p-2 space-x-2 ">
								{location.pathname !== '/view' && (
									<Link to="/view">
										<GoMoveToStart style={{ color: 'white' }} size={34} />
									</Link>
								)}
								<button
									onClick={handleLogOut}
									className="flex items-center justify-center w-8 h-8 text-white bg-red-500 rounded-full hover:bg-red-300 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="w-6 h-6"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="4"
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							</div>
						)}
						{login.role === 'Propietario' ||
						login.role === 'Propietario-Empoderado' ||
						login.role === 'Empoderado' ? (
							<button className="w-20 text-4xl" onClick={handleLevantarMano}>
								✋
							</button>
						) : null}
					</div>
				</div>
			</div>
		</div>
	);
};

export default NavBar;
