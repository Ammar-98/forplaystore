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
// import ButtonGradient from '../../';
import Button from './bulletinComponents/Button';
import uuid from 'react-native-uuid';

const BulletinFirstScreen = ({navigation}) => {
    const totalChaak = useSelector(state => state.chaakSlice.totalChaaks);
    const handleNavigate = () => {
        navigation.navigate('BulletinScreen2');
    }
  const redeem = [
    {
      headiing: 'Usher at Singapure Farmula One 2024',
      info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, nam neque sed deleniti numquam minus! Commodi dicta enim accusantium omnis repellendus doloremque ad nulla voluptate,!',
    },
    {
      headiing: 'Usher at Singapure Farmula One 2024',
      info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, nam neque sed deleniti numquam minus! Commodi dicta enim accusantium omnis repellendus doloremque ad nulla voluptate,!',
    },
    {
      headiing: 'Usher at Singapure Farmula One 2024',
      info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, nam neque sed deleniti numquam minus! Commodi dicta enim accusantium omnis repellendus doloremque ad nulla voluptate,!',
    },
    {
      headiing: 'Usher at Singapure Farmula One 2024',
      info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, nam neque sed deleniti numquam minus! Commodi dicta enim accusantium omnis repellendus doloremque ad nulla voluptate,!',
    },
    {
      headiing: 'Usher at Singapure Farmula One 2024',
      info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, nam neque sed deleniti numquam minus! Commodi dicta enim accusantium omnis repellendus doloremque ad nulla voluptate,!',
    },
  ];

  const RewardItem = ({item}) => {
    return (
      <View style={{padding: 10, borderTopWidth: 1, borderTopColor: 'white'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width: '70%'}}>
            <Text style={{fontWeight: 'bold', fontSize: 14, color: '#00BBB4'}}>
              {item.headiing}
            </Text>

            <Text style={{fontSize: 12, color: 'white'}}>{item.info}</Text>
          </View>
          {/* edr Botton component dalna ha walletComponents k andar jo pra hua */}

          <Button
            width={'27%'}
            height={'3%'}
            title={'Apply'}
            alterTitle={'Applied'}
            handleNavigate={handleNavigate}
          />
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
         
        </View>
        <View style={styles.container}>
          <Text style={[styles.topText,{marginTop:35}]}>
            Earn more{' '}
            <Text style={[styles.topText, {color: '#00BBB4'}]}>CHAAK$</Text>
          </Text>
          <Text style={[styles.topText, {fontSize: 26}]}>
            with these job opportunities
          </Text>
          
        </View>
        <SafeAreaView style={{marginTop:40}}>
          <ScrollView style={{width: '100%', height: '80%'}}>
            <View>
              {redeem.map(item => {
                return <RewardItem key={uuid.v4()} item={item} />;
              })}
            </View>
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

export default BulletinFirstScreen;
