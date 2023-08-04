import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const StockTable = () => {
  const [stockData, setStockData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.1.10:8085/api/CGMSCStock?id=C38');
        setStockData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

 

  return (
    <View style={styles.container}>
      {stockData ? (
        <View>
          <View style={styles.row}>
            <Text style={styles.label}>Item Code:</Text>
            <Text style={styles.value}>{stockData.itemcode}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Item Name:</Text>
            <Text style={styles.value}>{stockData.itemName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>SKU:</Text>
            <Text style={styles.value}>{stockData.sku}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Ready for Issue:</Text>
            <Text style={styles.value}>{stockData.readyForIssue}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Pending:</Text>
            <Text style={styles.value}>{stockData.pending}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Warehouse Name:</Text>
            <Text style={styles.value}>{stockData.warehousename}</Text>
          </View>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  value: {},
});

export default StockTable;
