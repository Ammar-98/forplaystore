// import React from 'react';
// import LinearGradient from 'react-native-linear-gradient';
// import {Text, TouchableOpacity, StyleSheet} from 'react-native';

// function Button({width, height, title, handleNavigate}) {
//   return (
//     <TouchableOpacity
//       style={{width: width, height: height}}
//       // onPress={() => handleNavigate()}
//       onPress={
//         handleNavigate
//           ? () => handleNavigate()
//           : () => {
//               console.log('no handle function');
//             }
//       }>
//       <LinearGradient
//         start={{x: 0, y: 0}}
//         end={{x: 1, y: 0}}
//         colors={['#525461', '#343643', '#1B1D2A']}
//         style={styles.linearGradient}>
//         <Text style={styles.buttonText}>{title}</Text>
//       </LinearGradient>
//     </TouchableOpacity>
//   );
// }

// var styles = StyleSheet.create({
//   linearGradient: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 5,
//     borderWidth: 1,
//   },
//   buttonText: {
//     // flex:1,
//     fontSize: 18,
//     // fontFamily: 'Gill Sans',
//     textAlign: 'center',
//     // margin: 10,
//     color: '#ffffff',
//     backgroundColor: 'transparent',
//     // justifyContent:'center'
//   },
// });

// export default Button;

import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';

function Button({width, height, title, alterTitle,handleNavigate}) {
  const [click, setClick] = useState(true);
  const [text, setText] = useState(title);
  return (
    <TouchableOpacity
      style={{width: width, height: height}}
      // onPress={() => handleNavigate()}
      onPress={() => {
        setClick(false);
        setText(alterTitle);
        console.log('clicked button');
        handleNavigate();
      }}>
      {click ? (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#00BBB4', '#00BBB4']}
          style={styles.linearGradient}>
          <Text style={styles.buttonText}>{text}</Text>
        </LinearGradient>
      ) : (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#525461', '#343643', '#1B1D2A']}
          style={styles.linearGradient}>
          <Text style={styles.buttonText}>{text}</Text>
        </LinearGradient>
      )}
    </TouchableOpacity>
  );
}

var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    paddingVertical: 2,
  },
  linear: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    color: '#00BBB4',
  },
  buttonText: {
    // flex:1,
    fontSize: 18,
    // fontFamily: 'Gill Sans',
    textAlign: 'center',
    // margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
    // justifyContent:'center'
  },
});

export default Button;
