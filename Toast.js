import {Alert} from 'react-native';
import {useToast} from 'react-native-toast-notifications';
import {Dimensions} from 'react-native';
import {View, Text, Image} from 'react-native';
import {ToastProvider} from 'react-native-toast-notifications';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export function errortoast(message) {
  const testErrorToeast = {
    type: 'normal',
    // placement: 'bottom',
    duration: 3000,
    animationType: 'slide-in',
    renderToast: toastOptions => {
      return (
        <View
          style={{
            minHeight: windowHeight * 0.02,
            padding: 3,
            paddingHorizontal: 10,
            backgroundColor: 'rgba(225,0,0,0.7)',
            borderRadius: 50,
            marginBottom: windowHeight * 0.1,
            borderColor: 'gray',
            borderWidth: 1,
            flexDirection: 'row',
          }}>
          <MaterialIcons
            name={'error-outline'}
            size={15}
            style={{marginTop: 3}}
            color="white"
          />

          <Text style={{color: 'white', fontSize: 16, paddingHorizontal: 5}}>
            {message}
          </Text>
        </View>
      );
    },

    // animationDuration: 4000,
  };
  return testErrorToeast;
}

export function messagetoast(message) {
  const testErrorToeast = {
    placement: 'bottom',
    duration: 3000,
    animationType: 'zoom-in', //slide-in
    renderToast: toastOptions => {
      return (
        <View
          style={{
            // minWidth: windowWidth * 0.5,
            minHeight: windowHeight * 0.02,
            alignItems: 'center',
            padding: 5,
            paddingHorizontal: 10,
            backgroundColor: '#1B1D2A',
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 50,
            marginBottom: windowHeight * 0.1,
            flexDirection: 'row',
            // justifyContent: 'center',
          }}>
          <View
            style={{
              height: windowHeight * 0.02,
              width: windowHeight * 0.02,
              borderRadius: (windowHeight * 0.02) / 2,
              backgroundColor: '#1B1D2A',
              borderColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
            }}>
            <Image
              resizeMode="contain"
              source={require('./assets/chaakLogo.png')}
              style={{
                height: '70%',
                width: '70%',
              }}
            />
          </View>
          <Text style={{color: 'white', fontSize: 18, paddingHorizontal: 5}}>
            {message}
          </Text>
        </View>
      );
    },

    // animationDuration: 4000,
  };
  return testErrorToeast;
}

export function messagetoastScan(message) {
  const testErrorToeast = {
    placement: 'bottom',
    duration: 6000,
    animationType: 'zoom-in', //slide-in
    renderToast: toastOptions => {
      return (
        <View
          style={{
            // minWidth: windowWidth * 0.5,
            minHeight: windowHeight * 0.02,
            alignItems: 'center',
            padding: 5,
            paddingHorizontal: 10,
            backgroundColor: '#1B1D2A',
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 50,
            marginBottom: windowHeight * 0.1,
            flexDirection: 'row',
            // justifyContent: 'center',
          }}>
          <View
            style={{
              height: windowHeight * 0.02,
              width: windowHeight * 0.02,
              borderRadius: (windowHeight * 0.02) / 2,
              backgroundColor: '#1B1D2A',
              borderColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
            }}>
            <Image
              resizeMode="contain"
              source={require('./assets/chaakLogo.png')}
              style={{
                height: '70%',
                width: '70%',
              }}
            />
          </View>
          <Text
          numberOfLines={1}
          adjustsFontSizeToFit
            style={{
              color: 'white',
              fontSize: 18,
              paddingHorizontal: 5,
              textAlign: 'center',
            }}>
            {message}
          </Text>
        </View>
      );
    },

    // animationDuration: 4000,
  };
  return testErrorToeast;
}
// Alert.alert(message)
// export const messagetoast = {
//   type: 'normal',
//   // placement: 'bottom',
//   duration: 3000,
//   offset: windowHeight * 0.3,
//   animationType: 'zoom-in',
//   normalColor: 'rgba(0,0,0,0.8)',
//   style: {
//     marginBottom: windowHeight * 0.1,
//     minWidth: windowWidth * 0.3,
//     borderRadius: 100,
//     // backgroundColor: 'red',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   textStyle: {fontSize: 20, paddingHorizontal: 5, padding: 5},
//   // animationDuration: 4000,
// };

// export const errortoast = {
//   type: 'normal',
//   // placement: 'bottom',
//   duration: 3000,
//   offset: windowHeight * 0.3,
//   animationType: 'slide-in',
// //   animationType: 'zoom-in',

//   normalColor: 'rgba(225,0,0,0.8)',
//   style: {
//     marginBottom: windowHeight * 0.1,
//     minWidth: windowWidth * 0.3,
//     borderRadius: 100,
//     // backgroundColor: 'red',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   textStyle: {fontSize: 17, paddingHorizontal: 5, padding: 5},
//   renderToast:(toastOptions)=>{return(<View style={{height:30, width:200,backgroundColor:'red',marginBottom:200}}><Text style={{color:'white',fontSize:10}}>Ammar</Text></View>)}
//   // animationDuration: 4000,
// };
