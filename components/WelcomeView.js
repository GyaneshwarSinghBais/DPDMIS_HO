import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useTheme , IconButton} from 'react-native-paper';

function WelcomeView() {
  const informaitonAboutUser = useSelector((state) => state.user);
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="account-circle" // Change to the desired icon name
          size={40}
          color="#800000" // Change to the desired icon color
          style={styles.icon}
        />
        <View style={styles.textContainer}>
          <Text style={styles.welcomeText}>
            Welcome, {informaitonAboutUser.firstname}!
          </Text>
          <Text style={styles.emailText}>
            Email: {informaitonAboutUser.emailid}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      borderRadius: 10,
      margin: 20,
      padding: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
    icon: {
      marginRight: 10,
    },
    textContainer: {
      flex: 1,
    },
    welcomeText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#800000',
    },
    emailText: {
      fontSize: 16,
      marginTop: 10,
      color: '#800080',
    },
  });

export default WelcomeView;