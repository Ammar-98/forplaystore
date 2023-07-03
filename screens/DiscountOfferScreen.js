import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Dimensions} from 'react-native';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const HeaderView = () => {
  return (
    <View style={styles.HeaderView}>
      <Text style={styles.HeaderText}>Discount Offers</Text>
      <Text style={styles.subHeadertext}>find perfect discount</Text>
    </View>
  );
};

const Coloumn1 = () => {
  return (
    <View style={styles.Coloumn1}>
      <View style={styles.Row1C1}>
        <Text style={styles.RestaurantNameText}>Restaurant Name</Text>
      </View>
      <View style={styles.Row2C1}>
        <Text style={{color: 'white'}}>Raining Strategy</Text>
      </View>
    </View>
  );
};
const Coloumn2 = () => {
  return (
    <View style={styles.Coloumn}>
      <View style={styles.Row}>
        <View
          style={{
            height: '100%',
            width: '50%',
            // backgroundColor: 'yellow',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.ColorFont1}>Start Date & Time</Text>
          <Text style={styles.numberFont}> 13/12/2023</Text>
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
          <Text style={styles.numberFont}> 13/12/2024</Text>
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
          <Text style={styles.numberFont}> 10%</Text>
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
          <Text style={styles.numberFont}> 15%</Text>
        </View>
      </View>
    </View>
  );
};

const DiscountCardView = () => {
  return (
    <View style={styles.DiscountCardView}>
      <Coloumn1 />
      <Coloumn2 />
    </View>
  );
};

export default function DiscountOfferScreen() {
  return (
    <View style={{alignItems: 'center', backgroundColor: '#00BBB4', flex: 1}}>
      <HeaderView />
      <DiscountCardView />
      <DiscountCardView />
      <DiscountCardView />
    </View>
  );
}

const styles = StyleSheet.create({
  HeaderView: {
    height: windowHeight * 0.2,
    width: windowWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  HeaderText: {
    fontSize: 35,
    color: 'white',
  },
  subHeadertext: {
    fontSize: 20,
    color: 'white',
  },
  DiscountCardView: {
    height: windowHeight * 0.2,
    width: windowWidth * 0.95,
    borderRadius: 10,
    backgroundColor: '#2B2D3A',

    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: windowHeight*0.005,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
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
    fontSize: 11,
    width: '100%',
    textAlign: 'center',
  },
  ColorFont1: {
    color: '#00BBB4',
    fontSize: 11,
    borderRightWidth: 1,
    borderRightColor: '#00BBB4',
    width: '100%',
    textAlign: 'center',
  },
  numberFont: {
    color: 'white',
    fontSize: 10,
  },
});
