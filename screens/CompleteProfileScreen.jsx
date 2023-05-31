import React, {useState} from 'react';
import {
  ImageBackground,
  Image,
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  StatusBar,
} from 'react-native';
import DropdownMenu from '../components/DropdownMenu';
import Button from '../components/Button';
import CheckBox from '@react-native-community/checkbox';
import { authSlice } from '../store/authSlice'
import {useSelector, useDispatch} from 'react-redux';

function CompleteProfileScreen() {
  const dispatch = useDispatch();
  const actions = authSlice.actions;

  const [desc, setDesc] = useState('');
  const [agree, setAgree] = useState('');

  const handleSignup = () => {
    dispatch(actions.setAuth())
    // navigation.navigate('HomeScreen');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        source={require('../assets/linearbg.png')}
        style={styles.bg}>
        <StatusBar barStyle="light-content" />
        {/* <View style={{alignItems: 'center'}}> */}
        <Image
          source={require('../assets/chaakLogo.png')}
          style={styles.logo}
        />
        <Text
          style={{
            fontSize: 18,
            color: 'white',
            letterSpacing: 4,
            marginTop: '1%',
          }}>
          Earn 10 <Text style={{color: '#00BBB4'}}>CHAAK$</Text> instantly
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: 'white',
            letterSpacing: 4,
            marginTop: '1.5%',
            marginBottom: '1.5%',
          }}>
          for each field you fill in.
        </Text>
        <TextInput
          style={styles.inputTop}
          placeholder="Full Name"
          keyboardType="email-address"
          autoCapitalize="none"
          // onChangeText={handleEmailChange}
        />
        <TextInput
          style={styles.inputTop}
          placeholder="Profile Name"
          keyboardType="email-address"
          autoCapitalize="none"
          // onChangeText={handleEmailChange}
        />
        <View
          style={{
            gap: 6,
            marginTop: '2%',
            width: '100%',
            alignItems: 'center',
          }}>
          <DropdownMenu/> 
        </View>
        <TextInput
          multiline={true}
          numberOfLines={4}
          placeholder="Favourite food (10 maximum) - Use(,)"
          keyboardType="email-address"
          style={styles.input}
          onChangeText={text => setDesc(text)}
          value={desc}
        />
        <Text style={styles.textBottom}>
          Don’t worry, you can change your Profile Name later{' '}
        </Text>
        <View style={styles.checkboxWrapper}>
          <CheckBox
            tintColors="#FFFFFF"
            value={agree}
            onValueChange={value => setAgree(value)}
          />
          <Text style={[styles.textBottom, {marginTop: -2}]}>
            I agree to
            <Text style={styles.linkText}> Terms and services </Text>&
            <Text style={styles.linkText}> Privacy Policy</Text>
          </Text>
        </View>
        <Button
          width={'40%'}
          height={'7%'}
          title={'Sign up'}
          handleSignup={handleSignup}
        />
        {/* </View> */}
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    // paddingVertical:'6%'
  },
  bg: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: '10%',
  },
  logo: {
    width: 52,
    height: 42,
    top:"-2%"
  },
  inputTop: {
    width: '88%',
    height: 41,
    fontSize: 16,
    borderWidth: 1,
    padding: 10,
    color: 'black',
    backgroundColor: 'white',
    textAlignVertical: 'top',
    marginTop: 6,
  },
  input: {
    width: '88%',
    height: 105,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    borderColor: '#ccc',
    textAlignVertical: 'top',
    backgroundColor: 'white',
    marginBottom: 4,
  },
  textBottom: {
    marginTop:'1.5%',
    fontSize: 14,
    color: 'white',
  },
  linkText: {
    fontSize: 16,
    color: '#00BBB4',
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
});

export default CompleteProfileScreen;
