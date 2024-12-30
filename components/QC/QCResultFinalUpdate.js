import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { fetchHoldStockReport, fetchQCResultFinalUpdate } from '../Services/apiService';
import { ActivityIndicator, MD2Colors, Dialog, Portal,Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import IOct from 'react-native-vector-icons/Octicons';

const FinalUpdate = ({ navigation }) => {
  const informaitonAboutUser = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [id, setId] = useState(informaitonAboutUser.facilityid);
  const [refreshing, setRefreshing] = React.useState(false);
  const [TitalValue, SetTitalValue] = useState(null);
  const [visible, setVisible] = React.useState(false);
  const hideDialog = () => setVisible(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const fetchData = async () => {
    try {
      setVisible(true);
      // alert(JSON.stringify(id));   
      SetTitalValue(" QC Result Pending (HO)")
      const StockRTPHold = await fetchQCResultFinalUpdate(id);
      //alert(JSON.stringify(StockRTPHold));  
      setData(StockRTPHold);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      hideDialog();
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
        <Text style={styles.cellText}>{item.mcategory}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.nositems}</Text>
      </View>
      {/* <View style={styles.cell}>
        <Text style={styles.cellText}>{item.itemtypename}</Text>
      </View> */}
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.nosbatch}</Text>
      </View>

      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.uqcvalue}</Text>
      </View>


   

      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.exceddedsincetimeline}</Text>
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
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title></Dialog.Title>
          <Dialog.Content>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
              <ActivityIndicator animating={true} color={MD2Colors.red800} size={'large'} />
            </View>
          </Dialog.Content>
          <Dialog.Title></Dialog.Title>
        </Dialog>
      </Portal>
      <View>
            <Title style={styles.header1}><IOct name="checklist" size={25} color="#000000" />{TitalValue}</Title>
            </View>
      <View style={styles.header}>
        <Text style={styles.headerText}>SN</Text>
        <Text style={styles.headerText}>Category</Text>
        <Text style={styles.headerText}>Items</Text>
        <Text style={styles.headerText}>Batches</Text>
        <Text style={styles.headerText}>Value<Icon name="rupee" size={15} color="#000000" /></Text>
       
        <Text style={styles.headerText}>Exceeded</Text>
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
    textAlign: 'left',
  },
  header1: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    alignSelf:'center',
    color:'purple',
    fontSize:15,
    fontWeight: 'bold',
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
export default FinalUpdate;
