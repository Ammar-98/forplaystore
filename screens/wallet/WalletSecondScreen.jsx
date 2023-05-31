import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import Button from './walletComponents/Button';
import uuid from 'react-native-uuid';

const WalletSecondScreen = ({navigation}) => {
  const totalChaak = useSelector(state => state.chaakSlice.totalChaaks);
  const redeem = [
    {
      desc: '50% for every $60 and above spent',
      validity: '30th june 2023',
      points: '203',
    },
    {
      desc: '50% for every $60 and above spent',
      validity: '30th june 2023',
      points: '501',
    },
    {
      desc: '50% for every $60 and above spent',
      validity: '30th june 2023',
      points: '350',
    },
    {
      desc: '50% for every $60 and above spent',
      validity: '30th june 2023',
      points: '150',
    },
    {
      desc: '50% for every $60 and above spent',
      validity: '30th june 2023',
      points: '201',
    },
    {
      desc: '50% for every $60 and above spent',
      validity: '30th june 2023',
      points: '600',
    },
    {
      desc: '50% for every $60 and above spent',
      validity: '30th june 2023',
      points: '450',
    },
    {
      desc: '50% for every $60 and above spent',
      validity: '30th june 2023',
      points: '396',
    },
    {
      desc: '50% for every $60 and above spent',
      validity: '30th june 2023',
      points: '395',
    },
    {
      desc: '50% for every $60 and above spent',
      validity: '30th june 2023',
      points: '393',
    },
    {
      desc: '50% for every $60 and above spent',
      validity: '30th june 2023',
      points: '391',
    },
  ];

  const RewardItem = ({item}) => {
    return (
      <View style={{padding: 10, borderTopWidth: 1, borderTopColor: 'white'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 12, color: 'white'}}>
              {item.desc}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                // justifyContent: 'space-between',
                width: '80%',
                gap: 25,
              }}>
              <Text style={{fontSize: 10, color: 'white'}}>
                Validity: {item.validity}
              </Text>
              <Text style={{fontSize: 10, color: '#00BBB4'}}>
                Points: {item.points}
              </Text>
            </View>
          </View>
          {/* edr Botton component dalna ha walletComponents k andar jo pra hua */}
          <Button width={'35%'} height={'3%'} title={'Redeem now'} alterTitle={'Redeemed'} />
        </View>
      </View>
    );
  };

  return (
    <ImageBackground
      source={require('../../assets/linearbg.png')}
      style={{flex: 1}}>
      <View style={{gap: 2}}>
        <View style={{paddingTop: 4, paddingLeft: 6}}>
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
              marginTop: 25,
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
        </View>
        <SafeAreaView>
          <ScrollView style={{width: '100%', height: '55%'}}>
            <View>
              {redeem.map(item => {
                return <RewardItem key={uuid.v4()} item={item} />;
              })}
            </View>
            {/* <FlatList
            data={redeem}
            renderItem={({item}) => <RewardItem item={item} />}
            keyExtractor={(item, index) => index.toString()}
          /> */}
          </ScrollView>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    top: -12,
  },
  topText: {
    fontSize: 38,
    color: 'white',
  },
});

export default WalletSecondScreen;
