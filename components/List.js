import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
} from "react-native";
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

// definition of the Item, which will be rendered in the FlatList
const Item = ({ name, details }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{name}</Text>
    <Text style={styles.details}>{details}</Text>
  </View>
);

// the filter
const List = ({ searchPhrase, setCLicked, data }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const filterData = () => {
      if (searchPhrase === "") {
        setFilteredData(data);
      } else {
        const filtered = data.filter(
          (item) =>
            item.name.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, "")) ||
            item.details.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
        );
        setFilteredData(filtered);
      }
    };

    //setLoading(true);
    setTimeout(() => {
      filterData();
    //setLoading(false);
    }, 2000); // Simulating a delay for the search operation, adjust as needed
  }, [searchPhrase, data]);

  return (
    <SafeAreaView style={styles.list__container}>
      <View>
        {loading ? 
        (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator animating={true} color={MD2Colors.red800} />
          </View>
        ) : 
        (
          <FlatList
            data={filteredData}
            renderItem={({ item }) => <Item name={item.name} details={item.details} />}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={() => (
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>No Record Found</Text>
              </View>
            )}
          />
        )
        }
      </View>
    </SafeAreaView>
  );
};

export default List;

const styles = StyleSheet.create({
  list__container: {
    margin: 10,
    height: "85%",
    width: "100%",
  },
  item: {
    margin: 30,
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    fontStyle: "italic",
  },
});
