
// import React, {useEffect, useState} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   PermissionsAndroid
// } from 'react-native';

// import BluetoothSerial from 'react-native-bluetooth-serial-next';
// const App = () => {
 
//   // Add a BackgroundFetch event to <FlatList>
//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar
//         backgroundColor={backgroundStyle.backgroundColor}
//       />
//       <View
//         style={{
//           height: '100%',
//         }}>
      
//         <ScrollView
//           contentContainerStyle={{
//             paddingBottom: 60,
//           }}>
//           {bleDevice.map(data => {
//             return (
//               <TouchableOpacity
//                 style={{
//                   width: '100%',
//                   height: 70,
//                   backgroundColor: 'pink',
//                   marginVertical: 10,
//                 }}
//                 onPress={() => {
//                   sble(data);
//                 }}>
//                 <Text>{data.name}</Text>
//                 <Text>{data.address}</Text>
//               </TouchableOpacity>
//             );
//           })}
//         </ScrollView>
//       </View>
//     </SafeAreaView>
//   );
// };
// export default App;
import { View, Text,PermissionsAndroid,Platform } from 'react-native'
import React,{useEffect} from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SerialPairedScreen from './src/Screens/SerialPairedScreen';
import SerialUnpairedScreen from './src/Screens/SerialUnpairedScreen';
import ListDataScreen from './src/Screens/ListDataScreen';
import Ble from './src/Screens/BLEScreen';
import * as permissions from 'react-native-permissions';
import {request, PERMISSIONS} from 'react-native-permissions';
const Stack = createNativeStackNavigator();

  const requestPermission = async () => {
    // alert("call")
    const granted=  await request(Platform.OS === 'ios' ? PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL :  PERMISSIONS.ANDROID.BLUETOOTH_SCAN).then((result) => {
      // setPermissionResult(result)
      console.log(result,"resultsgrant")
    });
    // console.log(PermissionsAndroid,"PermissionsAndroid");
    // const granted = await PermissionsAndroid.request(

    //   PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN, {
    //     title: "Request for Location Permission",
    //     message: "Bluetooth Scanner requires access to Fine Location Permission",
    //     buttonNeutral: "Ask Me Later",
    //     buttonNegative: "Cancel",
    //     buttonPositive: "OK"
    //   },
    // );
    return (granted === PermissionsAndroid.RESULTS.GRANTED);
  }
 
export default function App() {
  useEffect(() => {
    requestPermission()

  }, [])
  
  return (
    <NavigationContainer>
       <Stack.Navigator>
        <Stack.Screen
          name="BleScreen"
          component={Ble}
        />
        <Stack.Screen name="unpairedDevice" component={SerialUnpairedScreen} />
        <Stack.Screen name="ListDataScreen" component={ListDataScreen} />
        <Stack.Screen name="PairedDeviceScreen" component={SerialPairedScreen} />
      </Stack.Navigator>
  </NavigationContainer>
  )
}