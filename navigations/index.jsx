import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigation from './AuthNavigation';
import MenuNavigation from './MenuNavigation'
import {useSelector, useDispatch} from 'react-redux';
import { useState } from 'react';
// import {authSlice} from '../store/authSlice';
// import {} from '../store/authSlice'
import AppContext from '../components/AppContext';
function AppNavigation() {
    const dispatch = useDispatch();
    // const actions = authSlice.actions;
    // const [isAuth,setIsAuth] = false
  const isAuth = useSelector(state => state.authSlice.isAuth);
  console.log('theCheck===>',isAuth)
  const [totalChaakPoints, settotalChaakPoints] = useState(0)
  const [userToken, setuserToken] = useState('')
    return (
      <AppContext.Provider value={{totalChaakPoints,settotalChaakPoints,userToken,setuserToken}}>
      <NavigationContainer>
            {isAuth ?
            <MenuNavigation/>
            :    
            <AuthNavigation />
            }
            
      </NavigationContainer>
      </AppContext.Provider>
    );
}

export default AppNavigation;
