  import React, { useState } from 'react';
  import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Animated,
    Alert,
  } from 'react-native';
  import LinearGradient from 'react-native-linear-gradient';
  import { setData } from '../../utils/storageUtils.js';

  export default function SetGoal({ navigation }) {
    const [goal, setGoal] = useState('');
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

    const saveGoal = async () => {
      const goalValue = parseFloat(goal);

      if (isNaN(goalValue) || goalValue <= 0) {
        Alert.alert('Invalid Input', 'Please enter a valid amount of water (in ml).');
        return;
      }

      try {
        await setData('hydration_goal', goalValue); 
        Alert.alert('Success', `Your goal of ${goalValue} ml has been saved!`);
        navigation.navigate('Hydration Tracker');
      } catch (error) {
        Alert.alert('Error', 'Failed to save your goal. Please try again.');
        console.error('Error saving goal:', error);
      }
    };

    const animatedScaleStyle = {
      transform: [{ scale: scaleValue }],
    };

    return (
      <LinearGradient
        colors={['#0f2027', '#203a43', '#2c5364']}
        style={styles.container}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Set Goals</Text>

          <Text style={styles.instruction}>I would like to drink</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter amount"
              placeholderTextColor="#c7c7c7"
              keyboardType="numeric"
              value={goal}
              onChangeText={setGoal}
            />
            <Text style={styles.unitText}>ml of water per day</Text>
          </View>
          <Animated.View style={animatedScaleStyle}>
            <TouchableOpacity
              style={styles.button}
              onPress={saveGoal}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
            >
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </LinearGradient>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      flex: 1,
      padding: 30,
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#ffffff',
      marginBottom: 30,
      textAlign: 'center',
      textShadowColor: '#000000',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 4,
    },
    inputContainer: {
      alignItems: 'center',
      marginBottom: 150,
    },
    input: {
      height: 50,
      width: '100%',
      borderColor: '#1e88e5',
      borderWidth: 1,
      borderRadius: 10,
      paddingLeft: 15,
      color: '#fff',
      fontSize: 16,
      marginRight: 10,
    },
    instruction: {
      fontSize: 18,
      color: '#c7c7c7',
      marginVertical: 20,
      textAlign: 'start',
      lineHeight: 24,
    },
    unitText: {
      fontSize: 16,
      marginTop: 10,
      color: '#c7c7c7',
      marginLeft: 160,
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
      marginTop: 150,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      textAlign: 'center',
    },
  });
