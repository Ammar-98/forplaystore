import React, {useState} from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import CheckBox from '@react-native-community/checkbox';
import EmailPass from '../components/EmailPass';
import Logolg from '../components/Logolg';
import ButtonGradient from '../components/ButtonGradient';
import Button from '../components/Button';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {authSlice} from '../store/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';
import AppContext from '../components/AppContext';
import {useContext} from 'react';
import {axiosPost} from '../axios/axios';
import {axiosPostAuth} from '../axios/axios';
import {Dimensions} from 'react-native';
import * as size from '../components/FontSize';
// import tw from 'nativewind'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const LoginScreen = props => {
  const {userToken, setuserToken} = useContext(AppContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, seterrorMessage] = useState('');
  const [loading, setloading] = useState(true);
  console.log(password);
  console.log(email);
  console.log(rememberMe);

  const dispatch = useDispatch();
  const actions = authSlice.actions;

  const handleEmailChange = text => {
    setEmail(text), seterrorMessage('');
  };
  const handlePasswordChange = text => setPassword(text);
  const handleRememberMeChange = () => setRememberMe(!rememberMe);

  const CheckToken = async () => {
    try {
      const SavedToken = await AsyncStorage.getItem('LoginToken');
      console.log('SavedToken', SavedToken);
      setuserToken(SavedToken);
      if (SavedToken !== null) {
        // setloading(false);
        console.log('inherrererererer');
        dispatch(actions.setAuth(true));
        // props.navigation.navigate('CompleteProfileScreen');
      } else {
        setloading(false);
      }
    } catch (e) {
      console.log('e', e.response);
      setloading(false);
    }
  };

  const saveToken = async token => {
    try {
      console.log('token:', token);
      await AsyncStorage.setItem('LoginToken', String(token));
    } catch (e) {
      console.log('e', e);
    }
  };

  const validateEmail = email => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    console.log('BOOL', emailRegex.test(email));
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    console.log('email', email)
    console.log('password', password)
    seterrorMessage('');
    if (validateEmail(email)) {
      if (String(password).length >= 8) {
        try {
          setloading(true);
          const urlToHit = 'https://api.kachaak.com.sg/api/auth/user/login';
          const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const body = JSON.stringify({
            email: email,
            password: password,
          });
          const response = await axiosPostAuth(urlToHit, body, config);
          console.log('response', response.data);
          if (response.data !== undefined) {
            saveToken(response.data.token);
            setuserToken(response.data.token);
            // setloading(false);
            // dispatch(actions.setAuth());
            props.navigation.navigate('CompleteProfileScreen');
          } else {
            setloading(false);
            Alert.alert('Login error:100');
          }
        } catch (e) {
          console.log('easass', e.response.data.error);
          setloading(false);
          seterrorMessage(String(e.response.data.error));
        }
      } else {
        console.log('Password must have least 8 characters');
        seterrorMessage('Password must have least 8 characters');
      }
    } else {
      seterrorMessage('Invalid Email Format');

      console.log('Invalid Email Format');
    }
  };
  const handleRoute = () => {
    props.navigation.navigate('SignupScreen');
    // props.navigation.navigate('CompleteProfileScreen')
  };

  useEffect(() => {
    CheckToken();
  }, []);

  if (loading == true) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#343643',
        }}>
        <ActivityIndicator size={30} color={'525461'} />
      </View>
    );
  } else {
    return (
      <ImageBackground
        source={require('../assets/linearbg.png')}
        style={{flex: 1}}>
        <View style={styles.container}>
          <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={0}>
            <View
              style={{
                // backgroundColor: 'green',
                width: windowWidth,
                height: windowHeight * 0.4,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Logolg width={windowHeight * 0.25} height={windowHeight * 0.3} />
            </View>

            <View
              style={{
                width: windowWidth,
                height: windowHeight * 0.2, //total6
                // backgroundColor: 'orange',
                alignItems: 'center',
              }}>
              <EmailPass //height 0.2
                handleEmailChange={handleEmailChange}
                handlePasswordChange={handlePasswordChange}
              />
            </View>
            {errorMessage != '' ? (
              <Text
                style={{
                  color: 'red',
                  margin: 5,
                  fontSize: size.small(),
                  textAlign: 'center',
                  // marginBottom: windowHeight * 0.05,
                }}>
                {errorMessage}
              </Text>
            ) : null}
          </KeyboardAvoidingView>

          <View
            style={{
              // backgroundColor: 'blue',
              width: windowWidth,
              // height: windowHeight * 0.35,
              alignItems: 'center',
              // paddingTop:20
            }}>
            
            <View style={styles.bottomContainer}>
              <View style={styles.checkboxWrapper}>
                <CheckBox
                  tintColors="#FFFFFF"
                  value={rememberMe}
                  onValueChange={value => setRememberMe(value)}
                />
                <Text style={[styles.text]}>Remember me</Text>
              </View>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('ForgotPassword')}>
                <Text style={{fontSize: size.small(), color: 'white'}}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>
            <Button
              width={'40%'}
              height={windowHeight * 0.07}
              title={'Login'}
              handleSignup={handleLogin}
            />
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                height: windowHeight * 0.1,
                width: windowHeight,
                // backgroundColor: 'blue',
              }}>
              <Text style={[styles.text]}>Don't have an account?</Text>
              <TouchableOpacity style={{}} onPress={handleRoute}>
                <Text style={{color: '#00BBB4', fontSize: size.medium(),fontWeight:'bold'}}>
                  {' '}
                  Sign Up
                </Text>
               
              </TouchableOpacity>
            </View>
          
          </View>
        </View>
      </ImageBackground>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'gray',
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },

  buttonContainer: {
    marginTop: 20,
    //   borderRadius:30
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
  },
  checkbox: {
    borderWidth: 1,
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginRight: 10,
    color: 'white',
  },
  logo: {
    //   flex:1,
    top: -40,
    width: 175,
    height: 140,
  },
  text: {
    fontSize: size.small(),
    color: 'white',
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  bottomContainer: {
    flexDirection: 'row',
    height: windowHeight * 0.1,
    // justifyContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: windowWidth * 0.85,
    // backgroundColor:'red'
    // gap: 52,
    // marginTop: 15,
  },
});

export default LoginScreen;
