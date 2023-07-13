// import LogoScreen from './screens/LogoScreen';
// import DropdownScreen from './screens/DropdownScreen';
// import Screen1 from './screens/Screen1';
// import Screen2 from './screens/Screen2';
// import Screen3 from './screens/Screen3';
// import SignupScreen from './screens/SignupScreen';
// import LoginScreen from './screens/LoginScreen';
// import CompleteProfileScreen from './screens/CompleteProfileScreen';
// import HomeScreen from './screens/HomeScreen';
// import MenuScreen from './screens/MenuScreen';
// import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import jwtDecode from 'jwt-decode';
import { Alert } from 'react-native';
import store from './store';
import AppNavigation from './navigations/index';
import {useEffect} from 'react';
import { Permission } from 'react-native';
import { PermissionsAndroid } from 'react-native';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';
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



// const Stack = createNativeStackNavigator();
// const sendFmcTokenApi=async(token)=>{
//   try {
//     const urlToHit = 'https://api.kachaak.com.sg/api/users/fcmtoken';
//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     };
//     const body = JSON.stringify({
//       userId: email,
//       fcmToken: token,
//     });
//     const response = await axios.post(urlToHit, body, config);
//     console.log('response', response.data);
//     if (response.data !== undefined) {
//       saveToken(response.data.token);
//       setuserToken(response.data.token)
//       dispatch(actions.setAuth());
//     }
//   } catch (e) {
//     console.log('easass', e.response.data.error);
//     seterrorMessage(String(e.response.data.error));
//   }
// }
function App() {
  // const sendFmcToken = async () => {
  //   try {
  //     console.log('her')
  //     // await messaging().registerDeviceForRemoteMessages();
  //     const token = await messaging().getToken();
  //     console.log('token', token);

  //     // await axios.post('http://192.168.28.232:3000/register', {token});
  //     sendFmcTokenApi(token)
  //   } catch (err) {
  //     //Do nothing
  //     console.log(err.response.data);
  //     return;
  //   }
  // };
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived in foreground!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
  

  
  


  // useEffect(() => {
  //   sendFmcToken();  theapi
  // }, []);

  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>

    // <Provider store={store}>
    // <NavigationContainer>
    //   <Stack.Navigator
    //     screenOptions={{
    //       headerShown: false,
    //     }}>
    //     {/* <Stack.Screen name="DropdownScreen" component={DropdownScreen} /> */}
    //     <Stack.Screen name="Screen1" component={Screen1} />
    //     <Stack.Screen name="Screen2" component={Screen2} />
    //     <Stack.Screen name="Screen3" component={Screen3} />
    //     <Stack.Screen name="SignupScreen" component={SignupScreen} />
    //     <Stack.Screen name="LoginScreen" component={LoginScreen} />
    //     <Stack.Screen
    //       name="CompleteProfileScreen"
    //       component={CompleteProfileScreen}
    //     />
    //     <Stack.Screen name="HomeScreen" component={HomeScreen} />

    //     {/* <Stack.Screen name="MenuScreen" component={MenuScreen} /> */}
    //   </Stack.Navigator>

    // </NavigationContainer>
    // </Provider>
  );
}

// const styles = StyleSheet.create({
//   container: {},
// });

export default App;
