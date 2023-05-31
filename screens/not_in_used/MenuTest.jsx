// import React from 'react';
// import {View, Text, Image} from 'react-native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import HomeScreen from './HomeScreen';
// import Wallet from './wallet/Wallet';
// import WalletSecondScreen from './wallet/WalletFirstScreen';

// const Tab = createBottomTabNavigator();

// const MenuTest = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarShowLabel: false,
//         // style:{padding:4,margin:10}
//         tabBarStyle: {paddingVertical: 10},
//       }}>
//       <Tab.Screen
//         name="Home"
//         resizeMode="contain"
//         component={HomeScreen}
//         options={{
//           tabBarIcon: ({focused}) => {
//             return (
//               <View
//                 style={{
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   top: -3,
//                 }}>
//                 <Image
//                   source={require('../assets/home.png')}
//                   resizeMode="contain"
//                   style={{
//                     width: 25,
//                     height: 25,
//                     tintColor: focused ? '#00BBB4' : 'black',
//                   }}
//                 />
//                 <Text
//                   style={{
//                     fontSize: 14,
//                     color: focused ? '#00BBB4' : 'black',
//                   }}>
//                   Home
//                 </Text>
//               </View>
//             );
//           },
//         }}
//       />
//       <Tab.Screen
//         name="Wallet"
//         component={Wallet}
//         resizeMode="contain"
//         options={{
//           tabBarIcon: ({focused}) => {
//             return (
//               <View
//                 style={{
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   top: -3,
//                 }}>
//                 <Image
//                   source={require('../assets/wallet.png')}
//                   resizeMode="contain"
//                   style={{
//                     width: 27,
//                     height: 26,
//                     tintColor: focused ? '#00BBB4' : 'black',
//                   }}
//                 />
//                 <Text
//                   style={{
//                     fontSize: 14,
//                     color: focused ? '#00BBB4' : 'black',
//                   }}>
//                   Wallet
//                 </Text>
//               </View>
//             );
//           },
//         }}
//       />
//       <Tab.Screen
//         name="Bulletin"
//         resizeMode="contain"
//         component={WalletSecondScreen}
//         options={{
//           tabBarIcon: ({focused}) => {
//             return (
//               <View
//                 style={{
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   top: -3,
//                 }}>
//                 <Image
//                   source={require('../assets/bulletin.png')}
//                   resizeMode="contain"
//                   style={{
//                     width: 27,
//                     height: 26,
//                     tintColor: focused ? '#00BBB4' : 'black',
//                   }}
//                 />
//                 <Text
//                   style={{
//                     fontSize: 14,
//                     color: focused ? '#00BBB4' : 'black',
//                   }}>
//                   Bulletin
//                 </Text>
//               </View>
//             );
//           },
//         }}
//       />
//       <Tab.Screen
//         name="Locate Us"
//         resizeMode="contain"
//         component={WalletSecondScreen}
//         options={{
//           tabBarIcon: ({focused}) => {
//             return (
//               <View
//                 style={{
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   top: -3,
//                 }}>
//                 <Image
//                   source={require('../assets/locate.png')}
//                   resizeMode="contain"
//                   style={{
//                     width: 27,
//                     height: 26,
//                     tintColor: focused ? '#00BBB4' : 'black',
//                   }}
//                 />
//                 <Text
//                   style={{
//                     fontSize: 14,
//                     color: focused ? '#00BBB4' : 'black',
//                   }}>
//                   Locate Us
//                 </Text>
//               </View>
//             );
//           },
//         }}
//       />
//       <Tab.Screen
//         name="Scan"
//         resizeMode="contain"
//         component={WalletSecondScreen}
//         options={{
//           tabBarIcon: ({focused}) => {
//             return (
//               <View
//                 style={{
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   top: -3,
//                 }}>
//                 <Image
//                   source={require('../assets/scan.png')}
//                   resizeMode="contain"
//                   style={{
//                     width: 27,
//                     height: 26,
//                     tintColor: focused ? '#00BBB4' : 'black',
//                   }}
//                 />
//                 <Text
//                   style={{
//                     fontSize: 14,
//                     color: focused ? '#00BBB4' : 'black',
//                   }}>
//                   Scan
//                 </Text>
//               </View>
//             );
//           },
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

// export default MenuTest;
