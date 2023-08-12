import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ImageBackground} from 'react-native';
import {useState} from 'react';
import {useEffect} from 'react';
import moment from 'moment';
import {ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {axiosPost} from '../../axios/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import {Dimensions} from 'react-native';
import {Linking} from 'react-native';
import {ActivityIndicator} from 'react-native';
import * as size from '../../components/FontSize';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function JobDescription(props) {
  const [loading, setloading] = useState(false);
  const [data, setdata] = useState(props.route.params.data.item);
  // const [pplied, setpplied] = useState(props.route.params.data.applied);
  // const getUserToken = async () => {
  //   try {
  //     const savedToken = await AsyncStorage.getItem('LoginToken');

  //     console.log('savedTokenxxxxxxxx', savedToken);

  //     if (savedToken != null) {
  //       return savedToken;
  //     } else {
  //       return null;
  //     }
  //   } catch (err) {
  //     console.log('getUserTokenError', err);
  //     return null;
  //   }
  // };
  // const getuserID = token => {
  //   try {
  //     const decodedToken = jwtDecode(token);
  //     return decodedToken.id;
  //   } catch (error) {
  //     console.log('Error decoding token:', error);
  //     return null;
  //   }
  // };

  // const applyforJob = async (setapplied, jobID) => {
  //   console.log('applItem', jobID.id);
  //   try {
  //     setloading(true);
  //     const urlToHit = 'https://api.kachaak.com.sg/api/jobs/apply';
  //     const token = await getUserToken();
  //     const userID = await getuserID(token);
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         'Content-Type': 'application/json',
  //       },
  //     };
  //     const body = JSON.stringify({
  //       userId: userID,
  //       jobId: jobID.id,
  //     });

  //     const response = await axiosPost(urlToHit, body, config);
  //     console.log('response', response.data);
  //     setapplied(true);
  //     setpplied(true);
  //     setloading(false);
  //     // Alert.alert('Successful')
  //     // props.navigation.goBack();
  //   } catch (error) {
  //     console.log('error:', error.response.data);
  //     if (error.response.data.error == 'Job already applied') {
  //       Alert.alert(error.response.data.error);
  //     }
  //     setloading(false);
  //   }
  // };

  const handleContactus = async () => {
    const email = 'info@kachaak.com.sg';
    const subject = 'Job Application';
    const body = '';
    const emailUrl = `mailto:${email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    try {
      const res= await  Linking.openURL(emailUrl)
      console.log('res', res.data)
    } catch (error) {
      console.log('error1234', error)
      
    }
  };

  useEffect(() => {
    console.log('props.route.params.data', props.route.params.data);
    setdata(props.route.params.data.item);
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/linearbg.png')}
      style={{flex: 1}}>
      <ScrollView contentContainerStyle={{width: windowWidth}}>
        <View style={styles.titleContaier}>
          <Text style={styles.title}>{data.title}</Text>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 5,
              // borderBottomWidth: 3,
              // borderBottomColor: 'gray',
            }}>
            <View
              style={{
                width: '50%',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}>
              <Text
                style={{
                  color: '#00BBB4',
                  fontSize: size.small(),
                  textShadowColor: 'black',
                  textShadowOffset: {width: 0, height: 1},
                  textShadowRadius: 5,
                }}>
                Posted at:
              </Text>
              <Text
                style={{
                  ...styles.JobDescription,
                  fontSize: size.Xsmall(),
                  // fontWeight: 'bold',
                }}>
                {moment(data.createdAt).format('MMMM Do YYYY, h:mm a')}
              </Text>
            </View>
            <View
              style={{
                width: '50%',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}>
              <Text
                style={{
                  color: '#00BBB4',
                  fontSize: size.small(),
                  textShadowColor: 'black',
                  textShadowOffset: {width: 0, height: 1},
                  textShadowRadius: 5,
                }}>
                Updated at:
              </Text>
              <Text
                style={{
                  ...styles.JobDescription,
                  fontSize: size.Xsmall(),
                  // fontWeight: 'bold',
                }}>
                {moment(data.updatedAt).format('MMMM Do YYYY, h:mm a')}
              </Text>
            </View>
          </View>
          
        </View>

        <View style={styles.descContainer}>
          <Text
            style={{
              color: '#00BBB4',
              fontSize: size.small(),
              fontWeight: 'bold',
            }}>
            Description:
          </Text>
          <Text style={styles.JobDescription}>{data.description} </Text>
          <TouchableOpacity onPress={() => handleContactus()}>
            <Text
              style={{
                color: '#00BBB4',
                fontSize: size.medium(),
                fontWeight: 'bold',
                textShadowColor: 'black',
                textShadowOffset: {width: 0, height: 0},
                textShadowRadius: 5,
                marginTop:10,
                // alignSelf: '',
                // paddingLeft: windowWidth * 0.03,
                // paddingVertical:windowHeight*0.02
              }}>
              Contact Us
            </Text>
          </TouchableOpacity>
        </View>
        {/* <View
          style={{
            width: windowWidth,
            paddingBottom: windowWidth * 0.1,
            // backgroundColor: 'red',
          }}>
          <TouchableOpacity
            style={{
              marginTop: windowHeight * 0.05,
              width: '90%',
              height: 40,
              backgroundColor: pplied == true ? '#525461' : '#00BBB4',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
              marginHorizontal: 20,
              //   backgroundColor:'red'
            }}
            onPress={() =>
              pplied == true || loading == true
                ? null
                : applyforJob(
                    props.route.params.data.setapplied,
                    props.route.params.data.item,
                  )
            }>
            {loading == true ? (
              <ActivityIndicator size={20} color={'white'} />
            ) : (
              <Text style={{fontSize: 18, color: '#ffffff'}}>
                {pplied == true ? 'Applied' : 'Apply'}
              </Text>
            )}
          </TouchableOpacity>
        </View> */}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  titleContaier: {
    // height: '30%',
    // paddingTop: windowHeight * 0.05,
    width: '100%',
    // backgroundColor: 'red',
    paddingTop: windowHeight * 0.03,
    // paddingLeft: windowWidth * 0.03,
    paddingBottom: 5,
    justifyContent: 'center',
    borderBottomColor: 'gray',
    borderBottomWidth: 3,
  },
  title: {
    color: '#00BBB4',
    fontSize: size.large(),
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 5,
    paddingLeft:windowWidth*0.03
  },
  descContainer: {
    // backgroundColor: 'orange',
    width: '100%',
    paddingHorizontal: windowWidth * 0.03,
    minHeight: windowHeight * 0.55,
paddingTop:windowHeight*0.02,
    paddingBottom: windowHeight * 0.1,
  },
  JobDescription: {
    color: 'white',
    fontSize: size.small(),
    marginTop: 5,
    // marginBottom: 15,
  },
});
