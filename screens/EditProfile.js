import {StyleSheet, Text, View, Image,TextInput} from 'react-native';
import React from 'react';
import {Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Profile from './profile/Profile';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function EditProfile() {

  const ProfileImageContainer = () => {
    return (
      <View style={styles.ProfileImageContainer}>
        <Image
          source={{
            uri: 'https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/people19.png',
          }}
          resizeMode='contain'
          style={{
            height: windowHeight * 0.17,
            width: windowHeight * 0.17,
            borderRadius: windowHeight*0.17/2,
            borderWidth:1,
            borderColor:'white'
          }}
        />
      </View>
    );
  };

  const InputfieldsContainer = () => {
    return <View style={styles.InputfieldsContainer}>
      <TextInput style={styles.textInput} />
      <TextInput style={styles.textInput} />

      {/* Age */}
      {/* gender */}
      {/* Industry */}
      {/* Location */}
      {/* residence */}
      <TextInput style={styles.textInput} />


    </View>;
  };

  const AgreeButtonContainer = () => {
    return <View style={styles.AgreeButtonContainer}></View>;
  };

  return (
    <View
      style={{
        backgroundColor: 'red',
        height: windowHeight,
        width: windowWidth,
      }}>
      <LinearGradient
        colors={[
          '#525461',
          '#343643',
          '#222431',
          '#1B1D2A',
          '#1B1D2A',
          '#1B1D2A',
        ]}
        style={{flex: 1}}>
        <ProfileImageContainer />
        <InputfieldsContainer />
        <AgreeButtonContainer />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  ProfileImageContainer: {
    height: windowHeight * 0.2,
    // backgroundColor: 'red',
    alignItems:'center',
    justifyContent:'flex-end',
  },

  InputfieldsContainer: {
    height: windowHeight * 0.55,
    backgroundColor: 'orange',
    alignItems:'center'
  },

  AgreeButtonContainer: {
    height: windowHeight * 0.15,
    backgroundColor: 'green',
  },
  textInput:{
    width:windowWidth*0.8,
    height:windowHeight*0.05,
    backgroundColor:'white',
    marginVertical:5,
    
  }
});
