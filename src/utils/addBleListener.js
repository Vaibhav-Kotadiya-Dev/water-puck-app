import { bytesToString } from "convert-string";
import { NativeModules, NativeEventEmitter } from "react-native";

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

/**
 * Adds a persistent listener for continuous data reading from a BLE characteristic.
 * @param {string} peripheral - The peripheral (device) ID.
 * @param {string} service - The UUID of the service.
 * @param {string} characteristic - The UUID of the characteristic.
 * @param {function} onDataReceived - Callback invoked for each data update.
 * @returns {function} - A function to remove the listener when no longer needed.
 */
export const startContinuousBleListener = (peripheral, service, characteristic, onDataReceived) => {
  const listener = bleManagerEmitter.addListener(
    "BleManagerDidUpdateValueForCharacteristic",
    ({ value, peripheral: emittedPeripheral, service: emittedService, characteristic: emittedCharacteristic }) => {
      if (
        peripheral === emittedPeripheral &&
        service === emittedService &&
        characteristic === emittedCharacteristic
      ) {
        const data = bytesToString(value);
        console.log(`Continuous data received: ${data}`);
        onDataReceived(data); // Pass data to the callback
      }
    }
  );

  // Return a cleanup function to remove the listener
  return () => {
    listener.remove();
    console.log("BLE data listener removed");
  };
};
