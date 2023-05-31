import {configureStore} from '@reduxjs/toolkit';
import {authSlice} from './authSlice';
import {chaakSlice} from './chaakSlice';

const store = configureStore({
  reducer: {
    authSlice: authSlice.reducer,
    chaakSlice: chaakSlice.reducer,
  },
});

export default store;
