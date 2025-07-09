import NavBar from '../../components/NavBar/NavBar.jsx';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';

const AdminLayout = ({ children }) => {
	return (
		<div className="flex w-screen h-screen p-2 space-x-2">
			<Sidebar />
			<div className="flex flex-col flex-1 space-y-2 ">
				<NavBar />
				<div className="flex-1 ">{children}</div>
			</div>
		</div>
	);
};

export default AdminLayout;
