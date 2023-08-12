import React from 'react'
import { View,Text,StyleSheet } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
 export function CheckBoxx({}) {
  return (
    <View>
      <View style={styles.checkboxWrapper}>
        <CheckBox
          value={state.react}
          onValueChange={value =>
            setState({
              ...state,
              react: value,
            })
          }
        />
        <Text>React js</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderColor: 'gray',
    borderWidth: 1,
  },
  resultContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
});

export default CheckBox