import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

import { useSelector } from 'react-redux';
import { fetchCategory, fetchNearExpStockReport } from '../Services/apiService';
import { Button } from 'react-native-paper';


const NearExpStockRPT = () => {

  const informaitonAboutUser = useSelector((state) => state.user);
  const [selectedValue, setSelectedValue] = useState(null);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [ddlValue, setvalueddl] = useState(null);
  const [ddlitem, setitemddl] = useState(null);
  const [id, setId] = useState(informaitonAboutUser.facilityid);
  const [loading, setLoading] = useState(false);

  const options = [
    { label: '1 Month', value: '1' },
    { label: '2 Months', value: '2' },
    { label: '3 Months', value: '3' },
    { label: '4 Months', value: '4' },
    { label: '5 Months', value: '5' },
    { label: '6 Months', value: '6' },
  ];


  const fetchData = async (idm, value, crit) => {
    try {
      setLoading(true);
      alert("id:" + idm + " category:" + value + " Criteria:" + crit);
      const StockRPTEXP = await fetchNearExpStockReport(idm, value, crit)
      alert(JSON.stringify(StockRPTEXP));
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



    if (value == 0 || value == null) {
      alert("Please Category")
      return;
    }

    alert("CatID:" + value);

    fetchData(id, value, "120");
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

  const renderItem = ({ item, index }) => (
    <View
      style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow, styles.rowWithBorder]}
    >
      {/* <View style={styles.cell}>
        <Text style={styles.cellText}>{item.categoryName}</Text>
      </View> */}
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.itemcode}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.itemname}</Text>
      </View>

      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.strength1}</Text>
      </View>

      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.batchno}</Text>
      </View>


      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.expdate}</Text>
      </View>



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
                  items={options}
                  defaultValue={selectedValue}
                  containerStyle={{ height: 40 }}
                  style={{ backgroundColor: '#fafafa' }}
                  itemStyle={{
                    justifyContent: 'flex-start',
                  }}
                  dropDownStyle={{ backgroundColor: '#fafafa' }}
                  onChangeItem={(item) => setSelectedValue(item.value)}
                />
           

            </View>
            <View style={{ width: "25%", marginRight: 10, marginLeft: 0, marginBottom: 20 }}>
              {/* <TouchableOpacity style={styles.button} onPress={() => ShowExpData(id)}>
                <Text style={styles.buttonTextGenrate}>Show</Text>
              </TouchableOpacity> */}
              <Button
                mode="contained"
                icon="filter"
                buttonColor="#728FCE"
                textColor="#FFFFFF"
                labelStyle={styles.buttonLabel}
                loading={loading}
                onPress={() => ShowExpData(id)}
              >

              </Button>
            </View>
          </View>





          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Code</Text>
              <Text style={styles.headerText}>Item</Text>
              <Text style={styles.headerText}>Strength</Text>
              <Text style={styles.headerText}>Batch No</Text>
              <Text style={styles.headerText}>Exp Date</Text>
              <Text style={styles.headerText}>Stock</Text>
            </View>
            <FlatList
              data={data}
              keyExtractor={(_, index) => index.toString()}
              renderItem={renderItem}
            />
          </View>

        </View>

      </View>
    </>

  );
}

const styles = StyleSheet.create
  ({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
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
