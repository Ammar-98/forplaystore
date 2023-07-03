import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

function ChaakReceived({ width, height,receivedChaak }) {
  // const [receivedChaak,setReceivedChaak]= useState(rcvdc)
  const [totalChaak, setTotalChaak] = useState(0);
  return (
    <TouchableOpacity style={{width: width, height: height}}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#525461', '#343643', '#1B1D2A']}
        style={styles.linearGradient}>
        <Text style={styles.buttonText}>Recieved</Text>
        <Text style={{fontSize: 42, textAlign: 'center', color: 'white'}}>
          {receivedChaak}
        </Text>
        <Text style={styles.buttonText}>Chaak$</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    // flex:1,
    fontSize: 18,
    // fontFamily: 'Gill Sans',
    textAlign: 'center',
    // margin: 10,
    color: '#00BBB4',
    backgroundColor: 'transparent',
    // justifyContent:'center'
  },
});

export default ChaakReceived;
