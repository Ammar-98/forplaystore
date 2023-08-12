import React from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import * as  size from './FontSize';
function Button({width, height, title, handleSignup}) {
  return (
    // <View>
      <TouchableOpacity
        style={{
          // width: width,
          // height: height,
          paddingVertical:10,
          paddingHorizontal:20,
        backgroundColor: '#00BBB4',
        borderRadius: 10,
          justifyContent:'center'
          // borderColor: 'red',
          // borderWidth: 2,
        }}
        onPress={handleSignup}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    // </View>
  );
}

var styles = StyleSheet.create({
  buttonText: {
    fontSize: size.medium(),
    textAlign: 'center',
    color: '#ffffff',
    backgroundColor: 'transparent',
    },
});

export default Button;
