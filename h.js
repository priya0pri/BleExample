// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, Button, PermissionsAndroid, TouchableOpacity } from 'react-native';
// import { BleManager } from 'react-native-ble-plx';

// export const manager = new BleManager();

// const requestPermission = async () => {
//   // alert("call")
//   console.log(PermissionsAndroid,"PermissionsAndroid");
//   const granted = await PermissionsAndroid.request(
//     // PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
//     //   title: "Request for Location Permission",
//     //   message: "Bluetooth Scanner requires access to Fine Location Permission",
//     //   buttonNeutral: "Ask Me Later",
//     //   buttonNegative: "Cancel",
//     //   buttonPositive: "OK"
//     // },
//     PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN, {
//       title: "Request for Location Permission",
//       message: "Bluetooth Scanner requires access to Fine Location Permission",
//       buttonNeutral: "Ask Me Later",
//       buttonNegative: "Cancel",
//       buttonPositive: "OK"
//     },
   
//   );
 
//   // const connect = await PermissionsAndroid.connect(
//   //   PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT, {
//   //     title: "Request for Cnnect Permission",
//   //     message: "Bluetooth Scanner requires access to Connect Permission",
//   //     buttonNeutral: "Ask Me Later",
//   //     buttonNegative: "Cancel",
//   //     buttonPositive: "OK"
//   //   }
//   // );
//   return (granted === PermissionsAndroid.RESULTS.GRANTED);
  
// }
// const connectDevice = device => {
  
//   // if (device.name === 'LHB-83CB5606') {
//   //   const deviceConnected =  device.isConnected();

//   //   if (deviceConnected) {
//   //     console.log("deviceconnect");
//   //      device.cancelConnection();
//   //   }

//   //   if (!deviceConnected) {
//   //     device.connect();
//   //     console.log("devicedisconnect");
//   //   }

//   //    // do the stuff that you want to do
//   // }
//   // manager.disconnect("EB:70:ED:9D:9D:16")
//   // manager.stopDeviceScan();
//   manager.connectToDevice("EB:70:ED:9D:9D:16",{ refreshGatt: 'OnConnected' }).then(async device => {
//     alert("connect")
//              await device.discoverAllServicesAndCharacteristics();
//             //  manager.stopDeviceScan();
//              console.log(device,"connectdevice",device.discoverAllServicesAndCharacteristics());

//             //  setDisplaText(`Device connected\n with ${device.name}`);
//             //   setConnectedDevice(device);
//             //        setDevices([]);
//   device.services().then(async service => {
//   //     for (const ser of service) {
//   //         ser.characteristics().then(characteristic => {
//   //         getCharacteristics([...characteristics, characteristic]);
//   //         });
//   // }
// });
// }).catch((err)=>{
//   // manager.disconnect("EB:70:ED:9D:9D:16")

//     console.log("connecterr",err);
  
// })
// };
// // BlueetoothScanner does:
// // - access/enable bluetooth module
// // - scan bluetooth devices in the area
// // - list the scanned devices
// const App = () => {
//   const [logData, setLogData] = useState([]);
//   const [logCount, setLogCount] = useState(0);
//   const [scannedDevices, setScannedDevices] = useState({});
//   const [deviceCount, setDeviceCount] = useState(0);

//   useEffect(() => {
//     manager.onStateChange((state) => {
//       const subscription = manager.onStateChange(async (state) => {
//         console.log(state);
//         const newLogData = logData;
//         newLogData.push(state);
//         await setLogCount(newLogData.length);
//         await setLogData(newLogData);
//         subscription.remove();
//       }, true);
//       return () => subscription.remove();
//     });
//   }, [manager]);

