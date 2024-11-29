import { NativeModules, NativeEventEmitter } from "react-native";
import BleManager, { Peripheral } from 'react-native-ble-manager';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const SECONDS_TO_SCAN = 30;
const SERVICE_UUIDS = []; 
const ALLOW_DUPLICATE = false;
// Function to retrieve discovered peripherals
const getDiscoveredPeripherals = () => {
  return new Promise((fulfill, reject) => {
    BleManager.getDiscoveredPeripherals((error, result) => {
      if (error) {
        reject(error);
      } else {
        fulfill(result || []);
      }
    });
  });
};

const scanNearbyDevices = async () => {
  return new Promise((resolve, reject) => {
    const devicesMap = new Map();
    let listeners = [];

    const onBleManagerDiscoverPeripheral = (peripheral) => {
      // console.log('Discovered Peripheral:', peripheral?.name); ~
        if (peripheral) {
          devicesMap.set(peripheral.id, peripheral);
        }
      
     
    };

    const onBleManagerStopScan = async () => {
      for (const listener of listeners) {
        listener.remove();
      }
      // console.log('Scan stopped. Devices found:', Array.from(devicesMap.values()));
      // allDevice()
      // const discoveredDevices = await getDiscoveredPeripherals();
      // console.log('Final discovered devices:', discoveredDevices);
      resolve(devicesMap);
    };

    try {
      listeners = [
        bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', onBleManagerDiscoverPeripheral),
        bleManagerEmitter.addListener('BleManagerStopScan', onBleManagerStopScan),
      ];

      // Start scanning for devices
      BleManager.scan(SERVICE_UUIDS, SECONDS_TO_SCAN, ALLOW_DUPLICATE).then(() => {
        console.log('Scanning started...');
      }).catch(err => {
        console.error('Failed to start scanning:', err);
        reject(err);
      });

    } catch (error) {
      reject(new Error(error instanceof Error ? error.message : error));
    }
  });
};

const scannedDevices = async () => {
  const nearbyDevices = await scanNearbyDevices();
  // console.log('Devices:', nearbyDevices);
  return nearbyDevices;
};

export default { scannedDevices };
