import React, {useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  Alert,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import moment from 'moment';
// import {Dropdown} from 'react-native-element-dropdown';
// import axiosGet from 'axios';
import {useRef} from 'react';
import {axiosGet} from '../../axios/axios';
import {useEffect} from 'react';
import {Dimensions} from 'react-native';
import {Linking} from 'react-native';
import * as size from '../../components/FontSize';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
// import axios from 'axios';
// import {BASE_URL, API_KEY} from '@env';

const LocateUs = () => {
  const scrollViewRef = useRef(null);
  const handleScrollUp = () => {
    const scrollAmount = windowHeight * 0.37;

    // Scroll the ScrollView up
    scrollViewRef.current?.scrollTo({y: scrollAmount, animated: true});
  };

  const [SouthData, setSouthData] = useState([]);
  const [EastData, setEastData] = useState([]);
  const [WestData, setWestData] = useState([]);
  const [NorthData, setNorthData] = useState([]);
  const [CentralData, setCentralData] = useState([]);
  const [NorthEastData, setNorthEastData] = useState([]);
  const [NorthWestData, setNorthWestData] = useState([]);

  const getLocations = async () => {
    try {
      const urlToHit = 'https://api.kachaak.com.sg/api/brands/locations';
      const response = await axiosGet(urlToHit);
      console.log('responsegetLocation==>', response.data.data);
      // console.log('response.length', response.data.data.length)
      splitData(response.data.data);
    } catch (error) {
      console.log('error', error);
      Alert.alert(error?.response?.data);
    }
  };

  const splitData = async locationArray => {
    let i = 0;
    const length = locationArray.length;
    console.log('locationArray', locationArray);
    console.log('locationArray', locationArray[0].franchises);

    console.log('locationArray.length', locationArray.length);
    while (i < length) {
      if (locationArray[i].region == 'SOUTH') {
        setSouthData(locationArray[i].franchises);
        console.log('SET', locationArray[i].franchises);
      } else if (locationArray[i].region == 'CENTRAL') {
        setCentralData(locationArray[i].franchises);
        console.log('SET', locationArray[i].franchises);
      } else if (locationArray[i].region == 'NORTH') {
        setNorthData(locationArray[i].franchises);
        console.log('SET', locationArray[i].franchises);
      } else if (locationArray[i].region == 'EAST') {
        setEastData(locationArray[i].franchises);
        console.log('SET', locationArray[i].franchises);
      } else if (locationArray[i].region == 'WEST') {
        setWestData(locationArray[i].franchises);
        console.log('SET', locationArray[i].franchises);
      } else if (locationArray[i].region == 'NORTHWEST') {
        setNorthWestData(locationArray[i].franchises);
        console.log('SET', locationArray[i].franchises);
      } else if (locationArray[i].region == 'NORTHEAST') {
        setNorthEastData(locationArray[i].franchises);
        console.log('SET', locationArray[i].franchises);
      }
      i = i + 1;
    }
  };

  const DropdownView = props => {
    const [dropView, setdropView] = useState(false);

    const handleOnpress = async location => {
      // props.setselected(number);
      // props.setText(number)
      console.log('location', location);
      const formattedLocation = encodeURIComponent(location);
      const url = `https://www.google.com/maps/search/?api=1&query=${formattedLocation}`;

      Linking.openURL(url).catch(() => {
        console.log(`Failed to open ${location} in Google Maps`);
        // Handle any error that occurred while trying to open the URL
      });
    };
    return (
      <View>
        <TouchableOpacity
          // style={{width: '12%', alignItems: 'center'}}
          onPress={() => {
            setdropView(!dropView), handleScrollUp();
          }}>
          <View style={styles.dropdownView}>
            <View
              style={{
                width: '85%',
                overflow: 'hidden',
                // backgroundColor: 'orange',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: size.medium(),
                  textShadowColor: 'black',
                  textShadowOffset: {width: 0, height: 0},
                  textShadowRadius: 3,
                }}>
                {props.text}
              </Text>
            </View>

            <View
              style={{height: '100%', justifyContent: 'center'}}>
              <MaterialIcons
                name={dropView == false ? 'arrow-drop-down' : 'arrow-drop-up'}
                style={{
                  textShadowColor: 'black',
                  textShadowOffset: {width: 0, height: 0},
                  textShadowRadius: 3,
                }}
                size={23}
                color="white"
              />
            </View>
          </View>
        </TouchableOpacity>

        {dropView == true ? (
          <View
            style={{
              width: windowWidth * 0.9,
              minHeight: windowHeight * 0.1,
              maxHeight: windowHeight * 0.2,
              backgroundColor: 'white',
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
            }}>
            <ScrollView
              contentContainerStyle={{
                width: '100%',
                // alignItems: 'center',
                // backgroundColor: 'red',
                // height: windowHeight * 0.10,
                // borderBottomLeftRadius: 20,
                // borderBottomRightRadius:20,
                // backgroundColor:'red'
                paddingBottom: 10,
              }}
              nestedScrollEnabled>
              {props.value.length < 1 ? (
                <View style={{width: '100%', alignItems: 'center',height:windowHeight*0.09,justifyContent:'center'}}>
                  <Text
                    style={{
                      // marginTop: 3,
                      paddingLeft: 15,
                      padding: 5,
                      color: 'gray',
                      fontSize: size.small(),
                      // borderBottomColor:'#ECF9FF',
                      // borderTopWidth:0.1
                    }}>
                    Coming Soon!
                  </Text>
                </View>
              ) : (
                props.value.map((number, index) => (
                  <View style={{width: '100%'}} key={index}>
                    <TouchableOpacity
                      onPress={() => handleOnpress(number.location)}>
                      <Text
                        style={{
                          // marginTop: 3,
                          paddingLeft: 15,
                          padding: 5,
                          color: '#00BBB4',
                          fontSize: size.small(),
                          textShadowColor: 'gray',
                          textShadowOffset: {width: 0, height: 0},
                          textShadowRadius: 1,
                        }}>
                        {number.brandName}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))
              )}
            </ScrollView>
          </View>
        ) : null}
      </View>
    );
  };
  useEffect(() => {
    getLocations();
  }, []);

  // const SouthData = [,];
  // const EastData = [];
  // const WestData = [];
  // const NorthData = [];

  // const CentralData = [];

  const [south, setSouth] = useState(null);
  const [east, setEast] = useState(null);
  const [west, setWest] = useState(null);
  const [central, setCentral] = useState(null);
  const [north, setnorth] = useState(null);

  const [residence, setResidence] = useState(null);

  const [southName, setSouthName] = useState(null);
  const [eastName, setEastName] = useState(null);
  const [westName, setWestName] = useState(null);
  const [centralName, setCentralName] = useState(null);

  const [isFocus, setIsFocus] = useState(false);
  return (
    <ImageBackground
      source={require('../../assets/linearbg.png')}
      style={{flex: 1}}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{paddingBottom: windowHeight * 0.2}}>
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              fontSize: size.Xlarge(),
              color: 'white',
              marginTop: 30,
              textShadowColor: 'black',
              textShadowOffset: {width: 0, height: 1},
              textShadowRadius: 5,
            }}>
            Don’t stop earning
          </Text>
          <Text
            style={{
              fontSize: size.medium(),
              color: 'white',
              marginTop: 20,
              width: '70%',
              textAlign: 'center',
            }}>
            Locate other KACHAAK! Booths at these locations
          </Text>
          <View style={{width: '100%', marginTop: 20, alignItems: 'center'}}>
            <DropdownView text={'East'} value={EastData} />
            <DropdownView text={'West'} value={WestData} />
            <DropdownView text={'North'} value={NorthData} />
            <DropdownView text={'South'} value={SouthData} />
            <DropdownView text={'Central'} value={CentralData} />
            <DropdownView text={'North-East'} value={NorthEastData} />
            <DropdownView text={'North-West'} value={NorthWestData} />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     backgroundColor: '#533483',
  //     padding: 16,
  //     justifyContent: 'center',
  //     alignContent: 'center',
  //   },
  dropdown: {
    //   flex:1,
    height: 40,
    width: '100%',
    borderColor: '#404041',
    borderWidth: 0.5,
    borderRadius: 2,
    paddingHorizontal: 8,
    marginBottom: 6,
    backgroundColor: '#00BBB4',
    // justifyContent:'center'
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: size.small(),
  },
  placeholderStyle: {
    fontSize: size.small,
  },
  selectedTextStyle: {
    fontSize: size.small(),
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: size.small(),
  },
  dropdownView: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.07,
    backgroundColor: '#00BBB4',
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
    borderRadius: 5,
    // borderRadius:20
  },
});

export default LocateUs;
