// App.js

import React from 'react';
import './gesture-handler';
import AppNavigator from './src/navigation/AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
function App() {
  return  <GestureHandlerRootView style={{ flex: 1 }}>
    <AppNavigator />
</GestureHandlerRootView>;
}

export default App;
