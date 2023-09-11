import React, {useEffect} from 'react';
import {
  ImageBackground,
  text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
} from 'react-native';
// import Wallet from './wallet/Wallet';
// import Bulletin from './bulletin/Bulletin';
import {useFocusEffect} from '@react-navigation/native';
import {request,check, PERMISSIONS, RESULTS,requestNotifications} from 'react-native-permissions';

import {useDispatch} from 'react-redux';
import {authSlice} from '../store/authSlice';
import {useSelector} from 'react-redux';
import Profile from './profile/Profile';
import {axiosPost} from '../axios/axios';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import {useContext} from 'react';
import AppContext from '../components/AppContext';
import messaging from '@react-native-firebase/messaging';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {Text} from 'react-native-elements';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
function HomeScreen({navigation}) {
  const {userToken} = useContext(AppContext);
  const getuserID = token => {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.id;
    } catch (error) {
      console.log('Error decoding token:', error);
      return null;
    }
  };
  const atHome = useSelector(state => state.authSlice.atHome);
  const dispatch = useDispatch();
  const actions = authSlice.actions;

  const getUserToken = async () => {
    try {
      const savedToken = await AsyncStorage.getItem('LoginToken');

      console.log('savedTokenxxxxxxxx', savedToken);

      if (savedToken != null) {
        return savedToken;
      } else {
        return null;
      }
    } catch (err) {
      console.log('getUserTokenError', err);
      return null;
    }
  };
  const Permission = async () => {
    try {
      // Request notification permission
      if(Platform.OS=='ios')
      {
        const authstatus=await messaging().requestPermission()
        const enabled=
       authstatus=== messaging.AuthorizationStatus.AUTHORIZED||
        authstatus===messaging.AuthorizationStatus.PROVISIONAL
        if(enabled)
        {
          console.log('Authorization status', authstatus)
        
        }
        console.log('authstatus====>>', authstatus)
      //   const result = await requestNotifications(['alert','sound']);
      // console.log('Permission result', result); // Log the result


      }
      if(Platform.OS=='android')
      {
        const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
      console.log('Permission result', result); // Log the result

      }
      
      console.log('In Else'); // Log the result
    } catch (error) {
      console.log('Permission error', error);
    }
  };

  const sendFmcTokenApi = async token => {
    try {
      const urlToHit = 'https://api.kachaak.com.sg/api/users/fcmtoken';
      const Utoken = await getUserToken();
      const config = {
        headers: {
          Authorization: `Bearer ${Utoken}`,
          'Content-Type': 'application/json',
        },
      };
      const userID = await getuserID(Utoken);
      console.log('userID', userID);
      console.log('token', token);
      const body = JSON.stringify({
        userId: userID,
        fcmToken: token,
      });
      const response = await axiosPost(urlToHit, body, config);
      console.log('responsefcm', response.data);
    } catch (e) {
      console.log('easass', e.response.data);
      // seterrorMessage(String(e.response.data.error));
    }
  };

  const getFmcToken = async () => {
    try {
      console.log('her');
      // await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();
      console.log('token', token);

      // await axios.post('http://192.168.28.232:3000/register', {token});
      sendFmcTokenApi(token);

    } catch (err) {
      //Do nothing
      console.log('FCM Erro');
      return;
    }
  };

  useEffect(() => {
    dispatch(actions.setAtHome(true));
    getFmcToken();
    Permission()

  }, []);
  useFocusEffect(
    React.useCallback(() => {
      // This function will be called when the screen comes into focus

      // You can perform any logic or fetch data here

      dispatch(actions.setAtHome(true));
      console.log('trueAthome');
      // Returning a cleanup function
      return () => {
        dispatch(actions.setAtHome(false));
        console.log('falseAthome');
        // This function will be called when the screen loses focus
        // You can perform any cleanup logic here
      };
    }, []),
  );
  return (
    <ImageBackground source={require('../assets/homeBg.png')} style={{flex: 1}}>
      <View style={styles.continer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Wallet');
            dispatch(actions.setAtHome(false));
          }}>
          <Image
          resizeMode='contain'
            style={styles.logo}
            source={require('../assets/walletLogo.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          // onPress={() => {
          //   navigation.navigate('Bulletin');
          //   dispatch(actions.setAtHome(false));
          // }}
          onPress={() => {
            navigation.navigate('ProfileFirstScreen');
            dispatch(actions.setAtHome(false));
          }}>
          <Image
          resizeMode='contain'
            style={styles.logo}
            source={require('../assets/album.png')}
            // onPress={navigation.navigate('WalletFirstScreen')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('DiscountOfferScreen');
            dispatch(actions.setAtHome(false));
          }}>
          <Image
          resizeMode='contain' style={styles.logo} source={require('../assets/deals.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Bulletin');
            dispatch(actions.setAtHome(false));
          }}>
          <Image
          resizeMode='contain' style={styles.logo} source={require('../assets/jobs.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('LocateUs');
            dispatch(actions.setAtHome(false));
          }}>
          <Image
          resizeMode='contain'
            style={styles.logo}
            source={require('../assets/locateLogo.png')}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: windowHeight * 0.1,
          width: windowWidth,
          // backgroundColor: 'orange',
          // bottom: '5%',
          paddingHorizontal: '5%',
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')}>
        <MaterialIcons
                name={ 'settings'}
                size={35}
                color="white"
              />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Scan');
            dispatch(actions.setAtHome(false));
          }}>
          <MaterialIcons
                name={ 'qr-code-scanner'}
                size={35}
                color="white"
              />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  continer: {
    paddingTop:windowHeight*0.05,
    justifyContent: 'space-evenly',
    height: windowHeight * 0.9,
    width: windowWidth,
    alignItems: 'center',
    // gap: 12,
    // backgroundColor: 'red',
  },
  logo: {width: windowHeight*0.12, height: windowHeight*0.12},
  logoBottom: {width: windowHeight*0.26, height: windowHeight*0.06},
});

export default HomeScreen;
