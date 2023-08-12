import React from 'react';
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Dimensions} from 'react-native';
import {useState} from 'react';
import * as size from '../components/FontSize';
import Octicons from 'react-native-vector-icons/Octicons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function EmailPass({handleEmailChange, handlePasswordChange}) {
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [showPassword, setshowPassword] = useState(false);
  const [focusedEmail, setfocusedEmail] = useState(false);
  const [focusedPass, setfocusedPass] = useState(false);
  return (
    <View style={{height: windowHeight * 0.2}}>
      <View
        style={{
          ...styles.inputContainer,
          borderBottomColor: focusedEmail == true ? '#00BBB4' : 'white',
          borderBottomWidth: 1,
        }}>
        <Octicons
          name={'mail'}
          size={15}
          color={focusedEmail == true ? '#00BBB4' : 'white'}
        />
        <TextInput
          style={{
            ...styles.input,
            color: focusedEmail == true ? '#00BBB4' : 'white',
          }} //5 remaining
          placeholder="Email ID"
          keyboardType="email-address"
          autoCapitalize="none"
          value={Email}
          placeholderTextColor={focusedEmail == true ? '#00BBB4' : 'white'}
          onChangeText={setEmail}
          onFocus={() => setfocusedEmail(true)}
          onBlur={() => {setfocusedEmail(false);handleEmailChange(Email)}}
        />
      </View>
      <View style={{...styles.inputContainer,borderBottomColor: focusedPass == true ? '#00BBB4' : 'white',
          borderBottomWidth: 1,}}>
        <Octicons name={'lock'} size={17} color={focusedPass==true?'#00BBB4':'white'} />
        <TextInput
          style={{...styles.input, width: '80%',color:focusedPass==true?'#00BBB4':'white'}} //15 remaining
          placeholder="Password"
          onFocus={() => setfocusedPass(true)}
          onBlur={() => {setfocusedPass(false),handlePasswordChange(Password)}}
          value={Password}

          secureTextEntry={showPassword == true ? false : true}
          placeholderTextColor={focusedPass==true?'#00BBB4':'white'}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={{
            width: '12%',
            height: '100%',
            // backgroundColor: 'green',
            // alignItems: 'center',
            // justifyContent: 'center',
          }}
          onPress={() => setshowPassword(!showPassword)}>
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
              color={focusedPass==true?'#00BBB4':'white'}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: windowWidth * 0.8,
    flexDirection: 'row',
    // justifyContent: 'space-evenly',
    alignItems: 'center',
    // backgroundColor: 'red',

    height: windowHeight * 0.1,
  },
  input: {
    height: windowHeight * 0.09,
    width: '88%',
    // color: 'white',
    marginLeft: '2%',
    fontSize: size.small(),
    // backgroundColor:'green'
    // borderColor: 'blue',
    // borderWidth: 2,
  },
});

export default EmailPass;
