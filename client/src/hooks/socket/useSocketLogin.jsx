import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../../helpers/Socket';
import { cargarUsuariosSuccess } from '../../redux/appSlice';

const useSocketLogin = () => {
	const login = useSelector((state) => state.asambleas.login);
	const dispatch = useDispatch();
	useEffect(() => {
		socket.emit('joinRoom', login.connectedDB);
		socket.on('login', (data) => {
			dispatch(cargarUsuariosSuccess(data));
		});
		return () => {
			socket.off('login');
		};
	}, []);
	return null;
};

export default useSocketLogin;
