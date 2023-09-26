import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { setUser } from "./app/userSlice";
import { useDispatch } from "react-redux"; // Import the useDispatch hook
import { loginUser } from "./Services/apiService";
import { TextInput, Button } from 'react-native-paper';


const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState("chcgujradmt@dpdmis.in");   //chcbadekilepal@dpdmis.in   Cgmsc#123$, chcgujradmt@dpdmis.in Dinesh#180278$, uphcamasivani@dpdmis.in Cgmsc#123$
  const [password, setPassword] = useState("Dinesh#180278$");
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

    <ImageBackground source={require("./assets/background.jpg")}
      style={styles.backgroundImage}
    >

      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        {errorMessage !== "" && <Text style={styles.errorText}>{errorMessage}</Text>}
        {/* <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      /> */}
        <TextInput
          mode="outlined"
          label="Email"
          placeholder="Email"
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
          buttonColor="#728FCE"
          textColor="#FFFFFF"
          labelStyle={styles.buttonLabel}
          onPress={onLogin}
          loading={loading}
        >
          Login
        </Button>
      </View>

    </ImageBackground>
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
});

export default LoginPage;













