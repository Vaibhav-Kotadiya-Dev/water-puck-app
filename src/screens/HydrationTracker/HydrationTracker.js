/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import LinearGradient from 'react-native-linear-gradient';

const screenWidth = Dimensions.get('window').width;

const HydrationTracker = ({ navigation }) => {
  const [goal, setGoal] = useState(2.2);
  const [progress, setProgress] = useState(1.1);

  const chartData = {
    labels: ['1', '5', '9', '13', '17', '19', '23'],
    datasets: [
      {
        data: [0, 400, 800, 1600, 2000, 2400, 2800],
        color: (opacity = 1) => `rgba(34, 139, 34, ${opacity})`,
      },
      {
        data: [0, 300, 500, 800, 1000, 1500, 2000],
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
      },
    ],
    legend: ['Total Water Today', 'Water Consumed'],
  };

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
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient
       colors={['#0f2027', '#203a43', '#2c5364']} 
        style={styles.gradientBackground}
      >
        <View style={styles.goalSection}>
          <Text style={styles.goalText}>Today's Goal: {goal} Litres</Text>
          <Image
            source={require('../../../assets/img/bottle.png')}
            style={styles.waterIcon}
          />
          <Text style={styles.progressText}>Progress: {progress} Litres</Text>
        </View>

        <View style={styles.chartSection}>
          <LineChart
            data={chartData}
            width={screenWidth * 0.9}
            height={220}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
          <Text style={styles.legendText}>
            <Text style={styles.redText}>Red = water consumed</Text>
            {'\n'}
            <Text style={styles.greenText}>Green = total water today</Text>
          </Text>
        </View>

        <Animated.View style={animatedScaleStyle}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('History')}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Text style={styles.buttonText}>View History</Text>
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
  },
  gradientBackground: {
    flex: 1,
    width: '100%',
  },
  goalSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  goalText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  waterIcon: {
    width: 200,
    height: 200,
    marginVertical: 10,
    resizeMode: 'contain',
  },
  progressText: {
    fontSize: 18,
    color: '#ffffff',
  },
  chartSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  legendText: {
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
    color: '#ffffff',
  },
  redText: {
    color: 'red',
  },
  greenText: {
    color: 'green',
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
    marginHorizontal:20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign:'center',
  },
});

export default HydrationTracker;
