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
  Platform,
} from 'react-native';
import {
  LoginButton,
  AccessToken,
  Profile,
  LoginManager,
  GraphRequest,
} from 'react-native-fbsdk-next';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
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
import appleAuth from '@invertase/react-native-apple-authentication';
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
  const convertToLowerCase = () => {
    console.log('converting');

    let temp = email;
    temp = String(temp).toLowerCase();
    console.log('temp', temp);
    setEmail(temp);

    handleLogin(temp, password);
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
  const googleCredentials = async (email, password) => {
    console.log('email', email);
    console.log('password', password);
    console.log('SignUp');
    try {
      setloading(true);
      const urlToHit = 'https://api.kachaak.com.sg/api/auth/user/signup';

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const body = JSON.stringify({
        email: email,
        password: password,
        isVerified: true,
      });

      // navigation.navigate('CompleteProfileScreen');s
      console.log('email', email);
      console.log('password', password);

      const response = await axiosPostAuth(urlToHit, body, config);
      // console.log('response', response.data.data);
      const res = response.data.data;
      console.log('resSignup', res);

      if (String(res) == 'sucess') {
        // props.navigation.navigate('LoginScreen');
        googleCredentials2(email, password);
      }
    } catch (e) {
      console.log('SignupError==>', e.response?.data?.error);
      googleCredentials2(email, password);
      // seterrorMessage(e.response?.data?.error);
      signOut();
    }
  };
  const googleCredentials2 = async (email, password) => {
    console.log('email', email);
    console.log('password', password);
    console.log('Login');

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
      const response = await axiosPostAuth(urlToHit, body, config);
      if (response.data !== undefined) {
        saveToken(response.data.token);
        setloading(false);
        // dispatch(actions.setAuth());
        props.navigation.navigate('CompleteProfileScreen');
      } else {
        setloading(false);
        Alert.alert('Login error:100');
        signOut();
      }
    } catch (e) {
      console.log('easass', e.response.data.error);
      setloading(false);
      seterrorMessage('Email already registered');
      signOut();
    }
  };
  const signOut = async () => {
    try {
      console.log('hereSignOUt');
      // await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      // this.setState({ user: null }); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };
  const handlegooglelogin = async () => {
    try {
      console.log('herer');
      // GoogleSignin.configure({
      //   webClientId:
      //     '568493759154-gq306fkp03ueah3tm8u27lse8vlequ1i.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      // });
      await GoogleSignin.hasPlayServices();

      const userInfo = await GoogleSignin.signIn();

      // return

      console.log('userInfo', userInfo);
      console.log('idtoken', userInfo.user.id);
      console.log('userInfo', userInfo.user.email);
      googleCredentials(userInfo.user.email, userInfo.user.id);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        // console.log('error.code', error.code);
        Alert.alert('error');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        // console.log('error.code', error.code);
        Alert.alert('error');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        // console.log('error.code', error.code);
        Alert.alert('error');
      } else {
        // some other error happened
        Alert.alert('error');
      }
    }
  };

  const handlefblogin = async () => {
    try {
      console.log('fb');
      LoginManager.logInWithPermissions(['public_profile']).then(
        function (result) {
          if (result.isCancelled) {
            console.log('Login cancelled');
          } else {
            console.log(
              'Login success with permissions: ' +
                result.grantedPermissions.toString(),
            );
            // getAccessToken()
            // initUser(accessToken)
            const currentProfile = Profile.getCurrentProfile().then(function (
              currentProfile,
            ) {
              if (currentProfile) {
                console.log(
                  'The current logged user is: ' +
                    currentProfile.name +
                    '. His profile id is: ' +
                    currentProfile.userID,
                );
                const email =
                  currentProfile.firstName +
                  currentProfile.userID +
                  '@gmail.com';
                const password = currentProfile.userID;
                googleCredentials(email, password);
              }
            });
          }
        },
        function (error) {
          console.log('Login fail with error: ' + error);
        },
      );
      // const currentProfile = await Profile.getCurrentProfile()
      // console.log('currentProfile', currentProfile)
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleAppleLogin = async () => {
    try {
      const res = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      console.log('resAppleLogin==>>', res);

      const repRes = String(res.user).replace(/\./g, '_');
      console.log('res.', repRes);
      const email = repRes + '@gmail.com';
      const password = repRes;
      googleCredentials(email, password);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleLogin = async (email, password) => {
    console.log('email', email);
    console.log('password', password);
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
  // useEffect(() => {
  //   console.log('herrrrrrrrr')
  //   // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
  //   return appleAuth.onCredentialRevoked(async () => {
  //     console.warn('If this function executes, User Credentials have been Revoked');
  //   });
  // }, []); // passing in an empty array as the second argument ensures this is only ran once when component mounts initially.

  const revokeApple = async () => {
    try {
      console.log('here');
      const res = appleAuth.onCredentialRevoked();
      console.log('res', res);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      iosClientId:
        '568493759154-jgqncegfgpaklcpqgfi4fem0s5s1s9t0.apps.googleusercontent.com',
      offlineAccess: false,
      webClientId:
        Platform.OS == 'ios'
          ? '568493759154-jgqncegfgpaklcpqgfi4fem0s5s1s9t0.apps.googleusercontent.com'
          : '568493759154-gq306fkp03ueah3tm8u27lse8vlequ1i.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    });
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
                height: windowHeight * 0.35,
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
                email={email}
                password={password}
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
              handleSignup={convertToLowerCase}
            />
            <View
              style={{
                height: windowHeight * 0.18,
                width: windowWidth,
                marginTop: 10,
                // backgroundColor:'red',
                // flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={() => handlefblogin()}>
                <View
                  style={{
                    height: windowHeight * 0.05,
                    width: windowWidth * 0.7,
                    borderRadius: 20,
                    backgroundColor: '#D4D4D4',
                    flexDirection: 'row',
                    alignItems: 'center',
                    // justifyContent:'space-between',
                    paddingLeft: 14,
                  }}>
                  <Image
                    style={{
                      height: windowHeight * 0.045,
                      width: windowHeight * 0.045,
                      borderRadius: windowHeight * 0.025,
                      resizeMode: 'contain',
                    }}
                    resizeMode="contain"
                    source={require('../assets/fblogo.png')}
                  />
                  <Text
                    style={{
                      color: 'black',
                      fontSize: size.small(),
                      paddingLeft: 14,
                    }}>
                    Login with Facebook
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handlegooglelogin()}>
                <View
                  style={{
                    height: windowHeight * 0.05,
                    width: windowWidth * 0.7,
                    borderRadius: 20,
                    backgroundColor: '#D4D4D4',
                    flexDirection: 'row',
                    alignItems: 'center',
                    // justifyContent:'space-between',
                    paddingLeft: 14,
                  }}>
                  <Image
                    style={{
                      height: windowHeight * 0.045,
                      width: windowHeight * 0.045,
                    }}
                    resizeMode="contain"
                    source={require('../assets/googlelogo.png')}
                  />
                  <Text
                    style={{
                      color: 'black',
                      fontSize: size.small(),
                      paddingLeft: 14,
                    }}>
                    Login with Google
                  </Text>
                </View>
              </TouchableOpacity>
              {Platform.OS == 'ios' ? (
                <TouchableOpacity onPress={() => handleAppleLogin()}>
                  <View
                    style={{
                      height: windowHeight * 0.05,
                      width: windowWidth * 0.7,
                      borderRadius: 20,
                      backgroundColor: '#D4D4D4',
                      flexDirection: 'row',
                      alignItems: 'center',
                      // justifyContent:'space-between',
                      paddingLeft: 14,
                    }}>
                    <Image
                      style={{
                        height: windowHeight * 0.045,
                        width: windowHeight * 0.045,
                        borderRadius: windowHeight * 0.025,
                      }}
                      resizeMode="contain"
                      source={require('../assets/Apple-logo.png')}
                      // source={{uri:'https://www.freepnglogos.com/uploads/apple-logo-png/apple-logo-png-index-content-uploads-10.png'}}
                    />
                    <Text
                      style={{
                        color: 'black',
                        fontSize: size.small(),
                        paddingLeft: 14,
                      }}>
                      Login with Apple
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : null}
            </View>
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
                <Text
                  style={{
                    color: '#00BBB4',
                    fontSize: size.medium(),
                    fontWeight: 'bold',
                  }}>
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
    gap: 3,
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
