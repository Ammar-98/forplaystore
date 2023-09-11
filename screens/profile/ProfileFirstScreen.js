import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Platform} from 'react-native';
import {RefreshControl} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {axiosGet} from '../../axios/axios';
// import RNAndroidNotificationPermission from 'react-native-android-notification-permission';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useCallback} from 'react';
import {
  request,
  check,
  PERMISSIONS,
  RESULTS,
  requestNotifications,
} from 'react-native-permissions';
import React from 'react';
import { messagetoast,errortoast } from '../../Toast';
import { useToast } from 'react-native-toast-notifications';
import {Dimensions} from 'react-native';
import {useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {useContext} from 'react';
import AppContext from '../../components/AppContext';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import * as size from '../../components/FontSize';
import {launchImageLibrary} from 'react-native-image-picker';
export default function ProfileFirstScreen(props) {
  const [Imgdata, setImgdata] = useState([]);
  const [loading, setloading] = useState(true);
  const [Name, setName] = useState('');
  const [profileImage, setprofileImage] = useState(null);

  const GetProfilePic = async () => {
    try {
      const pic = await launchImageLibrary((mediaType = 'photo'));
      console.log('pic', pic);
    } catch (e) {
      console.log('e', e);
    }
  };

  const  toast= useToast()
  const showMessage = message => {
    toast.show(message, messagetoast(message));
  };
  const showError = message => {
    toast.show(message, errortoast(message));
  };

  const emptyList = () => {
    const [loadingPics, setloadingPics] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        console.log('Hello, World!');
        setloadingPics(false);
      }, 3000);
    }, []);

    if (loadingPics == true) {
      return (
        <View
          style={{
            height: windowHeight * 0.6,
            width: windowWidth,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size={30} color={'#00BBB4'} />
        </View>
      );
    }
    return (
      <View
        style={{
          height: windowHeight * 0.6,
          width: windowWidth,
          alignItems: 'center',
          // justifyContent: 'center',
          // marginTop: windowHeight * 0.1,
          // backgroundColor: 'red',
        }}>
        {/* <Text style={{fontSize: 15, color: 'gray'}}>No pictures uploaded yet</Text> */}
        <Image
          style={{width: windowWidth * 0.3, height: windowHeight * 0.25}}
          resizeMode={'contain'}
          source={require('../../assets/chaakLogo.png')}
        />
        <Text
          style={{
            fontSize: size.medium(),
            color: 'gray',
            marginHorizontal: 8,
            textAlign: 'center',
          }}>
          Scan QR code on the Kachaak! Photo Booth to add your photos here for
          remembrance {'(and earn CHAAK$ each time you do so)'}.
        </Text>
      </View>
    );
  };

  const FlatListImageView = prop => {
    // console.log('item', prop.index);
    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('ProfileSecondScreen', {
            data: prop.item,
            fullList: Imgdata,
            index: Number(prop.index),
          })
        }>
        <View style={styles.flatListImageCont}>
          <Image
            source={{uri: prop.item.media.url}}
            style={{width: '100%', height: '100%'}}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const {userToken} = useContext(AppContext);

  const getUserToken = async () => {
    try {
      const savedToken = await AsyncStorage.getItem('LoginToken');

      // console.log('savedTokenxxxxxxxx', savedToken);

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

  const getuserID = async token => {
    try {
      const decodedToken = await jwtDecode(token);
      return decodedToken.id;
    } catch (error) {
      // console.log('Error decoding token:', error);
      return null;
    }
  };

  const getImages = async () => {
    try {
      setloading(true);
      // console.log('called getImages');
      const Token = await getUserToken();
      const userID = await getuserID(Token);
      // console.log('first', userToken,userID)
      const urlToHit = 'https://api.kachaak.com.sg/api/albums/' + userID;

      // const response = await axios.get(urlToHit, config);
      const response = await axiosGet(urlToHit);

      const responseData = response.data;
      // console.log('responseDataxxxxxxxxxxxx', responseData.data.length);
      if (response?.data != undefined) {
        setImgdata(responseData.data);
        // console.log('imagedata', response);
      } else {
        showError('error loading profile');
        props.navigation.goBack();
      }
      setloading(false);
    } catch (e) {
      console.log('e', e);
     showError('error:', e);
      setloading(false);
      props.navigation.goBack();
    }
  };

  const checkUserDetails = async () => {
    try {
      setloading(true);
      const urlToHit = 'https://api.kachaak.com.sg/api/users/profile';
      const response = await axiosGet(urlToHit);
      // console.log('responseCheckUserDetails===>', response.data.data);

      if (response.data.data != undefined) {
        const res = response.data.data;
        // console.log('res.Img.dddd', res.profileImage);
        // setprofileExists(true);
        setName(res?.name);
        // setUserName(res.profileName);
        setprofileImage(res?.profileImage);
        // setfoodItems(res.favouriteFoods);
        // setAge(res.age);
        // setAgeText(res.age);
        // setGender(res.gender);
        // setgenderText(res.gender);
        // setIndustry(res.industry);
        // setIndustryText(res.industry);
        // setAddress(res.address);
      }

      setloading(false);
    } catch (error) {
      console.log('errorCheckUserDetails', error.response.data);
      if (error.response.data.error == 'Profile not exists') {
        console.log('setprofileExists set to false');
        setloading(false);
      }
    }
  };
  useFocusEffect(
    useCallback(() => {
      // This function will be called when the screen comes into focus
      getImages();
      checkUserDetails();
      return () => {
        // This function will be called when the screen loses focus
        // You can perform any cleanup logic here
      };
    }, []),
  );

  if (loading == true) {
    return (
      <ImageBackground
        source={require('../../assets/linearbg.png')}
        style={{
          height: windowHeight,
          width: windowWidth,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size={50} color={'525461'} />
      </ImageBackground>
    );
  } else {
    return (
      <ImageBackground
        source={require('../../assets/linearbg.png')}
        style={{height: windowHeight, width: windowWidth}}>
        <View style={styles.profileInfoContainer}>
          <View style={{width: windowWidth / 3}}></View>
          <View style={{width: windowWidth / 3, justifyContent: 'center'}}>
            <Text
              style={{
                color: 'white',
                fontSize: size.large(),
                fontWeight: 'bold',
                color: '#ffffff',
                textShadowColor: 'black',
                alignSelf: 'center',
                textShadowOffset: {width: 0, height: 0},
                textShadowRadius: 10,
                // marginBottom: 10,
              }}>
              Albums
            </Text>
          </View>
          <View style={{width: windowWidth / 3, justifyContent: 'center'}}>
            <TouchableOpacity
              style={{alignSelf: 'flex-end', marginRight: 10}}
              onPress={() => props.navigation.navigate('EditProfile')}>
              <MaterialIcons name={'settings'} size={35} color="#00BBB4" />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            height: windowWidth * 0.3,
            width: windowWidth * 0.3,
            borderRadius: (windowWidth * 0.3) / 2,
            backgroundColor: 'white',
            // marginLeft: windowWidth * 0.35,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('EditProfile')}>
            <View>
              <Image
                source={{
                  uri:
                    profileImage != null
                      ? profileImage
                      : 'https://e7.pngegg.com/pngimages/753/432/png-clipart-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service-thumbnail.png',
                }}
                style={styles.profilePicContainer}
              />
              <View
                style={{
                  width: '100%',
                  // backgroundColor: 'green',
                  position: 'absolute',
                  height: windowWidth * 0.29,
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                }}>
                <View
                  style={{
                    backgroundColor: '#00BBB4',
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{color: 'white', fontSize: 20}}>+</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignSelf: 'center',
            // marginLeft: windowWidth * 0.3,
            // backgroundColor:'red',
            width: windowWidth * 0.4,
            alignItems: 'center',
            marginTop: 3,
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: size.medium(),
              color: '#ffffff',
              textShadowColor: 'black',
              textShadowOffset: {width: 0, height: 0},
              textShadowRadius: 10,
            }}>
            {Name}
          </Text>
        </View>
        <View style={styles.profileFlatlistContainer}>
          <FlatList
            data={Imgdata}
            numColumns={3}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={() => {
                  getImages();
                  checkUserDetails();
                }}
              />
            }
            ListEmptyComponent={emptyList}
            contentContainerStyle={{paddingBottom: windowHeight * 0.01}}
            keyExtractor={(item, index) => item.id}
            renderItem={({item, index}) => {
              return <FlatListImageView item={item} index={index} />;
            }}
          />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  profileInfoContainer: {
    height: windowHeight * 0.08,
    width: windowWidth,
    flexDirection: 'row',
    // alignItems:'center',
    // justifyContent:'center',
    // backgroundColor: 'red',
    paddingBottom: 10,
    marginTop:Platform.OS=='ios'? windowHeight*0.05:0
    
    
  },
  profileFlatlistContainer: {
    marginTop: 10,
    borderTopColor: '#00BBB4',
    borderTopWidth: 0.2,
    height:Platform.OS=='ios'?windowHeight * 0.59: windowHeight * 0.55,
    width: windowWidth,
    // backgroundColor: 'green',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  flatListImageCont: {
    height: windowHeight * 0.1625,
    width: windowWidth * 0.33,
    backgroundColor: 'white',
    // borderWidth: 1,
    // borderRadius: 3,
    overflow: 'hidden',
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  InfoContainer: {
    // height: '100%',
    height: windowHeight * 0.1,
    backgroundColor: 'orange',
    width: '80%',
    justifyContent: 'center',
    // justifyContent: 'space-evenly',
  },
  settingsContainer: {
    height: '100%',
    width: '20%',
    // backgroundColor: 'green',
    paddingTop: 10,
    paddingRight: 5,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  settingsLogoCont: {
    // height: windowHeight * 0.05,
    width: windowWidth * 0.07,
    margin: 10,
    resizeMode: 'contain',
  },
  profilePicContainer: {
    height: windowWidth * 0.29,
    width: windowWidth * 0.29,
    borderRadius: (windowWidth * 0.29) / 2,

    backgroundColor: 'grey',
    resizeMode: 'cover',
  },
});
