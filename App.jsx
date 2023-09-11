import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import jwtDecode from 'jwt-decode';
import Toast from 'react-native-toast-notifications';
import {ToastProvider} from 'react-native-toast-notifications';
import {Alert} from 'react-native';
import store from './store';
import AppNavigation from './navigations/index';
import {useEffect} from 'react';
import {Permission} from 'react-native';
import {PermissionsAndroid} from 'react-native';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';
import * as firebase from '@react-native-firebase/app';

function App() {
  const firebaseConfig = {
    apiKey: 'AIzaSyB6kctUuZ5KdHO0PLsEylKY768dJJpgbh8',
    authDomain: 'engageapppushnotification.firebaseapp.com',
    projectId: 'engageapppushnotification',
    storageBucket: '.firebaseapp.com.appspot.com',
    messagingSenderId: '568493759154',
    appId: '1:568493759154:android:fd22832c4d08a928b907ab',
  };
 

  useEffect(() => {

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(
        JSON.stringify(remoteMessage.notification.title),
        String(JSON.stringify(remoteMessage.notification.body)),
      );
    });
    return unsubscribe;
  }, []);

  return (
    <Provider store={store}>
      <ToastProvider>
        <AppNavigation />
      </ToastProvider>
    </Provider>
  );
}

export default App;
