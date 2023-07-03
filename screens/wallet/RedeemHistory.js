import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Dimensions} from 'react-native';
import {useState, useEffect} from 'react';
import {useContext} from 'react';
import AppContext from '../../components/AppContext';
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

  const getHistory = async () => {
    try {
      token = userToken;
      const id = getuserID(userToken);
      console.log('id', id);
      urlToHit =
        'https://api.kachaak.com.sg/api/offers/user/' + id + '/redeem/history';
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(urlToHit, config);
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
          height: windowHeight * 0.05,
          justifyContent: 'center',
          borderTopWidth: 1,
          borderTopColor: 'white',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: windowWidth,
          }}>
          <View style={{width: windowWidth * 0.6}}>
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
              width: windowWidth * 0.35,
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: redeem == true ? '#525461' : '#00BBB4',
              borderRadius: 5,
              marginHorizontal: windowWidth * 0.01,
            }}>
            <TouchableOpacity
              onPress={() =>
                redeem == true ? null : toggleRedeem(redeem, setredeem, item.id)
              }>
              <Text style={{fontSize: 18, color: '#ffffff'}}>
                {redeem == true ? 'Redeemed' : 'Redeem'}
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
          source={require('../../assets/redeemHistory.png')}
          style={{
            width: windowWidth * 0.35,
            height: windowHeight * 0.3,
            // backgroundColor: 'red',
            resizeMode: 'contain',
            marginTop: 50,
          }}
        />
        <Text style={{color: 'white', fontSize: 17}}>No History yet</Text>
      </View>
    );
  };
  const LoadingView = () => {
    return (
      <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size={100} color={'#00BBB4'} />
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
      {loading == true ? <LoadingView /> : <FlatListView />}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({});
