import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeScreen from './HomeScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProfileFirstScreen from './profile/ProfileFirstScreen'
import ProfileSecondScreen from './profile/ProfileSecondScreen'
import ProfileSettings from './profile/ProfileSettings'
import DiscountOfferScreen from './DiscountOfferScreen'
const Stack= createNativeStackNavigator()
export default function HomeStack() {
  return (
    
    <Stack.Navigator
    screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name='HomeScreen' component={HomeScreen} />
        <Stack.Screen name='ProfileFirstScreen' component={ProfileFirstScreen} />
        <Stack.Screen name='ProfileSecondScreen' component={ProfileSecondScreen} />
        <Stack.Screen name='ProfileSettings' component={ProfileSettings} />
        <Stack.Screen name='DiscountOfferScreen' component={DiscountOfferScreen} />




    </Stack.Navigator>

  )
}

const styles = StyleSheet.create({})