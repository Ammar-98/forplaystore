import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Dimensions} from 'react-native';
import Logolg from '../components/Logolg';
import { useEffect } from 'react';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Varification(props) {
    useEffect(() => {
        setTimeout(() => {
           props.navigation.navigate('LoginScreen');
          }, 4000);
    
    }, [])
    
  return (
    <LinearGradient
      colors={[
        '#525461',
        '#343643',
        '#222431',
        '#1B1D2A',
        '#1B1D2A',
        '#1B1D2A',
      ]}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        justifyContent: 'space-evenly',
      }}>
      <Logolg width={windowHeight * 0.25} height={windowHeight * 0.3} />

      <ActivityIndicator size={100} color={'#00BBB4'} />
      <Text style={{color: 'white', fontSize: 25,marginBottom:windowHeight*0.1}}>
        Check your email to verify.
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({});
