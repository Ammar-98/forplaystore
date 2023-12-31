import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import ProfileFirstScreen from './ProfileFirstScreen';
import ProfileSecondScreen from './ProfileSecondScreen';
const Stack = createNativeStackNavigator();
console.log(Stack.Screen);

const Profile = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="ProfileFirstScreen" component={ProfileFirstScreen} />
        {/* <Stack.Screen name="ProfileSecondScreen" component={ProfileSecondScreen} /> */}

        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Profile;
