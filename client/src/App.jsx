/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reLogin } from './redux/actions';
import Sidebar from './components/Sidebar/Sidebar';
import NavBar from './components/NavBar/NavBar';
import SidebarUsuario from './components/Sidebar/SidebarUsuario';
import { socket } from './helpers/Socket';
import {
	cargarMano,
	cargarPreguntas,
	cargarUsuariosSuccess,
	setDebate,
	setInterventores,
	setTemas,
	setTime,
} from './redux/appSlice';
import { alertInfo } from './helpers/Alertas';
import { adminReloginAction } from './redux/admin/actions/adminReloginAction';
import renderSidebar from './helpers/renderSidebar';
import { allRoutes } from './routes/routes';
import LoginForm from './views/Login/Login';

function App() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const login = useSelector((state) => state.adminLogin.login);
	// const mano = useSelector((state) => state.mano.mano);
	// const { pathname } = useLocation();
	const token = localStorage.getItem('token');
	const DBConectada = localStorage.getItem('connect');

	useEffect(() => {
		if (!token) {
			logout(dispatch, navigate);
		} else {
			adminReloginAction(token, DBConectada, dispatch, navigate);
		}
	}, []);

	const routesToRender = allRoutes[login.role] || [];

	return (
		<Routes>
			<Route path="/" element={<LoginForm />} />

			{routesToRender.map(({ path, element, layout: Layout }, i) => (
				<Route
					key={i}
					path={path}
					element={Layout ? <Layout>{element}</Layout> : element}
				/>
			))}
		</Routes>
	);
}

export default App;
