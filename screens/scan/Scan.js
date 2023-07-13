// import {View, Text} from 'react-native';
// import React from 'react';
// import {Camera} from 'react-native-vision-camera';
// import {useCameraDevices} from 'react-native-vision-camera';
// import {useFrameProcessor} from 'react-native-vision-camera';
// import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';
// import {RNHoleView} from 'react-native-hole-view';
// import {useEffect} from 'react';
// import {useIsFocused} from '@react-navigation/native';
// import {StyleSheet} from 'react-native';
// import {Dimensions} from 'react-native';
// import {useState} from 'react';
// const Scan = props => {
//   const isFocused = useIsFocused();
//   const devices = useCameraDevices('wide-angle-camera');
//   const device = devices.back;
//   const [scannedData, setScannedData] = useState('');

//   const [barcode, setBarcode] = useState('');
//   const [hasPermission, setHasPermission] = useState(false);
//   const [isScanned, setIsScanned] = useState(false);
//   const [frameProcessor, barcodes] = useScanBarcodes([
//     BarcodeFormat.ALL_FORMATS,
//   ]);

//   const onCodeScanned = event => {
//     setScannedData(event.payloadStringValue);
//   };

//   const toggleActiveState = () => {
//     if (barcodes && barcodes.length > 0 && !isScanned) {
//       setIsScanned(true);
//       barcodes.forEach(async scannedBarcode => {
//         if (scannedBarcode.rawValue !== '') {
//           setBarcode(scannedBarcode.rawValue);
//           Alert.alert(barcode);
//         }
//       });
//     }
//   };

//   const LoadingView = () => {
//     return <View style={{flex: 1, backgroundColor: 'red'}}></View>;
//   };

//   const getPermission = async () => {
//     const cameraPermission = await Camera.getCameraPermissionStatus();
//     if (cameraPermission == 'denied') {
//       const newCameraPermission = await Camera.requestCameraPermission();
//       console.log('newC', newCameraPermission);
//     }
//   };

//   useEffect(() => {
//     getPermission();
//   }, []);

//   useEffect(() => {
//     toggleActiveState();
//     return () => {
//       // Clean up any resources when the component unmounts
//       barcodes;
//     };
//   }, [barcodes]);

//   const widthToDp = percentage => {
//     const screenWidth = Dimensions.get('window').width;
//     return screenWidth * (percentage / 100);
//   };

//   const heightToDp = percentage => {
//     const screenHeight = Dimensions.get('window').height;
//     return screenHeight * (percentage / 100);
//   };

//   if (device == null) return <LoadingView />;
//   return (
//     <>
//       <Camera
//         style={{flex: 1}}
//         device={device}
//         isActive={isFocused}
//         frameProcessor={frameProcessor}
//         frameProcessorFps={5}
//       />
//       ;
//       <RNHoleView
//         holes={[
//           {
//             x: widthToDp(8.5),
//             y: heightToDp(36),
//             width: widthToDp(83),
//             height: heightToDp(20),
//             borderRadius: 10,
//           },
//         ]}
//         style={styles.rnholeView}
//       />
//     </>
//   );
// };
// const styles = StyleSheet.create({
//   rnholeView: {
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//     alignSelf: 'center',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
// });
// export default Scan;

