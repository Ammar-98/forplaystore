import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import * as size from '../../components/FontSize';
import React from 'react';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dimensions} from 'react-native';
import {useState, useEffect} from 'react';
import {useContext} from 'react';
import AppContext from '../../components/AppContext';
import {axiosGet} from '../../axios/axios';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function RedeemHistory() {
  const [loading, setloading] = useState(true);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);

  const {userToken} = useContext(AppContext);

  const getuserID = token => {
    try {
      setloading(true);

      const decodedToken = jwtDecode(token);
      return decodedToken.id;
    } catch (error) {
      console.log('Error decoding token:', error);
      return null;
    }
  };
  const getUserToken = async () => {
    try {
      const savedToken = await AsyncStorage.getItem('LoginToken');

      console.log('savedTokenxxxxxxxx', savedToken);

      if (savedToken != null) {
        return savedToken;
      } else {
        return null;
      }
    } catch (err) {
      console.log('getUserTokenError', err);
      return null;
    }
  };

  const getHistory = async () => {
    try {
      token = await getUserToken();
      const id = await getuserID(token);
      console.log('id', id);
      urlToHit =
        'https://api.kachaak.com.sg/api/offers/user/' + id + '/redeem/history';

      const response = await axiosGet(urlToHit);
      const responseData = response.data;
      const newData = responseData.data;
      setData(prevData => [...prevData, ...newData]);
      setHasNextPage(responseData.pagination.hasNextPage);
      setloading(false);
    } catch (e) {
      console.log('errorr', e);
    }
  };

  const handleEndReached = () => {
    if (hasNextPage) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      getJobs(nextPage);
    }
  };
  const HistoryItem = ({item}) => {
    console.log('item:::', item);
    const [redeem, setredeem] = useState(
      item?.isApplied == true ? true : false,
    );
    return (
      <View
        style={{
          height: windowHeight * 0.1,
          justifyContent: 'center',
          borderTopWidth: 1,
          borderTopColor: 'white',
          borderBottomWidth: 1,
          borderBottomColor: 'white',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: windowWidth,
          }}>
          <View
            style={{width: windowWidth * 0.6, justifyContent: 'space-evenly'}}>
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
              {item.offer.offerTitle}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                // justifyContent: 'space-between',
                // width: '80%',
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
                Validity:
                {moment(item.offer.expiryDate).format('MMMM Do YYYY, h:mm a')}
              </Text>
              <Text
                style={{
                  fontSize: size.Xsmall(),
                  color: '#00BBB4',
                  textShadowColor: 'black',
                  textShadowOffset: {width: 0, height: 1},
                  textShadowRadius: 10,
                }}>
                Points: {item.offer.points}
              </Text>
            </View>
          </View>

          <View
            style={{
              width: windowWidth * 0.35,
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.7)',
              borderRadius: 5,
              marginHorizontal: windowWidth * 0.01,
              borderWidth: 0.5,
              // borderColor: 'gray',
            }}>
            <TouchableOpacity
            // onPress={() =>
            //   redeem == true ? null : toggleRedeem(redeem, setredeem, item.offer.id)
            // }
            >
              <Text style={{fontSize: size.medium(), color: '#ffffff',  textShadowColor: 'black',
            textShadowOffset: {width: 0, height: 0},
            textShadowRadius: 10,}}>
                {'Redeemed'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const FlatListView = () => {
    return (
      <FlatList
        data={data}
        keyExtractor={(item, index) => index}
        contentContainerStyle={{
          paddingBottom: windowHeight * 0.2,
          marginVertical: 10,
          // marginLeftL
          //   backgroundColor: 'red',
        }}
        ListEmptyComponent={EmptyView}
        renderItem={({item}) => {
          return <HistoryItem item={item} />;
        }}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.7}
      />
    );
  };
  const Header = () => {
    return (
      <View
        style={{
          width: windowWidth,
          height: windowHeight * 0.15,
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: size.Xlarge(),
            textShadowColor: 'black',
            textShadowOffset: {width: 0, height: 0},
            textShadowRadius: 10,
          }}>
          Redeemed Offers
        </Text>
      </View>
    );
  };

  const EmptyView = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center',
          paddingTop: windowHeight * 0.2,
        }}>
        <Image
          source={require('../../assets/Redeem123.png')}
          style={{
            width: windowWidth * 0.35,
            height: windowHeight * 0.3,
            // backgroundColor: 'red',
            resizeMode: 'contain',
            marginTop: 50,
          }}
        />
        <Text style={{color: 'white', fontSize: size.medium()}}>
          No History yet
        </Text>
      </View>
    );
  };
  const LoadingView = () => {
    return (
      <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size={50} color={'#00BBB4'} />
      </View>
    );
  };

  useEffect(() => {
    getHistory();
    console.log('userToken', userToken);
  }, []);

  return (
    <LinearGradient
      start={{x: 1, y: 1}}
      end={{x: 0.5, y: 0}}
      colors={['#1B1D2A', '#222431', '#343643', '#525461', '#595B68']}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        height: windowHeight,
        width: windowWidth,
      }}>
      <Header />
      {loading == true ? <LoadingView /> : <FlatListView />}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({});
