import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const HomeScreen = ({ navigation }) => {
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
    <LinearGradient
      colors={['#0f2027', '#203a43', '#2c5364']}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.content}>
        <Text style={styles.title}>You Are New Here!</Text>
        <Text style={styles.subtitle}>
          Click the button below to start setting up your new SM Water Bottle
        </Text>
        <Text style={styles.subtitle}>Welcome to the Team!</Text>

        <Animated.View style={animatedScaleStyle}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('BottleSetup')}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Text style={styles.buttonText}>Get Started</Text>
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
  subtitle: {
    fontSize: 18,
    color: '#c7c7c7',
    marginVertical: 10,
    textAlign: 'center',
    paddingHorizontal: 30,
    lineHeight: 24,
  },
  button: {
    marginTop: 40,
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

export default HomeScreen;
