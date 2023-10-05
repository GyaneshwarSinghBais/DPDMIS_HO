import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList,RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { fetchHoldStockReport } from '../Services/apiService';

const HoldStockRPT = ({ navigation }) => {
  const informaitonAboutUser = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [id, setId] = useState(informaitonAboutUser.facilityid);
  const [refreshing, setRefreshing] = React.useState(false);


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData();
    setTimeout(() => {
      setRefreshing(false);     
    }, 2000);
  }, []);

  const fetchData = async () => {
    try {
      // alert(JSON.stringify(id));   
      const StockRTPHold = await fetchHoldStockReport(id);
      //alert(JSON.stringify(StockRTPHold));  
      setData(StockRTPHold);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item, index }) => (
    <View
      style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow, styles.rowWithBorder]}
    >
      {/* <View style={styles.cell}>
        <Text style={styles.cellText}>{item.categoryName}</Text>
      </View> */}

      <View style={styles.cell}>
        <Text style={styles.cellText}>{index + 1}</Text>
      </View>

      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.itemcode}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.itemname}</Text>
      </View>
      {/* <View style={styles.cell}>
        <Text style={styles.cellText}>{item.itemtypename}</Text>
      </View> */}
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.strength1}</Text>
      </View>

      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.batchno}</Text>
      </View>


      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.holdStock}</Text>
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
      <View style={styles.header}>
        <Text style={styles.headerText}>SNo</Text>
        <Text style={styles.headerText}>Code</Text>
        <Text style={styles.headerText}>Item</Text>
        <Text style={styles.headerText}>Strength</Text>
        <Text style={styles.headerText}>Batch No</Text>
        <Text style={styles.headerText}>Hold Stock</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
export default HoldStockRPT;
