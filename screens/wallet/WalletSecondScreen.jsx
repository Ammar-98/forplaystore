import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { PixelRatio } from 'react-native';
import React from 'react';
import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { RefreshControl } from 'react-native';
import {useSelector} from 'react-redux';
import Button from './walletComponents/Button';
import uuid from 'react-native-uuid';
import {axiosGet} from '../../axios/axios';
import AppContext from '../../components/AppContext';
import {useContext} from 'react';
import {Dimensions} from 'react-native';
import {useEffect, useState} from 'react';
import axios from 'axios';
import { useToast } from 'react-native-toast-notifications';
import { errortoast,messagetoast } from '../../Toast';
import * as size from '../../components/FontSize';
const windowHeight = Dimensions.get('window').height;
const WindowWidth = Dimensions.get('window').width;
const fs=Dimensions.get('window')
const WalletSecondScreen = ({navigation}) => {
  const {totalChaakPoints, settotalChaakPoints, userToken} =
    useContext(AppContext);

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loading, setloading] = useState(true);
  const [redeemHistory, setredeemHistory] = useState([]);

  const  toast= useToast()
  const showMessage = message => {
    toast.show(message, messagetoast(message));
  };
  const showError = message => {
    toast.show(message, errortoast(message));
  };


  const getOffers = async page => {
    try {
      setloading(true);
      console.log('called get Offer');
      const token = userToken;
      const urlToHit = 'https://api.kachaak.com.sg/api/offers';

      const response = await axiosGet(urlToHit);
      const responseData = response.data;
      const newData = responseData.data;
      console.log('newData', newData);
      const filteredData = newData.filter(item => !item.hasRedeemedOffer==true);
      setData(prevData => [...prevData, ...filteredData]);
      setHasNextPage(responseData.pagination.hasNextPage);
      setloading(false);
    } catch (e) {
      console.log('e', e);
    }
  };
  const lisFooterView = () => {
    return loading == true ? (
      <View
        style={{
          alignItems: 'center',
          // backgroundColor: '#00BBB4',
          marginTop:10,
          width: WindowWidth,
        }}>
        <ActivityIndicator size={30} color={'#00BBB4'} />
      </View>
    ) : null;
  };
  const getOffers2 = async page => {
    try {
      setCurrentPage(1)
      setloading(true);
      console.log('called get Offer');
      const token = userToken;
      const urlToHit = 'https://api.kachaak.com.sg/api/offers';

      const response = await axiosGet(urlToHit);
      const responseData = response.data;
      const newData = responseData.data;
      console.log('newData', newData);
      const filteredData = newData.filter(item => !item.hasRedeemedOffer==true);

      setData(filteredData);
      setHasNextPage(responseData.pagination.hasNextPage);
      setloading(false);
    } catch (e) {
      console.log('e', e);
    }
  };
  const toggleRedeem = async (redeem, setredeem, id) => {
    // Alert.alert('as',id)
    // if (redeem == 'Redeem') {

    try {
      console.log('called redeem offer');
      console.log('id', id);
      const token = userToken;

      console.log('token', token);
      const urlToHit =
        'https://api.kachaak.com.sg/api/offers/' + id + '/redeem';

      const response = await axiosGet(urlToHit);
      console.log('response::', response);
      if (response?.data !== undefined) {
        setredeem(true);
      }
      //
    } catch (e) {
     showError(e.response.data.error);
      console.log('e', e.response.data.error);
    }
  };
  useEffect(() => {
    // fetchData(currentPage);
    getOffers(currentPage);
    // console.log('userToken', userToken);
    // console.log('fs',size.small())
  }, []);

  const handleEndReached = () => {
    if (hasNextPage) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      getJobs(nextPage);
    }
  };

  const totalChaak = totalChaakPoints;

  const RewardItem = ({item}) => {
    console.log('item:::', item);
    const [redeem, setredeem] = useState(
      item?.hasRedeemedOffer == true ? true : false,
    );
    return (
      <View
        style={{
          minHeight: windowHeight * 0.08,
          justifyContent: 'center',
          borderTopWidth: 1,
          borderTopColor: 'white',
          borderBottomWidth: 1,
          borderBottomColor: 'white',
        }}>
        <View
          style={{
            flexDirection: 'row',
            // justifyContent: 'space-between',
            width: WindowWidth,

          // backgroundColor:'green',
          }}>
          <View
            style={{width: WindowWidth * 0.74, justifyContent: 'space-evenly',}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: size.small(),
                color: 'white',
                marginLeft: 5,
                textShadowColor: 'black',
                  textShadowOffset: {width: 0, height: 1},
                  textShadowRadius: 10,
                // marginHorizontal: 2,
              }}>
              {item.offerTitle}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                // backgroundColor:'red',
                // justifyContent: 'space-between',
                width: '100%',
                // backgroundColor:'red',
                // marginHorizontal: 2,
                justifyContent: 'space-between',
              }}>
              
              <Text
             
                style={{
                  fontSize: size.Xsmall(),
                  color: 'white',
                  marginLeft: 5,
                  textShadowColor: 'black',
                  textShadowOffset: {width: 0, height: 1},
                  textShadowRadius: 10,
                }}>
                Validity:{' '}
                {moment(item.expiryDate).format('MMMM Do YYYY, h:mm a')}
              </Text>
             
              <Text style={{fontSize: size.Xsmall(), color: '#00BBB4',textShadowColor: 'black',
                  textShadowOffset: {width: 0, height: 1},
                  textShadowRadius: 10,}}>
                Points: {item.points}
              </Text>
            </View>
          </View>

          <View
            style={{
              width: WindowWidth * 0.24,
              // height: '100%',
              // paddingHorizontal: 5,
              // paddingVertical: 5,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor:
                redeem == true || item.hasRedeemedOffer == true
                  ? '#525461'
                  : '#00BBB4',
              // backgroundColor:'orange',
              borderRadius: 5,
              // marginRight:3
              marginLeft: WindowWidth * 0.01,
            }}>
            <TouchableOpacity
              onPress={() =>
                redeem == true || item.hasRedeemedOffer == true
                  ? null
                  : toggleRedeem(redeem, setredeem, item.id)
              }>
              <Text
                style={{
                  fontSize: size.medium(),
                  color: '#ffffff',
                  textShadowColor: 'black',
                  textShadowOffset: {width: 0, height: 0},
                  textShadowRadius: 5,
                }}>
                {redeem == true ? 'Redeemed' : 'Redeem'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ImageBackground
      source={require('../../assets/linearbg.png')}
      style={{flex: 1}}>
      <View
        style={{
          paddingLeft: 6,
          // backgroundColor: 'red',
          height: windowHeight * 0.05,
          justifyContent: 'center',
        }}>
        {/* <Icons
          name="arrow-back"
          color={'#00BBB4'}
          size={30}
          onPress={() => navigation.goBack()}
        /> */}
      </View>
      <View style={styles.container}>
        <Text style={styles.topText}>Redeem your tokens</Text>
        {/* <Text style={styles.topText}>your tokens</Text> */}
        <View style={{flexDirection:'row'}}>
        <Text
          style={{
            fontSize: size.medium(),
            //   textAlign: 'center',
            color: '#00BBB4',
            // marginTop: 25,
          }}>
          ChAAK{''}</Text>
          {( <FontAwesome
            name={'dollar'}
            size={17}
            color='#00BBB4'
            style={{ transform: [{ rotate: '15deg' }],marginTop:2 }}
          />)}
          <Text  style={{
            fontSize: size.medium(),
            //   textAlign: 'center',
            color: '#00BBB4',
            // marginTop: 25,
          }}>{' '}to spend</Text>
          </View>
        <Text
          style={{
            fontSize: size.Xlarge(),

            color: 'white',
            textShadowColor: 'black',
            textShadowOffset: {width: 1, height: 0},
            textShadowRadius: 10,
            // marginTop: -10,
          }}>
          {totalChaak}
        </Text>
        <View
          style={{
            width: '100%',
            // backgroundColor: 'red',
            alignItems: 'flex-end',
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('RedeemHistory')}>
            <Text
              style={{
                color: '#00BBB4',
                fontSize: size.small(),
                marginRight: 5,
                borderBottomWidth: 1,
                borderBottomColor: '#00BBB4',
                textShadowColor: 'black',
                  textShadowOffset: {width: 0, height: 1},
                  textShadowRadius: 10,
              }}>
              Redeem History
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{height: windowHeight * 0.6}}>
      
          
          <FlatList
            data={data}
            refreshControl={<RefreshControl refreshing={loading}  onRefresh={()=>getOffers2(1)} />}
            ListFooterComponent={lisFooterView}

            keyExtractor={(item, index) => index}
            contentContainerStyle={{paddingBottom: windowHeight * 0.2}}
            renderItem={({item}) => {
              return <RewardItem item={item} />;
            }}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.7}
          />
       

        {/* <ScrollView style={{width: '100%', height: '100%'}}>
          <View style={{paddingBottom: windowHeight * 0.2}}>
            {redeem.map(item => {
              return <RewardItem key={uuid.v4()} item={item} />;
            })}
          </View>
         
        </ScrollView> */}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: windowHeight * 0.25,
    paddingBottom: 10,
    // backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topText: {
    fontSize: size.Xlarge(),
    color: 'white',
    textShadowColor: 'black',
                  textShadowOffset: {width: 0, height: 1},
                  textShadowRadius: 10,
  },
});

export default WalletSecondScreen;
