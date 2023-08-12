import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Dimensions} from 'react-native';
import {useState, useEffect} from 'react';
import {KeyboardAvoidingView} from 'react-native';
import {axiosPost} from '../axios/axios';
import * as size from '../components/FontSize';
import {invalid} from 'moment';
import {useToast} from 'react-native-toast-notifications';
import {errortoast, messagetoast} from '../Toast';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
// const fontS=Dimensions.get('window').fontScale
export default function ForgotPassword(props) {
  const [focus, setfocus] = useState(false);
  const [focus1, setfocus1] = useState(false);
  const [focus2, setfocus2] = useState(false);
  const [focus3, setfocus3] = useState(false);


  const [Email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [confirmPass, setconfirmPass] = useState('');
  const [otp, setotp] = useState('');

  const [errorStr, seterrorStr] = useState('');

  const [otpSent, setotpSent] = useState(false);

  const [loading, setloading] = useState(false);

  const validateEmail = email => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    console.log('BOOL', emailRegex.test(email));
    return emailRegex.test(email);
  };

  const toast = useToast();
  const showMessage = message => {
    toast.show(message, messagetoast(message));
  };
  const showError = message => {
    toast.show(message, errortoast(message));
  };

  const sendOtp = async () => {
    setfocus(false)
    if (validateEmail(Email)) {
      try {
        setloading(true);
        console.log('sendOtpPressed');
        const urlToHit = 'https://api.kachaak.com.sg/api/auth/user/forgot';
        const body = JSON.stringify({
          email: Email,
        });
        const response = await axiosPost(urlToHit, body);
        console.log('response', response.data);

        if (response?.data?.data == 'sucess') {
          seterrorStr('OTP sent');
          showMessage('OTP sent');
          setotpSent(true);
        } else {
          seterrorStr('Unknown error, enter again');
          showError('Unknown error, enter again');
        }

        setloading(false);
        //   setotpSent(!otpSent);
      } catch (error) {
        console.log('errorOTP', error.response.data);
        if (error?.response?.data?.error == 'Email already sent') {
          //   Alert.alert('Email already sent, check email');
          showError('Email already sent, check email');
          seterrorStr('Email already sent, check email');
          setotpSent(true);
        }
        seterrorStr(error?.response?.data?.error);
        showError(error?.response?.data?.error);
        setloading(false);
      }
    } else {
      // Alert.alert('Invalid Email Format');
      showError('Invalid Email Format');
      seterrorStr('Invalid Email Format');
    }
  };

  const submitNewPass = async () => {
    if (validateEmail(Email)) {
      if (password == confirmPass) {
        try {
          console.log('submitnewPass');
          setloading(true);

          urlToHit = 'https://api.kachaak.com.sg/api/auth/user/resetpassword';
          const body = JSON.stringify({
            email: Email,
            otp: otp,
            newPassword: password,
          });
          const response = await axiosPost(urlToHit, body);
          console.log('response.data', response.data);
          if (response?.data?.data == 'sucess') {
            props.navigation.reset({index: 0, routes: [{name: 'LoginScreen'}]});
          } else {
            showError('Unknown Error');
            seterrorStr('Unknown Error');
          }
          setloading(false);
        } catch (error) {
          console.log('error', error?.response?.data);
          showError(error?.response?.data?.error);
          seterrorStr(error?.response?.data?.error);

          setloading(false);
        }
      } else {
        showError('Passwords do not match');
        seterrorStr('Passwords do not match');
      }
    } else {
      showError('Invalid Email Format');
      seterrorStr('Invalid Email Format');
    }
  };

  {
    if (loading == true) {
      return (
        <LinearGradient
          start={{x: 1, y: 1}}
          end={{x: 0.5, y: 0}}
          colors={['#1B1D2A', '#222431', '#343643', '#525461', '#595B68']}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: windowHeight,
            width: windowWidth,
          }}>
          <ActivityIndicator size={30} color={'#00BBB4'} />
        </LinearGradient>
      );
    } else {
      return (
        <LinearGradient
          start={{x: 1, y: 1}}
          end={{x: 0.5, y: 0}}
          colors={['#1B1D2A', '#222431', '#343643', '#525461', '#595B68']}
          style={{
            alignItems: 'center',
            // justifyContent: 'center',
            height: windowHeight,
            width: windowWidth,
          }}>
          <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={0}>
            <View
              style={{
                height: windowHeight * 0.2,
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}>
              <Text style={{color: 'white', fontSize: size.large()}}>
                Reset Password
              </Text>
            </View>
            <View
              style={{
                width: windowWidth,
                alignItems: 'center',
                height: windowHeight * 0.7,
                // backgroundColor: 'orange',
                justifyContent: 'center',
              }}>
              {otpSent == false ? (
                <View
                  style={{
                    width: windowWidth,
                    height: windowHeight * 0.2,
                    // backgroundColor:'red',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: size.large(),
                      textAlign: 'center',
                    }}>
                    {' '}
                    Enter your Email and we will send you an otp{' '}
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    width: windowWidth,
                    height: windowHeight * 0.1,
                    alignItems: 'center',
                    marginTop: 10,
                    // backgroundColor:'red',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#00BBB4',
                      fontSize: size.medium(),
                      textAlign: 'center',
                    }}>
                    Enter the OTP you received along with your new password
                  </Text>
                </View>
              )}
              <TextInput
                placeholder="Email"
                placeholderTextColor={focus == true ? '#00BBB4' : 'white'}
                style={{
                  ...styles.input,
                  borderBottomColor: focus == true ? '#00BBB4' : 'white',
                  borderBottomWidth: 1,
                  color: focus == true ? '#00BBB4' : 'white',
                }}
                value={Email}
                onChangeText={setEmail}
                onFocus={() => setfocus(true)}
                onBlur={() => setfocus(false)}
              />

              {otpSent == true ? (
                <View
                  style={{
                    width: windowWidth,
                    alignItems: 'center',
                    //   justifyContent: 'center',
                    //   height: windowHeight * 0.5,
                    // backgroundColor: 'red',
                  }}>
                  <TextInput
                    placeholder="OTP"
                    placeholderTextColor={focus1 == true ? '#00BBB4' : 'white'}

                    style={{
                      ...styles.input,
                      borderBottomColor: focus1 == true ? '#00BBB4' : 'white',
                      borderBottomWidth: 1,
                      color: focus1 == true ? '#00BBB4' : 'white',
                    }}
                    value={otp}
                    onChangeText={setotp}
                    onFocus={() => setfocus1(true)}
                    onBlur={() => setfocus1(false)}
                  />
                  <TextInput
                    placeholder="new password"
                    placeholderTextColor={focus2 == true ? '#00BBB4' : 'white'}

                    style={{
                      ...styles.input,
                      borderBottomColor: focus2 == true ? '#00BBB4' : 'white',
                      borderBottomWidth: 1,
                      color: focus2 == true ? '#00BBB4' : 'white',
                    }}
                    value={password}
                    onChangeText={setpassword}
                    onFocus={() => setfocus2(true)}
                    onBlur={() => setfocus2(false)}
                  />
                  <TextInput
                    placeholder="confirm password"
                    placeholderTextColor={focus3 == true ? '#00BBB4' : 'white'}

                    style={{
                      ...styles.input,
                      borderBottomColor: focus3 == true ? '#00BBB4' : 'white',
                      borderBottomWidth: 1,
                      color: focus3 == true ? '#00BBB4' : 'white',
                    }}
                    value={confirmPass}
                    onChangeText={setconfirmPass}
                    onFocus={() => setfocus3(true)}
                    onBlur={() => setfocus3(false)}
                  />
                </View>
              ) : null}
              <View style={{width: windowWidth, marginVertical: 10}}>
                {/* <Text
                  style={{
                    color: errorStr == 'OTP sent' ? '#00BBB4' : 'red',
                    textAlign: 'center',
                    fontSize: size.small(),
                    textShadowColor: 'black',
                    textShadowOffset: {width: 0, height: 0},
                    textShadowRadius: 10,
                  }}>
                  {errorStr}
                </Text> */}
              </View>

              <View style={{width: windowWidth, alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() =>
                    otpSent == false ? sendOtp() : submitNewPass()
                  }>
                  <View
                    style={{
                      backgroundColor: '#00BBB4',
                      paddingHorizontal: 20,
                      paddingVertical: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 10,
                    }}>
                    <Text style={{color: 'white', fontSize: size.medium()}}>
                      {' '}
                      {otpSent == false ? 'Send OTP' : 'Submit'}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </LinearGradient>
      );
    }
  }
}

const styles = StyleSheet.create({
  input: {
    // backgroundColor: 'white',
    width: windowWidth * 0.8,
    height: windowHeight * 0.08,
    marginVertical: 10,
  },
});
