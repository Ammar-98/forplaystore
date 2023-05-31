import React from 'react'
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';

function NavBarBottom({navigation}) {
  return (
    <View style={styles.bottomNavbar}>
      <TouchableOpacity style={styles.navbarButton}>
        <Image
          style={{width: 28, height: 36}}
          source={require('../assets/home.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navbarButton}
        onPress={() => { navigation.navigate('WalletFirstScreen'); }}>
        <Image
          style={{width: 28, height: 36}}
          source={require('../assets/wallet.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navbarButton}>
        <Image
          style={{width: 36, height: 36}}
          source={require('../assets/bulletin.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navbarButton}>
        <Image
          style={{width: 50, height: 36}}
          source={require('../assets/locate.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navbarButton}>
        <Image
          style={{width: 24, height: 36}}
          source={require('../assets/scan.png')}
        />
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  bottomNavbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 64,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 5,
  },
  navbarButton: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NavBarBottom