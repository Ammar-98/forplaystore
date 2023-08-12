import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { Text,TouchableOpacity,StyleSheet } from 'react-native'

function ButtonGradient({width, height, title, handleNavigate}) {
  return (
    <TouchableOpacity
      // style={{width: width, height: height}}
      // onPress={() => handleNavigate()}
      onPress={
        handleNavigate
          ? () => handleNavigate()
          : () => {
              console.log('no handle function');
            }
      }
    >
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
    // flex: 1,
    paddingVertical:10,
    paddingHorizontal:20,
    justifyContent: 'center',
    alignItems:"center",
    borderRadius: 5,
    borderWidth:1,
    shadowColor: 'black',
            shadowOffset: {width: 1, height: 0},
            shadowRadius: 10,
            shadowOpacity: 1,
            elevation: 5,
  },
  buttonText: {
    // flex:1,
    fontSize: 18,
    // fontFamily: 'Gill Sans',
    textAlign: 'center',
    fontWeight:'bold',
    // margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
    // justifyContent:'center'
  },
});

export default ButtonGradient