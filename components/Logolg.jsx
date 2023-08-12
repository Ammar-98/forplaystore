import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

function Logolg({width, height}) {
  return (
    <View style={{}}>
      <Image
        style={[
          styles.logo,
          {width: width, height: height,},
        ]}
        resizeMode="contain"
        source={require('../assets/chaakLogo.png')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    // top: -40,
  },
});

export default Logolg;
