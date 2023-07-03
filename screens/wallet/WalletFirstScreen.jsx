import React, {useState, useEffect,useContext} from 'react';
import ChaakReceived from '../../components/ChaaksReceived';
import ButtonGradient from '../../components/ButtonGradient';
import {View, Image, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import jwt_decode from 'jwt-decode';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import AppContext from '../../components/AppContext';
// import ButtonGradient from '../components/ButtonGradient'

function WalletFirstScreen({navigation}) {
  const {totalChaakPoints,settotalChaakPoints} = useContext(AppContext);
  // const totalChaak = useSelector(state => state.chaakSlice.totalChaaks);
  // const [totalChaak, setTotalChaak] = useState(0);
  const [receivedChaak, setreceivedChaak] = useState(0)
  const handleNavigate = () => {
    navigation.navigate('WalletSecondScreen');
  };

  const getWalletData = async (userID,token) => {
    console.log('userID', userID);

    try{
      urlToHit='https://api.kachaak.com.sg/api/users/'+userID+'/wallet'
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res=await axios.get(urlToHit,config)
      console.log('res', res.data.data)
      settotalChaakPoints(res.data.data.totalAmount)
      setreceivedChaak(res.data.data.lastRecieved)
    }
    catch(e)
    {console.log('e', e)}
  };

  const decodeToken = async token => {
    var decoded = jwt_decode(token);
    console.log('decoded', decoded.id);
    getWalletData(decoded.id,token);
    
  };

  const getToken = async () => {
    try {
      const SavedToken = await AsyncStorage.getItem('LoginToken');
      console.log('SavedTokenhjhjhj', SavedToken);
      decodeToken(SavedToken);
    } catch (e) {console.log('e', e)}
  };

  useFocusEffect(
    React.useCallback(() => {
      // This function will be called when the screen comes into focus

      // You can perform any logic or fetch data here
      console.log('here')
      getToken()
      // Returning a cleanup function
      return () => {
        // This function will be called when the screen loses focus
        // You can perform any cleanup logic here
        console.log('gone')
      };
    }, []),
  );
  // useEffect(() => {
  //   getToken();
  // }, []);




  return (
    <View style={{alignItems: 'center', backgroundColor: '#00BBB4', flex: 1}}>
      <Image
        source={require('../../assets/dollar.png')}
        style={{width: 70, height: 85, marginTop: 40, marginBottom: 50}}
      />
      <ChaakReceived width={'35%'} height={'22%'} receivedChaak={receivedChaak}/>
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
        {totalChaakPoints}
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
