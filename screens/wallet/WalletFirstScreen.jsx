import React, {useState} from 'react';
import ChaakReceived from '../../components/ChaaksReceived';
import ButtonGradient from '../../components/ButtonGradient';
import {View, Image, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
// import ButtonGradient from '../components/ButtonGradient'

function WalletFirstScreen({ navigation }) {
  const totalChaak = useSelector(state => state.chaakSlice.totalChaaks); 
  // const [totalChaak, setTotalChaak] = useState(2788);
  const handleNavigate = () => {
    navigation.navigate('WalletSecondScreen');
  };

  return (
    <View style={{alignItems: 'center', backgroundColor: '#00BBB4', flex: 1}}>
      <Image
        source={require('../../assets/dollar.png')}
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
      <ButtonGradient
        width={'35%'}
        height={'6%'}
        title={'REDEEM'}
        handleNavigate={handleNavigate}
      />
    </View>
  );
}

export default WalletFirstScreen;
