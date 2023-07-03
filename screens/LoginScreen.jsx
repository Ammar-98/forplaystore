import React, {useState} from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
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
import { useContext } from 'react';
// import tw from 'nativewind'

const LoginScreen = props => {


  const {userToken,setuserToken} = useContext(AppContext)


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, seterrorMessage] = useState('');

  console.log(password);
  console.log(email);
  console.log(rememberMe);

  const dispatch = useDispatch();
  const actions = authSlice.actions;

  const handleEmailChange = text => setEmail(text);
  const handlePasswordChange = text => setPassword(text);
  const handleRememberMeChange = () => setRememberMe(!rememberMe);

  const CheckToken = async () => {
    try {
      const SavedToken = await AsyncStorage.getItem('LoginToken');
      console.log('SavedToken', SavedToken);
      setuserToken(SavedToken)
      if (SavedToken !== null) {
        dispatch(actions.setAuth());
      }
    } catch (e) {}
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
    seterrorMessage('')
    if (validateEmail(email)) {
      if (password !== '') {
        try {
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
          const response = await axios.post(urlToHit, body, config);
          console.log('response', response.data);
          if (response.data !== undefined) {
            saveToken(response.data.token);
            setuserToken(response.data.token)
            dispatch(actions.setAuth());
          }
        } catch (e) {
          console.log('easass', e.response.data.error);
          seterrorMessage(String(e.response.data.error));
        }
      } else {
        console.log('emptyPassword');
        seterrorMessage('Password cannot be empty');
      }
      
    } else {
      seterrorMessage('Invalid Email Format');

      console.log('Invalid Email Format');
    }
  };
  const handleRoute = () => {
    props.navigation.navigate('SignupScreen');
  };

  useEffect(() => {
    CheckToken()
  }, [])

  return (
    <ImageBackground
      source={require('../assets/linearbg.png')}
      style={{flex: 1}}>
      <View classN style={styles.container}>
        <Logolg width={165} height={133} />
        <EmailPass
          handleEmailChange={handleEmailChange}
          handlePasswordChange={handlePasswordChange}
        />
        <Text style={{color: 'red', margin: 5, fontSize: 15}}>
          {errorMessage}
        </Text>

        <View
          style={{
            marginBottom: '6%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            gap: 4,
          }}>
          <Text style={[styles.text]}>Do you have a account?</Text>
          <TouchableOpacity style={{marginTop: '8%'}} onPress={handleRoute}>
            <Text style={{color: '#00BBB4', fontSize: 18}}>Signup</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.buttonContainer}> */}
        {/* <ButtonGradient width={'70%'} height={'20%'} /> */}

        <Button
          width={'40%'}
          height={'7%'}
          title={'Login'}
          handleSignup={handleLogin}
        />
        {/* </View> */}

        <View style={styles.bottomContainer}>
          <View style={styles.checkboxWrapper}>
            <CheckBox
              tintColors="#FFFFFF"
              value={rememberMe}
              onValueChange={value => setRememberMe(value)}
            />
            <Text style={[styles.text, {marginTop: -2}]}>Remember me</Text>
          </View>
          <Text style={{fontSize: 16, color: 'white'}}>Forgot Password?</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'gray',
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    color: 'white',
    top: '20%',
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
    fontSize: 16,
    color: 'white',
    marginTop: '8%',
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 52,
    marginTop: 15,
  },
});

export default LoginScreen;
