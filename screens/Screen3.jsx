import React, {useEffect} from 'react';
import {ImageBackground, Image, View, StyleSheet} from 'react-native';
function Screen3({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      navigation.reset({index:0,routes:[{name:'LoginScreen'}]});
    }, 2000);
  }, []);
  return (
    <ImageBackground
      source={require('../assets/screen3.png')}
      style={styles.bg}>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default Screen3;
