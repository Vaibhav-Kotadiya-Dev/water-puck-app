import {View, Text, StyleSheet, TextInput,TouchableOpacity, Animated} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

export default function ResetBottle({navigation}) {
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
      <View style={styles.content}>
      <Text style={styles.title}>Reset Bottle</Text>

        <Text style={styles.instruction}>Make sure your bottle is empty, then click the 
        button below to reset the sensor.</Text>

      
        <Animated.View style={animatedScaleStyle}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Hydration Tracker')}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Text style={styles.buttonText}>Reset Bottle</Text>
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
    // justifyContent: 'center',
    // alignItems: 'center',
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
    // flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 250,
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
    // paddingHorizontal: 30,
    lineHeight: 24,
  },
  unitText: {
    fontSize: 16,
    marginTop:10,
    color: '#c7c7c7',
    marginLeft:160,
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
    marginTop:450,

  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
     textAlign:'center',
  },
});
