import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeScreen from './HomeScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProfileFirstScreen from './profile/ProfileFirstScreen'
import ProfileSecondScreen from './profile/ProfileSecondScreen'
import ProfileSettings from './profile/ProfileSettings'
import DiscountOfferScreen from './DiscountOfferScreen'
import SettingsScreen from './SettingsScreen'
import EditProfile from './EditProfile'
import ChangePassword from './ChangePassword'
import FAQ from './FAQ'
import TandA from './TandA'
import ContactUs from './ContactUs'
import CompleteProfileScreen from './CompleteProfileScreen'
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
        {/* <Stack.Screen name='DiscountOfferScreen' component={DiscountOfferScreen} /> */}
        <Stack.Screen name='SettingsScreen' component={SettingsScreen} />
        <Stack.Screen name='EditProfile' component={EditProfile} />
        <Stack.Screen name='FAQ' component={FAQ} />
        <Stack.Screen name='TandA' component={TandA} />
        <Stack.Screen name='ChangePassword' component={ChangePassword} />
        <Stack.Screen name='ContactUs' component={ContactUs} />
        <Stack.Screen name='CompleteProfileScreen' component={CompleteProfileScreen} />







    </Stack.Navigator>

  )
}

const styles = StyleSheet.create({})