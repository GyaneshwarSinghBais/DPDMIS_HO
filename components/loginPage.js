import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ImageBackground, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { setUser } from "./app/userSlice";
import { useDispatch } from "react-redux"; // Import the useDispatch hook
import { loginUser } from "./Services/apiService";
import { TextInput, Button } from 'react-native-paper';


const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState("chcdongargarh@dpdmis.in");   //chcbadekilepal@dpdmis.in,afu29439@dpdmis.in   Cgmsc#123$, chcgujradmt@dpdmis.in Dinesh#180278$, uphcamasivani@dpdmis.in Cgmsc#123$,chcdongargarh@dpdmis.in Cgmsc#123$
  const [password, setPassword] = useState("Cgmsc#123$");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch(); // Initialize the useDispatch hook


  // useEffect(() => {
  //   // Get the user from AsyncStorage
  //   const getUser = async () => {
  //     try {
  //       const userJSON = await AsyncStorage.getItem("user");
  //       if (userJSON !== null) {
  //         const user = JSON.parse(userJSON);
  //         setEmail(user.email);
  //         setPassword(user.password);
  //       }
  //     } catch (error) {
  //       console.error("Error retrieving user:", error);
  //     }
  //   };
  //   getUser();
  // }, []);

  // const onLogin = async () => {
  //   try {
  //     const response = await fetch("http://140.238.246.250:8080/api/Login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         emailid: email,
  //         pwd: password,
  //       }),
  //     });


  const onLogin = async () => {

    if (!email.trim() || !password.trim()) {
      setErrorMessage("Please provide both email and password.");
      return;
    }

    try {

      setLoading(true);
      // Perform login and fetch user info
      const userInfo = await loginUser(email, password);

      // Store the user in AsyncStorage
      await AsyncStorage.setItem("authenticated", "true");
      dispatch(setUser(userInfo));
      navigation.navigate("FacilityHome");
    } catch (error) {
      // console.error("Login error:", error);
      // console.log(error); // Add this line to inspect the error object
      if (error.response && error.response.status === 400) {
        setErrorMessage("Invalid email or password. Please check your credentials.");
      } else {
        setErrorMessage("An error occurred during login. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };




  return (

    <ImageBackground source={require("./assets/background7.jpg")}
      style={styles.backgroundImage}
    >
      <View style={[styles.containerHeader, { marginBottom: -600, marginTop: -150, }]}>
        <Text style={[styles.title, { color: '#003136', marginBottom: 2 }]}>Health Facility Store</Text>
        <Text style={[styles.title, { color: '#003136', fontSize: 12, paddingTop: -10000 }]}> An Initiative for Supply Chain Management  </Text>
        <Image source={require("./assets/cglogo.png")} />

      </View>

      <View style={[styles.container,{marginTop:200}]}>

        {errorMessage !== "" && <Text style={styles.errorText}>{errorMessage}</Text>}
        {/* <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      /> */}
        <TextInput
          mode="outlined"
          label="User Id"
          placeholder="User Id"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

        <TextInput
          mode="outlined"
          label="Password"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          style={styles.input}
        />

        <Button
          mode="contained"
          buttonColor="#003136"
          textColor="#FFFFFF"
          labelStyle={styles.buttonLabel}
          onPress={onLogin}
          loading={loading}
        >
          Login
        </Button>

        {/* <Text style={[styles.title, { color: '#800000', fontSize: 12, paddingTop: 15 }]}>Brought To You By, </Text> */}
        <View style={StyleSheet.flatten([styles.cardItemRow, { justifyContent: 'space-between', flexDirection: 'row' }])}>
          {/* <Image style={[{ width: 50, height: 50 }]} source={require("./assets/cgmsc.png")} /> */}
          <Text style={[styles.title, { color: '#003136', fontSize: 14, marginBottom: 2, marginTop:50}]}>  Chhattigarh Medical Services Corporation Ltd, </Text>
        </View>
        <Text style={[styles.title, { color: '#003136', fontSize: 12, paddingTop: -10 }]}> Department of Health & Familiy Welfare, Chhattisgarh </Text>
        <Text style={[styles.title, { color: '#800000', fontSize: 12, paddingTop: -50 }]}> Version: 2.0</Text>
      </View>

  



    </ImageBackground >
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  containerHeader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    marginBottom: 20,
  },
  buttonLabel: {
    color: "#FFFFFF",
  },
  errorText: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
  logo: {
    // width: 100, 
    // height: 100, 
  },
  cardContent: {
    flexDirection: 'column',
  },
  cardItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
});

export default LoginPage;













