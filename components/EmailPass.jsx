import React from 'react';
import {View, TextInput, Image, StyleSheet} from 'react-native';

function EmailPass({handleEmailChange, handlePasswordChange}) {
  return (
    <View>
      <View style={styles.inputContainer}>
        <Image
          source={require('../assets/email.png')}
          style={{width: 15, height: 13}}
        />
        <TextInput
          style={[styles.input]}
          placeholder="Email ID"
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="white"
          onChangeText={handleEmailChange}
        />
      </View>
      <View style={styles.inputContainer}>
        <Image
          source={require('../assets/password.png')}
          style={{width: 15, height: 15}}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          placeholderTextColor="white"
          onChangeText={handlePasswordChange}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: 320,
    flexDirection: 'row',
    //   justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    gap: 6,
    marginTop: 15,
    borderColor: 'white',
  },
  input: {
    height: 50,
    width: '80%',
    borderWidth: 0,
    color: 'white',
    // borderColor: 'blue',
    // borderWidth: 2,
  },
});

export default EmailPass;
