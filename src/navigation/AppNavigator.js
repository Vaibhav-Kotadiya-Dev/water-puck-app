
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import SetupBottleScreen from '../screens/SetupBottleScreen/SetupBottleScreen';
import HydrationTracker from '../screens/HydrationTracker/HydrationTracker';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SetGoal from '../screens/SetGoal/SetGoal';
import ResetBottle from '../screens/ResetBottle/ResetBottle';
import History from '../screens/History/History';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const HydrationTrackerDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Hydration Tracker" component={HydrationTracker} />
      <Drawer.Screen name="SetGoal" component={SetGoal} />
      <Drawer.Screen name="ResetBottle" component={ResetBottle} />
      <Drawer.Screen name="History" component={History} />
    </Drawer.Navigator>
  );
};
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BottleSetup"
          component={SetupBottleScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HydrationTracker"
          component={HydrationTrackerDrawer}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
