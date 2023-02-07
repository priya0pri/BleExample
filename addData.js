import React, { useState } from 'react';
 
import { StyleSheet, Text, Button, Alert, TextInput, SafeAreaView } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

var mainArray = ["One", "two"] ;

export default function example() {

  const [InputDATA, setInputData] = useState(" ");

  const addElementToArray =async()=>{
    mainArray.push(InputDATA.toString());
    await AsyncStorage.setItem('@MySuperStore:key', JSON.stringify(mainArray));

    Alert.alert('Data Added Successfully...');

    // console.log(mainArray);
   
  
  }
  const getElemenet =async()=>{
   
    const myArray = await AsyncStorage.getItem('@MySuperStore:key');
    console.log(JSON.parse(myArray,"myArrayvalueee"));

  
  }
  return (
    
    <SafeAreaView style={styleSheet.MainContainer}>

      <Text style={styleSheet.text}> Add TextInput Item To Array in React Native </Text>
 
        <TextInput
          placeholder="Enter Value here"
          onChangeText={item => setInputData(item) }
          style={styleSheet.textInput} />
 
      <Button onPress={addElementToArray}
        title={'Add Item To Array'} />
 <Button onPress={getElemenet}
        title={'get Item To Array'} />
 
    </SafeAreaView>
  );

}

const styleSheet = StyleSheet.create({
 
  MainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
 
  text:{
    fontSize: 25,
    color: 'black',
    textAlign: 'center',
    paddingBottom: 20
  },

  textInput:{
      textAlign: 'center',
      marginBottom: 20, 
      height: 44,
      width: '88%',
      borderWidth: 1,
      borderColor: '#4CAF50',
      borderRadius: 7,
  }
});