import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
//import FacilityHome from "./facilityHome";
import NavigationConfig from "../NavigationConfig";
import { setUser } from "./app/userSlice";
import { useDispatch } from "react-redux"; // Import the useDispatch hook


const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch(); // Initialize the useDispatch hook

  useEffect(() => {
    // Get the user from AsyncStorage
    const getUser = async () => {
      try {
        const userJSON = await AsyncStorage.getItem("user");
        if (userJSON !== null) {
          const user = JSON.parse(userJSON);
          setEmail(user.email);
          setPassword(user.password);
        }
      } catch (error) {
        console.error("Error retrieving user:", error);
      }
    };

    getUser();
  }, []);

  const onLogin = async () => {
    try {
      const response = await fetch("https://localhost:7247/api/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailid: email,
          pwd: password,
        }),
      });

     
    const responseData = await response.json(); // Parse the JSON response
    alert(JSON.stringify(responseData.userInfo)); // Access userInfo from responseData
    console.log(responseData); // Log the whole response data


      if (response.status === 200) {
        // Store the user in AsyncStorage
        const user = { email, password };
        await AsyncStorage.setItem('authenticated', 'true');
       // navigation.replace('App'); // Replace login screen with the main screen       
      //  dispatch(setUser(responseData.userInfo.firstname));
      dispatch(setUser(responseData.userInfo));
        navigation.navigate('FacilityHome');
        alert("Success Login REact");
      } else {
        alert("The id or password you have entered  does not match any account.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
});

export default LoginPage;













