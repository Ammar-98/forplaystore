import React, {useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Text
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
// import axios from 'axios';
// import {BASE_URL, API_KEY} from '@env';

const LocateUs = () => {
  const SouthData = [
    {label: 'Bisham', value: '1'},
    {label: 'Ang MO Kio', value: '2'},
    {label: 'Khatib', value: '3'},
    {label: 'Yishum', value: '4'},
  ,
  ];
  const EastData = [
    {label: 'loc1', value: '1'},
    {label: 'loc2', value: '2'},
    {label: 'loc3', value: '3'},
  ];
  const WestData = [
    {label: 'loc1', value: '1'},
    {label: 'loc2', value: '2'},
    {label: 'loc3', value: '3'},
  ];

  const CentralData = [
    {label: 'loc1', value: '1'},
    {label: 'loc2', value: '2'},
    {label: 'loc3', value: '3'},
  ];

  const [south, setSouth] = useState(null);
  const [east, setEast] = useState(null);
  const [west, setWest] = useState(null);
  const [central, setCentral] = useState(null);
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
      <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: 44, color: 'white', marginTop: 30}}>
          Don’t stop
        </Text>
        <Text style={{fontSize: 44, color: 'white', top: -10}}>earning</Text>
        <Text
          style={{
            fontSize: 18,
            color: 'white',
            marginTop: 20,
            width: '70%',
            textAlign: 'center',
          }}>
          Locate other KACHAAK! Booths at these locations
        </Text>
        <View style={{width: '88%', marginTop: 50}}>
          <Dropdown
            style={[
              styles.dropdown,
              {alignItems: 'center'},
              isFocus && {borderColor: 'blue'},
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            // itemTextStyle={{textAlign: 'center'}}
            data={SouthData}
            // search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'South' : '...'}
            searchPlaceholder="Search..."
            value={south}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setSouth(item.value);
              //   handleState(item.value);
              setSouthName(item.label);
              setIsFocus(false);
            }}
          />
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={EastData}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'East' : '...'}
            searchPlaceholder="Search..."
            value={east}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setEast(item.value);
              //   handleCity(country, item.value);
              setEastName(item.label);
              setIsFocus(false);
            }}
          />
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={WestData}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'west' : '...'}
            searchPlaceholder="Search..."
            value={west}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setWest(item.value);
              setWestName(item.label);
              setIsFocus(false);
            }}
          />
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={CentralData}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'central' : '...'}
            searchPlaceholder="Search..."
            value={central}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setCentral(item.value);
              setCentralName(item.label);
              setIsFocus(false);
            }}
          />
        </View>
      </View>
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
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default LocateUs;
