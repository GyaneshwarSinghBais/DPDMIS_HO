import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import InventoryQRCode from './InventoryQRCode';
import QRCodeReader from './QRCodeReader';

const GenrateQR = () => {
  const item = {
    id: 'D395',
    name: 'Paracetamol',
    description: 'Paracetamol is used for fever and Pain.',
  };

  return (
    <SafeAreaView style={styles.container}>   
      <InventoryQRCode item={item} />   
      {/* <QRCodeReader />    */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GenrateQR;
