import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Keyboard,
  FlatList,
  Platform,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {countries} from 'countries-list';
import {TouchableWithoutFeedback} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Profile from './profile/Profile';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import {axiosGet} from '../axios/axios';
import {launchImageLibrary} from 'react-native-image-picker';
import {add} from 'react-native-reanimated';
import {useRef} from 'react';
import * as size from '../components/FontSize';
import {useDispatch} from 'react-redux';
import {authSlice} from '../store/authSlice';
import {useSelector} from 'react-redux';
import { useToast } from 'react-native-toast-notifications';
// import { errortoast,messagetoast } from '../Toast';
import { messagetoast,errortoast } from '../Toast';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function EditProfile() {
  const dispatch = useDispatch();
  const actions = authSlice.actions;


  const  toast= useToast()
  const showMessage = message => {
    toast.show(message, messagetoast(message));
  };
  const showError = message => {
    toast.show(message, errortoast(message));
  };


  useFocusEffect(
    React.useCallback(() => {
      // This function will be called when the screen comes into focus

      // You can perform any logic or fetch data here

      dispatch(actions.setAtHome(true));
      console.log('falseAthome');
      // Returning a cleanup function
      return () => {
        dispatch(actions.setAtHome(false));
        // console.log('falseAthome');
        // This function will be called when the screen loses focus
        // You can perform any cleanup logic here
      };
    }, []),
  );
  const scrollViewRef = useRef(null);
  const scrollViewRef2 = useRef(null);
  const flatlistref = useRef(null);
  const handleScrollUp = () => {
    const scrollAmount = windowHeight * 0.37;

    // Scroll the ScrollView up
    scrollViewRef.current?.scrollTo({y: scrollAmount, animated: true});
  };
  const handleScrollUp2 = index => {
    if (index > 25) {
      const scrollAmount = index * windowHeight * 0.1;

      // Scroll the ScrollView up
      scrollViewRef2.current?.scrollTo({y: scrollAmount, animated: true});
    }
  };

  const [Keybool, setKeybool] = useState(false);
  const [foodItems, setfoodItems] = useState([]);
  const [Food, setFood] = useState('');
  const [Name, setName] = useState('');
  const [UserName, setUserName] = useState('');
  const [profileImage, setprofileImage] = useState(null);
  const [Age, setAge] = useState(null);
  const [Gender, setGender] = useState('');
  const [Industry, setIndustry] = useState(null);
  const [Location, setLocation] = useState('');
  const [Residence, setResidence] = useState('');
  const [Address, setAddress] = useState(null);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [AgeText, setAgeText] = useState('Age');
  const [genderText, setgenderText] = useState('Gender');
  const [IndustryText, setIndustryText] = useState('Industry');
  const [locationText, setlocationText] = useState('Location');
  const [ResidenceText, setResidenceText] = useState('Region');

  const [Foodtext, setFoodtext] = useState('Enter Food Name');

  const foodArray = [
    'Western',
    'Asian',
    'Local',
    'Cafes',
    'Deserts',
    'Bars',
    'Buffets',
  ];
  const MalaysianRegion = [
    {name: 'East Malaysia', regions: ['Sabah', 'Sarawak']},
    {name: 'North', regions: ['Perlish', 'Kedah', 'Penang', 'Perak']},
    {
      name: 'South',
      regions: ['Selangor', 'Negeri Sembilan', 'Melaka', 'Johor'],
    },
    {name: 'East Coast', regions: ['Kelantan', 'Terengganu', 'Pahang']},
    {
      name: 'Federal Territories',
      regions: ['Kuala Lumpur', 'Labuan', 'Putrajaya'],
    },
  ];

  const [yearob, setyearob] = useState('');
  const [monthob, setmonthob] = useState('');

  const [yearobText, setyearobText] = useState('Year of birth');
  const [monthobText, setmonthobText] = useState('Month of birth');

  const [profileExists, setprofileExists] = useState(false);
  const [loading, setloading] = useState(true);
  const [uploading, setuploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [showFoodList, setshowFoodList] = useState(false);

  const currentYear = new Date().getFullYear();
  const past50Years = Array.from(
    {length: 50},
    (_, index) => currentYear - index,
  );
  const [loclistIndex, setloclistIndex] = useState(0);
  const [selectedLocation, setselectedLocation] = useState('Singapore');

  const getCountriesAlphabetical = () => {
    const countryNames = Object.values(countries).map(country => country.name);
    return countryNames.sort();
  };

  const countryNamesInAlphabeticalOrder = getCountriesAlphabetical();

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const foodList = [
    'Pizza',
    'Burger',
    'Pasta',
    'Sushi',
    'Tacos',
    'Steak',
    'Salad',
    'Ice Cream',
    'Fried Chicken',
    'Chocolate Cake',
    'Noodles',
    'Cheese Sandwich',
    'Shrimp Tempura',
    'Ramen',
    'Mango Smoothie',
  ];
  const Dropdown6 = props => {
    const [dropView2, setdropView2] = useState(false);
    return (
      <View style={{width: '95%', alignSelf: 'center'}} key={props.index}>
        <TouchableOpacity
        // onPress={() => handleOnpress(number)}
        >
          <View
            style={{
              width: '100%',
              backgroundColor: 'black',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 2,
            }}>
            <Text
              style={{
                backgroundColor: 'black',
                marginTop: 3,
                paddingLeft: 5,
                padding: 5,
                color: 'white',
                textShadowColor: 'gray',
                textShadowOffset: {width: 0, height: 0},
                textShadowRadius: 5,
              }}>
              {props.number.name}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setdropView2(!dropView2);
                handleScrollUp2(props.index);
              }}>
              <View
                style={{
                  height: windowHeight * 0.05,
                  width: windowWidth * 0.1,
                  // backgroundColor: 'red',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {/* <Image
                source={require('../assets/Vector.png')}
                style={{width: 10, height: '100%'}}
                resizeMode="contain"
              /> */}
                <MaterialIcons
                  name={
                    dropView2 == false ? 'arrow-drop-down' : 'arrow-drop-up'
                  }
                  size={23}
                  color="white"
                />
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        {dropView2 == true ? (
          <View style={{width: '100%', backgroundColor: 'white'}}>
            {props.number.regions.map((number, index) => (
              <TouchableOpacity
                onPress={() => {
                  console.log('addToRegion,andsetRegiontext', number);
                  setResidence(number);
                  setResidenceText(number);
                  setselectHDB(props.res);
                }}
                style={{width: '100%'}}>
                <View
                  style={{
                    width: '100%',
                    borderBottomColor: 'gray',
                    borderBottomWidth: 1,
                    marginHorizontal: 3,
                    paddingVertical: 3,
                  }}>
                  <Text style={{color: 'black', fontSize: size.small()}}>
                    {number}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : null}
      </View>
    );
  };

  const handleSearch = text => {
    const filteredItems = foodList.filter(item =>
      item.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredFoods(filteredItems);
    if (text == '') {
      setFilteredFoods([]);
    }
    setSearchTerm(text);
  };

  const DwellingHDB = [
    'North',
    'Sembawang',
    'Woodlands',
    'Yishun',
    'North-East',
    'Ang Mo Kio',
    'Hougang',
    'Punggol',
    'Sengkang',
    'Serangoon',
    'East',
    'Bedok',
    'Pasir Ris',
    'Tampines',
    'West',
    'Bukit Batok',
    'Bukit Panjang',
    'Choa Chu Kang',
    'Clementi',
    'Jurong East',
    'Jurong West',
    'Tengah',
    'Central',
    'Bishan',
    'Bukit Merah',
    'Bukit Timah',
    'Central Area',
    'Geylang',
    'Kallang/ Whampoa',
    'Marine Parade',
    'Queenstown',
    'Toa Payoh',
  ];
  const DwellingPrivate = [
    'Admiralty Drive',
    'Admiralty Road',
    'Alexandra',
    'Amber Road',
    'Ang Mo Kio',
    'Anson',
    'Ardmore',
    'Bayshore',
    'Beach Road',
    'Beach Road (part)',
    'Bencoolen Road',
    'Bishan',
    'Boat Quay',
    'Bouna Vista',
    'Braddell',
    'Braddell , Macpherson',
    'Bukit Batok',
    'Bukit Panjang',
    'Bukit Timah',
    'Cairnhill',
    'Cecil',
    'Central Area',
    'Chai Chee',
    'Chancery',
    'Changi',
    'Choa Chu Kang',
    'Chinatown',
    'City Hall',
    'Clementi',
    'Clementi Park',
    'Dairy Farm',
    'Dover',
    'Dunearn Road',
    'East',
    'East Coast',
    'Eastwood',
    'Eunos',
    'Farrer Park',
    'Flora',
    'Geylang',
    'Golden Mile',
    'Grange Road',
    'Harbourfront',
    'Havelock Road',
    'High Street',
    'Hillview',
    'Holland Road',
    'Hong Leong Garden',
    'Hougang',
    'Hume Avenue',
    'Joo Chiat',
    'Jurong',
    'Jurong East',
    'Jurong West',
    'Kallang/ Whampoa',
    'Katong',
    'Keppel',
    'Kembangan',
    'Killiney',
    'Kranji',
    'Lim Chu Kang',
    'Little India',
    'Loyang',
    'Macpherson',
    'Marina',
    'Marine Parade',
    'Meyer',
    'Middle Road',
    'Moulmein',
    'Newton',
    'North',
    'North-East',
    'Novena',
    'Orchard',
    'Orchard Boulevard',
    'Pasir Panjang',
    'Pasir Ris',
    'Paya Lebar',
    'People’s Park',
    'Ponggol',
    'Potong Pasir',
    'Punggol',
    'Queenstown',
    'Raffles Place',
    'Redhill',
    'River Valley',
    'Rocher',
    'Seletar',
    'Sembawang',
    'Sengkang',
    'Sentosa',
    'Serangoon',
    'Serangoon Garden',
    'Serangoon Road',
    'Shenton Way',
    'Simei',
    'Sims',
    'Springleaf',
    'Sungei Gedong',
    'Suntec City',
    'Tagore',
    'Tampines',
    'Tanjong Pagar',
    'Tanjong Rhu',
    'Telok Blangah',
    'Tengah',
    'Thomson',
    'Tiong Bahru',
    'Toa Payoh',
    'Tuas',
    'Upper Bukit Timah',
    'Upper East Coast',
    'Upper Thomson',
    'Ulu Pandan',
    'Watten Estate',
    'West',
    'West Coast',
    'Woodgrove',
    'Woodlands',
    'Yio Chu Kang',
    'Yishun',
  ];

  const numbersArray = [
    // 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
    39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
    //  51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66,
    // 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85,
    // 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100,
  ];
  const LocationArray = ['Singapore', 'Malaysia'];
  const genders = ['Male', 'Female'];
  const IndustryArray = [
    'Admin & HR',
    'Advertising and Marketing',
    'Banking and Finance',
    'Computer and technology',
    'Construction',
    'Education',
    'Entertainment',
    'F&B(Food and Beverage)',
    'Government Services',
    'HealthCare',
    'Hospitality',
    'Insurance',
    'Manufacturing',
    'Media and News',
    'Pharmaceuticals',
    'Real Estate',
    'Retail',
    'Social Media and Creative',
    'Telecommunication',
    'Transport',
  ];

  function extractFilenameFromPath(path) {
    const lastIndex = path.lastIndexOf('/');
    if (lastIndex !== -1 && lastIndex < path.length - 1) {
      return path.substring(lastIndex + 1);
    }
    return null; // return null if no filename found
  }

  const UploadImage = async imgUri => {
    try {
      setuploading(true);

      const token = await getUserToken();
      console.log('inHHHHHHH', imgUri);
      const name = extractFilenameFromPath(imgUri);
      const urltoHit = 'https://api.kachaak.com.sg/api/uploads/profileimage';
      const formData = new FormData();
      formData.append('profileimage', {
        uri: imgUri,
        type: 'image/jpeg',
        name: name,
      });
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      };
      const response = await axios.post(urltoHit, formData, config);
      console.log('uploadImg', response?.data?.data);
      setprofileImage(response?.data?.data);
      // handlSubmit();
      setuploading(false);
    } catch (error) {
      console.log('error', error.response.data);
      setuploading(false);

      showError('Error uploading profile pic');
    }
  };

  const OpenGallery = async () => {
    try {
      if (Name !== '' && UserName !== '') {
        const pic = await launchImageLibrary((mediaType = 'photo'));
        console.log('pic', pic.assets[0].uri);
        // setprofileImage(pic?.assets[0]?.uri);
        UploadImage(pic?.assets[0]?.uri);
      } else {
        showError('Name field  cannot be empty');
      }
    } catch (e) {
      console.log('e', e);
    }
  };

  const ProfileImageContainer = () => {
    return (
      <View
        style={{
          ...styles.ProfileImageContainer,
          height: windowHeight * 0.27,
          justifyContent: 'center',
        }}>
        <TouchableOpacity onPress={() => OpenGallery()}>
          {profileExists == true || profileImage != null ? (
            <View>
              {/* <Text>{profileImage}</Text> */}

              <Image
                source={{
                  uri:
                    profileImage == null
                      ? 'https://e7.pngegg.com/pngimages/753/432/png-clipart-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service-thumbnail.png'
                      : profileImage,
                }}
                resizeMode="cover"
                style={{
                  height: windowHeight * 0.15,
                  width: windowHeight * 0.15,
                  borderRadius: (windowHeight * 0.15) / 2,
                  marginTop: windowHeight * 0.01,
                  borderWidth: 1,
                  borderColor: 'white',
                }}
              />
              <View
                style={{
                  width: '100%',
                  // backgroundColor: 'red',
                  position: 'absolute',
                  height: windowWidth * 0.29,
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                }}>
                <View
                  style={{
                    backgroundColor: '#00BBB4',
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: size.medium(),
                      textShadowColor: 'gray',
                      textShadowOffset: {width: 0, height: 0},
                      textShadowRadius: 5,
                    }}>
                    +
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <View
              style={{
                height: windowHeight * 0.15,
                width: windowHeight * 0.15,
                borderRadius: (windowHeight * 0.15) / 2,
                marginTop: windowHeight * 0.01,
                borderWidth: 1,
                borderColor: '#00BBB4',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: size.Xsmall(),
                  textAlign: 'center',
                  textShadowColor: 'gray',
                  textShadowOffset: {width: 0, height: 0},
                  textShadowRadius: 5,
                }}>
                {' '}
                Tap to add profile picture
              </Text>
            </View>
          )}
        </TouchableOpacity>
        <View
          style={{
            // backgroundColor: 'blue',
            // height: windowHeight * 0.1,
            width: windowWidth,
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: 5,
            borderBottomColor: 'rgba(0,0,0,0.1)',
            borderBottomWidth: 1,
          }}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontSize: size.small(),
              textShadowColor: 'gray',
              textShadowOffset: {width: 0, height: 0},
              textShadowRadius: 5,
            }}>
            Help us get to know you.{`\n`} For each field you fill in, earn 10{' '}
            {
              <Text
                style={{
                  color: '#00BBB4',
                  textShadowColor: 'gray',
                  textShadowOffset: {width: 0, height: 0},
                  textShadowRadius: 5,
                }}>
                CHAAK
                {<FontAwesome name={'dollar'} size={15} color={'#00BBB4'} />}
              </Text>
            }
            {`\n`}
            {'(bonus 30 '}
            {
              <Text
                style={{
                  color: '#00BBB4',
                  textShadowColor: 'gray',
                  textShadowOffset: {width: 0, height: 0},
                  textShadowRadius: 5,
                }}>
                CHAAK
                {<FontAwesome name={'dollar'} size={15} color={'#00BBB4'} />}
              </Text>
            }{' '}
            {'for uploading your profile picture.)'}
          </Text>
        </View>
      </View>
    );
  };

  const region = [
    {name: 'EAST', regions: ['Bedok', 'Pasir Ris', 'Tampines']},
    {
      name: 'WEST',
      regions: [
        'Bukit Batok',
        'Bukit Panjang',
        'Chao Chu Kang',
        'Clementi',
        'Jurong East',
        'Jusrong West',
        'Tengah',
      ],
    },
    {name: 'NORTH', regions: ['Sembawang', 'Woodlands', 'Yishun']},
    // {name:'SOUTH',regions:[]},
    {
      name: 'CENTRAL',
      regions: [
        'Bishan',
        'Bukit Merah',
        'Bukit Temah',
        'Geylang',
        'Kallang/Whampoa',
        'Marine Parade',
        'Queenstown',
        'Tao Payoh',
      ],
    },
    {
      name: 'NORTH-EAST',
      regions: ['Ang Mo Kio', 'Hougang', 'Punggol', 'SengKang', 'Serangoon'],
    },
    // {name:'NORHTWEST',regions:[]},
  ];
  const District = [
    {
      name: 'District:1',
      regions: [
        'Boat Quay',
        'Cecil',
        'Havelock Road',
        'Marina',
        'People’s Park',
        'Raffles Place',
        'Suntec City',
      ],
    },
    {
      name: 'District:2',
      regions: ['Anson', 'Chinatown', 'Shenton Way', 'Tanjong Pagar'],
    },
    {
      name: 'District:3',
      regions: ['Alexandra', 'Queenstown', 'Redhill', 'Tiong Bahru'],
    },
    {
      name: 'District:4',
      regions: ['Harbourfront', 'Keppel', 'Sentosa', 'Telok Blangah'],
    },
    {
      name: 'District:5',
      regions: [
        'Buona Vista',
        'Clementi',
        'Dover',
        'Hong Leong Garden',
        'Pasir Panjang',
        'West Coast',
      ],
    },
    {
      name: 'District:6',
      regions: [
        'Beach Road (part)',
        'City Hall',
        'High Street',
        'North Bridge Road',
      ],
    },
    {
      name: 'District:7',
      regions: [
        'Beach Road',
        'Bencoolen Road',
        'Bugis',
        'Golden Mile',
        'Middle Road',
        'Rocher',
      ],
    },
    {
      name: 'District:8',
      regions: ['Farrer Park', 'Little India', 'Serangoon Road'],
    },
    {
      name: 'District:9',
      regions: ['Cairnhill', 'Killiney', 'Orchard', 'River Valley'],
    },
    {
      name: 'District:10',
      regions: [
        'Ardmore',
        'Balmoral',
        'Bukit Timah',
        'Grange Road',
        'Holland Road',
        'Orchard Boulevard',
        'Tanglin',
      ],
    },
    {
      name: 'District:11',
      regions: [
        'Chancery',
        'Dunearn Road',
        'Moulmein',
        'Newton',
        'Novena',
        'Thomson',
        'Watten Estate',
      ],
    },
    {
      name: 'District:12',
      regions: ['Balestier', 'Toa Payoh'],
    },
    {
      name: 'District:13',
      regions: ['Braddell', 'Macpherson', 'Potong Pasir'],
    },
    {
      name: 'District:14',
      regions: ['Eunos', 'Geylang', 'Kembangan', 'Paya Lebar', 'Sims'],
    },
    {
      name: 'District:15',
      regions: [
        'Amber Road',
        'East Coast',
        'Joo Chiat',
        'Katong',
        'Marine Parade',
        'Meyer',
        'Tanjong Rhu',
      ],
    },
    {
      name: 'District:16',
      regions: [
        'Bayshore',
        'Bedok',
        'Chai Chee',
        'Eastwood',
        'Kew Drive',
        'Upper East Coast',
      ],
    },
    {
      name: 'District:17',
      regions: ['Changi', 'Flora', 'Loyang'],
    },
    {
      name: 'District:18',
      regions: ['Pasir Ris', 'Simei', 'Tampines'],
    },
    {
      name: 'District:19',
      regions: ['Hougang', 'Ponggol', 'Sengkang', 'Serangoon Garden'],
    },
    {
      name: 'District:20',
      regions: ['Ang Mo Kio', 'Bishan', 'Braddell', 'Thomson'],
    },
    {
      name: 'District:21',
      regions: [
        'Clementi Park',
        'Hume Avenue',
        'Ulu Pandan',
        'Upper Bukit Timah',
      ],
    },
    {
      name: 'District:22',
      regions: ['Boon Lay', 'Jurong', 'Tuas'],
    },
    {
      name: 'District:23',
      regions: [
        'Bukit Batok',
        'Bukit Panjang',
        'Choa Chu Kang',
        'Dairy Farm',
        'Hillview',
      ],
    },
    {
      name: 'District:24',
      regions: ['Lim Chu Kang', 'Sungei Gedong', 'Tengah'],
    },
    {
      name: 'District:25',
      regions: ['Admiralty Road', 'Kranji', 'Woodgrove', 'Woodlands'],
    },
    {
      name: 'District:26',
      regions: ['Springleaf', 'Tagore', 'Upper Thomson'],
    },
    {
      name: 'District:27',
      regions: ['Admiralty Drive', 'Sembawang', 'Yishun'],
    },
    {
      name: 'District:28',
      regions: ['Seletar', 'Yio Chu Kang'],
    },
  ];
  const [selectHDB, setselectHDB] = useState(true);

  const DropdownView5 = props => {
    const [dropView, setdropView] = useState(false);
    const [selectedHDB, setselectedHDB] = useState(true);

    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            setdropView(!dropView);
            handleScrollUp();
          }}>
          <View style={styles.dropdownView}>
            <View style={{justifyContent: 'center', height: '100%'}}>
              <Text
                style={{
                  color: 'white',
                  textShadowColor: 'gray',
                  textShadowOffset: {width: 0, height: 0},
                  textShadowRadius: 5,
                }}>
                {props.text}
              </Text>
            </View>
            <View
              style={{
                height: windowHeight * 0.05,
                width: windowWidth * 0.1,
                // backgroundColor: 'red',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {/* <Image
                source={require('../assets/Vector.png')}
                style={{width: 10, height: '100%'}}
                resizeMode="contain"
              /> */}
              <MaterialIcons
                name={dropView == false ? 'arrow-drop-down' : 'arrow-drop-up'}
                size={23}
                color="white"
              />
            </View>
          </View>
        </TouchableOpacity>

        {dropView == true ? (
          selectedLocation == 'Singapore' ? (
            <View
              style={{
                width: windowWidth * 0.9,
                // backgroundColor: 'red',
                // height: windowHeight * 0.1,
              }}>
              <View
                style={{
                  width: windowWidth * 0.9,
                  // backgroundColor: 'orange',
                  height: windowHeight * 0.07,
                  // backgroundColor:'yellow',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setselectedHDB(true);
                    // props.setres(true)
                    // setselectHDB(true)
                  }}>
                  <View
                    style={{
                      width: windowWidth * 0.4,
                      borderRadius: 5,

                      alignItems: 'center',
                      borderBottomColor:
                        selectedHDB == true ? '#00BBB4' : 'white',
                      borderBottomWidth: 1,
                      justifyContent: 'center',
                      borderRightColor:
                        selectedHDB == true ? '#00BBB4' : 'black',
                      borderRightWidth: selectedHDB == true ? 1 : 0,
                    }}>
                    <Text
                      style={{
                        color: selectedHDB == true ? '#00BBB4' : 'white',
                        fontSize: size.medium(),
                        fontWeight: 'bold',
                        textShadowColor: 'gray',
                        textShadowOffset: {width: 0, height: 0},
                        textShadowRadius: 5,
                      }}>
                      HDB
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setselectedHDB(false);
                    // props.setres(false)
                    // setselectHDB(false)
                  }}>
                  <View
                    style={{
                      width: windowWidth * 0.4,
                      borderRadius: 5,

                      alignItems: 'center',
                      borderBottomColor:
                        selectedHDB == false ? '#00BBB4' : 'white',
                      borderBottomWidth: 1,
                      justifyContent: 'center',
                      borderLeftColor:
                        selectedHDB == false ? '#00BBB4' : 'white',
                      borderLeftWidth: selectedHDB == false ? 1 : 0,
                    }}>
                    <Text
                      style={{
                        color: selectedHDB == false ? '#00BBB4' : 'white',
                        fontSize: size.medium(),
                        fontWeight: 'bold',
                        textShadowColor: 'gray',
                        textShadowOffset: {width: 0, height: 0},
                        textShadowRadius: 5,
                      }}>
                      Private
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              {selectedHDB == true ? (
                region.map((number, index) => (
                  <Dropdown6 number={number} index={index} res={selectedHDB} />
                ))
              ) : (
                <View style={{maxHeight: windowHeight * 0.3}}>
                  <ScrollView nestedScrollEnabled ref={scrollViewRef2}>
                    {District.map((number, index) => (
                      <Dropdown6
                        number={number}
                        index={index}
                        res={selectedHDB}
                      />
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>
          ) : (
            <View>
              <Text>MalaysianViewHere</Text>
            </View>
          )
        ) : null}
      </View>
    );
  };
  const DropdownView7 = props => {
    const [dropView, setdropView] = useState(false);
    const [selectedHDB, setselectedHDB] = useState(true);

    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            setdropView(!dropView);
            handleScrollUp();
          }}>
          <View style={styles.dropdownView}>
            <View style={{height: '100%', justifyContent: 'center'}}>
              <Text
                style={{
                  color: 'white',
                  textShadowColor: 'gray',
                  textShadowOffset: {width: 0, height: 0},
                  textShadowRadius: 5,
                }}>
                {props.text}
              </Text>
            </View>
            <View
              style={{
                height: windowHeight * 0.05,
                width: windowWidth * 0.1,
                // backgroundColor: 'red',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {/* <Image
                source={require('../assets/Vector.png')}
                style={{width: 10, height: '100%'}}
                resizeMode="contain"
              /> */}
              <MaterialIcons
                name={dropView == false ? 'arrow-drop-down' : 'arrow-drop-up'}
                size={23}
                color="white"
              />
            </View>
          </View>
        </TouchableOpacity>

        {dropView == true ? (
          <View
            style={{
              width: windowWidth * 0.9,
              // backgroundColor: 'red',
              // height: windowHeight * 0.1,
            }}>
            {/* <View
                style={{
                  width: windowWidth * 0.9,
                  // backgroundColor: 'orange',
                  height: windowHeight * 0.07,
                  // backgroundColor:'yellow',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setselectedHDB(true);
                    // props.setres(true)
                    // setselectHDB(true)
                  }}>
                  <View
                    style={{
                      width: windowWidth * 0.4,
                      borderRadius: 5,

                      alignItems: 'center',
                      borderBottomColor:
                        selectedHDB == true ? '#00BBB4' : 'white',
                      borderBottomWidth: 1,
                      justifyContent: 'center',
                      borderRightColor:
                        selectedHDB == true ? '#00BBB4' : 'black',
                      borderRightWidth: selectedHDB == true ? 1 : 0,
                    }}>
                    <Text
                      style={{
                        color: selectedHDB == true ? '#00BBB4' : 'white',
                        fontSize: size.medium(),
                        fontWeight: 'bold',
                        textShadowColor: 'gray',
                        textShadowOffset: {width: 0, height: 0},
                        textShadowRadius: 5,
                      }}>
                      HDB
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setselectedHDB(false);
                    // props.setres(false)
                    // setselectHDB(false)
                  }}>
                  <View
                    style={{
                      width: windowWidth * 0.4,
                      borderRadius: 5,

                      alignItems: 'center',
                      borderBottomColor:
                        selectedHDB == false ? '#00BBB4' : 'white',
                      borderBottomWidth: 1,
                      justifyContent: 'center',
                      borderLeftColor:
                        selectedHDB == false ? '#00BBB4' : 'white',
                      borderLeftWidth: selectedHDB == false ? 1 : 0,
                    }}>
                    <Text
                      style={{
                        color: selectedHDB == false ? '#00BBB4' : 'white',
                        fontSize: size.medium(),
                        fontWeight: 'bold',
                        textShadowColor: 'gray',
                        textShadowOffset: {width: 0, height: 0},
                        textShadowRadius: 5,
                      }}>
                      Private
                    </Text>
                  </View>
                </TouchableOpacity>
              </View> */}
            {MalaysianRegion.map((number, index) => (
              <Dropdown6 number={number} index={index} res={selectedHDB} />
            ))}
          </View>
        ) : null}
      </View>
    );
  };

  const DropdownView4 = props => {
    const [dropView, setdropView] = useState(false);
    const [fooods, setfooods] = useState(props.Fooditems);

    const handleRemove = itemToRemove => {
      setfooods(prevItems => prevItems.filter(item => item !== itemToRemove));
    };

    const handlePress = item => {
      console.log('item', item);
      const isItemExists = fooods.includes(item);
      if (!isItemExists) {
        setfooods(prevItems => [...prevItems, item]);
      } else {
        // Item already exists, show a message or perform other actions as needed
        console.log('Item already exists:', item);
      }
    };

    return (
      <View>
        <View style={styles.dropdownView}>
          {props.Fooditems.length == 0 ? (
            <View style={{height: '100%', justifyContent: 'center'}}>
              <Text
                style={{
                  color: 'white',
                  textShadowColor: 'gray',
                  textShadowOffset: {width: 0, height: 0},
                  textShadowRadius: 5,
                }}>
                {props.text}
              </Text>
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                height: windowHeight * 0.05,
                // backgroundColor: 'white',
                alignItems: 'center',
                width: windowWidth * 0.75,
                
                borderRadius: 5,
                borderRightWidth:1,
                borderRightColor:'white'

                // marginTop: 10,

                // borderBottomColor:'gray',
                // borderBottomWidth:1,
              }}>
              <ScrollView horizontal nestedScrollEnabled>
                {props.Fooditems.map(item => (
                  // <TouchableOpacity
                  //   key={item}
                  //   onPress={() => {
                  //     console.log('here');
                  //     handleRemove(item);
                  //   }}>
                  <View
                    style={{
                      // backgroundColor: 'orange',
                      borderRadius: 3,
                      marginLeft: 2,
                      borderWidth: 1,
                      borderColor: '#00a29b',
                      paddingHorizontal: 3,
                    }}>
                    <Text
                      style={{
                        fontSize: size.small(),
                        // paddingVertical: 8,
                        color: 'white',
                        textShadowColor: 'rgba(0,0,0,0.2)',
                        textShadowOffset: {width: 0, height: 1},
                        textShadowRadius: 1,
                      }}>
                      {item}
                    </Text>
                  </View>
                  // </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
          <TouchableOpacity
            onPress={() => {
              setdropView(!dropView), handleScrollUp();
              props.setFooditems(fooods);
            }}>
            <View
              style={{
                height: windowHeight * 0.05,
                width: windowWidth * 0.1,
                // backgroundColor: 'red',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {/* <Image
                source={require('../assets/Vector.png')}
                style={{width: 10, height: '100%'}}
                resizeMode="contain"
              /> */}
              <MaterialIcons
                name={dropView == false ? 'arrow-drop-down' : 'arrow-drop-up'}
                size={23}
                color="white"
              />
            </View>
          </TouchableOpacity>
        </View>

        {dropView == true ? (
          <View
            style={{
              width: windowWidth * 0.9,
              height:
                props.value.length > 0 ? windowHeight * 0.3 : windowWidth * 0.1,
              // backgroundColor: 'white',
              borderBottomLeftRadius:10,
                  borderBottomRightRadius:10
            }}>
            <View
              style={{
                width: windowWidth * 0.9,
                maxHeight:
                  props.value.length > 0
                    ? windowHeight * 0.25
                    : windowWidth * 0.1,
              }}>
              <ScrollView
                nestedScrollEnabled
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{width: '100%'}}>
                {props.value.map((number, index) => (
                  <View style={{width: '100%'}} key={index}>
                    <TouchableOpacity
                      onPress={() =>
                        fooods.includes(number)
                          ? handleRemove(number)
                          : handlePress(number)
                      }>
                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          backgroundColor: 'black',
                        }}>
                        <Text
                          style={{
                            backgroundColor: 'black',
                            marginTop: 3,
                            paddingLeft: 5,
                            padding: 5,
                            color: fooods.includes(number)
                              ? '#00BBB4'
                              : 'white',
                            textShadowColor: 'gray',
                            textShadowOffset: {width: 0, height: 0},
                            textShadowRadius: 5,
                          }}>
                          {number}
                        </Text>
                        {fooods.includes(number) ? (
                          <MaterialIcons
                            name="check"
                            style={{
                              marginTop: 3,
                            }}
                            size={15}
                            color={'#00BBB4'}
                          />
                        ) : null}
                      </View>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            </View>

            <TouchableOpacity
              onPress={() => {
                props.setFooditems(fooods);
                setdropView(!dropView);
              }}>
              <View
                style={{
                  backgroundColor: '#00BBB4',
                  height: windowHeight * 0.05,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderBottomLeftRadius:10,
                  borderBottomRightRadius:10
                }}>
                <Text style={{color: 'white',fontWeight:'bold' ,fontSize: size.Xsmall()}}>
                  Update food list
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  };
  const DropdownView3 = props => {
    const [dropView, setdropView] = useState(false);

    const handleOnpress = async number => {
      props.setselected(number);
      props.setText(number);
    };
    return (
      <View>
        <TouchableOpacity onPress={() => setdropView(!dropView)}>
          <View
            style={{
              width: windowWidth * 0.45,

              height: windowHeight * 0.05,
              backgroundColor: '#00BBB4',
              marginTop: 10,
              flexDirection: 'row',
              borderRadius: 5,
              justifyContent: 'space-between',
              paddingLeft: 10,
              borderLeftWidth: 1,
              borderLeftColor: 'black',
            }}>
            <View style={{height: '100%', justifyContent: 'center'}}>
              <Text
                style={{
                  color: 'white',
                  textShadowColor: 'gray',
                  textShadowOffset: {width: 0, height: 0},
                  textShadowRadius: 5,
                }}>
                {props.text}
              </Text>
            </View>
            <View
              style={{
                height: windowHeight * 0.05,
                width: windowWidth * 0.1,
                // backgroundColor: 'red',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {/* <Image
                source={require('../assets/Vector.png')}
                style={{width: 10, height: '100%'}}
                resizeMode="contain"
              /> */}
              <MaterialIcons
                name={dropView == false ? 'arrow-drop-down' : 'arrow-drop-up'}
                size={23}
                color="white"
                
              />
            </View>
          </View>
        </TouchableOpacity>

        {dropView == true ? (
          <View
            style={{
              width: windowWidth * 0.45,
              borderRadius: 5,
// backgroundColor:'red',
borderBottomColor:'gray',
borderBottomWidth:3,
              height:
                props.value.length > 0
                  ? windowHeight * 0.17
                  : windowWidth * 0.1,
            }}>
            <ScrollView
              nestedScrollEnabled
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{width: '100%'}}>
              {props.value.map((number, index) => (
                <View style={{width: '100%'}} key={index}>
                  <TouchableOpacity onPress={() => handleOnpress(number)}>
                    <View style={{width: '100%'}}>
                      <Text
                        style={{
                          backgroundColor:
                            number == props?.selectedVal ? 'white' : 'black',
                            borderRadius:5,
                          marginTop: 3,
                          paddingLeft: 5,
                          padding: 5,
                          textShadowColor: 'gray',
                          textShadowOffset: {width: 0, height: 0},
                          textShadowRadius: 5,
                          color:
                            number == props?.selectedVal ? 'black' : 'white',
                        }}>
                        {number}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        ) : null}
      </View>
    );
  };

  // const DropdownView2 = props => {
  //   const [dropView, setdropView] = useState(false);
  //   const [selectedHDB, setselectedHDB] = useState(true);

  //   const [addressList, setaddressList] = useState(
  //     selectedLocation == 'Singapore' ? DwellingHDB : [],
  //   );

  //   const handleOnpress = async number => {
  //     selectedHDB == false
  //       ? (number = 'Private: ' + String(number))
  //       : (number = 'HDB: ' + String(number));
  //     props.setselected(number);
  //     props.setText(number);
  //   };

  //   return (
  //     <View>
  //       <View style={styles.dropdownView}>
  //         <Text
  //           style={{
  //             color: 'white',
  //             textShadowColor: 'gray',
  //             textShadowOffset: {width: 0, height: 0},
  //             textShadowRadius: 5,
  //           }}>
  //           {props.text}
  //         </Text>
  //         <TouchableOpacity
  //           onPress={() => {
  //             setdropView(!dropView);
  //             handleScrollUp();
  //           }}>
  //           <View
  //             style={{
  //               height: windowHeight * 0.05,
  //               width: windowWidth * 0.1,
  //               // backgroundColor: 'red',
  //               alignItems: 'center',
  //               justifyContent: 'center',
  //             }}>
  //             {/* <Image
  //               source={require('../assets/Vector.png')}
  //               style={{width: 10, height: '100%'}}
  //               resizeMode="contain"
  //             /> */}
  //             <MaterialIcons
  //               name={dropView == false ? 'arrow-drop-down' : 'arrow-drop-up'}
  //               size={23}
  //               color="white"
  //             />
  //           </View>
  //         </TouchableOpacity>
  //       </View>
  //       {dropView == true ? (
  //         <View
  //           style={{
  //             width: windowWidth * 0.9,
  //             borderRadius: 5,

  //             // backgroundColor: 'red',
  //             height:
  //               addressList.length > 0
  //                 ? windowHeight * 0.5
  //                 : windowHeight * 0.1,
  //           }}>
  //           <View
  //             style={{
  //               width: windowWidth * 0.9,
  //               borderRadius: 5,

  //               // backgroundColor: 'orange',
  //               height: 30,
  //               flexDirection: 'row',
  //               justifyContent: 'space-evenly',
  //               alignItems: 'center',
  //             }}>
  //             <TouchableOpacity
  //               onPress={() => {
  //                 setselectedHDB(true);
  //                 // setselectHDB(true)
  //                 setaddressList(
  //                   selectedLocation == 'Singapore' ? DwellingHDB : [],
  //                 );
  //               }}>
  //               <View
  //                 style={{
  //                   width: windowWidth * 0.4,
  //                   alignItems: 'center',
  //                   borderBottomColor:
  //                     selectedHDB == true ? '#00BBB4' : 'white',
  //                   borderBottomWidth: 1,
  //                   justifyContent: 'center',
  //                   borderRightColor: selectedHDB == true ? '#00BBB4' : 'black',
  //                   borderRightWidth: selectedHDB == true ? 1 : 0,
  //                 }}>
  //                 <Text
  //                   style={{
  //                     color: selectedHDB == true ? '#00BBB4' : 'white',
  //                     fontSize: size.small(),
  //                     fontWeight: 'bold',
  //                     textShadowColor: 'gray',
  //                     textShadowOffset: {width: 0, height: 0},
  //                     textShadowRadius: 5,
  //                   }}>
  //                   HDB
  //                 </Text>
  //               </View>
  //             </TouchableOpacity>

  //             <TouchableOpacity
  //               onPress={() => {
  //                 setselectedHDB(false);
  //                 // setselectHDB(false)
  //                 setaddressList(
  //                   selectedLocation == 'Singapore' ? DwellingPrivate : [],
  //                 );
  //               }}>
  //               <View
  //                 style={{
  //                   width: windowWidth * 0.4,
  //                   alignItems: 'center',
  //                   borderBottomColor:
  //                     selectedHDB == false ? '#00BBB4' : 'white',
  //                   borderBottomWidth: 1,
  //                   justifyContent: 'center',
  //                   borderLeftColor: selectedHDB == false ? '#00BBB4' : 'white',
  //                   borderLeftWidth: selectedHDB == false ? 1 : 0,
  //                 }}>
  //                 <Text
  //                   style={{
  //                     color: selectedHDB == false ? '#00BBB4' : 'white',
  //                     fontSize: size.small(),
  //                     fontWeight: 'bold',
  //                     textShadowColor: 'gray',
  //                     textShadowOffset: {width: 0, height: 0},
  //                     textShadowRadius: 5,
  //                   }}>
  //                   Private
  //                 </Text>
  //               </View>
  //             </TouchableOpacity>
  //           </View>
  //           <ScrollView
  //             nestedScrollEnabled
  //             showsVerticalScrollIndicator={false}
  //             contentContainerStyle={{
  //               width: '100%',
  //               backgroundColor: 'white',
  //               height: addressList.length > 0 ? null : windowHeight * 0.1,
  //               paddingBottom: 11,
  //               alignItems: 'center',
  //             }}>
  //             {addressList.length == 0 ? (
  //               <Text
  //                 style={{
  //                   color: 'black',
  //                   textShadowColor: 'gray',
  //                   textShadowOffset: {width: 0, height: 0},
  //                   textShadowRadius: 5,
  //                 }}>
  //                 This list is empty, coming soon.
  //               </Text>
  //             ) : (
  //               addressList.map((number, index) => (
  //                 <View style={{width: '95%'}} key={index}>
  //                   <TouchableOpacity onPress={() => handleOnpress(number)}>
  //                     <View style={{width: '100%'}}>
  //                       <Text
  //                         style={{
  //                           backgroundColor:
  //                             number == props?.selectedVal ? 'white' : 'black',
  //                           marginTop: 3,
  //                           paddingLeft: 5,
  //                           padding: 5,
  //                           color:
  //                             number == props?.selectedVal ? 'black' : 'white',
  //                           textShadowColor: 'gray',
  //                           textShadowOffset: {width: 0, height: 0},
  //                           textShadowRadius: 5,
  //                         }}>
  //                         {number}
  //                       </Text>
  //                     </View>
  //                   </TouchableOpacity>
  //                 </View>
  //               ))
  //             )}
  //           </ScrollView>
  //         </View>
  //       ) : null}
  //     </View>
  //   );
  // };
  const ScrollToIndex = () => {
    console.log('selectedItem', loclistIndex);

    flatlistref.current.scrollToIndex({
      animated: true,
      index: loclistIndex,
    });
  };

  const DropdownView = props => {
    const [dropView, setdropView] = useState(false);

    const handleOnpress = async number => {
      if (number == 'Singapore') {
        // setselectedLocation('Singapore');
        console.log('selectedSingapore');
      } else if (number == 'Malaysia') {
        // setselectedLocation('Malaysia');
        console.log('selectedMalaysia');
      }
      props.setselected(number);
      props.setText(number);
    };
    return (
      <View>
        <TouchableOpacity onPress={() => setdropView(!dropView)}>
          <View style={styles.dropdownView}>
            <View style={{height: '100%', justifyContent: 'center'}}>
              <Text
                style={{
                  color: 'white',
                  textShadowColor: 'gray',
                  textShadowOffset: {width: 0, height: 0},
                  textShadowRadius: 5,
                }}>
                {props.text}
              </Text>
            </View>
            <View
              style={{
                height: windowHeight * 0.05,
                width: windowWidth * 0.1,
                // backgroundColor: 'red',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {/* <Image
                source={require('../assets/Vector.png')}
                style={{width: 10, height: '100%'}}
                resizeMode="contain"
              /> */}
              <MaterialIcons
                name={dropView == false ? 'arrow-drop-down' : 'arrow-drop-up'}
                size={23}
                color="white"
              />
            </View>
          </View>
        </TouchableOpacity>
        {dropView == true ? (
          <View
            style={{
              width: windowWidth * 0.9,
              borderRadius: 5,
              borderBottomColor:'gray',
              borderBottomWidth:3,
              maxHeight:
                props.value.length > 0 ? windowHeight * 0.3 : windowWidth * 0.1,
            }}>
            <ScrollView
              nestedScrollEnabled
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{width: '100%'}}>
              {props.value.map((number, index) => (
                <View style={{width: '100%'}} key={index}>
                  <TouchableOpacity onPress={() => handleOnpress(number)}>
                    <View style={{width: '100%'}}>
                      <Text
                        style={{
                          backgroundColor:
                            number == props?.selectedVal ? 'white' : 'black',
                          marginTop: 3,
                          paddingLeft: 5,
                          padding: 5,
                          color:
                            number == props?.selectedVal ? 'black' : 'white',
                          textShadowColor: 'gray',
                          textShadowOffset: {width: 0, height: 1},
                          textShadowRadius: 10,
                        }}>
                        {number}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        ) : null}
      </View>
    );
  };
  const DropdownViewL = props => {
    const [dropView, setdropView] = useState(false);

    const handleOnpress = async number => {
      if (number == 'Singapore') {
        // setselectedLocation('Singapore');
        setResidence('');
        setResidenceText('Region');
        console.log('selectedSingapore');
      } else if (number == 'Malaysia') {
        // setselectedLocation('Malaysia');
        console.log('selectedMalaysia');
        setResidence('');
        setResidenceText('Region');
      }
      props.setselected(number);
      props.setText(number);
    };
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            setdropView(!dropView);
            handleScrollUp();
            dropView == false ? setTimeout(() => ScrollToIndex(), 100) : null;
          }}>
          <View style={styles.dropdownView}>
            <View style={{height: '100%', justifyContent: 'center'}}>
              <Text
                style={{
                  color: 'white',
                  textShadowColor: 'gray',
                  textShadowOffset: {width: 0, height: 0},
                  textShadowRadius: 5,
                }}>
                {props.text}
              </Text>
            </View>
            <View
              style={{
                height: windowHeight * 0.05,
                width: windowWidth * 0.1,
                // backgroundColor: 'red',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {/* <Image
                source={require('../assets/Vector.png')}
                style={{width: 10, height: '100%'}}
                resizeMode="contain"
              /> */}
              <MaterialIcons
                name={dropView == false ? 'arrow-drop-down' : 'arrow-drop-up'}
                size={23}
                color="white"
              />
            </View>
          </View>
        </TouchableOpacity>

        {dropView == true ? (
          <View
            style={{
              width: windowWidth * 0.9,
              borderRadius: 5,
              borderBottomColor:'gray',
              borderBottomWidth:3,
              maxHeight:
                props.value.length > 0 ? windowHeight * 0.3 : windowWidth * 0.1,
            }}>
            {/* <ScrollView
              nestedScrollEnabled
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{width: '100%'}}>
              {props.value.map((number, index) => (
                <View style={{width: '100%'}} key={index}>
                  <TouchableOpacity onPress={() => handleOnpress(number)}>
                    <View style={{width: '100%'}}>
                      <Text
                        style={{
                          backgroundColor:
                            number == props?.selectedVal ? 'white' : 'black',
                          marginTop: 3,
                          paddingLeft: 5,
                          padding: 5,
                          color:
                            number == props?.selectedVal ? 'black' : 'white',
                          textShadowColor: 'gray',
                          textShadowOffset: {width: 0, height: 1},
                          textShadowRadius: 10,
                        }}>
                        {number}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView> */}
            <FlatList
              data={props.value}
              nestedScrollEnabled
              ref={flatlistref}
              getItemLayout={(data, index) => ({
                length: windowHeight * 0.05,
                offset: windowHeight * 0.05 * index,
                index,
              })}
              keyExtractor={(item, index) => index}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
                      width: '100%',
                      height: windowHeight * 0.05,
                      backgroundColor: 'black',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        handleOnpress(item);
                        setloclistIndex(index);
                      }}>
                      <View
                        style={{
                          width: '100%',
                          height: windowHeight * 0.05,
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            backgroundColor:
                              item == props?.selectedVal ? 'white' : 'black',
                            // marginTop: 3,
                            paddingLeft: 5,
                            padding: 5,
                            color:
                              item == props?.selectedVal ? 'black' : 'white',
                            textShadowColor: 'gray',
                            textShadowOffset: {width: 0, height: 1},
                            textShadowRadius: 10,
                          }}>
                          {item}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
        ) : null}
      </View>
    );
  };
  // const checkUserDetails2 = async () => {
  //   try {
  //     const urlToHit = 'https://api.kachaak.com.sg/api/users/profile';
  //     const response = await axiosGet(urlToHit);
  //     console.log('responseCheckUserDetails===>', response.data.data);

  //     if (response.data.data != undefined) {
  //       dispatch(actions.setAuth(true));
  //       console.log('should redirect here')
  //     }

  //     setloading(false);
  //   } catch (error) {
  //     console.log('errorCheckUserDetails', error.response.data);
  //     if (error.response.data.error == 'Profile not exists') {
  //       console.log('setprofileExists set to false');
  //       setprofileExists(false);
  //       setloading(false);
  //     }
  //   }
  // };

  const AgreeButtonContainer = () => {
    return (
      <View style={styles.AgreeButtonContainer}>
        <TouchableOpacity onPress={() => handlSubmit()}>
          <View
            style={{
              // width: windowWidth * 0.4,
              // height: windowHeight * 0.05,
              paddingVertical: 10,
              paddingHorizontal: 20,
              backgroundColor: '#00BBB4',
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              // marginTop: 5,
            }}>
            <Text
              style={{
                fontSize: size.medium(),
                color: 'white',
                textShadowColor: 'gray',
                textShadowOffset: {width: 0, height: 0},
                textShadowRadius: 5,
                fontWeight: 'bold',
              }}>
              {profileExists == true ? 'Update Profile' : 'Create Profile'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

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

  const handlSubmit = async () => {
    if (profileExists == true) {
      // console.log('Call Upgrade profile here');
      upgradeProfile();
    } else {
      createProfile();
    }
  };

  const upgradeProfile = async () => {
    try {
      if (Name !== '' && UserName !== '') {
        setloading(true);
        console.log('UpgradingProfile');
        const token = await getUserToken();
        const id = await getUserID(token);
        console.log('id}}}:::', id);
        const urlToHit = 'https://api.kachaak.com.sg/api/users/profile/' + id;

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        };

        const body = {};
        if (Name != '') {
          body.name = Name;
        }
        if (UserName != '') {
          body.profileName = UserName;
        }
        if (profileImage != null) {
          body.profileImage = profileImage;
        }
        if (foodItems != []) {
          body.favouriteFoods = foodItems;
        }
        if (monthob != '' && yearob !== '') {
          let dob = String(monthob) + ',' + String(yearob);
          body.dob = dob;
        } else {
          if (monthob == '' && yearob == '') {
            console.log('NO Dob');
          } else {
            showError('Enter both year and date of birth');
            setloading(false);
            return;
          }
        }
        if (Gender != '') {
          body.gender = Gender;
        }
        if (Industry != null) {
          body.industry = Industry;
        }
        if (Location == 'Singapore' || Location == 'Malaysia') {
          if (Residence != '' || Location != '') {
            if (Residence == '') {
              showError('Select Region');
              setloading(false);
              return;
            }
            const address = {};
            address.type = selectHDB == false ? 'PRIVATE' : 'PUBLIC';
            address.residence = String(Residence);
            address.location = String(Location);
            body.address = address;
          }
        } else {
          console.log('here', Location);
          if (Location != '') {
            const address = {};
            address.type = selectHDB == false ? 'PRIVATE' : 'PUBLIC';
            address.residence = String(Location);
            address.location = String(Location);
            body.address = address;
          }
        }

        console.log('body', body);

        console.log('bodyPassed', body);
        const response = await axios.put(urlToHit, body, config);
        console.log('response', response.data);
        console.log('firsresponset', response);
       showMessage('Profile Updated');
        checkUserDetails();
      } else {
        showError('Name field cannot be empty');
      }
    } catch (e) {
      console.log('e', e.response.data);
      showError(e.response.data.error);
      setloading(false);
    }
  };

  const createProfile = async () => {
    try {
      if (Name !== '' && UserName !== '') {
        setloading(true);
        console.log('createProfile');
        const token = await getUserToken();
        const id = await getUserID(token);
        console.log('id}}}:::', id);
        const urlToHit = 'https://api.kachaak.com.sg/api/users/profile';

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        };

        const body = {};
        if (Name != '') {
          body.name = Name;
        }
        if (UserName != '') {
          body.profileName = UserName;
        }
        if (profileImage != null) {
          body.profileImage = profileImage;
        }
        if (foodItems != []) {
          body.favouriteFoods = foodItems;
        }
        if (monthob != '' && yearob !== '') {
          let dob = String(monthob) + ',' + String(yearob);
          body.dob = dob;
        } else {
          if (monthob == '' && yearob == '') {
            console.log('NO Dob');
          } else {
            showError('Enter both year and date of birth');
            setloading(false);
            return;
          }
        }
        if (Gender != '') {
          body.gender = Gender;
        }
        if (Industry != null) {
          body.industry = Industry;
        }
        if (Location == 'Singapore' || Location == 'Malaysia') {
          if (Residence != '' || Location != '') {
            if (Residence == '') {
              showError('Select Region');
              setloading(false);
              return;
            }
            const address = {};
            address.type = selectHDB == false ? 'PRIVATE' : 'PUBLIC';
            address.residence = String(Residence);
            address.location = String(Location);
            body.address = address;
          }
        } else {
          console.log('here', Location);
          if (Location != '') {
            const address = {};
            address.type = selectHDB == false ? 'PRIVATE' : 'PUBLIC';
            address.residence = String(Location);
            address.location = String(Location);
            body.address = address;
          }
        }

        console.log('body', body);

        console.log('bodyPassed', body);
        const response = await axios.post(urlToHit, body, config);
        console.log('response', response.data);
        checkUserDetails();
      } else {
        showError('Name field cannot be empty');
      }
    } catch (e) {
      console.log('e', e.response.data);
      showError(e.response.data.error);
      setloading(false);
    }
  };

  const checkUserDetails = async () => {
    try {
      const urlToHit = 'https://api.kachaak.com.sg/api/users/profile';
      const response = await axiosGet(urlToHit);
      console.log('responseCheckUserDetails===>', response.data.data);

      if (response.data.data != undefined) {
        const res = response.data.data;
        setprofileExists(true);
        setName(res?.name);
        setUserName(res.profileName);
        setprofileImage(res.profileImage);
        setfoodItems(res.favouriteFoods);
        setAge(res.age);
        if (res.dob != null) {
          console.log('dob', res.dob);
          const [month, year] = String(res.dob).split(',');
          console.log('month', month);
          console.log('year', year);
          setmonthob(month);
          setmonthobText(month);
          setyearob(year);
          setyearobText(year);
        }

        if (res.gender != null) {
          setGender(res.gender);
          setgenderText(res.gender);
        }

        if (res.industry != null) {
          setIndustry(res.industry);
          setIndustryText(res.industry);
        }
        if (res.address !== null) {
          setResidenceText(res.address.residence);
          setResidence(res.address.residence);
          setAddress(res.address);
          setLocation(res.address.location);
          setlocationText(res.address.location);
        }
      }

      setloading(false);
    } catch (error) {
      console.log('errorCheckUserDetails', error.response.data);
      if (error.response.data.error == 'Profile not exists') {
        console.log('setprofileExists set to false');
        setprofileExists(false);
        setloading(false);
      } else {
        setloading(false);
        showError('error fetching user data');
      }
    }
  };

  useEffect(() => {
    checkUserDetails();
  }, []);

  if (loading || uploading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#343643',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator size={30} color={'525461'} />
      </View>
    );
  } else {
    return (
      <View
        style={{
          // backgroundColor: 'red',
          height: windowHeight,
          width: windowWidth,
        }}>
        <LinearGradient
          colors={[
            '#525461',
            '#343643',
            '#222431',
            '#1B1D2A',
            '#1B1D2A',
            '#1B1D2A',
          ]}
          style={{flex: 1}}>
          {/* <InputfieldsContainer /> */}
          <ScrollView contentContainerStyle={{paddingBottom: 100,paddingTop:Platform.OS=='ios'?windowHeight*0.04:0}}>
            <KeyboardAvoidingView
              behavior="position"
              keyboardVerticalOffset={20}>
              <ProfileImageContainer />

              <View style={styles.InputfieldsContainer}>
                <ScrollView
                  ref={scrollViewRef}
                  nestedScrollEnabled
                  showsVerticalScrollIndicator={false}
                  // keyboardShouldPersistTaps="always"
                  contentContainerStyle={
                    {
                      // paddingBottom: 20,
                      // height:'100%',
                      // gap:5,
                      // justifyContent: 'space-evenly',
                      // backgroundColor: 'red',
                    }
                  }>
                  <View style={{gap: 10}}>
                    <TextInput
                      placeholder="Name"
                      style={styles.textInput}
                      placeholderTextColor={'gray'}
                      onChangeText={value => {
                        setName(value);
                        setUserName(value);
                      }}
                      value={Name}
                      onFocus={() => setshowFoodList(false)}
                    />

                    <View style={{flexDirection: 'row'}}>
                      <DropdownView3
                        text={monthobText}
                        setText={setmonthobText}
                        value={months}
                        selectedVal={monthob}
                        setselected={setmonthob}
                      />
                      <DropdownView3
                        text={yearobText}
                        setText={setyearobText}
                        value={past50Years}
                        selectedVal={yearob}
                        setselected={setyearob}
                      />
                    </View>
                    <DropdownView
                      text={genderText}
                      setText={setgenderText}
                      value={genders}
                      selectedVal={Gender}
                      setselected={setGender}
                    />
                    <DropdownView
                      text={IndustryText}
                      setText={setIndustryText}
                      value={IndustryArray}
                      selectedVal={Industry}
                      setselected={setIndustry}
                    />
                    <DropdownViewL
                      text={locationText}
                      setText={setlocationText}
                      value={countryNamesInAlphabeticalOrder}
                      selectedVal={Location}
                      setselected={setLocation}
                    />

                    {Location == 'Singapore' ? (
                      <DropdownView5
                        text={ResidenceText}
                        setText={setResidenceText}
                        value={DwellingHDB}
                        selectedVal={Residence}
                        setselected={setResidence}
                        res={selectHDB}
                        setres={setselectHDB}
                      />
                    ) : null}
                    {Location == 'Malaysia' ? (
                      <DropdownView7
                        text={ResidenceText}
                        setText={setResidenceText}
                        value={DwellingHDB}
                        selectedVal={Residence}
                        setselected={setResidence}
                        res={selectHDB}
                        setres={setselectHDB}
                      />
                    ) : null}

                    {/* <View
                    style={{
                      flexDirection: 'row',
                      height: windowHeight * 0.05,
                      backgroundColor: 'white',
                      alignItems: 'center',
                      width: windowWidth * 0.9,
                      borderRadius: 5,

                      marginTop: 10,

                      // borderBottomColor:'gray',
                      // borderBottomWidth:1,
                    }}>
                    <ScrollView horizontal>
                      {foodItems.map(item => (
                        <TouchableOpacity
                          key={item}
                          onPress={() => {
                            console.log('here');
                            handleRemove(item);
                          }}>
                          <View
                            style={{
                              // backgroundColor: 'orange',
                              borderRadius: 3,
                              marginHorizontal: 2,
                              borderWidth: 1,
                              borderColor: '#00BBB4',
                              paddingHorizontal: 3,
                            }}>
                            <Text
                              style={{
                                fontSize: size.small(),
                                // paddingVertical: 8,
                                color: '#00BBB4',
                                textShadowColor: 'rgba(0,0,0,0.2)',
                                textShadowOffset: {width: 0, height: 1},
                                textShadowRadius: 1,
                              }}>
                              {item}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View> */}

                    <DropdownView4
                      text={Foodtext}
                      value={foodArray}
                      Fooditems={foodItems}
                      setFooditems={setfoodItems}
                    />

                    {/* {showFoodList == true ? (
                  <View
                    style={{
                      backgroundColor: 'white',
                      maxHeight: windowHeight * 0.15,
                      // paddingLeft: 10,
                      marginTop: 2,
                      borderBottomColor: 'gray',
                      borderBottomWidth: 1,
                      borderTopColor: 'gray',
                      borderTopWidth: 1,
                    }}>
                    <ScrollView
                      nestedScrollEnabled
                      keyboardShouldPersistTaps="always">
                      {filteredFoods.map(item => (
                        <TouchableOpacity
                          key={item}
                          onPress={() => {
                            handlePress(item);
                          }}>
                          <Text
                            style={{
                              fontSize: 15,
                              paddingVertical: 8,
                              paddingLeft: 10,
                              color: 'black',
                            }}>
                            {item}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                ) : null}

                <TextInput
                  style={styles.textInput2}
                  onChangeText={handleSearch}
                  value={searchTerm}
                  // multiline
                  placeholderTextColor={'gray'}
                  placeholder="Enter Food Name"
                  // onSubmitEditing={() => EnterPressed()}
                  onFocus={() => {
                    setshowFoodList(true);
                  }}
                  onSubmitEditing={() => {
                    setSearchTerm('');
                    setshowFoodList(false);
                  }}
                  // onBlur={() => setshowFoodList(false)}
                />  */}
                  </View>
                </ScrollView>
              </View>
            </KeyboardAvoidingView>

            <AgreeButtonContainer />
          </ScrollView>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ProfileImageContainer: {
    // backgroundColor: 'red',
    alignItems: 'center',
    // justifyContent: 'flex-end',
  },

  InputfieldsContainer: {
    height: windowHeight * 0.58,
    // backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    paddingBottom: 10,
  },

  AgreeButtonContainer: {
    // marginTop: 3,
    // height: windowHeight * 0.05,
    // backgroundColor: 'green',
    // justifyContent:'space-between',
    alignItems: 'center',
  },
  textInput: {
    width: windowWidth * 0.9,
    height:Platform.OS=='android'?null: windowHeight * 0.05,
    backgroundColor: '#00BBB4',
    borderRadius: 5,
    marginTop: 5,
    paddingLeft:5,
    fontSize: size.small(),
    color: 'white',
    // paddingHorizontal: 10,
  },
  textInput2: {
    width: windowWidth * 0.9,
    borderRadius: 5,

    backgroundColor: 'white',
    height: windowHeight * 0.125,
    // marginTop: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: 'black',
  },
  dropdownView: {
    width: windowWidth * 0.9,
    borderRadius: 5,

    height: windowHeight * 0.05,
    backgroundColor: '#00BBB4',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
  },
});
