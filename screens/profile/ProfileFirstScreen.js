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
import React from 'react';
import {Dimensions} from 'react-native';
import {useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {useContext} from 'react';
import AppContext from '../../components/AppContext';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';
export default function ProfileFirstScreen(props) {
  const [Imgdata, setImgdata] = useState([]);
  const [loading, setloading] = useState(true);
  const data = [
    {
      id: 1,
      name: 'https://picsum.photos/id/237/200/300',
    },
    {
      id: 2,
      name: 'https://picsum.photos/id/238/200/300',
    },
    {
      id: 3,
      name: 'https://picsum.photos/id/239/200/300',
    },
    {
      id: 4,
      name: 'https://picsum.photos/id/240/200/300',
    },
    {
      id: 5,
      name: 'https://picsum.photos/id/241/200/300',
    },
    {
      id: 6,
      name: 'https://picsum.photos/id/242/200/300',
    },
    {
      id: 7,
      name: 'https://picsum.photos/id/243/200/300',
    },
    {
      id: 8,
      name: 'https://picsum.photos/id/244/200/300',
    },
    {
      id: 9,
      name: 'https://picsum.photos/id/252/200/300',
    },
    {
      id: 10,
      name: 'https://picsum.photos/id/243/200/300',
    },
    {
      id: 11,
      name: 'https://picsum.photos/id/247/200/300',
    },
    {
      id: 12,
      name: 'https://picsum.photos/id/248/200/300',
    },
    {
      id: 13,
      name: 'https://picsum.photos/id/249/200/300',
    },
    {
      id: 14,
      name: 'https://picsum.photos/id/250/200/300',
    },
    {
      id: 15,
      name: 'https://picsum.photos/id/251/200/300',
    },
    {
      id: 16,
      name: 'https://picsum.photos/id/252/200/300',
    },
    {
      id: 17,
      name: 'https://picsum.photos/id/253/200/300',
    },
    {
      id: 18,
      name: 'https://picsum.photos/id/254/200/300',
    },
    {
      id: 19,
      name: 'https://picsum.photos/id/255/200/300',
    },
    {
      id: 20,
      name: 'https://picsum.photos/id/256/200/300',
    },
  ];


  const GetProfilePic=async()=>{
    try{
      const pic= await launchImageLibrary(mediaType='photo')
      console.log('pic', pic)
    }
    catch(e){
      console.log('e', e)
    }
  }


  const FlatListImageView = (prop) => {
    console.log('item',prop.index);
    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('ProfileSecondScreen', {
            data: prop.item,
            fullList: Imgdata,
            index: Number(prop.index)
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
  const getuserID = token => {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.id;
    } catch (error) {
      console.log('Error decoding token:', error);
      return null;
    }
  };

  const getImages = async () => {
    try {
      setloading(true);
      console.log('called getImages');
      const token = userToken;
      const userID = getuserID(userToken);
      // console.log('first', userToken,userID)
      const urlToHit = 'https://api.kachaak.com.sg/api/albums/' + userID;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(urlToHit, config);
      const responseData = response.data;
      console.log('responseData', responseData.data.length);
      if (response?.data != undefined) {
        setImgdata(responseData.data);
        console.log('imagedata', Imgdata[0])
      } else {
        Alert.alert('error loading profile');
        props.navigation.goBack();
      }
      setloading(false);
    } catch (e) {
      console.log('e', e);
      Alert.alert('error:', e);
      setloading(false);
      props.navigation.goBack();
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // This function will be called when the screen comes into focus

      getImages();
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
        <ActivityIndicator size={100} color={'525461'} />
      </ImageBackground>
    );
  } else {
    return (
      <ImageBackground
        source={require('../../assets/linearbg.png')}
        style={{height: windowHeight, width: windowWidth}}>
        <View style={styles.profileInfoContainer}>
          <View style={styles.InfoContainer}>
            <View
              style={{
                height: windowWidth * 0.3,
                width: windowWidth * 0.3,
                borderRadius: (windowWidth * 0.3) / 2,
                backgroundColor: 'white',
                marginLeft: windowWidth * 0.35,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <TouchableOpacity onPress={GetProfilePic}>
              <Image
                source={{
                  uri: 'https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/people19.png',
                }}
                style={styles.profilePicContainer}
              />
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginLeft: windowWidth * 0.3,
                width: windowWidth * 0.4,
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Text style={{color: 'white'}}>RandomUser</Text>
            </View>
          </View>
          <View style={styles.settingsContainer}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('ProfileSettings')}>
              <Image
                style={styles.settingsLogoCont}
                source={require('../../assets/settingLogo.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.profileFlatlistContainer}>
          <FlatList
            data={Imgdata}
            numColumns={3}
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
    height: windowHeight * 0.25,
    width: windowWidth,
    flexDirection: 'row',
    // backgroundColor: 'red',
  },
  profileFlatlistContainer: {
    height: windowHeight * 0.65,
    width: windowWidth,
    // backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListImageCont: {
    height: windowHeight * 0.1625,
    width: windowWidth * 0.33,
    backgroundColor: 'grey',
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  InfoContainer: {
    height: '100%',
    // backgroundColor: 'red',
    width: '80%',
    justifyContent: 'center',
  },
  settingsContainer: {
    height: '100%',
    width: '20%',
    // backgroundColor: 'green',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  settingsLogoCont: {
    height: windowHeight * 0.05,
    width: windowWidth * 0.07,
    margin: 10,
    resizeMode: 'contain',
  },
  profilePicContainer: {
    height: windowWidth * 0.29,
    width: windowWidth * 0.29,
    borderRadius: (windowWidth * 0.29) / 2,

    backgroundColor: 'grey',
    resizeMode: 'stretch',
  },
});
