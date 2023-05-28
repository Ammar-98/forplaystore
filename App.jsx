// import LogoScreen from './screens/LogoScreen';
// import DropdownScreen from './screens/DropdownScreen';
import Screen1 from './screens/Screen1';
import Screen2 from './screens/Screen2';
import Screen3 from './screens/Screen3';
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import CompleteProfileScreen from './screens/CompleteProfileScreen';
import HomeScreen from './screens/HomeScreen';
import MenuScreen from './screens/MenuScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
} from 'react-native';

// import store from './store/index';

const Stack = createNativeStackNavigator();

function App() {

  return (
    // <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {/* <Stack.Screen name="DropdownScreen" component={DropdownScreen} /> */}
        <Stack.Screen name="Screen1" component={Screen1} />
        <Stack.Screen name="Screen2" component={Screen2} />
        <Stack.Screen name="Screen3" component={Screen3} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen
          name="CompleteProfileScreen"
          component={CompleteProfileScreen}
        />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="MenuScreen" component={MenuScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    // </Provider>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default App;
