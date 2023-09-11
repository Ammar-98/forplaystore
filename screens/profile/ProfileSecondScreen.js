import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  PermissionsAndroid,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {useEffect, useState, useRef} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import * as size from '../../components/FontSize';

import {Dimensions} from 'react-native';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'react-native-fetch-blob';
import {Overlay} from 'react-native-elements';
import {PERMISSIONS, request} from 'react-native-permissions';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function ProfileSecondScreen(props) {
  const ref = useRef();

  const [fullData, setfullData] = useState([]);
  const [selecteditem, setselecteditem] = useState('');
  const [currentIndex, setcurrentIndex] = useState(0);
  const [loading, setloading] = useState(false);
  const ScrollToIndex = ci => {
    console.log('selectedItem', ci);
    if (selecteditem !== '') {
      ref.current.scrollToIndex({
        animated: true,
        index: ci,
      });
    }
  };

  const shareImage = async url => {
    try {
      {
        Platform.OS == 'android' ? setloading(false) : null;
      }
      const shareOptions = {
        title: 'Share via',
        url: url, // Replace with the actual URI of your image
        // social: 'instagram',
      };

      const res = await Share.open(shareOptions);
      console.log('res', res);
      setloading(false);
    } catch (error) {
      console.log('Error sharing image:', error.message);
  {Platform.OS=='ios'?    setloading(false):null}

    }
  };

  const requestStoragePermission = async img => {
    try {
      const granted = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
      const granted1 = await request(PERMISSIONS.IOS.MEDIA_LIBRARY);
      const granted2 = await request(PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY);

      console.log('Permission result', granted, granted1, granted2); // Log the result
    } catch (err) {
      console.warn(err);
    }
  };

  const downloadImage2 = async img => {
    try {
      setloading(true);
      const date = new Date();
      const imageURL = img;
      const ext = getExtension(imageURL);
      const fileName =
        'image_' +
        Math.floor(date.getTime() + date.getSeconds() / 2) +
        '.' +
        ext;

      const {config, fs} = RNFetchBlob;
      const pictureDir =
        Platform.OS == 'android' ? fs.dirs.PictureDir : fs.dirs.DocumentDir;
      console.log('pictureDir==>', pictureDir);
      const options = {
        fileCache: true,
        path: pictureDir + '/' + fileName,
      };

      const res = await config(options).fetch('GET', imageURL);
      console.log('res', res);
      let imagePath = res.path();

      imagePath = 'file://' + imagePath;

      // Alert.alert('Image Downloaded successfully');
      console.log('imagePath', imagePath);
      shareImage(imagePath);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  const downloadImage = async img => {
    let date = new Date();
    let imageURL = img;
    let ext = getExtention(imageURL);
    ext = '.' + ext[0];

    const {config, fs} = RNFetchBlob;
    let pictureDir = fs.dirs.pictureDir;
    let options = {
      fileCache: true,
      addAndroidManager: {
        useDownloadManager: true,
        notification: true,
        path:
          pictureDir +
          '/image_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };
    config(options)
      .fetch('Get', imageURL)
      .then(res => {
        console.log('res==>', JSON.stringify(res.data));
        Alert.alert('Image Downloaded successfully');
        let imgurl = 'file://' + JSON.stringify(res.data);
        imgurl = imgurl.replace(/"/g, '');
        console.log('imgurl==>', imgurl);
        shareImage(imgurl);
      });
  };

  const getExtention = filename => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };
  const getExtension = filename => {
    return filename.split('.').pop();
  };
  useEffect(() => {
    setfullData(props.route.params.fullList);
    setselecteditem(props.route.params.data);
    setcurrentIndex(props.route.params.index);
    setTimeout(() => {
      ScrollToIndex(props.route.params.index);
    }, 100); // Adjust the delay as needed
  }, [selecteditem]);

  const DropdownView = props => {
    console.log('propshere', props.data);
    return (
      <View style={styles.dropdownView}>
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            width: '100%',
            padding: 20,
            borderRadius: 7,
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => downloadImage2(props.data)}>
            {/* <TouchableOpacity onPress={() => requestStoragePermission()}> */}

            <Text style={{fontSize: size.small(), color: 'white'}}>Share</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
        // onPress={() => requestStoragePermission(props.data)}
        >
          {/* <Text style={{fontSize: size.small(), color: 'white'}}>Save to Photos</Text> */}
        </TouchableOpacity>
        {/* <Text style={{fontSize: size.small(), color: 'white'}}>Delete</Text> */}
      </View>
    );
  };
  const FlatImageView = props => {
    const [modalVisible, setmodalVisible] = useState(false);
    // console.log('index', props.index);
    return (
      <View style={styles.FlatImageView}>
        <View
          style={{
            height: windowHeight * 0.05,
            // backgroundColor: '#2B2D3A',
            // backgroundColor:'red',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity
            onPress={() => setmodalVisible(!modalVisible)}
            style={{
              //   backgroundColor: 'green',
              height: windowHeight * 0.05,
              width: windowWidth * 0.1,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <SimpleLineIcons
              name={'options-vertical'}
              size={17}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '100%',
            height: windowHeight * 0.75,
            flexDirection: 'row',
            // backgroundColor:'orange'
          }}>
          <Image
            style={{width: '100%', height: '100%', resizeMode: 'contain'}}
            source={{uri: props.item.media.url}}
            // source={{uri:'file://'+'/data/user/0/com.chaak/files/RNFetchBlobTmp_pawco5nt4z1t5zty9ogb6'}}
          />

          {modalVisible == true ? (
            <DropdownView data={props.item.media.url} />
          ) : null}
        </View>
        <View
          style={{
            // backgroundColor: 'black',
            paddingTop: 5,
            width: '100%',
            height: windowHeight * 0.15,
            flexDirection: 'row',
          }}>
          <View
            style={{
              width: windowWidth * 0.2,
              //   backgroundColor: 'red',
              // justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* <Image
              source={require('../../assets/Share.png')}
              style={{
                height: windowHeight * 0.05,
                width: windowHeight * 0.05,
                marginRight: 5,
                resizeMode: 'cover',
              }}
            /> */}
            <MaterialIcons name={'share'} size={40} color="#00BBB4" />
          </View>
          <View style={{width: windowWidth * 0.75}}>
            <Text style={styles.Text1}>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat. Ut wisi enim ad minim veniam, quis...more
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ImageBackground
      source={require('../../assets/linearbg.png')}
      style={{height: windowHeight, width: windowWidth}}>
      <FlatList
        data={fullData}
        ref={ref}
        contentContainerStyle={{
          paddingBottom: windowHeight * 0.2,
          paddingTop: Platform.OS == 'ios' ? windowHeight * 0.1 : 0,
        }}
        keyExtractor={item => String(item.id)}
        renderItem={({item, index}) => {
          return <FlatImageView item={item} index={index} />;
        }}
        getItemLayout={(data, index) => ({
          length: windowHeight * 0.95,
          offset: windowHeight * 0.95 * index,
          index,
        })}
      />
      <Modal transparent visible={loading} onRequestClose={() => {}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <ActivityIndicator size={30} color={'#00BBB4'} />
        </View>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  FlatImageView: {
    width: windowWidth,
    height: windowHeight * 0.95,
    // backgroundColor: '#2B2D3A',
    borderWidth: 0.2,
    borderColor: 'rgba(0,0,0,0.3)',
    // backgroundColor:'red'
    // marginBottom: 10,
  },
  Text1: {
    fontSize: size.Xsmall(),
    color: 'white',
  },
  dropdownView: {
    ...StyleSheet.absoluteFillObject,
    // height: 100,
    height: windowHeight * 0.1,
    width: windowWidth * 0.3,
    // backgroundColor: 'white',
    zIndex: 1,
    marginLeft: windowWidth * 0.7,
    // justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.65)',
    rowGap: 10,
    borderRadius: 5,
    // position:'absolute'
  },
});
