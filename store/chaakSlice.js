import {createSlice} from '@reduxjs/toolkit';

export const chaakSlice = createSlice({
  name: 'chaakSlice',
    initialState: {
      totalChaaks:2788,
      receivedChaaks:0
    // isAuth: false,
    // atHome: true,

  },
    reducers: {
      
    // setAuth: state => {
    //   state.isAuth = !state.isAuth;
    // },
    // setAtHome: (state, action) => {
    //   state.atHome = action.payload;
    // },
  },
});
