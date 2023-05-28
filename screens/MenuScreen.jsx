import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import ChaakReceived from '../components/ChaaksReceived';
import NavBarBottom from '../components/NavBarBottom';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WalletFirstScreen from './WalletFirstScreen';

const Stack = createNativeStackNavigator();

function MenuScreen() {
  return (
    <>
      <NavigationContainer independent={true}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen
            name="WalletFirstScreen"
            component={WalletFirstScreen}
          />
          {/* <Stack.Screen name="ProfileScreen" component={ProfileScreen} /> */}
        </Stack.Navigator>
        <NavBarBottom />
      </NavigationContainer>
    </>
  );
}

export default MenuScreen;
