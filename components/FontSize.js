import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Dimensions} from 'react-native';

export const Xsmall = () => {
  let size = 11;
  let fs = Dimensions.get('window').fontScale;
  let fontSize = size ;
  return fontSize;
};
export const small = () => {
  let size = 16;
  let fs = Dimensions.get('window').fontScale;
  let fontSize = size ;
  return fontSize;
};
export const medium = () => {
  let size = 20;
  let fs = Dimensions.get('window').fontScale;
  let fontSize = size ;
  return fontSize;
};

export const large = () => {
  let size = 30;
  let fs = Dimensions.get('window').fontScale;
  let fontSize = size ;
  return fontSize;
};
export const Xlarge = () => {
  let size = 35;
  let fs = Dimensions.get('window').fontScale;
  let fontSize = size ;
  return fontSize;
};
export const XXlarge = () => {
  let size = 75;
  let fs = Dimensions.get('window').fontScale;
  let fontSize = size ;
  return fontSize;
};


const styles = StyleSheet.create({});