//   return (
//     <View style={{flex:1, padding:10}}>
//       <View style={{flex:1, padding:10}}>
//         <Text style={{fontWeight: "bold"}}>Bluetooth Log ({logCount})</Text>
//         <FlatList
//           data={logData}
//           renderItem={({item}) => {
//             return (<Text>{item}</Text>)
//           }}
//         />
//         <Button
//           title="Turn On Bluetooth"
//           onPress={async () => {
//             const btState = await manager.state()
//             // test is bluetooth is supported
//             if (btState==="Unsupported") {
//               alert("Bluetooth is not supported");
//               return (false);
//             }
//             // enable if it is not powered on
//             if (btState!=="PoweredOn") {
//               await manager.enable();
//             } else {
//               await manager.disable();
//             }
//             return (true);
//           }}
//         />
//       </View>

//       <View style={{flex:2, padding:10}}>
//         <Text style={{fontWeight: "bold"}}>Scanned Devices ({deviceCount})</Text>
//         <FlatList
//           data={Object.values(scannedDevices)}
//           renderItem={({item}) => {
//             return (<TouchableOpacity onPress={connectDevice}>
//               <Text>{`${item.name} (${item.id})`}</Text>
//             </TouchableOpacity>)
//           }}
//         />
//         <Button
//           title="Scan Devices"
//           onPress={async () => {
//             const btState = await manager.state()
//             // test if bluetooth is powered on
//             if (btState!=="PoweredOn") {
//               alert("Bluetooth is not powered on");
//               return (false);
//             }
//             // explicitly ask for user's permission
//             const permission = await requestPermission();
//             if (permission) {
//               manager.startDeviceScan(null, null, async (error, device) => {
//                   // error handling
//                   if (error) {
//                     console.log(error,"error");
//                     return
//                   }
//                   // found a bluetooth device
//                   if (device) {
//                     // alert("device")
//                     console.log(`${device.name} (${device.id})}`);
//                     const newScannedDevices = scannedDevices;
//                     newScannedDevices[device.id] = device;
//                     await setDeviceCount(Object.keys(newScannedDevices).length);
//                     await setScannedDevices(scannedDevices);
//                   }
//                   if (device.name === 'LHB-83CB5606') {
//                     alert(device.isConnected())
//                     const deviceConnected = await device.isConnected();
                
//                     if (deviceConnected) {
//                       console.log("deviceconnect");
//                       await device.cancelConnection();
//                     }
                
//                     if (!deviceConnected) {
//                       device.connect();
//                       console.log("devicedisconnect");
//                     }
                
//                      // do the stuff that you want to do
//                   }
//               });
//             }
//             return (true);
//           }}
//         />
//       </View>
//     </View>
//   );
// };

// export default App;

// import React, { Component } from "react";
// import { Button, View, Text } from "react-native";
// import { BleManager } from "react-native-ble-plx";

// export default class App extends Component {
//   constructor(props) {
//     super(props);
//     this.manager = new BleManager();
//     this.scanAndConnect = this.scanAndConnect.bind(this);
//   }

//   scanAndConnect() {
//     this.manager.startDeviceScan(null, null, (error, device) => {
//       console.log(error,"errorss");
//       console.log(device);
//     });
//   }

//   componentWillMount() {
//     const subscription = this.manager.onStateChange(state => {
//       if (state === "PoweredOn") {
//         this.scanAndConnect();
//         subscription.remove();
//       }
//     }, true);
//   }

//   render() {
//     return (
//       <View style={{flex: 1}}>
//         <Button onPress={this.scanAndConnect} title={"CLICK!"}>
//           <Text style={{ color: "white", fontSize: 20 }}>Scan</Text>
//         </Button>
//       </View>
//     );
//   }
// }



















// import React, { useState, useEffect } from 'react';
//  import {
//    SafeAreaView,
//    StyleSheet,
//    View,
//    Text,
//    StatusBar,
//    NativeModules,
//    NativeEventEmitter,
//    Button,
//    Platform,
//    PermissionsAndroid,
//    FlatList,
//    TouchableHighlight,
//  } from 'react-native';
//  import BleManager from 'react-native-ble-manager';
//  const BleManagerModule = NativeModules.BleManager;
//  const bleEmitter = new NativeEventEmitter(BleManagerModule);
 
//  import { stringToBytes } from 'convert-string';
 
