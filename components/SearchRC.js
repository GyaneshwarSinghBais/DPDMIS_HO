// Home.js
import React, { useState, useEffect } from "react";
import { View } from 'react-native';
import {
  StyleSheet,
  Text,
  SafeAreaView,
} from "react-native";
import List from "./List";
import SearchBar from "./SearchBar";
import { fetchCGMSCPublicStock,fetchCGMSCPublicRC } from "./Services/apiService";
import { ActivityIndicator, MD2Colors } from 'react-native-paper';


const SearchRC = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [fakeData, setFakeData] = useState();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  // get data from the fake api endpoint
  // useEffect(() => {
  //   const getData = async () => {
  //     const apiResponse = await fetch(
  //       "https://my-json-server.typicode.com/kevintomas1995/logRocket_searchBar/languages"
  //     );
  //     const data = await apiResponse.json();
  //     setFakeData(data);
  //   };
  //   getData();
  // }, []);


  
  useEffect(() => {
    fetchStocks();
    //fetchData();
}, []
);


  const fetchStocks = async () => {
    try {

      //alert("call service");
      setLoading(true);
        const resultData = await fetchCGMSCPublicRC("1");
        setData(resultData);
    } catch (error) {
        console.error('Error:', error);
    }
};

  return (

    
    <View style={styles.root}>
      {!clicked && 
      <Text style={styles.title}></Text>  //Heading inside text
      }
      {data.length > 0? <SearchBar
       searchPhrase={searchPhrase}
       setSearchPhrase={setSearchPhrase}
       clicked={clicked}
       setClicked={setClicked}
     /> : <View style={{flex:1, justifyContent:"center", alignItems:"center"}} > 
     <ActivityIndicator animating={true} color={MD2Colors.red800} />
     </View>
    }
    
     
      {(

          <List
            searchPhrase={searchPhrase}
            data={data}
            setClicked={setClicked}
          />

      )}
    </View>
  );
};

export default SearchRC;

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    width: "100%",
   marginTop: 5,
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: "10%",
  },
});