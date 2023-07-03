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
} from 'react-native';
import React from 'react';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
// import ButtonGradient from '../../';
import Button from './bulletinComponents/Button';
import uuid from 'react-native-uuid';
import {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';
import AppContext from '../../components/AppContext';
import {useContext} from 'react';
import axios from 'axios';
import {ActivityIndicator} from 'react-native';
import jwtDecode from 'jwt-decode';

const windowHeight = Dimensions.get('window').height;
const WindowWidth = Dimensions.get('window').width;
const BulletinFirstScreen = ({navigation}) => {
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


const applyforJob=async(setapplied, jobID)=>{
  console.log('applItem', jobID.id)
  try{
    const urlToHit = 'https://api.kachaak.com.sg/api/jobs/apply';
      const token = userToken;
      const userID=getuserID(userToken)
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

      const response = await axios.post(urlToHit, body, config);
      console.log('response', response.data);
      setapplied(true)
      // setloading(false);
      // Alert.alert('Successful')
      // props.navigation.goBack();
  }catch(error){
    console.log('error:', error.response.data)
    if(error.response.data.error=='Job already applied')
    {
      Alert.alert(error.response.data.error)
    }
  }
}
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
      const response = await axios.get(urlToHit, config);
      const responseData = response.data;
      const newData = responseData.data;
      console.log('newData', newData);
      setData(prevData => [...prevData, ...newData]);
      setHasNextPage(responseData.pagination.hasNextPage);
      setloading(false);
    } catch (e) {
      console.log('e', e);
    }
  };

  useEffect(() => {
    // fetchData(currentPage);
    getJobs(currentPage);
    console.log('userToken', userToken);
  }, []);

  const handleEndReached = () => {
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
  const redeem = [
    {
      headiing: 'Usher at Singapure Farmula One 2024',
      info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, nam neque sed deleniti numquam minus! Commodi dicta enim accusantium omnis repellendus doloremque ad nulla voluptate,!',
    },
    {
      headiing: 'Usher at Singapure Farmula One 2024',
      info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, nam neque sed deleniti numquam minus! Commodi dicta enim accusantium omnis repellendus doloremque ad nulla voluptate,!',
    },
    {
      headiing: 'Usher at Singapure Farmula One 2024',
      info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, nam neque sed deleniti numquam minus! Commodi dicta enim accusantium omnis repellendus doloremque ad nulla voluptate,!',
    },
    {
      headiing: 'Usher at Singapure Farmula One 2024',
      info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, nam neque sed deleniti numquam minus! Commodi dicta enim accusantium omnis repellendus doloremque ad nulla voluptate,!',
    },
    {
      headiing: 'Usher at Singapure Farmula One 2024',
      info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, nam neque sed deleniti numquam minus! Commodi dicta enim accusantium omnis repellendus doloremque ad nulla voluptate,!',
    },
  ];

  const RewardItem = ({item}) => {
const [applied, setapplied] = useState(item?.isApplied==true?true:false)
    return (
      <View style={{padding: 10, borderTopWidth: 1, borderTopColor: 'white'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width: '70%'}}>
            <Text style={{fontWeight: 'bold', fontSize: 14, color: '#00BBB4'}}>
              {item.title}
            </Text>
            <Text style={{fontSize: 12, color: 'white'}}>
              Job Status: {item.jobStatus}
            </Text>

            <Text style={{fontSize: 12, color: 'white'}}>
              {item.description}
            </Text>
          </View>
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
              width: WindowWidth * 0.25,
              height: windowHeight*0.05,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor:applied==true?'#525461' : '#00BBB4',
              //  : '#525461',
              borderRadius: 5,
              marginHorizontal: WindowWidth * 0.01,
            }}>
            <TouchableOpacity
            onPress={() => applied==true?null:applyforJob(setapplied, item)}
            >
              <Text style={{fontSize: 18, color: '#ffffff'}}>{applied==true?'Applied':'Apply'}</Text>
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
      <View style={{gap: 2}}>
        <View style={{paddingTop: 4, paddingLeft: 6}}></View>
        <View style={styles.container}>
          <Text style={[styles.topText, {marginTop: 35}]}>
            Earn more{' '}
            <Text style={[styles.topText, {color: '#00BBB4'}]}>CHAAK$</Text>
          </Text>
          <Text style={[styles.topText, {fontSize: 26}]}>
            with these job opportunities
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            height: windowHeight * 0.65,
          }}>
          {loading == true ? (
            <View
              style={{
                height: '100%',
                width: '100%',
                // backgroundColor: 'red',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator
                size={100}
                color={'#00BBB4'}
                // color={'orange'}
                // style={{backgroundColor: 'red'}}
              />
            </View>
          ) : (
            <FlatList
              data={data}
              keyExtractor={(item, index) => index}
              contentContainerStyle={{paddingBottom: windowHeight * 0.2}}
              renderItem={({item}) => {
                return <RewardItem item={item} />;
              }}
              onEndReached={handleEndReached}
              onEndReachedThreshold={0.7}
            />
          )}
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
    height: windowHeight * 0.3,
    justifyContent: 'center',
    // backgroundColor:'orange',

    alignItems: 'center',
  },
  topText: {
    fontSize: 38,
    color: 'white',
  },
});

export default BulletinFirstScreen;
