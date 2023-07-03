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
import React from 'react';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import Button from './walletComponents/Button';
import uuid from 'react-native-uuid';
import AppContext from '../../components/AppContext';
import {useContext} from 'react';
import {Dimensions} from 'react-native';
import {useEffect, useState} from 'react';
import axios from 'axios';
const windowHeight = Dimensions.get('window').height;
const WindowWidth = Dimensions.get('window').width;

const WalletSecondScreen = ({navigation}) => {
  const {totalChaakPoints, settotalChaakPoints, userToken} =
    useContext(AppContext);

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loading, setloading] = useState(true);
  const [redeemHistory, setredeemHistory] = useState([])

  const getOffers = async page => {
    try {
      setloading(true);
      console.log('called get Offer');
      const token = userToken;
      const urlToHit = 'https://api.kachaak.com.sg/api/offers';
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(urlToHit, config);
      const responseData = response.data;
      const newData = responseData.data;
      console.log('newData', newData);
      setData(prevData => [...prevData, ...newData]);
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
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(urlToHit, config);
      console.log('response::', response);
      if(response?.data!==undefined)
      {setredeem(true);}
      // 
    } catch (e) {
      Alert.alert(e.response.data.error);
      console.log('e', e.response.data.error);
    }
  };
  useEffect(() => {
    // fetchData(currentPage);
    getOffers(currentPage);
    console.log('userToken', userToken);
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
    const [redeem, setredeem] = useState(item?.isApplied==true?true:false);
    return (
      <View
        style={{
          height: windowHeight * 0.05,
          justifyContent: 'center',
          borderTopWidth: 1,
          borderTopColor: 'white',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: WindowWidth,
          }}>
          <View style={{width: WindowWidth * 0.6}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 12,
                color: 'white',
                marginHorizontal: 2,
              }}>
              {item.offerTitle}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                // justifyContent: 'space-between',
                // width: '80%',
                // backgroundColor:'red',
                marginHorizontal: 2,
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 10, color: 'white'}}>
                Validity: {item.expiryDate}
              </Text>
              <Text style={{fontSize: 10, color: '#00BBB4'}}>
                Points: {item.points}
              </Text>
            </View>
          </View>
         
          <View
            style={{
              width: WindowWidth * 0.35,
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: redeem==true? '#525461': '#00BBB4'  ,
              borderRadius: 5,
              marginHorizontal: WindowWidth * 0.01,
            }}>
            <TouchableOpacity
              onPress={() => redeem==true?null: toggleRedeem(redeem, setredeem, item.id)}>
              <Text style={{fontSize: 18, color: '#ffffff'}}>{redeem==true?'Redeemed':'Redeem'}</Text>
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
        <Icons
          name="arrow-back"
          color={'#00BBB4'}
          size={30}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.topText}>Redeem</Text>
        <Text style={styles.topText}>your tokens</Text>
        <Text
          style={{
            fontSize: 18,
            //   textAlign: 'center',
            color: '#00BBB4',
            // marginTop: 25,
          }}>
          ChAAK$ to spend
        </Text>
        <Text
          style={{
            fontSize: 48,

            color: 'white',
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
          onPress={()=>navigation.navigate('RedeemHistory')}
          >
            <Text
              style={{
                color: '#00BBB4',
                fontSize: 15,
                marginRight: 5,
                borderBottomWidth: 1,
                borderBottomColor: '#00BBB4',
              }}>
              Redeem History
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{height: windowHeight * 0.65}}>
        {loading == true ? (
          <View
            style={{
              height: '100%',
              width: '100%',
              // backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator
              size={100}
              color={'#00BBB4'}
              // color={'orange'}
              // style={{backgroundColor: 'red'}}
            />
          </View>
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item, index) => index}
            contentContainerStyle={{paddingBottom: windowHeight * 0.2}}
            renderItem={({item}) => {
              return <RewardItem item={item} />;
            }}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.7}
          />
        )}

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
    // height: windowHeight * 0.3,
    paddingBottom: 10,
    // backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topText: {
    fontSize: 38,
    color: 'white',
  },
});

export default WalletSecondScreen;