import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, StyleSheet, Text, View} from 'react-native';
import {useCameraDevices} from 'react-native-vision-camera';
import {Camera} from 'react-native-vision-camera';
import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';
import {useIsFocused} from '@react-navigation/native';
import {RNHoleView} from 'react-native-hole-view';
import {Dimensions} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import {useContext} from 'react';
import AppContext from '../../components/AppContext';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
export default function Scan(props) {
  const {userToken} = useContext(AppContext);
  const [hasPermission, setHasPermission] = useState(false);
  const [checkingQR, setcheckingQR] = useState(false);
  const [loading, setloading] = useState(false);
  const devices = useCameraDevices();
  const device = devices.back;
  const isFocused = useIsFocused();
  const [frameProcessor, barcodes] = useScanBarcodes(
    [BarcodeFormat.ALL_FORMATS],
    {checkInverted: true},
  );

  const widthToDp = percentage => {
    const screenWidth = Dimensions.get('window').width;
    return screenWidth * (percentage / 100);
  };

  const heightToDp = percentage => {
    const screenHeight = Dimensions.get('window').height;
    return screenHeight * (percentage / 100);
  };

  useFocusEffect(
    React.useCallback(() => {
      // This function will be called when the screen comes into focus

      // You can perform any logic or fetch data here
      console.log('userToken', userToken);

      setcheckingQR(false);

      // Returning a cleanup function
      return () => {
        // This function will be called when the screen loses focus
        // You can perform any cleanup logic here
      };
    }, []),
  );

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  const decodeToken = async token => {
    try {
      const decodedToken = await jwtDecode(token);
      return decodedToken;
    } catch (error) {
      console.log('Error decoding token:', error);
      return null;
    }
  };

  const sendQRcodeData = async (userID, QRobj) => {
    try {
      console.log('userID', userID)
      const urlToHit = 'https://api.kachaak.com.sg/api/scanner/sessionData';
      const token = userToken;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const body = JSON.stringify({
        franchiseId: QRobj.franchiseID,
        userId: userID,
        sessionId: QRobj.sessionID,
      });

      const response = await axios.post(urlToHit, body, config);
      console.log('response', response.data);
      setloading(false);
      Alert.alert('Successful');
      props.navigation.navigate('ProfileFirstScreen');

      // setcheckingQR(false)
      // console.log('response.message', response.message)
    } catch (e) {
      console.log('e1111', e.response.data);
      setloading(false);
      Alert.alert('error loading data');
      props.navigation.navigate('ProfileFirstScreen');
    }
  };

  const addColonToString = inputString => {
    // Use regex to find and replace 'franchiseID' and 'sessionID' with ':franchiseID' and ':sessionID' respectively
    const modifiedString = inputString
      .replace(/franchiseID/g, '"franchiseID":"')
      .replace(/sessionID/g, '","sessionID":"')
      .replace(/}/g, '"}');
    return modifiedString;
  };

  const getuserID = async QRString => {
    console.log('userToken', userToken)
    const decode = await decodeToken(userToken);
    console.log('decode', decode)
    var QRobj = await addColonToString(QRString);
    QRobj = JSON.parse(QRobj);
    console.log('QRobj', QRobj);
    const userID = decode.id;
    //make API Call here

    sendQRcodeData(userID, QRobj);
  };

  useEffect(() => {
    // console.log(barcodes[0]?.displayValue);
    if (barcodes[0]?.displayValue != undefined && String(barcodes[0].displayValue).includes("franchiseID")) {
      setcheckingQR(true);
      setloading(true);
      //Show modal
      console.log(barcodes[0]?.displayValue);

      getuserID(barcodes[0]?.displayValue);
      console.log('trueFranchiseID')
    }
    else if(barcodes[0]?.displayValue != undefined && String(barcodes[0].displayValue).includes("STRATEGY"))
    {
      // handleScanReceipthere
      console.log(barcodes[0]?.displayValue);
      console.log('strategy')

    }
    else{
      console.log(barcodes[0]?.displayValue);

    }
  }, [barcodes]);

  return (
    device != null &&
    hasPermission && (
      <>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={isFocused}
          frameProcessor={frameProcessor}
          // video={true}
          frameProcessorFps={isFocused && !checkingQR ? 2 : 0}
        />
        {loading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size={200} color={'525461'} />
          </View>
        ) : (
          <RNHoleView
            holes={[
              {
                x: widthToDp(8.5),
                y: heightToDp(26),
                width: widthToDp(83),
                height: widthToDp(83),
                borderRadius: 10,
              },
            ]}
            style={styles.rnholeView}
          />
        )}
      </>
    )
  );
}

const styles = StyleSheet.create({
  barcodeTextURL: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  rnholeView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
