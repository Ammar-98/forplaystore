import React,{useEffect} from 'react';
import {ImageBackground, Image, View, StyleSheet} from 'react-native';
function Screen1({navigation}) {
    useEffect(() => {
      setTimeout(() => {
        navigation.navigate('Screen2');
      }, 1000);
    }, []);
    return (
    <ImageBackground
      source={require('../assets/linearbg.png')}
      style={styles.bg}>
          <Image source={require('../assets/chaakLogo.png')} style={styles.logo} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
    logo: {
        width: 46,
        height:37
  }
});

export default Screen1;
