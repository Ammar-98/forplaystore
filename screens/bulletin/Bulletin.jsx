// import React, {useState} from 'react';
import {View, Image, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BulletinFirstScreen from './BulletinFirstScreen'
import BulletinSecondScreen from './BulletinSecondScreen'
import JobDescription from './JobDescription';
// import ButtonGradient from '../components/ButtonGradient'
// import WalletFirstScreen from './WalletFirstScreen';
// import WalletSecondScreen from './WalletSecondScreen';
// import { chaakSlice } from '../../store/chaakSlice';

const Stack = createNativeStackNavigator();
console.log(Stack.Screen);

function Bulletin() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="BulletinScreen1" component={BulletinFirstScreen} />
        <Stack.Screen name="BulletinScreen2" component={BulletinSecondScreen} />
        <Stack.Screen name="JobDescription" component={JobDescription} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Bulletin;
