import { View, Text,ImageBackground } from 'react-native'
import React,{useEffect} from 'react'

const BulletinSecondScreen = ({navigation}) => {
    useEffect(() => {
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    }, []);
    return <ImageBackground source={require('../../assets/BulletinBg.png')} style={{flex:1,width:'100%',height:'100%'}} />;
}

export default BulletinSecondScreen