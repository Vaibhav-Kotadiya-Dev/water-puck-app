// App.js

import React, { useEffect } from 'react';
import './gesture-handler';
import AppNavigator from './src/navigation/AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BleManager from 'react-native-ble-manager';

function App() {
  useEffect(() => {
    BleManager.start({ showAlert: false, forceLegacy: true }).then(() => {console.log('start ble')});
}, []);
  return  <GestureHandlerRootView style={{ flex: 1 }}>
    <AppNavigator />
</GestureHandlerRootView>;
}

export default App;
