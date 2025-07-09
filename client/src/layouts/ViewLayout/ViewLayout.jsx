import NavBar from '../../components/NavBar/NavBar.jsx';

const ViewLayout = ({ children }) => {
	return (
		<div className="flex w-screen h-screen p-2 space-x-2">
			<NavBar />
			<div className="flex-1 overflow-y-auto">{children}</div>
		</div>
	);
};

export default ViewLayout;
