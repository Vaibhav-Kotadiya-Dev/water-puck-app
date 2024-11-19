import BleManager from 'react-native-ble-manager';
import { NativeModules, NativeEventEmitter, Platform } from 'react-native';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const MAX_CONNECT_WAITING_PERIOD = 30000; // 30 seconds
const serviceReadinIdentifier = ''; // Replace with your service UUID
const charNotificationIdentifier = ''; // Replace with your characteristic UUID
let connectedDeviceId = ''; // Store the ID of the connected device

/**
 * Enables Bluetooth if it's off on Android/iOS
 */
const enableBluetooth = async () => {
  if (Platform.OS === 'android') {
    const state = await BleManager.checkState();
    if (state === 'off') {
      try {
        await BleManager.enableBluetooth();
        console.info('Bluetooth is enabled');
        return true;
      } catch (e) {
        console.error('Failed to enable Bluetooth');
        return false;
      }
    }
  } else if (Platform.OS === 'ios') {
    const state = await BleManager.checkState();
    if (state === 'off') {
      return false; // Can't enable Bluetooth programmatically on iOS
    }
  }
  return true;
};

/**
 * Checks if a device is connected
 * @param {string} deviceId - The ID of the device to check
 */
const isDeviceConnected = async (deviceId) => {
  return await BleManager.isPeripheralConnected(deviceId, []);
};

/**
 * Connects to a BLE device
 * @param {string} deviceId - The ID of the device to connect to
 */
const connect = (deviceId) => {
  return new Promise(async (resolve, reject) => {
    let failedToConnectTimer;
  console.log('connect Function trigger')
    // Ensure Bluetooth is enabled before attempting to connect
    const isEnabled = await enableBluetooth();
    if (!isEnabled) {
      return resolve(false); // Bluetooth is off, can't proceed
    }

    // Check if already connected to the device
    let isConnected = await isDeviceConnected(deviceId);

    if (!isConnected) {
      // Set a timeout to fail the connection if it takes too long
      failedToConnectTimer = setTimeout(() => {
        return resolve(false); // Failed to connect in the given time
      }, 10000);

      // Try to connect to the device
      await BleManager.connect(deviceId).then(() => {
        clearTimeout(failedToConnectTimer); // Clear the timer on successful connection
      });

      // Check if the device is now connected
      isConnected = await isDeviceConnected(deviceId);
    }

    if (!isConnected) {
      return resolve(false); // Still not connected, fail the connection
    } else {
      // Connection successful
      connectedDeviceId = deviceId;

      // Retrieve the services and characteristics of the device
      const peripheralInformation = await BleManager.retrieveServices(deviceId);

      // Extract supported services and characteristics
      const deviceSupportedServices = (peripheralInformation.services || []).map(item => item?.uuid?.toUpperCase());
      const deviceSupportedCharacteristics = (peripheralInformation.characteristics || []).map(_char =>
        _char.characteristic.toUpperCase(),
      );

      // Check if the device has the required service and characteristic
      if (
        !deviceSupportedServices.includes(serviceReadinIdentifier) ||
        !deviceSupportedCharacteristics.includes(charNotificationIdentifier)
      ) {
        await BleManager.disconnect(connectedDeviceId); // Disconnect if not supported
        return reject('Connected device does not have required service and characteristic.');
      }

      // Start notifications on the required characteristic
      try {
        await BleManager.startNotification(deviceId, serviceReadinIdentifier, charNotificationIdentifier);
        console.log('Started notification successfully on', charNotificationIdentifier);
      } catch (error) {
        await BleManager.disconnect(connectedDeviceId);
        return reject('Failed to start notification on required service and characteristic.');
      }

      // Listen for disconnect events
      const disconnectListener = bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', async () => {
        if (connectedDeviceId) {
          await BleManager.disconnect(connectedDeviceId);
        }
        disconnectListener.remove();
      });

      return resolve(true); // Successfully connected
    }
  });
};

export default { connect };
