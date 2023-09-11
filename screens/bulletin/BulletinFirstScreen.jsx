import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import {RefreshControl} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import * as size from '../../components/FontSize';
// import ButtonGradient from '../../';
import Button from './bulletinComponents/Button';
import uuid from 'react-native-uuid';
import {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';
import AppContext from '../../components/AppContext';
import {useContext} from 'react';
import axios from 'axios';
import {axiosGet} from '../../axios/axios';
import {ActivityIndicator} from 'react-native';
import jwtDecode from 'jwt-decode';
import {axiosPost} from '../../axios/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BulletinSecondScreen from './BulletinSecondScreen';
const windowHeight = Dimensions.get('window').height;
const WindowWidth = Dimensions.get('window').width;
const BulletinFirstScreen = props => {
  const {userToken, setuserToken} = useContext(AppContext);

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loading, setloading] = useState(true);

  // const fetchData = async page => {
  //   try {
  //     const response = await getRequestWithToken(
  //       `https://api.example.com/data?page=${page}`,
  //       token,
  //     );
  //     const responseData = response.data;
  //     const newData = responseData.data;

  //     setData(prevData => [...prevData, ...newData]);
  //     setHasNextPage(responseData.pagination.hasNextPage);
  //   } catch (error) {
  //     console.log('Error fetching data:', error);
  //   }
  // };

  const getuserID = token => {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.id;
    } catch (error) {
      console.log('Error decoding token:', error);
      return null;
    }
  };

  const getUserToken = async () => {
    try {
      const savedToken = await AsyncStorage.getItem('LoginToken');

      // console.log('savedTokenxxxxxxxx', savedToken);

      if (savedToken != null) {
        return savedToken;
      } else {
        return null;
      }
    } catch (err) {
      console.log('getUserTokenError', err);
      return null;
    }
  };

  const applyforJob = async (setapplied, jobID) => {
    console.log('applItem', jobID.id);
    try {
      const urlToHit = 'https://api.kachaak.com.sg/api/jobs/apply';
      const token = await getUserToken();
      const userID = await getuserID(userToken);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const body = JSON.stringify({
        userId: userID,
        jobId: jobID.id,
      });

      const response = await axiosPost(urlToHit, body, config);
      // console.log('response', response.data);
      setapplied(true);
      // setloading(false);
      // Alert.alert('Successful')
      // props.navigation.goBack();
    } catch (error) {
      console.log('error:', error.response.data);
      if (error.response.data.error == 'Job already applied') {
        Alert.alert(error.response.data.error);
      }
    }
  };
  const getJobs = async page => {
    try {
      setloading(true);
      console.log('called');
      const token = userToken;
      const urlToHit =
        'https://api.kachaak.com.sg/api//jobs?pageNo=' + page + '&pageSize=7';
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axiosGet(urlToHit);
      const responseData = response.data;
      const newData = responseData.data;
      // console.log('newData', newData);
      setData(prevData => [...prevData, ...newData]);
      setHasNextPage(responseData.pagination.hasNextPage);
      setloading(false);
    } catch (e) {
      console.log('e', e);
    }
  };
  const getJobs2 = async page => {
    try {
      // console.log('hasnetpage', hasNextPage)
      setCurrentPage(1);
      setloading(true);
      console.log('called2');
      const token = userToken;
      const urlToHit =
        'https://api.kachaak.com.sg/api//jobs?pageNo=' + page + '&pageSize=7';

      const response = await axiosGet(urlToHit);
      const responseData = response.data;
      const newData = responseData.data;
      // console.log('newData', newData);
      setData(newData);
      setHasNextPage(responseData.pagination.hasNextPage);
      setloading(false);
    } catch (e) {
      console.log('e', e);
    }
  };

  useEffect(() => {
    // fetchData(currentPage);
    getJobs(currentPage);
    // console.log('userToken', userToken);
  }, []);

  const handleEndReached = () => {
    console.log('hasNextPage', hasNextPage);
    console.log('currentPage', currentPage);
    if (hasNextPage) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      getJobs(nextPage);
    }
  };

  const totalChaak = useSelector(state => state.chaakSlice.totalChaaks);
  const handleNavigate = () => {
    navigation.navigate('BulletinScreen2');
  };

  const loadingView = () => {
    if (loading == true) {
      return (
        <View
          style={{
            // height: '100%',
            width: '100%',
            // backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator
            size={30}
            color={'#00BBB4'}
            // color={'orange'}
            // style={{backgroundColor: 'red'}}
          />
        </View>
      );
    } else {
      return null;
    }
  };
  const RewardItem = ({item}) => {
    const [applied, setapplied] = useState(
      item?.isApplied == true ? true : false,
    );
    return (
      <View style={{padding: 10, borderBottomWidth: 1, borderBottomColor: 'white'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            style={{width: '70%'}}
            // onPress={()=>props.navigation.navigate('JobDescription',{data:{item,applied,setapplied}})}
            onPress={() =>
              props.navigation.navigate('JobDescription', {data: {item}})
            }>
            <View style={{width: '100%'}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: size.small(),
                  color: '#00BBB4',
                  textShadowColor: 'black',
                  textShadowOffset: {width: 0, height: 0},
                  textShadowRadius: 5,
                }}>
                {item.title}
              </Text>
              <Text
                style={{
                  fontSize: size.Xsmall(),
                  color: 'white',
                  textShadowColor: 'black',
                  textShadowOffset: {width: 0, height: 0},
                  textShadowRadius: 5,
                }}>
                Job Status: {item.jobStatus}
              </Text>

              <Text
                style={{
                  fontSize: size.Xsmall(),
                  color: 'white',
                  textShadowColor: 'black',
                  textShadowOffset: {width: 0, height: 0},
                  textShadowRadius: 5,
                }}
                numberOfLines={3}
                ellipsizeMode="tail">
                {item.description}
              </Text>
            </View>
          </TouchableOpacity>
          {/* edr Botton component dalna ha walletComponents k andar jo pra hua */}

          {/* <Button
            width={'27%'}
            height={'3%'}
            title={'Apply'}
            alterTitle={'Applied'}
            handleNavigate={handleNavigate}
          /> */}
          <View
            style={{
              // height: '100%',
              // backgroundColor: 'red',
              justifyContent: 'center',
            }}>
               <TouchableOpacity
                // onPress={() => applied==true?null:applyforJob(setapplied, item)}
                // onPress={()=>props.navigation.navigate('JobDescription',{data:{item,applied,setapplied}})}
                onPress={() =>
                  props.navigation.navigate('JobDescription', {data: {item}})
                }>
            <View
              style={{
                // width: WindowWidth * 0.25,
                // height: windowHeight * 0.05,
paddingHorizontal:20,paddingVertical:10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: applied == true ? '#525461' : '#00BBB4',
                //  : '#525461',
                borderRadius: 5,
                marginHorizontal: WindowWidth * 0.01,
              }}>
             
                <Text
                  style={{
                    fontSize: size.small(),
                    color: '#ffffff',
                    textShadowColor: 'black',
                    textShadowOffset: {width: 0, height: 0},
                    textShadowRadius: 5,
                  }}>
                  {applied == true ? 'Applied' : 'Read More'}
                </Text>
             
            </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ImageBackground
      source={require('../../assets/linearbg.png')}
      style={{flex: 1}}>
      <View style={{marginTop:Platform.OS=='ios'?windowHeight*0.06:0}}>
        <View style={styles.container}>
          <Text style={[styles.topText]}>
            JOBS
            {/* <Text style={[styles.topText, {color: '#00BBB4'}]}>CHAAK$</Text> */}
          </Text>
          {/* <Text style={[styles.topText, {fontSize: 26}]}>
            with these job opportunities
          </Text> */}
        </View>
        <View
          style={{
            width: '100%',
            height:Platform.OS=='ios'?windowHeight * 0.74: windowHeight * 0.8,
            // backgroundColor:'red'
          }}>
          <FlatList
            data={data}
            ListFooterComponent={loadingView}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={() => getJobs2(1)}
              />
            }
            keyExtractor={(item, index) => index}
            contentContainerStyle={{paddingBottom: windowHeight * 0.2}}
            renderItem={({item}) => {
              return <RewardItem item={item} />;
            }}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.7}
          />
        </View>
        {/* <ScrollView style={{width: '100%', height: '80%'}}>
            <View>
              {redeem.map(item => {
                return <RewardItem key={uuid.v4()} item={item} />;
              })}
            </View>
          </ScrollView> */}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: windowHeight * 0.1,
    justifyContent: 'center',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    // backgroundColor:'orange',

    alignItems: 'center',
  },
  topText: {
    fontSize: size.Xlarge(),
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 5,
  },
});

export default BulletinFirstScreen;
