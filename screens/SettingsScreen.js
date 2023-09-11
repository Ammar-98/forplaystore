import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
  Modal,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {Dimensions} from 'react-native';
import {Image} from 'react-native-elements';
import {useEffect} from 'react';
import {authSlice} from '../store/authSlice';
import {useSelector} from 'react-redux';
import {ScrollView} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as size from '../components/FontSize';
import jwtDecode from 'jwt-decode';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function SettingsScreen(props) {
  const atHome = useSelector(state => state.authSlice.atHome);
  const dispatch = useDispatch();
  const actions = authSlice.actions;
  const [showModal, setshowModal] = useState(false);
  const [deleteBool, setdeleteBool] = useState(false);
  const [loading, setloading] = useState(false);
  const saveToken = async token => {
    try {
      console.log('token:', token);
      await AsyncStorage.setItem('LoginToken', String(token));
    } catch (e) {
      console.log('e', e);
    }
  };

  const logOut = async () => {
    try {
      await saveToken('');
      setloading(false);
      dispatch(actions.setAuth(false));
    } catch (error) {}
  };
  const getUserToken = async () => {
    try {
      const savedToken = await AsyncStorage.getItem('LoginToken');

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
  const getUserID = async Token => {
    try {
      if (Token != null) {
        const decodedToken = await jwtDecode(Token);
        return decodedToken.id;
      } else {
        return null;
      }
    } catch (error) {
      console.log('Error decoding token:', error);
      return null;
    }
  };

  const DeleteAccount = async () => {
    setloading(true);
    try {
      const token = await getUserToken();
      console.log('token', token);
      const id = await getUserID(token);
      console.log('theID===>>>', id);
      const url = 'https://api.kachaak.com.sg/api/users/' + id;
      console.log('url:', url);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const res = axios.delete(url, config);
      console.log('res', res);
      logOut();
    } catch (error) {}
  };

  const ButtonView2 = item => {
    // console.log('item', item.name, item.route, item.bool);

    return (
      <TouchableOpacity onPress={() => setshowModal(true)}>
        <View style={{...styles.buttonView, backgroundColor: '#00BBB4'}}>
          <Text style={styles.buttonText}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const ButtonView = item => {
    // console.log('item', item.name, item.route, item.bool);

    if (item.bool == true) {
      return (
        <TouchableOpacity onPress={() => logOut()}>
          <View style={{...styles.buttonView, backgroundColor: '#00BBB4'}}>
            <Text style={styles.buttonText}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={() => props.navigation.navigate(item.route)}>
          <View style={{...styles.buttonView, backgroundColor: '#00BBB4'}}>
            <Text style={styles.buttonText}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  useEffect(() => {
    // dispatch(actions.setAtHome(false));
  }, []);

  return (
    <LinearGradient
      colors={[
        '#525461',
        '#343643',
        '#222431',
        '#1B1D2A',
        '#1B1D2A',
        '#1B1D2A',
      ]}
      style={{flex: 1}}>
      <ScrollView>
        <View style={styles.FullView}>
          <View style={styles.logoContainer}>
            <MaterialIcons name={'settings'} size={70} color="white" />
            <View
              style={{
                // height: windowHeight * 0.1,
                // backgroundColor: 'blue',
                width: windowWidth,
                alignItems: 'center',
                // justifyContent:'center'
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: size.large(),
                  fontWeight: 'bold',
                  textShadowColor: 'black',
                  textShadowOffset: {width: 0, height: 1},
                  textShadowRadius: 10,
                }}>
                Settings
              </Text>
            </View>
          </View>
          <View style={styles.optionsContainer}>
            <ButtonView
              name={'Edit Profile'}
              route={'EditProfile'}
              bool={false}
            />
            <ButtonView
              name={'Change Password'}
              route={'ChangePassword'}
              bool={false}
            />
            <ButtonView name={'FAQ'} route={'FAQ'} bool={false} />
            <ButtonView name={'Terms of use'} route={'TandA'} bool={false} />
            <ButtonView name={'Contact Us'} route={'ContactUs'} bool={false} />
            <ButtonView name={'Log Out'} route={''} bool={true} />
            <ButtonView2 name={'Delete Account'} route={''} bool={true} />
          </View>
        </View>
      </ScrollView>
      <Modal style={{flex: 1}} transparent visible={showModal}>
        <View
          style={{
            height: windowHeight,
            width: windowWidth,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              height: windowHeight * 0.5,
              width: windowWidth * 0.8,
              borderRadius: 20,
              backgroundColor: '#00BBB4',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {loading == true ? (
              <ActivityIndicator size={50} color={'white'} />
            ) : (
              <View>
                <Text
                  style={{color: 'white', fontSize: 18, textAlign: 'center'}}>
                  Are you sure you want to delete this account?
                </Text>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    marginTop: 20,
                  }}>
                  <TouchableOpacity
                    style={{
                      width: '30%',
                      backgroundColor: 'white',
                      alignItems: 'center',
                      paddingVertical: 10,
                      borderRadius: 15,
                    }}
                    onPress={() => DeleteAccount()}>
                    <Text style={{color: 'black', fontSize: 15}}>Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: '30%',
                      backgroundColor: 'white',
                      alignItems: 'center',
                      paddingVertical: 10,
                      borderRadius: 15,
                    }}
                    onPress={() => {
                      setshowModal(false);
                    }}>
                    <Text style={{color: 'black', fontSize: 15}}>No</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  FullView: {
    height: windowHeight,
    width: windowWidth,
    alignItems: 'center',
    //    justifyContent:'center'
  },
  logoContainer: {
    width: windowWidth,
    height: windowHeight * 0.2,
    alignItems: 'center',
    justifyContent: 'flex-end',
    // backgroundColor: 'red',
  },
  optionsContainer: {
    width: windowWidth,
    height: windowHeight * 0.7,
    // backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  buttonView: {
    width: windowWidth * 0.6,
    height: windowHeight * 0.07,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:'green',
    borderRadius: 7,
    // marginVertical: 10,
    // flexDirection:'row'
  },
  buttonText: {
    color: 'white',
    fontSize: size.medium(),
    textShadowColor: 'gray',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 5,
  },
});
