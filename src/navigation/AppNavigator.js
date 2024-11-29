import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/AntDesign';

import HomeScreen from '../screens/HomeScreen/HomeScreen';
import SetupBottleScreen from '../screens/SetupBottleScreen/SetupBottleScreen';
import HydrationTracker from '../screens/HydrationTracker/HydrationTracker';
import SetGoal from '../screens/SetGoal/SetGoal';
import ResetBottle from '../screens/ResetBottle/ResetBottle';
import History from '../screens/History/History';
import CustomDrawerContent from '../components/customeDrawer';
import GradientHeader from '../components/customeHeader';
import Setting from '../screens/Settings/Setting';
import ScanningScreen from '../screens/ScanningScreen/ScanningScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const HydrationTrackerDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        header: ({ navigation, route, options }) => (
          <GradientHeader
            title={options.title || route.name}
            navigation={navigation}
            showMenu={true}
          />
        ),
        drawerStyle: {
          backgroundColor: 'transparent',
        },
        drawerLabelStyle: {
          fontSize: 16,
          color: '#fff',
        },
        drawerActiveBackgroundColor: '#203a43',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#ccc',
      }}
    >
      <Drawer.Screen
        name="Hydration Tracker"
        component={HydrationTracker}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="water-outline" size={size} color={color} />
          ),
          unmountOnBlur:true
        }}
      />
      <Drawer.Screen
        name="SetGoal"
        component={SetGoal}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="target" size={size} color={color} />
          ),
          unmountOnBlur:true
        }}
      />
      <Drawer.Screen
        name="ResetBottle"
        component={ResetBottle}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="refresh" size={size} color={color} />
          ),
          unmountOnBlur:true
        }}
      />
      <Drawer.Screen
        name="History"
        component={History}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="history" size={size} color={color} />
          ),
          unmountOnBlur:true
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Setting}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon1 name="setting" size={size} color={color} />
          ),
          unmountOnBlur:true
        }}
      />
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
          options={{
            header: ({ navigation }) => (
              <GradientHeader title="Home" navigation={navigation} />
            ),
          }}
        />
        <Stack.Screen
          name="BottleSetup"
          component={SetupBottleScreen}
          options={{
            header: ({ navigation }) => (
              <GradientHeader title="Bottle Setup" navigation={navigation} />
            ),
          }}
        />
        <Stack.Screen
          name="HydrationTracker"
          component={HydrationTrackerDrawer}
          options={{ headerShown: false }}
        />
      <Stack.Screen 
        name="ScanningScreen" 
        component={ScanningScreen} 
        options={{ headerShown: false }}
      />
      </Stack.Navigator>
    </NavigationContainer>
  );
};



export default AppNavigator;
