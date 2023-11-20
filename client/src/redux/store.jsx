// src/redux/store.js
import {configureStore} from '@reduxjs/toolkit';
import appReducer from './appSlice';
import thunk from 'redux-thunk';

const store = configureStore({
  reducer: {
    asambleas: appReducer,
  },
  middleware: [thunk],
});

export default store;
