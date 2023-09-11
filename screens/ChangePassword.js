import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Dimensions} from 'react-native';
import {useState} from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import {useToast} from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import * as size from '../components/FontSize';
import {current} from '@reduxjs/toolkit';
import { messagetoast,errortoast } from '../Toast';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;


export default function ChangePassword(props) {
  const [CurrentPassword, setCurrentPassword] = useState('');
  const [NewPassword, setNewPassword] = useState('');
  const [ConfirmPass, setConfirmPass] = useState('');
  const toast = useToast();



  const showMessage = message => {
    toast.show(message, messagetoast(message));
  };


  const showError = message => {
    toast.show(message, errortoast(message));
  };
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
  const handleCancel = () => {};
  const handleUpdate = async () => {
    if (CurrentPassword == '' || NewPassword == '' || ConfirmPass == '') {
      showError('fields cannot be empty');
    } else if (NewPassword != ConfirmPass) {
      showError('new password and confirm password do not match');
    } else {
      try {
        const token = await getUserToken();

        console.log('confirmPass', ConfirmPass);
        console.log('newppass', NewPassword);
        console.log('currentpass', CurrentPassword);
        if (NewPassword == ConfirmPass) {
          console.log('match');
        }

        const urlToHit = 'https://api.kachaak.com.sg/api/users';
        const body = JSON.stringify({
          // confirmPassword: '1234567',
          confirmPassword: ConfirmPass,
          newPassword: NewPassword,
          currentPassword: CurrentPassword,
        });

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        };

        const res = await axios.patch(urlToHit, body, config);
        console.log('res', res);
       showMessage('Password changed successfully!');
        props.navigation.navigate('SettingsScreen');
      } catch (error) {
        console.log('error', error.response.data);
       showError(String(error.response.data.error));
      }
    }
  };

  const [currC, setcurrC] = useState('white');
  const [newC, setnewC] = useState('white');
  const [confC, setconfC] = useState('white');
  return (
    <View style={{flex: 1}}>
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
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={0}>
          <View
            style={{
              height: windowHeight * 0.3,
              // backgroundColor: 'orange',
              width: windowWidth,
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            <Octicons name={'lock'} size={120} color="#00BBB4" />
            <Text style={{color: 'white', fontSize: size.large()}}>
              Change Password
            </Text>
          </View>

          <View
            style={{
              width: windowWidth,
              // backgroundColor: 'red',
              alignItems: 'center',
              height: windowHeight * 0.4,
              justifyContent: 'space-evenly',
            }}>
            <TextInput
              style={{...styles.input, color: currC, borderBottomColor: currC}}
              value={CurrentPassword}
              onChangeText={setCurrentPassword}
              placeholder="Current Password"
              placeholderTextColor={currC}
              onFocus={() => setcurrC('#00BBB4')}
              onBlur={() => setcurrC('white')}
            />
            <TextInput
              style={{...styles.input, color: newC, borderBottomColor: newC}}
              value={NewPassword}
              onChangeText={setNewPassword}
              placeholder="New Password"
              placeholderTextColor={newC}
              onFocus={() => setnewC('#00BBB4')}
              onBlur={() => setnewC('white')}
            />
            <TextInput
              style={{...styles.input, color: confC, borderBottomColor: confC}}
              value={ConfirmPass}
              onChangeText={setConfirmPass}
              placeholder="Confirm Password"
              placeholderTextColor={confC}
              onFocus={() => setconfC('#00BBB4')}
              onBlur={() => setconfC('white')}
            />
          </View>
        </KeyboardAvoidingView>
        <View
          style={{
            // backgroundColor: 'orange',
            alignItems: 'center',
            width: windowWidth,
            height: windowHeight * 0.2,
          }}>
          <TouchableOpacity onPress={() => handleUpdate()}>
            <Text
              style={{
                paddingVertical: 10,
                paddingHorizontal: 20,
                backgroundColor: '#00BBB4',
                borderRadius: 10,
                color: 'white',
                fontSize: size.medium(),
                marginVertical: 10,
                textShadowColor: 'black',
                textShadowOffset: {width: 0, height: 0},
                textShadowRadius: 3,
              }}>
              Update
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => handleCancel()}>
            <Text
              style={{
                color: 'white',
                fontSize: size.small(),
                paddingHorizontal: 30,
                paddingVertical: 10,
                marginTop: 10,
                fontWeight: 'bold',
                textShadowColor: 'black',
                textShadowOffset: {width: 0, height: 1},
                textShadowRadius: 10,
              }}>
              Cancel
            </Text>
          </TouchableOpacity> */}
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.06,
    marginTop: 20,
    borderBottomWidth: 0.5,

    fontSize: size.small(),
  },
});