//  // import Buffer function.
//  // this func is useful for making bytes-to-string conversion easier
//  const Buffer = require('buffer/').Buffer;
 
//  const App = () => {
//    const [isScanning, setIsScanning] = useState(false);
//    const [list, setList] = useState([]);
//    const peripherals = new Map();
//    const [testMode, setTestMode] = useState('read');
 
//    // start to scan peripherals
//    const startScan = () => {
 
//      // skip if scan process is currenly happening
//      if (isScanning) {
//        return;
//      }
 
//      // first, clear existing peripherals
//      peripherals.clear();
//      setList(Array.from(peripherals.values()));
 
//      // then re-scan it
//      BleManager.scan([], 3, true)
//        .then(() => {
//          console.log('Scanning...');
//          setIsScanning(true);
//        })
//        .catch((err) => {
//          console.error(err);
//        });
//    };
 
//    // handle discovered peripheral
//    const handleDiscoverPeripheral = (peripheral) => {
//      console.log('Got ble peripheral', peripheral);
 
//      if (!peripheral.name) {
//        peripheral.name = 'NO NAME';
//      }
 
//      peripherals.set(peripheral.id, peripheral);
//      setList(Array.from(peripherals.values()));
//    };
 
//   //  // handle stop scan event
//   //  const handleStopScan = () => {
//   //    console.log('Scan is stopped');
//   //    setIsScanning(false);
//   //  };
 
//    // handle disconnected peripheral
//    const handleDisconnectedPeripheral = (data) => {
//      console.log('Disconnected from ' + data.peripheral);
 
//      let peripheral = peripherals.get(data.peripheral);
//      if (peripheral) {
//        peripheral.connected = false;
//        peripherals.set(peripheral.id, peripheral);
//        setList(Array.from(peripherals.values()));
//      }
//    };
 
//    // handle update value for characteristic
//    const handleUpdateValueForCharacteristic = (data) => {
//      console.log(
//        'Received data from: ' + data.peripheral,
//        'Characteristic: ' + data.characteristic,
//        'Data: ' + data.value,
//      );
//    };
 
//    // retrieve connected peripherals.
//    // not currenly used
//    const retrieveConnectedPeripheral = () => {
//      BleManager.getConnectedPeripherals([]).then((results) => {
//        peripherals.clear();
//        setList(Array.from(peripherals.values()));
 
//        if (results.length === 0) {
//          console.log('No connected peripherals');
//        }
 
//        for (var i = 0; i < results.length; i++) {
//          var peripheral = results[i];
//          peripheral.connected = true;
//          peripherals.set(peripheral.id, peripheral);
//          setList(Array.from(peripherals.values()));
//        }
//      });
//    };
 
//    // update stored peripherals
//    const updatePeripheral = (peripheral, callback) => {
//      let p = peripherals.get(peripheral.id);
//      if (!p) {
//        return;
//      }
 
//      p = callback(p);
//      peripherals.set(peripheral.id, p);
//      setList(Array.from(peripherals.values()));
//    };
 
//    // get advertised peripheral local name (if exists). default to peripheral name
//    const getPeripheralName = (item) => {
//      if (item.advertising) {
//        if (item.advertising.localName) {
//          return item.advertising.localName;
//        }
//      }
 
//      return item.name;
//    };
 
//    // connect to peripheral then test the communication
//    const connectAndTestPeripheral = (peripheral) => {
//     console.log(peripheral.id,"peripheralid");
//      if (!peripheral) {
//        return;
//      }
 
//      if (peripheral.connected) {
//        BleManager.disconnect(peripheral.id);
//        return;
//      }
 
//      // connect to selected peripheral
//      BleManager.connect(peripheral.id)
//        .then(() => {
//          console.log('Connected to ' + peripheral.id, peripheral);
 
//          // update connected attribute
//          updatePeripheral(peripheral, (p) => {
//            p.connected = true;
//            console.log(p,"connected");
//            return p;
//          });
 
