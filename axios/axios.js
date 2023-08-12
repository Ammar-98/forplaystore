import jwtDecode from 'jwt-decode';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getUserID = async Token => {
  try {
    if (Token != null) {
      const decodedToken = await jwtDecode(Token);
      return decodedToken.id;
    } else {
      return null;
    }
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

export async function axiosGet(url) {

    const Token = await getUserToken();
    // console.log('TokenAxxxxxxxxxxxxxxxxx', Token);
    // console.log('xxxxxxxxxxurl', url);
    // const token = userToken;
    const urlToHit = url;
    const config = {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    };
    const response = await axios.get(urlToHit, config);
    // console.log('response.Axios', response.data);
    return response;
 
}

export async function axiosPostAuth(url, bodyPassed, configuration) {

    console.log('url,bodypassed,configureation', url);
    console.log('url,bodypassed,configureation', bodyPassed);

    console.log('bodyPased', bodyPassed);
    const urlToHit = url;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = bodyPassed;

    const response = await axios.post(urlToHit, body, config);
    // console.log('responsePostAxios', response.data);
    return response;
 
}

export async function axiosPost(url, bodyPassed, configuration) {
 
    // console.log('url,bodypassed,configureation', url);
    // console.log('url,bodypassed,configureation', bodyPassed);
    const Token = await getUserToken();

    const config = {
      headers: {
        Authorization: `Bearer ${Token}`,
        'Content-Type': 'application/json',
      },
    };
    // console.log('bodyPased', bodyPassed);
    const urlToHit = url;
    const body = bodyPassed;

    const response = await axios.post(urlToHit, body, config);
    // console.log('responsePostAxios', response.data);
    return response;
 
}
