/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNPickerSelect from 'react-native-picker-select';

const SetupBottleScreen = ({ navigation }) => {
  const scaleValue = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.9,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const animatedScaleStyle = {
    transform: [{ scale: scaleValue }],
  };

  return (
    <LinearGradient colors={['#0f2027', '#203a43', '#2c5364']} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.content}>
        <Text style={styles.title}>What shall we call you?</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor="#c7c7c7"
        />

        <Text style={styles.instruction}>
          Turn your water bottle on and hold the button down until the light goes blue.
          If you don’t see your device below after a few minutes, go to Bluetooth Settings
          on your phone and connect manually, then return.
        </Text>

        <View style={styles.iconRow}>
          <Icon name="bluetooth" size={30} color="#1e88e5" />
          <TouchableOpacity style={styles.scanButton}>
            <Text style={styles.scanButtonText}>Scan Devices</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.pickerWrapper}>
        <Text style={styles.pickerHeader}>
        We have found the following bottle:
        </Text>
          <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            items={[
              { label: 'SM Water (Blue)', value: 'blue' },
              { label: 'SM Water (Black)', value: 'black' },
            ]}
            placeholder={{ label: 'Select Bottle Type', value: null }}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
            Icon={() => <Icon name="chevron-down" size={15} color="#fff" />}
          />
        </View>

        <Animated.View style={animatedScaleStyle}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('HydrationTracker')}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Text style={styles.buttonText}>Add Bottle</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: '#000000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  input: {
    height: 50,
    width: '90%',
    borderColor: '#1e88e5',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    color: '#fff',
    marginBottom: 20,
    fontSize: 16,
  },
  instruction: {
    fontSize: 18,
    color: '#c7c7c7',
    marginVertical: 20,
    textAlign: 'start',
    paddingHorizontal: 30,
    lineHeight: 24,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'flex-start',
    marginBottom: 20,
    marginRight:110,
  },
  scanButton: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginLeft: 20,
    borderColor: '#fff',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 5,
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pickerHeader : {
    color:'#fff',
    marginVertical:5,
  },
  pickerWrapper: {
    width: '95%',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,

  },
  button: {
    backgroundColor: '#1e88e5',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#1e88e5',
    borderRadius: 10,
    color: '#fff',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#1e88e5',
    borderRadius: 10,
    color: '#fff',
    paddingRight: 30,
  },
  iconContainer: {
    top: 15,
    right: 10,
  },
});

export default SetupBottleScreen;
