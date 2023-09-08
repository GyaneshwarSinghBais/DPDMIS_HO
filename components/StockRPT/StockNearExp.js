import { View, Text, StyleSheet, SafeAreaView,TouchableOpacity,FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

import { useSelector } from 'react-redux';
import { fetchCategory, fetchNearExpStockReport } from '../Services/apiService';
import MyEXPDDL from '../MyEXPDDL';


const NearExpStockRPT = () => {
  
    const informaitonAboutUser = useSelector((state) => state.user);
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [ddlValue, setvalueddl] = useState(null);
    const [ddlitem, setitemddl] = useState(null);
    const [id, setId] = useState(informaitonAboutUser.facilityid);

    
  const fetchData = async (idm,value,crit) => {
    try {    
        alert("id:"+idm+" category:"+value+" Criteria:"+crit);
    const StockRPTEXP = await fetchNearExpStockReport(idm,value,crit) 
   alert(JSON.stringify(StockRPTEXP));  
  // alert(JSON.stringify(StockRPTEXP));  
   setData(StockRPTEXP);
    } catch (error) {
      console.error('Error:', error);
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
  
 
  
    if(value == 0 || value == null)
    {
      alert("Please Category")
      return;
    }

    alert("CatID:"+value);
   
   fetchData(id,value,"120");
    //generate code
     
   // alert("successfully generated")

  }
  const fetchCategoryDropDown = async () => {
    try {
      const response = await fetchCategory(id);
     // alert(JSON.stringify(response));  
      setData(response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {    
    fetchCategoryDropDown();
     //   fetchData();
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
    <SafeAreaView style={styles.container}>
    <View style={styles.card}>
    <Text style={styles.cardHeader}>Near Expiry Items</Text>
        
    <View style={{ zIndex: 1000 }} >
            {data.length > 0 ? (
              <DropDownPicker
                open={open}
                value={value}
                searchable={true}
                items={data.map((Cat) => (
                  {
                    label: Cat.categoryname,
                    value: Cat.categoryid,
                  }))}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setData}
                // defaultValue={selectedItem ? selectedItem.value : null}
                containerStyle={{ height: 40 }}
                onChangeValue={(value) => {

                }
                }
                dropDownContainerStyle={{ elevation: 1000, zIndex: 1000 }}
              />
            ) : (
              <Text>Loading data...</Text>
            )
            }
          </View>

          
          <View style={styles.container2}>
          <Text style={styles.cardHeader}>Select Period</Text> 
      <MyEXPDDL /> {/* Render your dropdown component here */}
    </View>
    <View style={styles.cell}>
            <TouchableOpacity style={styles.button} onPress={() => ShowExpData(id)

            }>
    <Text style={styles.buttonTextGenrate}>Show</Text>
  </TouchableOpacity>            
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

    </SafeAreaView>
      </>

  );
}

  const styles = StyleSheet.create
  ({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
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
        alignSelf:'center'
      },
  
      button: {
        backgroundColor: 'green',
        borderRadius: 5,
        padding: 10,
        width:200,
        alignSelf:'center',
        marginTop:20
      },
      buttonText: {
        color: 'white',
        fontWeight: 'bold',
      },
  });
  export default NearExpStockRPT;
