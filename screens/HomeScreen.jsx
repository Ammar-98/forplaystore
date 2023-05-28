import React from 'react';
import {
  ImageBackground,
  text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
} from 'react-native';

function HomeScreen({navigation}) {
  return (
    <ImageBackground source={require('../assets/homeBg.png')} style={{flex: 1}}>
      <View style={styles.continer}>
        <TouchableOpacity onPress={() => navigation.navigate('MenuScreen')}>
          <Image
            style={styles.logo}
            source={require('../assets/walletLogo.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.logo}
            source={require('../assets/profileLogo.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.logo}
            source={require('../assets/bulletinLogo.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.logo}
            source={require('../assets/locateLogo.png')}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          bottom: '5%',
          paddingHorizontal: '5%',
        }}>
        <TouchableOpacity>
          <Image
            style={styles.logoBottom}
            source={require('../assets/settingLogo.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
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
    flex: 1,
    alignItems: 'center',
    gap: 12,
  },
  logo: {width: 110, height: 110},
  logoBottom: {width: 32, height: 32},
});

export default HomeScreen;
