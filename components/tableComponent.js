import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { fetchWarehouseStockReport } from './Services/apiService';
import { useSelector } from 'react-redux';

const TableComponent = () => {
  const informaitonAboutUser = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [id, setId] = useState('');
  const [facid, setFacid] = useState(informaitonAboutUser.facilityid);

  const fetchData = async () => {
    try {
      //const response = await axios.get(`http://140.238.246.250:8080/api/CGMSCStock?id=${id}`);
      const response = await fetchWarehouseStockReport(id,facid);
      setData(response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const renderItem = ({ item, index }) => (
    <View
      style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}
    >

<View style={styles.cell}>
        <Text style={styles.cellText}>{index + 1}</Text>
      </View>

      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.itemcode}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.itemName}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.sku}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.readyForIssue}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.pending}</Text>
      </View>
      {/* <View style={styles.cell}>
        <Text style={styles.cellText}>{item.warehousename}</Text>
      </View> */}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Code/Item Name"
          onChangeText={text => setId(text)}
          value={id}
        />
        <TouchableOpacity style={styles.button} onPress={fetchData}>
          <Text style={styles.buttonText}>Show</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
      <Text style={styles.headerText}>SN</Text>  
        <Text style={styles.headerText}>Code</Text>
        <Text style={styles.headerText}>Item</Text>
        <Text style={styles.headerText}>SKU</Text>
        <Text style={styles.headerText}>Ready Stock</Text>
        <Text style={styles.headerText}>UQC Stock</Text>
        {/* <Text style={styles.headerText}>Warehouse Name</Text> */}
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
  input: {
    flex: 1,
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  button: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#3377FF',
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
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

export default TableComponent;
