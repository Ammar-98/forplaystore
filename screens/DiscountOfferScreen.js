import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {Dimensions} from 'react-native';
import {useState, useEffect} from 'react';
import {useContext} from 'react';
import AppContext from '../components/AppContext';
import axios from 'axios';
import {axiosGet} from '../axios/axios';
import moment from 'moment';
import * as size from '../components/FontSize';
import {RefreshControl} from 'react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const HeaderView = () => {
  return (
    <View style={styles.HeaderView}>
      <Text style={styles.HeaderText}>Deals</Text>
      <Text style={styles.subHeadertext}>
        Latest offers, updated every 15 minutes
      </Text>
    </View>
  );
};

const Coloumn1 = props => {
  // console.log('props', props.data.item)
  return (
    <View style={styles.Coloumn1}>
      <View style={styles.Row1C1}>
        <Text style={styles.RestaurantNameText}>
          {props.data.item.franchise.brandName}
        </Text>
      </View>
      <View style={styles.Row2C1}>
        <Text
          style={{
            color: 'white',
            fontSize: size.Xsmall(),
            textShadowColor: 'black',
            textShadowOffset: {width: 0, height: 0},
            textShadowRadius: 10,
          }}>
          {props.data.item.strategy.category}
        </Text>
      </View>
    </View>
  );
};
const Coloumn2 = props => {
  console.log('props', props.data.item);
  return (
    <View style={styles.Coloumn}>
      <View style={styles.Row}>
        <View
          style={{
            height: '100%',
            width: '50%',
            // backgroundColor: 'yellow',
            padding: 3,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.ColorFont1}>Start Date & Time</Text>
          <Text style={styles.numberFont}>
            {' '}
            {moment(props.data.item.strategy.startTime).format('DD/MM/YYYY')}
          </Text>
        </View>
        <View
          style={{
            height: '100%',
            width: '50%',
            // backgroundColor: 'green',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.ColorFont}>End Date & Time</Text>
          <Text style={styles.numberFont}>
            {moment(props.data.item.strategy.expireTime).format('DD/MM/YYYY')}
          </Text>
        </View>
      </View>

      <View style={styles.Row}>
        <View
          style={{
            height: '100%',
            width: '50%',
            // backgroundColor: 'yellow',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.ColorFont}>Discount on Food</Text>
          <Text style={styles.numberFont}>
            {' '}
            {props.data.item.foodDiscount}%
          </Text>
        </View>
        <View
          style={{
            height: '100%',
            width: '50%',
            // backgroundColor: 'green',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.ColorFont}>Discount on Beverages</Text>
          <Text style={styles.numberFont}>
            {props.data.item.beverageDiscount}%
          </Text>
        </View>
      </View>
    </View>
  );
};

const DiscountCardView = props => {
  return (
    <View style={styles.DiscountCardView}>
      <Coloumn1 data={props} />
      <Coloumn2 data={props} />
    </View>
  );
};

export default function DiscountOfferScreen() {
  const {userToken} = useContext(AppContext);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loading, setloading] = useState(true);

  const getDiscountOffer = async () => {
    try {
      setloading(true);
      const token = userToken;
      const urlToHit =
        'https://api.kachaak.com.sg/api/strategies/discountOffers';

      const response = await axiosGet(urlToHit);
      console.log('response', response.data);
      const responseData = response.data;
      const newData = responseData.data;
      setData(prevData => [...prevData, ...newData]);
      setHasNextPage(responseData.pagination?.hasNextPage);
      setloading(false);
    } catch (error) {
      console.log('error', error);
    }
  };
  const getDiscountOffer2 = async page => {
    try {
      setCurrentPage(1);
      setloading(true);
      const token = userToken;
      const urlToHit =
        'https://api.kachaak.com.sg/api/strategies/discountOffers';

      const response = await axiosGet(urlToHit);
      console.log('response', response.data);
      const responseData = response.data;
      const newData = responseData.data;
      setData(newData);
      setHasNextPage(responseData.pagination?.hasNextPage);
      setloading(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleEndReached = () => {
    if (hasNextPage) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      getJobs(nextPage);
    }
  };
  const emptyView = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: windowWidth,
          height: windowHeight * 0.2,
        }}>
        <Text style={{color: 'gray', fontSize: size.small()}}>
          You will be notified when a new offer is available
        </Text>
      </View>
    );
  };

  useEffect(() => {
    getDiscountOffer();
  }, []);

  const lisFooterView = () => {
    return loading == true ? (
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#00BBB4',
          marginTop:10,

          width: windowWidth,
        }}>
        <ActivityIndicator size={30} color={'black'} />
      </View>
    ) : null;
  };

  return (
    <View style={{alignItems: 'center', backgroundColor: '#00BBB4', flex: 1}}>
      <HeaderView />
      <FlatList
        data={data}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => getDiscountOffer2(1)}
          />
        }
        ListEmptyComponent={emptyView}
        ListFooterComponent={lisFooterView}
        keyExtractor={(item, index) => index}
        contentContainerStyle={{paddingBottom: windowHeight * 0.2}}
        renderItem={({item}) => {
          return <DiscountCardView item={item} />;
        }}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.7}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  HeaderView: {
    height: windowHeight * 0.2,
    width: windowWidth,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  HeaderText: {
    fontSize: size.Xlarge(),
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 5,
  },
  subHeadertext: {
    fontSize: size.small(),
    color: 'white',
    paddingHorizontal: 2,
    textShadowColor: 'black',
    textShadowOffset: {width: 0, height: 0},
    // textShadowRadius: 5,
  },
  DiscountCardView: {
    height: windowHeight * 0.2,
    width: windowWidth * 0.95,
    borderRadius: 10,
    backgroundColor: '#2B2D3A',

    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: windowHeight * 0.005,
  },

  Coloumn1: {
    height: windowHeight * 0.2,
    width: '36%',
    borderRadius: 10,
  },
  Coloumn: {
    height: windowHeight * 0.2,
    // backgroundColor: 'orange',
    width: '64%',
    borderRadius: 10,
  },
  Row1C1: {
    height: '65%',
    width: '100%',
    // backgroundColor: 'red',
    borderTopStartRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Row2C1: {
    height: '35%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'yellow',
  },
  RestaurantNameText: {
    fontSize: size.medium(),
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  Row: {
    height: '50%',
    width: '100%',
    // backgroundColor: 'red',
    borderRadius: 10,
    flexDirection: 'row',
  },
  ColorFont: {
    color: '#00BBB4',
    textShadowColor: 'black',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 10,
    fontSize: size.Xsmall(),
    width: '100%',
    textAlign: 'center',
  },
  ColorFont1: {
    color: '#00BBB4',
    fontSize: size.Xsmall(),
    borderRightWidth: 1,
    borderRightColor: '#00BBB4',
    width: '100%',
    textAlign: 'center',
  },
  numberFont: {
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 10,
    fontSize: size.Xsmall(),
  },
});
