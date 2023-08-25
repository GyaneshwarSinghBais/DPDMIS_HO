import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { fetchIncompleteWardIssue } from '../Services/apiService';
import StockReportFacility from '../stockReportFacility';
import NewWardIssue from './NewWardIssue';


const IncompleteWardIssue = ({ navigation }) => {
  const informaitonAboutUser = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [id, setId] = useState(informaitonAboutUser.facilityid);

  
    

  const fetchData = async () => {
    try {     
    const stockReportData = await fetchIncompleteWardIssue(id);    
    setData(stockReportData);
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

     <View style={styles.cell}>
        <Text style={styles.cellText}>{index+1}</Text>
      </View>

      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.wardName}</Text>
      </View>

      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.wRequestBy}</Text>
      </View>

      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.wRequestDate}</Text>
      </View>

      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.issueDate}</Text>
      </View>

      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.issueNo}</Text>
      </View>

      
      {/* <View style={styles.cell}>
        <Text onPress={()=>alert(item.issueID)} style={styles.cellText}>{item.status}</Text>
      </View> */}

    <View style={styles.cell}>
        <Text onPress={()=>navigateFunction(item)} style={styles.cellText}>{item.status}</Text>
      </View>
     
    </View>

    
  );

const navigateFunction = (item) => {
    //alert(testid);
    //navigation.navigate("Add New Issue"); 
    navigation.navigate('Add New Issue', { item: item, });
}

  return (
    <View style={styles.container}>     
      <View style={styles.header}>   
      <Text style={styles.headerText}>S.No</Text>    
        <Text style={styles.headerText}>Ward</Text>
        <Text style={styles.headerText}>Request By</Text>        
        <Text style={styles.headerText}>Request Date</Text>
        <Text style={styles.headerText}>Issue Date</Text>      
        <Text style={styles.headerText}>Issue No</Text> 
        <Text style={styles.headerText}>Status</Text> 
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

export default IncompleteWardIssue;