//          // retrieve peripheral services info
//          BleManager.retrieveServices(peripheral.id).then((peripheralInfo) => {
//            console.log('Retrieved peripheral services', peripheralInfo);
 
//            // test read current peripheral RSSI value
//            BleManager.readRSSI(peripheral.id).then((rssi) => {
//              console.log('Retrieved actual RSSI value', rssi);
 
//              // update rssi value
//              updatePeripheral(peripheral, (p) => {
//                p.rssi = rssi;
//                return p;
//              });
//            });
 
//            // test read and write data to peripheral
//            const serviceUUID = '10000000-0000-0000-0000-000000000001';
//            const charasteristicUUID = '20000000-0000-0000-0000-000000000001';
 
//            console.log('peripheral id:', peripheral.id);
//            console.log('service:', serviceUUID);
//            console.log('characteristic:', charasteristicUUID);
 
//            switch (testMode) {
//              case 'write':
//                // ===== test write data
//                const payload = 'pizza';
//                const payloadBytes = stringToBytes(payload);
//                console.log('payload:', payload);
 
//                BleManager.write(peripheral.id, serviceUUID, charasteristicUUID, payloadBytes)
//                  .then((res) => {
//                    console.log('write response', res);
//                    alert(`your "${payload}" is stored to the food bank. Thank you!`);
//                  })
//                  .catch((error) => {
//                    console.log('write err', error);
//                  });
//                break;
 
//              case 'read':
//                // ===== test read data
//                BleManager.read(peripheral.id, serviceUUID, charasteristicUUID)
//                  .then((res) => {
//                    console.log('read response', res);
//                    if (res) {
//                      const buffer = Buffer.from(res);
//                      const data = buffer.toString();
//                      console.log('data', data);
//                      alert(`you have stored food "${data}"`);
//                    }
//                  })
//                  .catch((error) => {
//                    console.log('read err', error);
//                    alert("error");
//                  });
//                break;
 
//              case 'notify':
//                // ===== test subscribe notification
//                BleManager.startNotification(peripheral.id, serviceUUID, charasteristicUUID)
//                  .then((res) => {
//                    console.log('start notification response', res);
//                  });
//                break;
 
//              default:
//                break;
//            }
//          });
//        })
//        .catch((error) => {
//          console.log('Connection error', error);
//        });
//    };
 
//    // mount and onmount event handler
//    useEffect(() => {
//      console.log('Mount');
 
//      // initialize BLE modules
//      BleManager.start({ showAlert: false });
 
//      // add ble listeners on mount
//      bleEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
//     //  bleEmitter.addListener('BleManagerStopScan', handleStopScan);
//     //  bleEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral);
//      bleEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic);
 
//      // check location permission only for android device
//      if (Platform.OS === 'android' && Platform.Version >= 23) {
//        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((r1) => {
//          if (r1) {
//            console.log('Permission is OK');
//            return;
//          }
 
//          PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((r2) => {
//            if (r2) {
//              console.log('User accept');
//              return
//            }
 
//            console.log('User refuse');
//          });
//        });
//      }
 
//      // remove ble listeners on unmount
//      return () => {
//        console.log('Unmount');
 
//        bleEmitter.removeListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
//       //  bleEmitter.removeListener('BleManagerStopScan', handleStopScan);
//       //  bleEmitter.removeListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral);
//        bleEmitter.removeListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic);
//      };
//    }, []);
 
//    // render list of devices
//    const renderItem = (item) => {
//      const color = item.connected ? 'green' : 'white';
//      return (
//        <TouchableHighlight onPress={() => connectAndTestPeripheral(item)}>
//          <View style={[styles.row, {backgroundColor: color}]}>
//            <Text
//              style={{
//                fontSize: 12,
//                textAlign: 'center',
//                color: '#333333',
//                padding: 10,
//              }}>
//              {getPeripheralName(item)}
//            </Text>
//            <Text
//              style={{
//                fontSize: 10,
//                textAlign: 'center',
//                color: '#333333',
//                padding: 2,
//              }}>
//              RSSI: {item.rssi}
//            </Text>
//            <Text
//              style={{
//                fontSize: 8,
//                textAlign: 'center',
//                color: '#333333',
//                padding: 2,
//                paddingBottom: 20,
//              }}>
//              {item.id}
//            </Text>
//          </View>
//        </TouchableHighlight>
//      );
//    };
 
