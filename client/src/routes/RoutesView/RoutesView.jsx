import ViewLayout from '../../layouts/ViewLayout/ViewLayout.jsx';
import {
	IngresoView,
	ViewRespuestas,
} from '../../views/Paneles/PanelesView/VistasView.jsx';

const rawRoutes = [
	{ path: '/view', element: <IngresoView /> },
	{ path: '/viewRespuestas', element: <ViewRespuestas /> },
];

export const viewRoutes = rawRoutes.map((route) => ({
	...route,
	layout: ViewLayout,
}));
