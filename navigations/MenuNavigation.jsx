import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Wallet from '../screens/wallet/Wallet';
import Bulletin from '../screens/bulletin/Bulletin';
import Profile from '../screens/profile/Profile';
import LocateUs from '../screens/locateUS/LocateUs';
import Scan from '../screens/scan/Scan';
import { useDispatch, useSelector } from 'react-redux';
import { authSlice } from '../store/authSlice';

const Tab = createBottomTabNavigator();

const MenuNavigation = () => {
    const dispatch = useDispatch()
    const actions = authSlice.actions
    const atHome = useSelector(state => state.authSlice.atHome)
    console.log('at home',atHome)
    // const [home,setHome] = useState(false)
    return (
      <View style={{flex: 1}}>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            // style:{padding:4,margin:10}
            tabBarStyle: atHome
              ? {marginTop: 10, display: 'none'}
              : {marginTop: 10},
          }}>
          <Tab.Screen
            name="Home"
            resizeMode="contain"
            component={HomeScreen}
            // style={{display:'none'}}
            listeners={{
              tabPress: e => {
                dispatch(actions.setAtHome(true));
              },
            }}
            options={{
              tabBarIcon: ({focused}) => {
                return (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      top: -3,
                    }}>
                    <Image
                      source={require('../assets/home.png')}
                      resizeMode="contain"
                      style={{
                        width: 25,
                        height: 25,
                        tintColor: focused ? '#00BBB4' : 'black',
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        color: focused ? '#00BBB4' : 'black',
                      }}>
                      Home
                    </Text>
                  </View>
                );
              },
            }}
          />
          <Tab.Screen
            name="Wallet"
            component={Wallet}
            resizeMode="contain"
            options={{
              // tabBarIconStyle:{display:'none'},
              tabBarIcon: ({focused}) => {
                return (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      top: -3,
                    }}>
                    <Image
                      source={require('../assets/wallet.png')}
                      resizeMode="contain"
                      style={{
                        width: 27,
                        height: 26,
                        tintColor: focused ? '#00BBB4' : 'black',
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        color: focused ? '#00BBB4' : 'black',
                      }}>
                      Wallet
                    </Text>
                  </View>
                );
              },
            }}
          />
          <Tab.Screen
            name="Bulletin"
            resizeMode="contain"
            component={Bulletin}
            options={{
              tabBarIcon: ({focused}) => {
                return (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      top: -3,
                    }}>
                    <Image
                      source={require('../assets/bulletin.png')}
                      resizeMode="contain"
                      style={{
                        width: 27,
                        height: 26,
                        tintColor: focused ? '#00BBB4' : 'black',
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        color: focused ? '#00BBB4' : 'black',
                      }}>
                      Bulletin
                    </Text>
                  </View>
                );
              },
            }}
          />
          <Tab.Screen
            name="LocateUs"
            resizeMode="contain"
            component={LocateUs}
            options={{
              tabBarIcon: ({focused}) => {
                return (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      top: -3,
                    }}>
                    <Image
                      source={require('../assets/locate.png')}
                      resizeMode="contain"
                      style={{
                        width: 27,
                        height: 26,
                        tintColor: focused ? '#00BBB4' : 'black',
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        color: focused ? '#00BBB4' : 'black',
                      }}>
                      Locate Us
                    </Text>
                  </View>
                );
              },
            }}
          />
          <Tab.Screen
            name="Scan"
            resizeMode="contain"
            component={Scan}
            options={{
              tabBarIcon: ({focused}) => {
                return (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      top: -3,
                    }}>
                    <Image
                      source={require('../assets/scan.png')}
                      resizeMode="contain"
                      style={{
                        width: 27,
                        height: 26,
                        tintColor: focused ? '#00BBB4' : 'black',
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        color: focused ? '#00BBB4' : 'black',
                      }}>
                      Scan
                    </Text>
                  </View>
                );
              },
            }}
          />
        </Tab.Navigator>
      </View>
    );
};

export default MenuNavigation;
