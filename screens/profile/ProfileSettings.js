import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'

export default function ProfileSettings() {
  return (
    <View style={{flex:1}}>
     <Image source={require('../../assets/settingLogo.png')} style={{backgroundColor:'red',}} />
    </View>
  )
}

const styles = StyleSheet.create({})