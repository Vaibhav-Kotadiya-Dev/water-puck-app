import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import { Linking, Platform } from 'react-native';
import {   Platform as RNPlatform } from 'react-native';

const getPlatformVersion = () => {
  if (Platform.OS === 'android') {
    return parseInt(RNPlatform.Version, 10);
  }
  return null; // or return a version number for iOS if necessary
};
const askBluetoothPermissions = async () => {
  if (Platform.OS === 'ios') {
    //ask for bluetooth permission for IOS
    const result = await request(PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL);
    if (result !== RESULTS.GRANTED) {
      //either permission is not granted or it's unavailable.
      if (result === RESULTS.UNAVAILABLE) {
        //if bluetooth is off, prompt user to enable the bluetooth manually.
        return { type: 'EPermissionTypes.enableBluetooth', value: false };
      } else {
        //if user denied for bluetooth permission, prompt them to enable it from settigs later.
        return { type: "EPermissionTypes.bluetoothPermission", value: false };
      }
    }
    //bluetooth permission has been granted successfully
    return { type: 'EPermissionTypes.bluetoothPermission', value: true };
  } else {
    console.log(getPlatformVersion() )
    if(getPlatformVersion() > 30) {
      //ask for bluetooth permission for Android for version >= 12.
      if ((await request(PERMISSIONS.ANDROID.BLUETOOTH_SCAN)) !== RESULTS.GRANTED) {
        return { type: 'EPermissionTypes.bluetoothPermission', value: false };
      }
      console.info('BLUETOOTH_SCAN permission allowed');
      if ((await request(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT)) !== RESULTS.GRANTED) {
        return { type: 'EPermissionTypes.bluetoothPermission', value: false };
      }
      console.info('BLUETOOTH_CONNECT permission allowed');
      if ((await request(PERMISSIONS.ANDROID.BLUETOOTH_ADVERTISE)) !== RESULTS.GRANTED) {
        return { type: 'EPermissionTypes.bluetoothPermission', value: false };
      }
      console.info('BLUETOOTH_ADVERTISE permission allowed');
      if ((await request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION)) !== RESULTS.GRANTED) {
        return { type: 'EPermissionTypes.bluetoothPermission', value: false };
      }
      console.info('ACCESS_COARSE_LOCATION permission allowed');
      return { type: 'EPermissionTypes.bluetoothPermission', value: true };
    } else {
      //for android version < 12, no need of runtime permissions.
      return { type: 'EPermissionTypes.bluetoothPermission', value: true };
    }
  }
};

const handleBluetoothPermission = async () => {
  const isPermissionAllowed = await askBluetoothPermissions();

  if (isPermissionAllowed.value) {
    //Bluetooth permission allowed successfully
    return isPermissionAllowed
  } else {
    //Bluetooth permission denied. Show Bluetooth modal warning
    if (isPermissionAllowed.type === 'EPermissionTypes.bluetoothPermission') {
      //if user denied for bluetooth permission, prompt them to enable it from settigs later.
     
    } else {
      //For ios, if bluetooth is off, prompt user to enable the bluetooth manually by themselves.
    }
  }
};

const openBluetoothSettings = () => {
  if (Platform.OS === 'ios') {
    Linking.openURL('App-Prefs:Bluetooth');
  } else {
    Linking.sendIntent('android.settings.BLUETOOTH_SETTINGS');
  }
};

export {
  askBluetoothPermissions,
  handleBluetoothPermission,
  openBluetoothSettings
}