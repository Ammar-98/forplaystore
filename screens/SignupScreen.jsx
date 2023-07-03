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
// import tw from 'nativewind'

const SignupForm = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, seterrorMessage] = useState('')
  console.log(password);
  console.log(email);
  console.log(rememberMe);

  const handleEmailChange = text => setEmail(text);
  const handlePasswordChange = text => setPassword(text);
  const handleRememberMeChange = () => setRememberMe(!rememberMe);

  const validateEmail = email => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSignup = async () => {
    seterrorMessage('')
    if (validateEmail(email)) {
      if (password !== '') {
        try {
          const urlToHit = 'https://api.kachaak.com.sg/api/auth/user/signup';

          const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          };

          const body = JSON.stringify({
            email: '7ammarif888@gmail.com',
            password: '123456',
          });

          // navigation.navigate('CompleteProfileScreen');s
          console.log('email', email);
          console.log('password', password);

          const response = await axios.post(urlToHit, body, config);
          // console.log('response', response.data.data);
          const res = response.data.data;
          console.log('res', res);

          if (String(res) == 'sucess') {
            props.navigation.navigate('LoginScreen');
          }
        } catch (e) {
          console.log('e', e.response.data.error);
          seterrorMessage(e.response.data.error)
        }
      } else {
        console.log('Password cannot be empty');
      seterrorMessage('Password cannot be empty')

      }
    } else {
      seterrorMessage('Invalid Email Format')
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
      <View classN style={styles.container}>
        <Logolg width={165} height={133} />
        <EmailPass
          handleEmailChange={handleEmailChange}
          handlePasswordChange={handlePasswordChange}
        />
        <Text style={{color:'red',margin:5,fontSize:15}}>{errorMessage}</Text>
        <View
          style={{
            marginBottom: '6%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            gap: 4,
          }}>
          <Text style={[styles.text]}>Do you have an account?</Text>
          <TouchableOpacity style={{marginTop: '8%'}} onPress={handleRoute}>
            <Text style={{color: '#00BBB4', fontSize: 18}}>Log in</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.buttonContainer}> */}
        {/* <ButtonGradient width={'70%'} height={'20%'} /> */}

        <Button
          width={'40%'}
          height={'7%'}
          title={'Sign up'}
          handleSignup={handleSignup}
        />
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

export default SignupForm;