//    return (
//      <>
//        <StatusBar barStyle="dark-content" />
//        <SafeAreaView style={styles.safeAreaView}>
//          {/* header */}
//          <View style={styles.body}>
//            <View style={styles.scanButton}>
//              <Button
//                title={'Scan Bluetooth Devices'}
//                onPress={() => startScan()}
//              />
//            </View>
 
//            {list.length === 0 && (
//              <View style={styles.noPeripherals}>
//                <Text style={styles.noPeripheralsText}>No peripherals</Text>
//              </View>
//            )}
//          </View>
 
//          {/* ble devices */}
//          <FlatList
//            data={list}
//            renderItem={({item}) => renderItem(item)}
//            keyExtractor={(item) => item.id}
//          />
 
//          {/* bottom footer */}
//          {/* <View style={styles.footer}>
//            <TouchableHighlight onPress={() => setTestMode('write')}>
//              <View style={[styles.row, styles.footerButton]}>
//                <Text>Store pizza</Text>
//              </View>
//            </TouchableHighlight>
//            <TouchableHighlight onPress={() => setTestMode('read')}>
//              <View style={[styles.row, styles.footerButton]}>
//                <Text>Get stored food</Text>
//              </View>
//            </TouchableHighlight>
//          </View> */}
//        </SafeAreaView>
//      </>
//    );
//  };
 
//  const styles = StyleSheet.create({
//    safeAreaView: {
//      flex: 1,
//    },
//    body: {
//      backgroundColor: "white",
//    },
//    scanButton: {
//      margin: 10,
//    },
//    noPeripherals: {
//      flex: 1,
//      margin: 20,
//    },
//    noPeripheralsText: {
//      textAlign: 'center',
//    },
//    footer: {
//      flexDirection: 'row',
//      justifyContent: 'space-around',
//      width: '100%',
//      marginBottom: 30,
//    },
//    footerButton: {
//      alignSelf: 'stretch',
//      padding: 10,
//      backgroundColor: 'grey',
//    },
//  });
 
//  export default App;



import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import BluetoothSerial from 'react-native-bluetooth-serial-next';
const App = () => {
  const [bleDevice, setble] = useState([]);
  const [ble, sble] = useState({});
  const backgroundStyle = {
    backgroundColor: "white",
    flex: 1,
    height: '100%',
  };
  useEffect(() => {
    fn();
   
  }, []);
  const fn = async () => {
    let requestBle = await BluetoothSerial.requestEnable();
    let enableBle = await BluetoothSerial.enable();
    let listBle = await BluetoothSerial.list();
    let listunPairdevices = await BluetoothSerial.listUnpaired();
    console.log(listunPairdevices);
    setble(listunPairdevices);
  };
  useEffect(() => {
    getdata();
  }, [ble]);
  const getdata = async () => {
    if (ble?.name) {
      const device1 = await BluetoothSerial.connect(ble?.id);
      const isConnected = await BluetoothSerial.isConnected();
      console.log(isConnected, 'edkejd');
      if (isConnected) {
        BluetoothSerial.read((data) => {
         console.log(data);
        }, '\r\n');
      }
    }
  };
  // Add a BackgroundFetch event to <FlatList>
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View
        style={{
          height: '100%',
        }}>
      
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 60,
            flexGrow: 1,
            height: '100%',
          }}>
          {bleDevice.map(data => {
            return (
              <TouchableOpacity
                style={{
                  width: '100%',
                  height: 70,
                  backgroundColor: 'pink',
                  marginVertical: 10,
                }}
                onPress={() => {
                  sble(data);
                }}>
                <Text>{data.name}</Text>
                <Text>{data.address}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default App;