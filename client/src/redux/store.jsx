// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

const store = configureStore({
	reducer: rootReducer,
	middleware: [thunk],
});

export default store;
