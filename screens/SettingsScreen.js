import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {Dimensions} from 'react-native';
import {Image} from 'react-native-elements';
import {useEffect} from 'react';
import {authSlice} from '../store/authSlice';
import {useSelector} from 'react-redux';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function SettingsScreen(props) {
  const atHome = useSelector(state => state.authSlice.atHome);
  const dispatch = useDispatch();
  const actions = authSlice.actions;

  const ButtonView = item => {
    console.log('item', item.name, item.route, item.bool);

    if (item.bool == true) {
      return (
        <TouchableOpacity onPress={() => props.navigation.navigate(item.route)}>
          <View style={styles.buttonView}>
            <LinearGradient
              colors={[
                '#595B68',
                '#454754',
                '#272936',
                '#1B1D2A',
                '#000000',
                '#000000',
              ]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.buttonView}>
              <Text style={styles.buttonText}>{item.name}</Text>
            </LinearGradient>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={() => props.navigation.navigate(item.route)}>
          <View style={{...styles.buttonView, backgroundColor: '#00BBB4'}}>
            <Text style={styles.buttonText}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  useEffect(() => {
    dispatch(actions.setAtHome(false));
  }, []);

  return (
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
      <View style={styles.FullView}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/settings.png')}
            resizeMode="contain"
            style={{
              // backgroundColor: 'red',
              height: windowHeight * 0.2,
              width: windowWidth * 0.23,
            }}
          />
          <View
            style={{
              height: windowHeight * 0.1,
              // backgroundColor: 'red',
              width: windowWidth,
              alignItems: 'center',
              // justifyContent:'center'
            }}>
            <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold'}}>
              Settings
            </Text>
          </View>
        </View>
        <View style={styles.optionsContainer}>
          <ButtonView name={'Edit Profile'} route={'EditProfile'} bool={true} />
          <ButtonView
            name={'Change Password'}
            route={'ChangePassword'}
            bool={false}
          />
          <ButtonView name={'FAQ'} route={'FAQ'} bool={false} />
          <ButtonView name={'T&A'} route={'TandA'} bool={false} />
          <ButtonView name={'Contact Us'} route={'ContactUs'} bool={false} />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  FullView: {
    height: windowHeight,
    width: windowWidth,
    alignItems: 'center',
    //    justifyContent:'center'
  },
  logoContainer: {
    width: windowWidth,
    height: windowHeight * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
  },
  optionsContainer: {
    width: windowWidth,
    height: windowHeight * 0.6,
    // backgroundColor: 'orange',
    alignItems: 'center',
  },
  buttonView: {
    width: windowWidth * 0.6,
    height: windowHeight * 0.08,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:'green',
    borderRadius: 7,
    marginVertical: 10,
    // flexDirection:'row'
  },
  buttonText: {color: 'white', fontSize: 20},
});
