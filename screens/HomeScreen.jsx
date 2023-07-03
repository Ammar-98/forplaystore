import React, {useEffect} from 'react';
import {
  ImageBackground,
  text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
} from 'react-native';
// import Wallet from './wallet/Wallet';
// import Bulletin from './bulletin/Bulletin';
import {useDispatch} from 'react-redux';
import {authSlice} from '../store/authSlice';
import {useSelector} from 'react-redux';
import Profile from './profile/Profile';

function HomeScreen({navigation}) {
  const atHome = useSelector(state => state.authSlice.atHome);
  const dispatch = useDispatch();
  const actions = authSlice.actions;
  useEffect(() => {
    dispatch(actions.setAtHome(true));
  }, []);

  return (
    <ImageBackground source={require('../assets/homeBg.png')} style={{flex: 1}}>
      <View style={styles.continer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Wallet');
            dispatch(actions.setAtHome(false));
          }}>
          <Image
            style={styles.logo}
            source={require('../assets/walletLogo.png')}
          />
        </TouchableOpacity>

        {/* this is bottom NavBar */}
        <TouchableOpacity
          // onPress={() => {
          //   navigation.navigate('Bulletin');
          //   dispatch(actions.setAtHome(false));
          // }}
          onPress={() => {
            navigation.navigate('ProfileFirstScreen');
            dispatch(actions.setAtHome(false));
          }}
          >
          <Image
            style={styles.logo}
            source={require('../assets/profileLogo.png')}
            // onPress={navigation.navigate('WalletFirstScreen')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Bulletin');
            dispatch(actions.setAtHome(false));
          }}>
          <Image
            style={styles.logo}
            source={require('../assets/bulletinLogo.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('LocateUs');
            dispatch(actions.setAtHome(false));
          }}>
          <Image
            style={styles.logo}
            source={require('../assets/locateLogo.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('DiscountOfferScreen');
            dispatch(actions.setAtHome(false));
          }}>
          <Image
            style={styles.logo}
            source={require('../assets/discountLogo.png')}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          // bottom: '5%',
          paddingHorizontal: '5%',
        }}>
        <TouchableOpacity
        onPress={()=>navigation.navigate('SettingsScreen')}>
          <Image
            style={styles.logoBottom}
            source={require('../assets/settingLogo.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Scan');
            dispatch(actions.setAtHome(false));
          }}>
          <Image
            style={styles.logoBottom}
            source={require('../assets/scanLogo.png')}
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  continer: {
    justifyContent: 'center',
    flex: 0.9,
    alignItems: 'center',
    gap: 12,
  },
  logo: {width: 90, height: 90},
  logoBottom: {width: 32, height: 32},
});

export default HomeScreen;
