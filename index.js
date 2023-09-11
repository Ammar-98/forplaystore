/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import * as firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
// import firebase from '@react-native-firebase/app';
import 'react-native-reanimated'
const firebaseConfig = {
  apiKey: 'AIzaSyB6kctUuZ5KdHO0PLsEylKY768dJJpgbh8',
  authDomain: 'engageapppushnotification.firebaseapp.com',
  projectId: 'engageapppushnotification',
  storageBucket: '.firebaseapp.com.appspot.com',
  messagingSenderId: '568493759154',
  appId: '1:568493759154:android:fd22832c4d08a928b907ab',
};
firebase.initializeApp(firebaseConfig);
console.log('hereIndex',)
messaging().getInitialNotification(async remoteMessage => {
    console.log('Message handled in the kill State!', remoteMessage);
  });
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
  
AppRegistry.registerComponent(appName, () => App);
