import React from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { WebView } from 'react-native-webview';

const VehicleMonitor = () => {
  const url = 'http://www.dpdmis.in/GmapNew.aspx';

  const onShouldStartLoadWithRequest = (event) => {
    // Check if the URL starts with the main URL or is a data URL
    if (event.url.startsWith(url) || event.url.startsWith('data:')) {
      return true;
    } else {
      // Open external links in the WebView
      Linking.openURL(event.url);
      return false;
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: url }}
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default VehicleMonitor;
