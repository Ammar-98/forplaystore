import React, {useState} from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  LoginButton,
  AccessToken,
  Profile,
  LoginManager,
  GraphRequest,
} from 'react-native-fbsdk-next';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {ScrollView} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import EmailPass from '../components/EmailPass';
import Logolg from '../components/Logolg';
import ButtonGradient from '../components/ButtonGradient';
import Button from '../components/Button';
import axios from 'axios';
import {axiosPost} from '../axios/axios';
import appleAuth from '@invertase/react-native-apple-authentication';
import {axiosPostAuth} from '../axios/axios';
import {Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as size from '../components/FontSize';
import Octicons from 'react-native-vector-icons/Octicons';
import {useEffect} from 'react';

// import tw from 'nativewind'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SignupForm = props => {
  const [showPassword, setshowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, seterrorMessage] = useState('');
  const [loading, setloading] = useState(false);
  const [cpfocused, setcpfocused] = useState(false);

  console.log(password);
  console.log(email);
  console.log(rememberMe);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '568493759154-gq306fkp03ueah3tm8u27lse8vlequ1i.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    });
  }, []);
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

  const convertToLowerCase = () => {
    let temp = email;
    temp = String(temp).toLowerCase();
    setEmail(temp);
    handleSignup(temp, password);
  };
  const googleCredentials2 = async (email, password) => {
    console.log('email', email);
    console.log('password', password);

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
  const googleCredentials = async (email, password) => {
    console.log('email', email);
    console.log('password', password);
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
      googleCredentials2(email, password);

      // setloading(false);
      console.log('SignupError==>', e.response?.data?.error);
      // seterrorMessage(e.response?.data?.error);
      signOut();
    }
  };
  const handlegooglelogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('userInfo', userInfo);
      console.log('idtoken', userInfo.user.id);
      console.log('userInfo', userInfo.user.email);
      googleCredentials(userInfo.user.email, userInfo.user.id);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('error.code', error.code);
        Alert.alert('error');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('error.code', error.code);
        Alert.alert('error');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('error.code', error.code);
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
  const handleEmailChange = text => {
    setEmail(text), seterrorMessage('');
  };
  const handlePasswordChange = text => setPassword(text);
  const handleRememberMeChange = () => setRememberMe(!rememberMe);
  const handleconfirmPass = text => setconfirmPassword(text);
  const validateEmail = email => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const saveToken = async token => {
    try {
      console.log('token:', token);
      await AsyncStorage.setItem('LoginToken', String(token));
    } catch (e) {
      console.log('e', e);
    }
  };

  const Login = async () => {
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
      }
    } catch (e) {
      console.log('easass', e.response.data.error);
      setloading(false);
      seterrorMessage(String(e.response.data.error));
    }
  };

  const handleSignup = async (email, password) => {
    // console.log('password.length', String(password).length)
    seterrorMessage('');
    if (validateEmail(email)) {
      if (String(password).length >= 8) {
        if (password == confirmPassword) {
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
              Login();
            } else if (res == 'check your email to verify') {
              setloading(false);
              // Alert.alert('add varification flow here');
              props.navigation.navigate('Varification');
            }
            console.log('res', res);
          } catch (e) {
            setloading(false);
            console.log('SignupError==>', e.response?.data?.error);
            seterrorMessage(e.response?.data?.error);
          }
        } else {
          console.log('Passwords do not match');
          seterrorMessage('Passwords do not match');
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
    props.navigation.navigate('LoginScreen');
  };

  return (
    <ImageBackground
      source={require('../assets/linearbg.png')}
      style={{flex: 1}}>
      <View style={styles.container}>
        <ScrollView>
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

            <View style={{width: windowWidth, alignItems: 'center'}}>
              <View style={styles.inputContainer}>
                <Octicons
                  name={'lock'}
                  size={17}
                  color={cpfocused == true ? '#00BBB4' : 'white'}
                />
                <TextInput
                  style={{
                    ...styles.input,
                    width: '80%',
                    color: cpfocused == true ? '#00BBB4' : 'white',
                  }} //15 remaining
                  placeholder="Confirm Password"
                  secureTextEntry={showPassword == true ? false : true}
                  placeholderTextColor={cpfocused == true ? '#00BBB4' : 'white'}
                  value={confirmPassword}
                  onChangeText={handleconfirmPass}
                  onFocus={() => setcpfocused(true)}
                  onBlur={() => setcpfocused(false)}
                />
                <TouchableOpacity
                  style={{
                    width: '12%',
                    height: '100%',
                    // backgroundColor: 'green',
                    // alignItems: 'center',
                    // justifyContent: 'center',
                  }}
                  onPress={() => {
                    setshowPassword(!showPassword);
                  }}>
                  <View
                    style={{
                      width: '100%',
                      height: '100%',
                      // backgroundColor: 'orange',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Octicons
                      name={showPassword == true ? 'eye' : 'eye-closed'}
                      size={17}
                      color={cpfocused == true ? '#00BBB4' : 'white'}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            {errorMessage != '' ? (
              <View
                style={{
                  width: windowWidth,
                  height: windowHeight * 0.05,
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  // backgroundColor: 'white',
                }}>
                <Text
                  numberOfLines={2}
                  adjustsFontSizeToFit
                  style={{
                    color: 'red',
                    textShadowColor: 'black',
                    textShadowOffset: {width: 0, height: 0},
                    textShadowRadius: 3,
                    // margin: 5,
                    fontSize: size.medium(),
                    textAlign: 'center',
                    paddingHorizontal: 5,
                    // marginBottom: windowHeight * 0.05,
                  }}>
                  {errorMessage}
                </Text>
              </View>
            ) : null}
          </KeyboardAvoidingView>

          <View
            style={{
              width: windowWidth,
              // height: windowHeight * 0.25, //total6
              // backgroundColor: 'orange',
              alignItems: 'center',
            }}>
            <View
              style={{
                // backgroundColor: 'blue',
                width: windowWidth,
                // height: windowHeight * 0.22,
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={loading == true ? null : () => convertToLowerCase()}
                style={{width: '40%'}}>
                <View
                  style={{
                    // width: '100%',
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    backgroundColor: loading == true ? '#343643' : '#00BBB4',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: 20,
                    // height: windowHeight * 0.07,
                    borderRadius: 10,
                  }}>
                  {loading == true ? (
                    <ActivityIndicator size={20} color={'#00BBB4'} />
                  ) : (
                    <Text style={{fontSize: size.medium(), color: 'white'}}>
                      {'Sign Up'}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
              <View
                style={{
                  // height: windowHeight * 0.05,
                height: windowHeight * 0.18,

                  width: windowWidth,
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
                    Sign-Up with Facebook
                  </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlegooglelogin()}>
                  {/* <Text style={{color: 'white'}}>Google</Text> */}
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
                        height: windowHeight * 0.05,
                        width: windowHeight * 0.05,
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
                    Sign-Up with Google
                  </Text>
                  </View>
                </TouchableOpacity>
                {Platform.OS == 'ios' ? (
                  <TouchableOpacity onPress={() => handleAppleLogin()}>
                    {/* <Text style={{color: 'white'}}>Google</Text> */}
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
                          height: windowHeight * 0.05,
                          width: windowHeight * 0.05,
                          borderRadius: windowHeight * 0.025,
                        }}
                        resizeMode="contain"
                        source={require('../assets/Apple-logo.png')}
                      />
                      <Text
                    style={{
                      color: 'black',
                      fontSize: size.small(),
                      paddingLeft: 14,
                    }}>
                    Sign-Up with Apple
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
                  // height: windowHeight * 0.1,
                  width: windowHeight,
                  marginTop: 5,
                  // backgroundColor: 'blue',
                }}>
                <Text style={[styles.text]}>Already have an account?</Text>
                <TouchableOpacity style={{}} onPress={handleRoute}>
                  <Text
                    style={{
                      color: '#00BBB4',
                      fontSize: size.medium(),
                      fontWeight: 'bold',
                    }}>
                    {' '}
                    Log in
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
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
  },
  inputContainer: {
    width: windowWidth * 0.8,
    flexDirection: 'row',
    // justifyContent: 'space-evenly',
    alignItems: 'center',
    // backgroundColor: 'red',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    height: windowHeight * 0.1,
  },
  buttonContainer: {
    marginTop: 20,
    //   borderRadius:30
  },
  input: {
    height: windowHeight * 0.09,
    width: '88%',
    color: 'white',
    marginLeft: '2%',
    fontSize: size.small(),
    // backgroundColor:'green'
    // borderColor: 'blue',
    // borderWidth: 2,
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
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 52,
    marginTop: 15,
  },
});

export default SignupForm;
