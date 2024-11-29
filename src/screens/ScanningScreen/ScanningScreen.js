import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import BleManager, { BleState } from 'react-native-ble-manager';
import { handleGPSPermission, handleLocationPermission } from '../../utils/gpsPermission';
import scannedDevices from '../../utils/scanNearbyDevice';
import connectDevice from '../../utils/connectDevice';
import { handleBluetoothPermission } from '../../utils/blePermission';

const ScanningScreen = () => {
  const navigation = useNavigation();
  const [devices, setDevices] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanFailed, setScanFailed] = useState(false);

  useEffect(() => {
    startScanning();
  }, []);
  const startScanning = async () => {
    setIsScanning(true)
    setScanFailed(false);
    try {
      
      const gpsPermission = await handleGPSPermission();
      console.log('GPS permission:', gpsPermission);
      
      if (!gpsPermission) {
        Alert.alert('GPS permission is required to proceed.');
        return;
      }

      await handleLocationPermission();

      const bluetoothPermission = await handleBluetoothPermission();
      console.log('Bluetooth permission:', bluetoothPermission?.value);
      
      if (!bluetoothPermission?.value) {
        Alert.alert('Bluetooth permission is required to scan devices. Please enable it in settings.');
        return;
      }

      if (Platform.OS === 'android') {
        const bleState = await BleManager.checkState();
        if (bleState === BleState.Off) {
          try {
            console.log('Bluetooth is off, attempting to enable...');
            await BleManager.enableBluetooth();
            console.log('Bluetooth is enabled');
          } catch (e) {
            Alert.alert('Please enable Bluetooth manually from settings.');
            openBluetoothSettings();
            return;
          }
        }
      }
      const scannedDevicesList = await scannedDevices.scannedDevices();
      // console.log('Discovered devices:', scannedDevicesList);

      const devicesArray = Array.from(scannedDevicesList).map(([key, value]) => ({
        id: key,
        name: value.name || value.id,
      }));
      setDevices(devicesArray);
      if (devicesArray.length === 0) {
        Alert.alert(
          'No Devices Found',
          'Make sure your bottle is on and in pairing mode.'
        );
      }
      setIsScanning(false);
    } catch (error) {
      console.error('Error during device scanning:', error);
      Alert.alert('Error', 'Failed to scan devices. Please try again.');    
      setIsScanning(false);
      setScanFailed(true);
    }
  };
  const handleDeviceConnect = async (device) => {
    try {
      const isConnected = await connectDevice.connect(device.id);
      if (isConnected) {
        Alert.alert('Success', `Connected to ${device.name || 'Device'}`);
        navigation.navigate('HydrationTracker');
      } else {
        Alert.alert('Connection Failed', 'Could not connect to the device. Try again.');
      }
    } catch (error) {
      console.error('Error connecting to device:', error);
      Alert.alert('Error', 'An error occurred during connection.');
    }
  };

  return (
    <View style={styles.container}>
       <Text style={styles.titleText}>Scan Devices</Text>
      <View style={styles.animationContainer}>
      
       {isScanning &&
          <LottieView
          source={require('../../../assets/img/scanning.json')} 
          autoPlay
          loop
          style={styles.lottie}
        /> }
    
      
   {!isScanning &&   <LottieView
            source={require('../../../assets/img/scanning.json')} 
            autoPlay={false}
            loop
            style={styles.lottie}
          />}

      </View>
       <TouchableOpacity onPress={startScanning}>
      <Text style={styles.searchinstruction}>
        {scanFailed?'Retry Scanning':'Tap here to refresh'}
      </Text>
      </TouchableOpacity>
      <Text style={styles.instructions}>
          <View style={styles.deviceListHeader}>
          <Text style={styles.instructionsText}>Available Devices</Text>
          {isScanning && <ActivityIndicator  color="#dfdfdf" />}
          </View>
      </Text>

      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <>
          <TouchableOpacity
            style={styles.deviceButton}
            onPress={() => handleDeviceConnect(item)}
          >
            <Icon name="bluetooth" size={20} color="#fff" />
            <Text style={styles.deviceName}>{item.name || 'Unnamed Device'}</Text>
          </TouchableOpacity>
            
          </>
       
        )}
        ListEmptyComponent={() =>
          !isScanning && <Text style={styles.noDevices}>No devices found</Text>
        }
      />
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f2027',
    padding: 20,
    justifyContent: 'center',
  },
  animationContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  lottie: {
    width: 200,
    height: 200,
  },
  scanningCompleteText: {
    fontSize: 18,
    color: '#fff',
  },
  instructions: {
    fontSize: 16,
    color: '#c7c7c7',
    marginVertical: 10,
  },
  deviceListHeader: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  instructionsText: {
    fontSize: 16,
    color: '#c7c7c7',
    marginRight: 10,
  },
  searchinstruction:{
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },

  deviceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap:10,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  deviceName: {
    color: '#fff',
    fontSize: 20,
  },
  noDevices: {
    color: '#c7c7c7',
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20,
  },
  cancelButton: {
    backgroundColor: '#ff4f5a',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  titleText :{
    fontSize:20,
    color:'#fff'
  }
});

export default ScanningScreen;
