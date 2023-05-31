import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigation from './AuthNavigation';
import MenuNavigation from './MenuNavigation'
import {useSelector, useDispatch} from 'react-redux';
// import {authSlice} from '../store/authSlice';
// import {} from '../store/authSlice'

function AppNavigation() {
    const dispatch = useDispatch();
    // const actions = authSlice.actions;
    // const [isAuth,setIsAuth] = false
  const isAuth = useSelector(state => state.authSlice.isAuth);
  console.log(isAuth)
    return (
      <NavigationContainer>
            {isAuth ?
            <MenuNavigation/>
            :    
            <AuthNavigation />
            }
            
      </NavigationContainer>
    );
}

export default AppNavigation;
