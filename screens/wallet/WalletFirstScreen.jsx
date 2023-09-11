import React, {useState, useContext} from 'react';
import ChaakReceived from '../../components/ChaaksReceived';
import ButtonGradient from '../../components/ButtonGradient';
import {View, Image, Text, ScrollView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import jwtDecode from 'jwt-decode';
import {useFocusEffect} from '@react-navigation/native';
import {useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {authSlice} from '../../store/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {axiosGet} from '../../axios/axios';
import AppContext from '../../components/AppContext';
import {RefreshControl} from 'react-native';
import { Platform } from 'react-native';
// import ButtonGradient from '../components/ButtonGradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {Dimensions} from 'react-native';
import * as size from '../../components/FontSize';

const Wheight = Dimensions.get('window').height;
const WWidth = Dimensions.get('window').width;

function WalletFirstScreen(props) {
  const dispatch = useDispatch();
  const actions = authSlice.actions;

  const [refreshing, setRefreshing] = useState(false);
  const focused = useIsFocused();

  const {totalChaakPoints, settotalChaakPoints} = useContext(AppContext);
  // const totalChaak = useSelector(state => state.chaakSlice.totalChaaks);
  // const [totalChaak, setTotalChaak] = useState(0);
  const [receivedChaak, setreceivedChaak] = useState(0);
  const handleNavigate = () => {
    props.navigation.navigate('WalletSecondScreen');
  };

  const getWalletData = async (userID, token) => {
    // console.log('userID', userID);

    try {
      urlToHit = 'https://api.kachaak.com.sg/api/users/' + userID + '/wallet';

      const res = await axiosGet(urlToHit);
      // console.log('res', res.data.data)
      settotalChaakPoints(res.data.data.totalAmount);
      setreceivedChaak(res.data.data.lastRecieved);
      setRefreshing(false);
    } catch (e) {
      console.log('e', e);
    }
  };

  const decodeToken = async token => {
    var decoded = jwtDecode(token);
    // console.log('decoded', decoded.id);
    getWalletData(decoded.id, token);
  };

  const getToken = async () => {
    try {
      setRefreshing(true);
      console.log('gettokenCalled');
      const SavedToken = await AsyncStorage.getItem('LoginToken');
      // console.log('SavedTokenhjhjhj', SavedToken);
      decodeToken(SavedToken);
    } catch (e) {
      console.log('e', e);
    }
  };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     // This function will be called when the screen comes into focus

  //     // You can perform any logic or fetch data here
  //     console.log('FocusEffecthere')
  //     getToken()
  //     // Returning a cleanup function
  //     return () => {
  //       // This function will be called when the screen loses focus
  //       // You can perform any cleanup logic here
  //       console.log('gone')
  //     };
  //   }, []),
  // );

  // useFocusEffect(() => {
  //   console.log('focusEffffffffffffect', )
  //   getToken()
  // })

  useEffect(() => {
    dispatch(actions.setAtHome(false));
    getToken();
  }, []);
  // useEffect(() => {
  //   if(focused)
  //   {
  //     console.log('infocus')
  //   getToken();
  //   }
  //   else{console.log('unfocused')}
  // }, [focused]);

  const handleRefresh = () => {
    if (!refreshing) {
      getToken();
    }
  };
  return (
    <ScrollView
      style={{flexGrow: 1}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }>
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#00BBB4',
          height: Wheight * 0.9,
          paddingTop:Platform.OS=='ios'?Wheight*0.1:0
        }}>
        {/* <Image
          source={require('../../assets/dollar.png')}
          style={{width: 70, height: 85, marginTop: 40, marginBottom: 50}}
        /> */}

        <View
          style={{
            // backgroundColor: 'red',
            width: Wheight * 0.16,
            height: Wheight * 0.16,
            borderRadius: Wheight * 0.08,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 5,
            borderColor: 'white',
            marginTop: 20,
            marginBottom: Wheight * 0.05,
            shadowColor: 'black',
            shadowOffset: {width: 10, height: 10},
            shadowRadius: 10,
            shadowOpacity: 1,
            elevation: 5,
          }}>
          <FontAwesome
            name={'dollar'}
            // style={{
            //   textShadowColor: 'black',
            // textShadowOffset: {width: 1, height: 0},
            // textShadowRadius: 10,

            // }}
            style={{
              textShadowColor: 'black',
              textShadowOffset: {width: 1, height: 0},
              textShadowRadius: 10,
              transform: [{rotate: '15deg'}],
            }}
            size={65}
            color="white"
          />
        </View>

        <ChaakReceived
          width={'35%'}
          height={'22%'}
          receivedChaak={receivedChaak}
        />
        <View style={{flexDirection:'row',height:Wheight*0.1,alignItems:'center',justifyContent:'center'}}>
        <Text
          style={{
            fontSize: size.medium(),
            //   textAlign: 'center',
            // fontWeight:'bold',
            color: 'black',
            // backgroundColor:'red'
          }}>
          Chaak to{' '}
        </Text>
        <FontAwesome name={'dollar'} size={20} color="black" style={{ transform: [{ rotate: '15deg' }] }} />
        <Text style={{
            fontSize: size.medium(),
            //   textAlign: 'center',
            // fontWeight:'bold',
            color: 'black',
            // backgroundColor:'red'
          }}>{' '}spend</Text>
        </View>
        <Text
          style={{
            fontSize: size.XXlarge(),
            // backgroundColor:'green',
            color: 'white',
            fontWeight: 'bold',
            // marginTop: -10,
            marginBottom: Wheight * 0.06,

            textShadowColor: 'black',
            textShadowOffset: {width: 0, height: 1},
            textShadowRadius: 10,
          }}>
          {totalChaakPoints}
        </Text>
        <ButtonGradient
          width={'3%'}
          height={'6%'}
          title={'REDEEM'}
          handleNavigate={handleNavigate}
        />
      </View>
    </ScrollView>
  );
}

export default WalletFirstScreen;
