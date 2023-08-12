import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Wallet from '../screens/wallet/Wallet';
import Bulletin from '../screens/bulletin/Bulletin';
import Profile from '../screens/profile/Profile';
import LocateUs from '../screens/locateUS/LocateUs';
import Scan from '../screens/scan/Scan';
import {useDispatch, useSelector} from 'react-redux';
import {authSlice} from '../store/authSlice';
import HomeStack from '../screens/HomeStack';
import {Dimensions} from 'react-native';
import DiscountOfferScreen from '../screens/DiscountOfferScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const WindowHeight = Dimensions.get('window').height;
const WindowWidth = Dimensions.get('window').width;

const Tab = createBottomTabNavigator();

const MenuNavigation = () => {
  const dispatch = useDispatch();
  const actions = authSlice.actions;
  const atHome = useSelector(state => state.authSlice.atHome);
  console.log('at home', atHome);
  // const [home,setHome] = useState(false)
  return (
    <View style={{height: WindowHeight, width: WindowWidth}}>
      <Tab.Navigator

        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          // style:{padding:4,margin:10}
          tabBarStyle: atHome
            ? {display: 'none'}
            : {
                height: WindowHeight * 0.1,
                paddingTop:3,
                // backgroundColor: 'red',
                justifyContent: 'flex-start',
              },
        }}>
          <Tab.Screen
          name="Home"
          resizeMode="contain"
          component={HomeStack}
          // style={{display:'none'}}
          // listeners={{
          //   tabPress: e => {
          //     dispatch(actions.setAtHome(true));
          //   },
          // }}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <View
                  style={{
                    // alignItems: 'center',
                    // justifyContent: 'center',
                    // backgroundColor: 'red',
                    height: '100%',
                    width: WindowWidth * 0.1,
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      width: WindowWidth * 0.1,
                      height: '65%',
                      justifyContent: 'center',
                      alignItems: 'center',

                      // backgroundColor: 'blue',
                    }}>
                    <MaterialIcons
                      name={'home'}
                      size={focused?30: 27}
                      color={focused ? '#00BBB4' : 'black'}
                      style={{
                        textShadowColor: 'gray',
                        textShadowOffset: {width: 0, height: 0},
                        textShadowRadius: 3,}}
                    />
                  </View>
                  <View
                    style={{
                      height: '35%',
                      alignItems: 'center',
                      justifyContent:'flex-start'
                      // justifyContent: 'flex-start',
                    }}>
                    <Text
                      style={{
                        fontSize: 10,
                        color: focused ? '#00BBB4' : 'black',
                      }}>
                      Home
                    </Text>
                  </View>
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
                    // alignItems: 'center',
                    // justifyContent: 'center',
                    height: '100%',
                    width: WindowWidth * 0.1,
                  }}>
                  <View
                    style={{
                      width: WindowWidth * 0.1,
                      height: '65%',
                      justifyContent: 'center',
                      alignItems: 'center',


                      // justifyContent: 'center',

                      // backgroundColor: 'blue',
                    }}>
                    {/* <FontAwesome
                      name={'dollar'}
                      size={25}
                      color={focused ? '#00BBB4' : 'black'}
                    /> */}
                    <MaterialIcons
                      name={'account-balance-wallet'}
                      size={focused?30: 25}
                      style={{
                      textShadowColor: 'gray',
                      textShadowOffset: {width: 0, height: 0},
                      textShadowRadius: 3,}}
                      color={focused ? '#00BBB4' : 'black'}
                    />
                  </View>
                  <View
                    style={{
                      height: '35%',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 10,
                        color: focused ? '#00BBB4' : 'black',
                      }}>
                      Wallet
                    </Text>
                  </View>
                </View>
              );
            },
          }}
        />
        
         <Tab.Screen
          name="DiscountOfferScreen"
          resizeMode="contain"
          component={DiscountOfferScreen}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <View
                  style={{
                    height: '100%',
                    width: WindowWidth * 0.15,
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: WindowWidth * 0.1,
                      height: '65%',
                      justifyContent: 'center',
                      alignItems: 'center',

                      // backgroundColor: 'blue',
                    }}>
                    {/* <Image
                      source={require('../assets/locate.png')}
                      resizeMode="contain"
                      style={{
                        width: WindowWidth * 0.1,
                        height: focused ? '70%' : '55%',
                        tintColor: focused ? '#00BBB4' : 'black',
                      }}
                    /> */}
                    <MaterialIcons
                      name={'dynamic-feed'}
                     size={focused?30: 25}
                      color={focused ? '#00BBB4' : 'black'}
                      style={{
                        textShadowColor: 'gray',
                        textShadowOffset: {width: 0, height: 0},
                        textShadowRadius: 2,}}
                    />
                  </View>
                  <View
                    style={{
                      height: '35%',
                      alignItems: 'center',
                      // justifyContent: 'center',
                      width: '100%',
                      // backgroundColor:'red'
                    }}>
                    <Text
                      style={{
                        fontSize: 10,
                        color: focused ? '#00BBB4' : 'black',
                      }}>
                      Deals
                    </Text>
                  </View>
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
                    height: '100%',
                    width: WindowWidth * 0.1,
                  }}>
                  <View
                    style={{
                      width: WindowWidth * 0.1,
                      height: '65%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      // backgroundColor: 'blue',
                    }}>
                    <MaterialIcons
                      name={'article'}
                      size={focused?30: 25}
                      color={focused ? '#00BBB4' : 'black'}
                      style={{
                        textShadowColor: 'gray',
                        textShadowOffset: {width: 0, height: 0},
                        textShadowRadius: 3,}}
                    />
                  </View>
                  <View
                    style={{
                      height: '35%',
                      alignItems: 'center',
                      // justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 10,
                        color: focused ? '#00BBB4' : 'black',
                      }}>
                      Jobs
                    </Text>
                  </View>
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
                    height: '100%',
                    width: WindowWidth * 0.15,
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: WindowWidth * 0.1,
                      height: '65%',
                      justifyContent: 'center',
                      alignItems: 'center',

                      // backgroundColor: 'blue',
                    }}>
                    <MaterialIcons
                      name={'location-pin'}
                      size={focused?30: 25}
                      color={focused ? '#00BBB4' : 'black'}
                      style={{
                        textShadowColor: 'gray',
                        textShadowOffset: {width: 0, height: 0},
                        textShadowRadius: 3,}}
                    />
                  </View>
                  <View
                    style={{
                      height: '35%',
                      alignItems: 'center',
                      // justifyContent: 'center',
                      width: '100%',
                      // backgroundColor:'red'
                    }}>
                    <Text
                      style={{
                        fontSize: 10,
                        color: focused ? '#00BBB4' : 'black',
                      }}>
                      Locate Us
                    </Text>
                  </View>
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
                    height: '100%',
                    width: WindowWidth * 0.1,
                  }}>
                  <View
                    style={{
                      width: WindowWidth * 0.1,
                      height: '65%',
                      justifyContent: 'center',
                      alignItems: 'center',

                      // backgroundColor: 'blue',
                    }}>
                    <MaterialIcons
                      name={'qr-code-scanner'}
                      size={focused?30: 25}
                      color={ focused ? '#00BBB4' : 'black'}
                      style={{
                        textShadowColor: 'gray',
                        textShadowOffset: {width: 0, height: 0},
                        textShadowRadius: 2,}}
                    />
                  </View>
                  <View
                    style={{
                      height: '35%',
                      alignItems: 'center',
                      // justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 10,
                        color: focused ? '#00BBB4' : 'black',
                      }}>
                      Scan
                    </Text>
                  </View>
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
