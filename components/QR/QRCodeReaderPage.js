import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import QRCodeReader from './QRCodeReader';

const QRCodeReaderPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <QRCodeReader />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default QRCodeReaderPage;
