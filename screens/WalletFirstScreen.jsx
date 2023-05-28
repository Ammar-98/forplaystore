import React, {useState} from 'react';
import ChaakReceived from '../components/ChaaksReceived';
import ButtonGradient from '../components/ButtonGradient';
import { View, Image, Text } from 'react-native';
// import ButtonGradient from '../components/ButtonGradient'

function WalletFirstScreen() {
  const [totalChaak, setTotalChaak] = useState(0);
  return (
    <View style={{alignItems: 'center', backgroundColor: '#00BBB4', flex: 1}}>
      <Image
        source={require('../assets/dollar.png')}
        style={{width: 70, height: 85, marginTop: 40, marginBottom: 50}}
      />
      <ChaakReceived width={'35%'} height={'22%'} />
      <Text
        style={{
          fontSize: 18,
          //   textAlign: 'center',
          color: 'black',
          marginTop: 70,
        }}>
        Chaak$ to spend
      </Text>
      <Text
        style={{
          fontSize: 68,
         
          color: 'white',
            marginTop: -10,
        }}>
        {totalChaak}
      </Text>
      <ButtonGradient width={'35%'} height={'6%'} title={'REDEEM'} />
    </View>
  );
}

export default WalletFirstScreen;
