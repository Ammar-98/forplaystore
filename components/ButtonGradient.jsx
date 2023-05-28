import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { Text,TouchableOpacity,StyleSheet } from 'react-native'

function ButtonGradient({width,height,title}) {
    return (
      <TouchableOpacity style={{width: width, height: height}}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#525461', '#343643', '#1B1D2A']}
          style={styles.linearGradient}>
          <Text style={styles.buttonText}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
}

var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems:"center",
    borderRadius: 5,
  },
  buttonText: {
    // flex:1,
    fontSize: 18,
    // fontFamily: 'Gill Sans',
    textAlign: 'center',
    // margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
    // justifyContent:'center'
  },
});

export default ButtonGradient