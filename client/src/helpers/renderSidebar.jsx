import Sidebar from '../components/Sidebar/Sidebar';
import SidebarUsuario from '../components/Sidebar/SidebarUsuario';

const renderSidebar = (pathname, login) => {
	if (pathname === '/') return null;
	if (login.role === 'View') return <SidebarUsuario />;
	return <Sidebar />;
};

export default renderSidebar;
