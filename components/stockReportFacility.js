import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';

const StockReportFacility = () => {
  const informaitonAboutUser = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [id, setId] = useState(informaitonAboutUser.facilityid);
  
    

  const fetchData = async () => {
    try {
    //   const response = await axios.get(`http://140.238.246.250:8080/api/CGMSCStock?id=${id}`);
   
    
    const response = await axios.get(`http://140.238.246.250:8080/api/CGMSCStock/stockReport?faclityId=${id}`);
      setData(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    
        fetchData();
  },[]

  );

  const renderItem = ({ item, index }) => (
    <View
      style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow, styles.rowWithBorder]}
    >
      {/* <View style={styles.cell}>
        <Text style={styles.cellText}>{item.categoryName}</Text>
      </View> */}
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.itemCode}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.itemName}</Text>
      </View>
      {/* <View style={styles.cell}>
        <Text style={styles.cellText}>{item.itemtypename}</Text>
      </View> */}
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.strength1}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.readyForIssue}</Text>
      </View>
      {/* <View style={styles.cell}>
        <Text style={styles.cellText}>{item.facilityId}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.itemId}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.categoryId}</Text>
      </View> */}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter ID"
          onChangeText={text => setId(text)}
          value={id}
        />
        <TouchableOpacity style={styles.button} onPress={fetchData}>
          <Text style={styles.buttonText}>Fetch Data</Text>
        </TouchableOpacity>
      </View> */}
      <View style={styles.header}>       
        <Text style={styles.headerText}>Code</Text>
        <Text style={styles.headerText}>Item</Text>        
        <Text style={styles.headerText}>Strength</Text>
        <Text style={styles.headerText}>Stock</Text>
        {/* <Text style={styles.headerText}>facilityId</Text>
        <Text style={styles.headerText}>itemId</Text>
        <Text style={styles.headerText}>categoryId</Text> */}
      </View>
      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  evenRow: {
    backgroundColor: '#F8F8F8',
  },
  oddRow: {
    backgroundColor: '#FFFFFF',
  },
  cell: {
    flex: 1,
    alignItems: 'center',
  },
  cellText: {
    fontSize: 14,
  },
});

export default StockReportFacility;
