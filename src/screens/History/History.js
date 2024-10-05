import { View, Text, ScrollView, StyleSheet, Dimensions, Animated, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function History({navigation}) {
  const [progress, setProgress] = useState(1.1);
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
  const chartData1 = {
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

  const chartData2 = {
    labels: ['1', '5', '9', '13', '17', '19', '23'],
    datasets: [
      {
        data: [0, 300, 600, 1300, 1600, 1800, 2200],
        color: (opacity = 1) => `rgba(34, 139, 34, ${opacity})`,
      },
      {
        data: [0, 200, 400, 700, 900, 1200, 1800],
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
      },
    ],
    legend: ['Total Water Today', 'Water Consumed'],
  };

  const chartData3 = {
    labels: ['1', '5', '9', '13', '17', '19', '23'],
    datasets: [
      {
        data: [0, 500, 900, 1200, 1800, 2200, 2600],
        color: (opacity = 1) => `rgba(34, 139, 34, ${opacity})`,
      },
      {
        data: [0, 300, 600, 1000, 1400, 1800, 2200],
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
      },
    ],
    legend: ['Total Water Today', 'Water Consumed'],
  };

  const charts = [
    { date: 'October 1, 2024', totalUse: '2.8 Litres', data: chartData1 },
    { date: 'September 30, 2024', totalUse: '2.2 Litres', data: chartData2 },
    { date: 'September 29, 2024', totalUse: '2.6 Litres', data: chartData3 },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient
        colors={['#0f2027', '#203a43', '#2c5364']}
        style={styles.gradientBackground}
      >
        {charts.map((chart, index) => (
          <View key={index} style={styles.chartWrapper}>
            <View style={styles.chartHeader}>
              <Text style={styles.dateText}>{chart.date}</Text>
              <Text style={styles.totalUseText}>Total: {chart.totalUse}</Text>
            </View>
            <View style={styles.chartSection}>
              <LineChart
                data={chart.data}
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
            </View>

          </View>
        ))}
                    <Animated.View style={animatedScaleStyle}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Hydration Tracker')}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
  },
  gradientBackground: {
    flex: 1,
    width: '100%',
    padding: 20,
  },
  chartWrapper: {
    marginBottom: 30,
    alignItems: 'center',
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 10,
  },
  dateText: {
    fontSize: 18,
    color: '#ffffff',
  },
  totalUseText: {
    fontSize: 18,
    color: '#ffffff',
  },
  chartSection: {
    alignItems: 'center',
    marginVertical: 10,
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
    marginTop:10,

  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
     textAlign:'center',
  },
});
