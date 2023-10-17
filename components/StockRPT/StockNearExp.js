import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList,RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

import { useSelector } from 'react-redux';
import { fetchCategory, fetchNearExpStockReport } from '../Services/apiService';
import { Button } from 'react-native-paper';


const NearExpStockRPT = (({ navigation }) => {

  const informaitonAboutUser = useSelector((state) => state.user);
  const [selectedValue, setSelectedValue] = useState(null);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [ddlValue, setvalueddl] = useState(null);
  const [ddlitem, setitemddl] = useState(null);
  const [id, setId] = useState(informaitonAboutUser.facilityid);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);



  const options = [
    { label: '1 Month', value: '30' },
    { label: '2 Months', value: '60' },
    { label: '3 Months', value: '90' },
    { label: '4 Months', value: '120' },
    { label: '5 Months', value: '150' },
    { label: '6 Months', value: '180' },
  ];

  // const [selectedValue, setSelectedValue] = useState('');

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData();
    setTimeout(() => {
      setRefreshing(false);     
    }, 2000);
  }, []);


  const fetchData = async () => {
    try {
      setLoading(true);
      //alert("id:" + id + " Criteria:" + value);
      const StockRPTEXP = await fetchNearExpStockReport(id, value)
      //alert(JSON.stringify(StockRPTEXP));
      // alert(JSON.stringify(StockRPTEXP));  
      setData(StockRPTEXP);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // function App() {
  //   const [value,setValue]=useState('');
  //   const handleSelect=(e)=>{
  //     console.log(e);
  //     setValue(MyEXPDDL.value);

  //     alert("Please Category"+e)
  //   }
  const ShowExpData = (val) => {

    // setvalueddl={setValue}
    // setItems={setData}



    if (value === null) {
      alert("Please Select Category")
      return;
    }



    fetchData( );
    //generate code

    // alert("successfully generated")

  }
  // const fetchCategoryDropDown = async () => {
  //   try {
  //     //const response = await fetchCategory(id);
  //     // alert(JSON.stringify(response));  



  //     setDdlData(monthsArray);
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  useEffect(() => {
    //fetchCategoryDropDown();
    //   fetchData();
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

      <View style={styles.cell}>
        <Text style={styles.cellText}>{index + 1}</Text>
      </View>
      <Text style={styles.cellText}>|</Text>
      {/* <View style={styles.cell}>
        <Text style={styles.cellText}>{item.categoryName}</Text>
      </View> */}
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.itemcode}</Text>
      </View>
      <Text style={styles.cellText}>|</Text>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.itemname}</Text>
      </View>
      <Text style={styles.cellText}>|</Text>
      {/* <View style={styles.cell}>
        <Text style={styles.cellText}>{item.strengtH1}</Text>
      </View> */}

      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.batchno}</Text>
      </View>
      <Text style={styles.cellText}>|</Text>

      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.expdate}</Text>
      </View>

      <Text style={styles.cellText}>|</Text>

      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.facstock}</Text>
      </View>

    </View>
  );


  return (

    <>
      <View style={styles.container}>
        <View style={styles.card}>
          {/* <Text style={styles.cardHeader}>Near Expiry Items</Text> */}
          <View style={{ flexDirection: "row" }}>
            <View style={{ zIndex: 1000, width: "70%", marginRight: 20 }} >

              <DropDownPicker
                open={open}
                value={value}
                searchable={true}
                items={options}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setData}
                //defaultValue={selectedValue}
                containerStyle={{ height: 40 }}
                style={{ backgroundColor: '#fafafa' }}
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                dropDownStyle={{ backgroundColor: '#fafafa' }}
                onChangeItem={(item) => setSelectedValue(item.value)}
              />


            </View>
            <View style={{ width: "25%", marginRight: 10, marginLeft: 0, marginBottom: 20, marginTop: -15 }}>
              <TouchableOpacity style={[styles.button, { width: 80 }]} onPress={() => ShowExpData(id)}>
                <Text style={styles.buttonTextGenrate}>Show</Text>
              </TouchableOpacity>
              {/* <Button
                mode="contained"
                icon="filter"
                buttonColor="#728FCE"
                textColor="#FFFFFF"
                labelStyle={styles.buttonLabel}
                loading={loading}
                onPress={() => ShowExpData(id)}
              >

              </Button> */}
            </View>
          </View>





          {/* <View style={styles.container}> */}
            <View style={styles.header}>
            <Text style={styles.headerText}>S.No</Text>
            <Text style={styles.headerText}>|</Text>
              <Text style={styles.headerText}>Code</Text>
              <Text style={styles.headerText}>|</Text>
              <Text style={styles.headerText}>Item</Text>
              <Text style={styles.headerText}>|</Text>
              {/* <Text style={styles.headerText}>Strength</Text> */}
              <Text style={styles.headerText}>Batch</Text>
              <Text style={styles.headerText}>|</Text>
              <Text style={styles.headerText}>Ex DT</Text>
              <Text style={styles.headerText}>|</Text>
              <Text style={styles.headerText}>Stock</Text>
            </View>
            {data.length > 0 ?
              <FlatList
                data={data}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderItem}
                refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
              />
              : <Text>Loading...</Text>
            }

          {/* </View> */}


        </View>

      </View>
    </>

  );
}
)
const styles = StyleSheet.create
  ({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      marginTop:-10,
    },
    container2: {
      flex: 1,
      marginBottom: 5,
      marginTop: 20,
    },
    card: {
      backgroundColor: '#F8F8F8',
      borderRadius: 8,
      padding: 16,
      marginBottom: 5,
      marginTop: 20,
    },
    cardHeader: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 16,
      textAlign: 'center',
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
      fontSize:12,
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
      fontSize: 10,
    },
    buttonTextGenrate: {
      color: 'white',
      fontWeight: 'bold',
      alignSelf: 'center'
    },

    button: {
      backgroundColor: 'green',
      borderRadius: 5,
      padding: 10,
      width: 200,
      alignSelf: 'center',
      marginTop: 20
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });
export default NearExpStockRPT;