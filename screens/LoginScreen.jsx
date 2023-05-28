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

// import tw from 'nativewind'

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  console.log(password);
  console.log(email);
  console.log(rememberMe);

  const handleEmailChange = text => setEmail(text);
  const handlePasswordChange = text => setPassword(text);
  const handleRememberMeChange = () => setRememberMe(!rememberMe);
  const handleLogin = () => {
    navigation.navigate('CompleteProfileScreen')
  };
    const handleRoute = () => {
      navigation.navigate('SignupScreen');
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
