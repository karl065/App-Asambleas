import AdminLayout from '../../layouts/AdminLayout/AdminLayout.jsx';
import {
	ActualizarPreguntas,
	ActualizarUsuarios,
	ControlAsamblea,
	CrearConjunto,
	CrearEmpoderado,
	CrearPredios,
	CrearPreguntas,
	CrearTema,
	CrearUsuarios,
	GestionarConjunto,
	GestionarPreguntas,
	IngresoAdmin,
} from '../../views/Paneles/PanelesAdmin/VistasAdmin.jsx';

const rawRoutes = [
	{ path: '/admin', element: <IngresoAdmin /> },
	{ path: '/CrearUsuario', element: <CrearUsuarios /> },
	{
		path: '/ControlAsambleas',
		element: <ControlAsamblea />,
	},
	{ path: '/CrearConjunto', element: <CrearConjunto /> },

	{
		path: '/GestionarConjunto',
		element: <GestionarConjunto />,
	},
	{ path: '/CrearPredio', element: <CrearPredios /> },
	{
		path: '/actualizarUsuario',
		element: <ActualizarUsuarios />,
	},
	{ path: '/CrearPreguntas', element: <CrearPreguntas /> },
	{
		path: '/GestionarPreguntas',
		element: <GestionarPreguntas />,
	},
	{
		path: '/ActualizarPreguntas',
		element: <ActualizarPreguntas />,
	},
	{
		path: '/ActualizarUsuario',
		element: <ActualizarUsuarios />,
	},
	{
		path: '/CrearEmpoderado',
		element: <CrearEmpoderado />,
	},
	{ path: '/crearTema', element: <CrearTema /> },
];

export const adminRoutes = rawRoutes.map((route) => ({
	...route,
	layout: AdminLayout,
}));
