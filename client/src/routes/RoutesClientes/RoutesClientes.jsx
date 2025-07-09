import ClienteLayout from '../../layouts/ClienteLayout/ClienteLayout.jsx';
import {
	ActualizarDatos,
	IngresoCliente,
	ResponderPreguntas,
	Voto,
} from '../../views/Paneles/PanelesClientes/VistasClientes.jsx';

const rawRoutes = [
	{ path: '/usuario', element: <IngresoCliente /> },
	{ path: '/ActualizarDatos', element: <ActualizarDatos /> },
	{ path: '/ResponderPreguntas', element: <ResponderPreguntas /> },
	{ path: '/Voto', element: <Voto /> },
];

export const clientesRoutes = rawRoutes.map((route) => ({
	...route,
	layout: ClienteLayout,
}));
