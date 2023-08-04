import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const WeatherTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get('http://192.168.1.40:8080/WeatherForecast', {
          headers: {
            'Accept': 'application/json',
          },
        });
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerCell}>Date</Text>
        <Text style={styles.headerCell}>Temperature (C)</Text>
        <Text style={styles.headerCell}>Temperature (F)</Text>
        <Text style={styles.headerCell}>Summary</Text>
      </View>
      {data.map((item, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.cell}>{item.date}</Text>
          <Text style={styles.cell}>{item.temperatureC}</Text>
          <Text style={styles.cell}>{item.temperatureF}</Text>
          <Text style={styles.cell}>{item.summary}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 5,
    marginBottom: 10,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  cell: {
    flex: 1,
  },
});

export default WeatherTable;
