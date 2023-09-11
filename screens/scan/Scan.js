import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import {useCameraDevices} from 'react-native-vision-camera';
import {useDispatch} from 'react-redux';
import {authSlice} from '../../store/authSlice';
import {useSelector} from 'react-redux';
import {useToast} from 'react-native-toast-notifications';
import {errortoast, messagetoast, messagetoastScan} from '../../Toast';
import {Camera} from 'react-native-vision-camera';
import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';
import {useIsFocused} from '@react-navigation/native';
import {RNHoleView} from 'react-native-hole-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {axiosPost} from '../../axios/axios';
import {Dimensions} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import {useContext} from 'react';
import AppContext from '../../components/AppContext';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {err} from 'react-native-svg/lib/typescript/xml';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function Scan(props) {
  const {userToken} = useContext(AppContext);
  const [hasPermission, setHasPermission] = useState(false);
  const [checkingQR, setcheckingQR] = useState(false);
  const [loading, setloading] = useState(false);
  const [capturingreceipt, setcapturingreceipt] = useState(false);
  const [franchID, setfranchID] = useState('');
  const devices = useCameraDevices();
  const device = devices.back;
  const isFocused = useIsFocused();
  const [frameProcessor, barcodes] = useScanBarcodes(
    [BarcodeFormat.ALL_FORMATS],
    {checkInverted: true},
  );

  const toast = useToast();
  const showMessage = message => {
    toast.show(message, messagetoast(message));
  };
  const showMessageScan = message => {
    toast.show(message, messagetoastScan(message));
  };
  const showError = message => {
    toast.show(message, errortoast(message));
  };

  const widthToDp = percentage => {
    const screenWidth = Dimensions.get('window').width;
    return screenWidth * (percentage / 100);
  };

  const heightToDp = percentage => {
    const screenHeight = Dimensions.get('window').height;
    return screenHeight * (percentage / 100);
  };

  const dispatch = useDispatch();
  const actions = authSlice.actions;

  useFocusEffect(
    React.useCallback(() => {
      // This function will be called when the screen comes into focus

      // You can perform any logic or fetch data here
      console.log('userToken', userToken);

      setcheckingQR(false);
      setcapturingreceipt(false);
      dispatch(actions.setAtHome(false));
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
      console.log('userID', userID);
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

      const response = await axiosPost(urlToHit, body, config);
      console.log('response', response.data);
      setloading(false);
      showMessage('Successful');
      props.navigation.navigate('ProfileFirstScreen');

      // setcheckingQR(false)
      // console.log('response.message', response.message)
    } catch (e) {
      console.log('e1111', e.response.data);
      setloading(false);
      showError('Error: qr code might already have been scanned');
      // props.navigation.navigate('ProfileFirstScreen');
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
    console.log('userToken', userToken);
    const token = await getUserToken();
    const decode = await decodeToken(token);
    console.log('decode', decode);
    var QRobj = await addColonToString(QRString);
    QRobj = JSON.parse(QRobj);
    console.log('QRobj', QRobj);
    const userID = decode.id;
    //make API Call here

    sendQRcodeData(userID, QRobj);
  };
  const getUserToken = async () => {
    try {
      const savedToken = await AsyncStorage.getItem('LoginToken');

      console.log('savedTokenxxxxxxxx', savedToken);

      if (savedToken != null) {
        return savedToken;
      } else {
        return null;
      }
    } catch (err) {
      console.log('getUserTokenError', err);
      return null;
    }
  };
  const getUserId2 = async () => {
    // console.log('userToken222', userToken)
    const userToken = await getUserToken();
    const decode = await decodeToken(userToken);
    // console.log('decode', decode)
    const userID = decode.id;
    return userID;
    //make API Call here
  };

  const receiptCaptured = async () => {
    try {
      setloading(true);
      setcapturingreceipt(false);
      const urlToHit = 'https://api.kachaak.com.sg/api/scanner/receipt';
      const token = userToken;
      const userID = await getUserId2();
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const body = JSON.stringify({
        userId: userID,
      });

      const response = await axiosPost(urlToHit, body, config);
      console.log('response', response.data);
      if (response.data.data == 'sucess') {
        setloading(false);

        showMessage('Successfully Scanned');
        props.navigation.navigate('Wallet', {screen: 'WalletFirstScreen'});
      } else {
        console.log('resError', data);
        setloading(false);

        showError('response receipt error');
      }
    } catch (e) {
      console.log('eqwer', e);
      setloading(false);
      showError('Error in receiptCapture');
      // props.navigation.navigate('Wallet');
    }
  };

  const newFlow = async franchiseID => {
    try {
      showMessageScan(' Press button below to capture receipt and earn chaaks');
      setfranchID(franchiseID);
      setcapturingreceipt(true);
      setloading(false);
      console.log('hereabc', franchiseID);
    } catch (error) {
      console.log('newflowError', error);
    }
  };

  const scanStrategy = async franchiseID => {
    try {
      console.log('StrategyScanStarted');
      const userIdf = await getUserId2();
      console.log('userID', userIdf);
      console.log('franchiseID', franchiseID);
      const urlToHit = 'https://api.kachaak.com.sg/api/scanner/strategy';
      const token = userToken;
      console.log('tokenStrategyApiCheck', token);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const body = JSON.stringify({
        franchiseId: franchiseID,
        userId: userIdf,
      });
      const response = await axiosPost(urlToHit, body, config);
      console.log('response', response.data?.data);
      if (response.data?.data != undefined) {
        // Alert.alert('Successful');
        // props.navigation.navigate('Wallet');
        receiptCaptured();
      }
      setloading(false);
    } catch (error) {
      console.log('strategyScan', error.response.data);
      setloading(false);
      props.navigation.navigate('Wallet');
      if(error?.response?.data?.error=='no strategy running at the moment')
      {
        showError('no strategy running at the moment');
      }
      else
      {
        showError('Error in scanning, try again');

      }
    }
  };
  useEffect(() => {
    // console.log(barcodes[0]?.displayValue);
    if (
      barcodes[0]?.displayValue != undefined &&
      String(barcodes[0].displayValue).includes('franchiseID')
    ) {
      setcheckingQR(true);
      setloading(true);
      //Show modal
      console.log(barcodes[0]?.displayValue);

      getuserID(barcodes[0]?.displayValue);
      console.log('trueFranchiseID');
    } else if (
      barcodes[0]?.displayValue != undefined &&
      String(barcodes[0].displayValue).includes('STRATEGY')
    ) {
      // handleScanReceipthere
      console.log(barcodes[0]?.displayValue);
      console.log(
        'franchiseID',
        JSON.parse(barcodes[0]?.displayValue)?.franchiseId,
      );
      console.log('strategy');
      setcheckingQR(true);
      setloading(true);
      newFlow(JSON.parse(barcodes[0]?.displayValue)?.franchiseId);
      // scanStrategy(JSON.parse(barcodes[0]?.displayValue)?.franchiseId);
      //  flow change
    } else {
      console.log(barcodes[0]?.displayValue);
    }
  }, [barcodes]);

  if (device != null && hasPermission == true) {
    return (
      <>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={isFocused}
          frameProcessor={frameProcessor}
          // video={true}
          frameProcessorFps={
            isFocused && !checkingQR && !capturingreceipt ? 1 : 0.0000001
          }
        />
        {loading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size={200} color={'525461'} />
          </View>
        ) : (
          <View
            style={{
              height: windowHeight * 0.9,
              // backgroundColor: 'red',
              width: windowWidth,
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            {capturingreceipt == false ? (
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
            ) : null}
            {capturingreceipt == false ? (
              <View>
                {/* <TouchableOpacity onPress={() => setcapturingreceipt(true)}>
                <Text
                  style={{
                    backgroundColor: 'black',
                    color: 'white',
                    width: windowWidth * 0.5,
                    fontSize: 20,
                    paddingVertical: 10,
                    alignItems: 'center',
                    borderRadius: 20,
                    textAlign: 'center',
                    marginBottom: windowHeight * 0.1,
                  }}>
                  Go to camera
                </Text>
              </TouchableOpacity> */}
              </View>
            ) : (
              <View style={{width: windowWidth * 0.9, alignItems: 'center'}}>
                {/* <Text
                  style={{
                    textShadowColor: 'black',
                    textShadowRadius: 10,
                    textShadowOffset: {width: -2, height: 1},
                    color: 'white',
                    textAlign: 'center',
                  }}>
                  Press button below to capture receipt and earn chaaks
                </Text> */}
                <TouchableOpacity
                  // onPress={() => receiptCaptured()}
                  onPress={() => scanStrategy(franchID)}>
                    <View style={{
                      // backgroundColor: 'rgba(0,0,0,0.7)',
                      marginBottom: 10,
                      width: 45,
                      height: 45,
                      borderRadius: 21,
                      borderColor: '#00BBB4',
                      borderWidth: 1,
                      alignSelf: 'center',
                      alignItems:'center',
                      justifyContent:'center'
                    }}>
                  <View
                    style={{
                      backgroundColor: 'rgba(0,0,0,0.7)',
                      // marginBottom: 5,
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      borderColor: 'white',
                      borderWidth: 1,
                      alignSelf: 'center',
                    }}>
                    {/* <Text
                  style={{
                    backgroundColor: 'black',
                    color: 'white',
                    width: windowWidth * 0.5,
                    fontSize: 20,
                    paddingVertical: 10,
                    alignItems: 'center',
                    borderRadius: 20,
                    textAlign: 'center',
                    marginBottom: windowHeight * 0.1,
                  }}>
                  Capture
                </Text> */}
                  </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </>
    );
  } else {
    return (
      <View
        style={{
          backgroundColor: 'white',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 38,
            fontWeight: 'bold',
            paddingHorizontal: 5,
          }}>
          Camera Permission denied
        </Text>
        <Text style={{color: 'black', fontSize: 20, paddingHorizontal: 30}}>
          Go to settings and enable Camera Permissions for "Chaak" app
        </Text>
      </View>
    );
  }

  // return (
  //   device != null &&
  //   hasPermission && (
  //     <>
  //       <Camera
  //         style={StyleSheet.absoluteFill}
  //         device={device}
  //         isActive={isFocused}
  //         frameProcessor={frameProcessor}
  //         // video={true}
  //         frameProcessorFps={
  //           isFocused && !checkingQR && !capturingreceipt ? 2 : 0
  //         }
  //       />
  //       {loading ? (
  //         <View
  //           style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  //           <ActivityIndicator size={200} color={'525461'} />
  //         </View>
  //       ) : (
  //         <View
  //           style={{
  //             height: windowHeight * 0.9,
  //             // backgroundColor: 'red',
  //             width: windowWidth,
  //             alignItems: 'center',
  //             justifyContent: 'flex-end',
  //           }}>
  //           {capturingreceipt == false ? (
  //             <RNHoleView
  //               holes={[
  //                 {
  //                   x: widthToDp(8.5),
  //                   y: heightToDp(26),
  //                   width: widthToDp(83),
  //                   height: widthToDp(83),
  //                   borderRadius: 10,
  //                 },
  //               ]}
  //               style={styles.rnholeView}
  //             />
  //           ) : null}
  //           {capturingreceipt == false ? (
  //             <View>
  //             {/* <TouchableOpacity onPress={() => setcapturingreceipt(true)}>
  //               <Text
  //                 style={{
  //                   backgroundColor: 'black',
  //                   color: 'white',
  //                   width: windowWidth * 0.5,
  //                   fontSize: 20,
  //                   paddingVertical: 10,
  //                   alignItems: 'center',
  //                   borderRadius: 20,
  //                   textAlign: 'center',
  //                   marginBottom: windowHeight * 0.1,
  //                 }}>
  //                 Go to camera
  //               </Text>
  //             </TouchableOpacity> */}
  //             </View>
  //           ) : (
  //             <View style={{width:windowWidth*0.9,alignItems:'center'}}>
  //               <Text
  //                 style={{
  //                   textShadowColor: 'black',
  //                   textShadowRadius: 10,
  //                   textShadowOffset: {width: -2, height: 1},
  //                   color: 'white',
  //                   textAlign:'center'
  //                 }}>
  //                 Press button below to capture receipt and earn chaaks
  //               </Text>
  //               <TouchableOpacity
  //               // onPress={() => receiptCaptured()}
  //               onPress={()=>scanStrategy(franchID)}
  //               >
  //                 <View style={{backgroundColor:'rgba(0,0,0,0.7)',marginBottom:5, width:40,height:40,borderRadius:20, borderColor:'white', borderWidth:1,alignSelf:'center'}}>
  //                   {/* <Text
  //                 style={{
  //                   backgroundColor: 'black',
  //                   color: 'white',
  //                   width: windowWidth * 0.5,
  //                   fontSize: 20,
  //                   paddingVertical: 10,
  //                   alignItems: 'center',
  //                   borderRadius: 20,
  //                   textAlign: 'center',
  //                   marginBottom: windowHeight * 0.1,
  //                 }}>
  //                 Capture
  //               </Text> */}
  //                 </View>
  //               </TouchableOpacity>
  //             </View>
  //           )}
  //         </View>
  //       )}
  //     </>
  //   )
  // );
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
