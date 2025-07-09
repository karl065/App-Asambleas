import { combineReducers } from '@reduxjs/toolkit';

// App Slices

import loadingReducer from './app/slices/loadingSlice.jsx';
import errorUsuariosReducer from './app/slices/errorSlices/errorUsuariosSlice.jsx';
import errorDBsReducer from './app/slices/errorSlices/errorDBsSlice.jsx';

// Admin Slices
import adminLoginReducer from './admin/slices/loginSlice.jsx';
import dbReducer from './admin/slices/dbSlice.jsx';
import temasReducer from './admin/slices/temasSlice.jsx';
import usuariosReducer from './admin/slices/usuariosSlice.jsx';
import timeReducer from './admin/slices/timeSlice.jsx';
import rolesReducer from './admin/slices/rolesSlice.jsx';

// Shared Slices
import activosReducer from './shared/slices/activosSlices.jsx';
import manoReducer from './shared/slices/manoSlices.jsx';
import interventoresReducer from './shared/slices/interventoresSlices.jsx';
import preguntasReducer from './shared/slices/preguntasSlices.jsx';
import conectarDBReducer from './shared/slices/conectarDBSlices.jsx';

const appReducer = combineReducers({
	// App Reducers
	loading: loadingReducer,
	errorUsuarios: errorUsuariosReducer,
	errorDBs: errorDBsReducer,

	// Admin Reducers
	adminLogin: adminLoginReducer,
	db: dbReducer,
	temas: temasReducer,
	usuarios: usuariosReducer,
	time: timeReducer,
	roles: rolesReducer,

	// Shared Reducers
	activos: activosReducer,
	mano: manoReducer,
	interventores: interventoresReducer,
	preguntas: preguntasReducer,
	conectarDB: conectarDBReducer,
});

export default appReducer;
