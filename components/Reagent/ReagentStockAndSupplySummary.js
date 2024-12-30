import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { fetchReagentStockAndSupplySummary } from '../Services/apiService';
import { ActivityIndicator, MD2Colors, Dialog, Portal,Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ticon from 'react-native-vector-icons/MaterialCommunityIcons';

//import IOct from 'react-native-vector-icons/Octicons';

const ReagentStockAndSupplySummary = ({ navigation }) => {
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
      SetTitalValue("Reagent Monitoring")
      const StockRTPHold = await fetchReagentStockAndSupplySummary();
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
      //fetchData();
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
        <Text style={styles.cellText}>{item.stkp}</Text>
      </View>
      <View style={[styles.cell,{marginLeft:15}]}>
       <Text onPress={() => navigateFunction(item)} style={styles.cellText}><Ticon name="cursor-pointer" size={14}  color="#008000" />  {item.nos}</Text>
     
      </View>   
     
    </View>
  );


  const navigateFunction = (item) => {
       const item1 = {"stkp":item.stkp};
      // alert(JSON.stringify(item1)); 

    navigation.navigate('Reagent Monitoring Detail', { item: item1 }); 
  }


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
            <Title style={styles.header1}>{TitalValue}</Title>
            </View>
      <View style={styles.header}>
        <Text style={styles.headerText}>SN</Text>
        <Text style={styles.headerText}>Stock Progress</Text>
        <Text style={styles.headerText}>No of Stock</Text> 
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
    marginBottom: 10,
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
    //alignItems: 'Left',
  },
 
  cellText: {
    fontSize: 14,
  },
});
export default ReagentStockAndSupplySummary;
