import React, {useEffect, useState} from 'react';
import {
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import axios from 'axios';
// import {BASE_URL, API_KEY} from '@env';

const DropdownMenu = () => {
  const AgeData = [
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
    {label: '4', value: '4'},
    {label: '5', value: '5'},
    {label: '6', value: '6'},
    {label: '7', value: '7'},
    {label: '8', value: '8'},
  ];
  const GenderData = [
    {label: 'Male', value: '1'},
    {label: 'Female', value: '2'},
    {label: 'other', value: '3'},
  ];
  const IndustryData = [
    {label: 'Item 1', value: '1'},
    {label: 'Item 2', value: '2'},
    {label: 'Item 3', value: '3'},
    {label: 'Item 4', value: '4'},

  ];
    
    const LocationData = [
      {label: 'Item 1', value: '1'},
      {label: 'Item 2', value: '2'},
      {label: 'Item 3', value: '3'},
      {label: 'Item 4', value: '4'},
    ];
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState(null);
    const [industry, setIndustry] = useState(null);
    
  const [ageName, setAgeName] = useState(null);
  const [genderName, setGenderName] = useState(null);
  const [industryName, setIndustryName] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  return (
    <View style={{width: '88%'}}>
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
        itemTextStyle={{textAlign:'center'}}
        data={AgeData}
        // search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Age' : '...'}
        searchPlaceholder="Search..."
        value={age}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setAge(item.value);
          //   handleState(item.value);
          setAgeName(item.label);
          setIsFocus(false);
        }}
      />
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={GenderData}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Gender' : '...'}
        searchPlaceholder="Search..."
        value={gender}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setGender(item.value);
          //   handleCity(country, item.value);
          setGenderName(item.label);
          setIsFocus(false);
        }}
      />
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={IndustryData}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Industry' : '...'}
        searchPlaceholder="Search..."
        value={industry}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setIndustry(item.value);
          setIndustryName(item.label);
          setIsFocus(false);
        }}
      />
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={LocationData}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Location' : '...'}
        searchPlaceholder="Search..."
        value={industry}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setIndustry(item.value);
          setIndustryName(item.label);
          setIsFocus(false);
        }}
      />
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={LocationData}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Residence' : '...'}
        searchPlaceholder="Search..."
        value={industry}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setIndustry(item.value);
          setIndustryName(item.label);
          setIsFocus(false);
        }}
      />
    </View>
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

export default DropdownMenu;
