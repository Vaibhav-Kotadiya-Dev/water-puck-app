import React from 'react';
import { Dimensions, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const HydrationChart = ({ progress, goal }) => {
  return (
    <React.Fragment>
      <LineChart
        data={{
          labels: ['1', '5', '9', '13', '17', '19', '23'],
          datasets: [
            { data: [0, 400, 800, 1600, 2000, 2400, 2800], color: () => 'rgba(34, 139, 34, 1)' },
            { data: [0, 300, 500, 800, 1000, 1500, progress], color: () => 'rgba(255, 0, 0, 1)' },
          ],
          legend: ['Total Water Today', 'Water Consumed'],
        }}
        width={screenWidth * 0.9}
        height={220}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 2,
          color: () => 'rgba(0, 0, 0, 1)',
          labelColor: () => 'rgba(0, 0, 0, 1)',
          style: { borderRadius: 16 },
          propsForDots: { r: '6', strokeWidth: '2', stroke: '#ffa726' },
        }}
        bezier
        style={{ marginVertical: 8, borderRadius: 16 }}
      />
      <Text style={styles.legendText}>
        <Text style={styles.redText}>Red = water consumed</Text>
        {'\n'}
        <Text style={styles.greenText}>Green = total water today</Text>
      </Text>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
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
});

export default HydrationChart;
