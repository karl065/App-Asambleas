import NavBar from '../../components/NavBar/NavBar.jsx';
import SidebarUsuario from '../../components/Sidebar/SidebarUsuario.jsx';

const ClienteLayout = ({ children }) => {
	return (
		<div className="flex w-screen h-screen p-2 space-x-2">
			<SidebarUsuario />
			<div className="flex flex-col flex-1 space-y-2">
				<NavBar />
				<div className="flex-1 overflow-y-auto">{children}</div>
			</div>
		</div>
	);
};

export default ClienteLayout;
