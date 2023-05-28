import React, {useRef} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
// import {tw} from 'native-base';

const LogoScreen = () => {
    // const rotateDeg = useRef(new Animated.Value(0)).current;
    // console.log(rotateDeg)
    // const translateX = useRef(new Animated.Value(400)).current;
    // console.log(translateX)

  // Rotate the logo 90 degrees
    const rotateLogo = () => {
      
    Animated.timing(90, {
      toValue: 90,
      duration: 5000,
      useNativeDriver: true,
    }).start();
    };
    
    // const spin = this.spinValue.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: ['0deg', '360deg'],
    // });

  // Animate the text component to translateX = 0 and stick to the position
//   const animateText = () => {
//     Animated.timing(translateX, {
//       toValue: 0,
//       duration: 1000,
//       useNativeDriver: true,
//     }).start();
//   };

  return (
    <View style={{flex: 1, padding: 20}}>
      <Text>This id text</Text>
      <Animated.Image
        style={[
          styles.logo,
          {
            transform: [{rotate: '90deg'}],
          },
        ]}
        source={require('../assets/chaakLogo.png')}
      />
      <Animated.View onLayout={rotateLogo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#fff',
  },
    logo: {
    //   flex:1,
    width: 74,
    height: 60,
  },
  textContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#888',
    width: 200,
    paddingRight: 16,
  },
  text: {
    color: '#fff',
    fontSize: 24,
  },
});

export default LogoScreen;
