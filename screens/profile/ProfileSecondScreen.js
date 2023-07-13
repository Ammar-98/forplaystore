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
} from 'react-native';
import React from 'react';
import {useEffect, useState, useRef} from 'react';
import {Dimensions} from 'react-native';
import { Overlay } from 'react-native-elements';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function ProfileSecondScreen(props) {
  const ref = useRef();

  const [fullData, setfullData] = useState([]);
  const [selecteditem, setselecteditem] = useState('');
  const [currentIndex, setcurrentIndex] = useState(0)

  const ScrollToIndex = (ci) => {
    console.log('selectedItem', ci)
    if (selecteditem !== '') {
      ref.current.scrollToIndex({
        animated: true,
        index: ci,
      });
    }
  };

  // useEffect(() => {
  //   console.log('props', props.route.params.index);
  //   setfullData(props.route.params.fullList);
  //   setselecteditem(props.route.params.data);
  //   setcurrentIndex(props.route.params.index)
  // }, []);

  useEffect(() => {
    setfullData(props.route.params.fullList);
    setselecteditem(props.route.params.data);
    setcurrentIndex(props.route.params.index);
    setTimeout(() => {
      ScrollToIndex(props.route.params.index);
    }, 100); // Adjust the delay as needed
  }, [selecteditem]);

  const DropdownView = () => {
    return (
      <View style={styles.dropdownView}>
        <Text style={{fontSize: 15, color: 'white'}}>Share</Text>
        <Text style={{fontSize: 15, color: 'white'}}>Save to Photos</Text>
        <Text style={{fontSize: 15, color: 'white'}}>Delete</Text>
      </View>
    );
  };
  const FlatImageView = (props) => {
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
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/details.png')}
              style={{height: '50%', }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '100%',
            height: windowHeight * 0.65,
            flexDirection: 'row',
            
          }}>
          <Image
            style={{width: '100%', height: '100%', resizeMode: 'contain'}}
            source={{uri: props.item.media.url}}
          />

          {modalVisible == true ? <DropdownView /> : null}
        </View>
        <View
          style={{
            // backgroundColor: 'black',
            width: '100%',
            height: windowHeight * 0.15,
            flexDirection: 'row',
          }}>
          <View
            style={{
              width: windowWidth * 0.2,
              //   backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/Share.png')}
              style={{
                height: windowHeight * 0.05,
                width: windowHeight * 0.05,
                marginRight: 5,
                resizeMode: 'cover',
              }}
            />
          </View>
          <View style={{width: windowWidth * 0.75, justifyContent: 'center'}}>
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
        contentContainerStyle={{paddingBottom: windowHeight * 0.2}}
        keyExtractor={item => String(item.id)}
        renderItem={({item,index}) => {
          return <FlatImageView item={item} index={index} />;
        }}
        getItemLayout={(data, index) => ({
          length: windowHeight * 0.85,
          offset: windowHeight * 0.85 * index,
          index,
        })}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  FlatImageView: {
    width: windowWidth,
    height: windowHeight * 0.85,
    backgroundColor: '#2B2D3A',
    borderWidth:0.2,
    borderColor:'rgba(0,0,0,0.3)'
    // marginBottom: 10,
  },
  Text1: {
    fontSize: 10,
    color: 'white',
  },
  dropdownView: {
    ...StyleSheet.absoluteFillObject,
    height: 100,
    width: windowWidth * 0.3,
    backgroundColor: 'white',
    zIndex: 1,
    marginLeft: windowWidth * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    rowGap: 10,
    // position:'absolute'
  },
});
