import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Dimensions} from 'react-native';
import {Image} from 'react-native-elements';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import {useState} from 'react';
import {TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {Linking} from 'react-native';
import {KeyboardAvoidingView} from 'react-native';
import * as size from '../components/FontSize';
export default function ContactUs() {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [phone, setphone] = useState('');
  const [categories, setcategories] = useState('');
  const [message, setmessage] = useState('');

  const handleSubmit = async () => {
    const email = 'info@kachaak.com.sg';
    const subject = categories;
    var messageBody = message + '\n';
    messageBody =
      name != null && name != ''
        ? messageBody + '\n' + 'Name: ' + name
        : messageBody;
    messageBody =
      phone != null && phone != ''
        ? messageBody + '\n' + 'Contact number: ' + phone
        : messageBody;
    const body = messageBody;
    console.log('subject', subject)
    console.log('body', body)
    const emailUrl = `mailto:${email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    try {
      const res = await Linking.openURL(emailUrl);
      // console.log('res', res.data);
    } catch (error) {
      console.log('error1234', error);
    }

    // await Linking.canOpenURL(emailUrl)
    //     .then(supported => {
    //       if (!supported) {
    //         console.error("Can't handle the URL: " + emailUrl);
    //       } else {
    //         return Linking.openURL(emailUrl);
    //       }
    //     })
    //     .catch(err => console.error('An error occurred: ', err));
  };
  const [nameC, setnameC] = useState('white');
  const [emailC, setemailC] = useState('white');
  const [phoneC, setphoneC] = useState('white');
  const [subjectC, setsubjectC] = useState('white');
  const [focused, setfocused] = useState('')

  return (
    <LinearGradient
      start={{x: 1, y: 1}}
      end={{x: 0.5, y: 0}}
      colors={['#1B1D2A', '#222431', '#343643', '#525461', '#595B68']}
      style={{
        alignItems: 'center',
        // justifyContent: 'center',
        height: windowHeight,
        width: windowWidth,
      }}>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={0}>
        <View style={{width: windowWidth, alignItems: 'center'}}>
          <Image
            style={{width: windowWidth * 0.2, height: windowHeight * 0.25}}
            source={require('../assets/ContactUSS.png')}
            resizeMode="contain"
          />
          <Text style={{color: 'white', fontSize: size.large()}}>
            Contact Us
          </Text>
          <TextInput
            placeholderTextColor={nameC}
            placeholder="Name"
            style={{...styles.input1, color: nameC, borderBottomColor: nameC}}
            value={name}
            onChangeText={setname}
            onFocus={()=>setnameC('#00BBB4')}
            onBlur={()=>setnameC('white')}
          />
          <TextInput
            placeholderTextColor={emailC}
            placeholder="Email"
            style={{...styles.input1, color: emailC, borderBottomColor: emailC}}
            value={email}
            onChangeText={setemail}
            onFocus={()=>setemailC('#00BBB4')}
            onBlur={()=>setemailC('white')}
          />
          <TextInput
            placeholderTextColor={phoneC}
            placeholder="Phone"
            style={{...styles.input1, color: phoneC, borderBottomColor: phoneC}}
            value={phone}
            onChangeText={setphone}
            keyboardType="number-pad"
            onFocus={()=>setphoneC('#00BBB4')}
            onBlur={()=>setphoneC('white')}
          />
          <TextInput
            placeholderTextColor={subjectC}
            placeholder="Subject"
            style={{...styles.input1, color: subjectC, borderBottomColor: subjectC}}
            value={categories}
            onChangeText={setcategories}
            onFocus={()=>setsubjectC('#00BBB4')}
            onBlur={()=>setsubjectC('white')}
          />
          <TextInput
            placeholderTextColor={'gray'}
            placeholder="Message"
            style={styles.input2}
            value={message}
            multiline
            onChangeText={setmessage}
          />
          <TouchableOpacity onPress={() => handleSubmit()}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                // height: windowHeight * 0.1,
                paddingHorizontal: 20,
                paddingVertical: 10,
                // width: windowWidth * 0.3,
                backgroundColor: '#00BBB4',
                borderRadius: 5,
                marginTop: 10,
              }}>
              <Text style={{color: 'white', fontSize: size.medium()}}>
                Submit
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  input1: {
    fontSize: size.small(),
    width: windowWidth * 0.9,
    alignSelf: 'center',
    height: windowHeight * 0.07,
    // backgroundColor: 'white',
    marginVertical: 4,
    borderBottomWidth: 1,
  },
  input2: {
    color: 'black',
    fontSize: size.small(),
    width: windowWidth * 0.9,
    alignSelf: 'center',
    height: windowHeight * 0.1,
    backgroundColor: 'white',
    marginVertical: 4,
    borderRadius: 5,
  },
});
