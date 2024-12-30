import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const InventoryQRCode = ({ item }) => {
  const inventoryData = JSON.stringify(item);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Inventory QR Code</Text>
      <QRCode value={inventoryData} size={200} />
      <Text style={styles.info}>Item: {item.name}</Text>
      <Text style={styles.info}>ID: {item.id}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    marginTop: 10,
  },
});

export default InventoryQRCode;
