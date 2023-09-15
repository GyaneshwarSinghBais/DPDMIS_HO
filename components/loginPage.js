import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { setUser } from "./app/userSlice";
import { useDispatch } from "react-redux"; // Import the useDispatch hook
import { loginUser } from "./Services/apiService";


const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState("uphcamasivani@dpdmis.in");   //chcbadekilepal@dpdmis.in   Cgmsc#123$ chcgujradmt@dpdmis.in Dinesh#180278$
  const [password, setPassword] = useState("Cgmsc#123$"); 
  const [errorMessage, setErrorMessage] = useState("");
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
      // Perform login and fetch user info
      const userInfo = await loginUser(email, password);

      // Store the user in AsyncStorage
      await AsyncStorage.setItem("authenticated", "true");
      dispatch(setUser(userInfo));
      navigation.navigate("FacilityHome");
    } catch (error) {
      // console.error("Login error:", error);
      // console.log(error); // Add this line to inspect the error object
      if (error.response != "" && error.response.status === 400) {
        setErrorMessage("Invalid email or password. Please check your credentials.");
      } else {
        setErrorMessage("An error occurred during login. Please try again later.");
      }
    }
  };




  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      {errorMessage !== "" && <Text style={styles.errorText}>{errorMessage}</Text>}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        style={styles.input}
      />
      <Button
        title="Login"
        onPress={onLogin}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    width: 200,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  button: {
    backgroundColor: "#007aff",
    color: "#fff",
    width: 200,
    height: 40,
    borderRadius: 5,
    margin: 10,
  },
  errorText: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  }
});

export default LoginPage;













