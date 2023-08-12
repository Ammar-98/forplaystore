// import React, {useState} from 'react';
import {View, Image, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import ButtonGradient from '../components/ButtonGradient'
import WalletFirstScreen from './WalletFirstScreen';
import WalletSecondScreen from './WalletSecondScreen';
import RedeemHistory from './RedeemHistory';
import { useState,useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React from 'react';
// import { chaakSlice } from '../../store/chaakSlice';
const Stack = createNativeStackNavigator();
console.log(Stack.Screen)

function Wallet() {


  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={
          {
            headerShown:false
          }
      }
      >
        <Stack.Screen
          name="WalletScreen1"
          component={WalletFirstScreen}
        />
        <Stack.Screen
          name="WalletSecondScreen"
          component={WalletSecondScreen}
        />
        
        <Stack.Screen
          name="RedeemHistory"
          component={RedeemHistory}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Wallet;
