import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { fetchStockReport, fetchfacstockReportddl } from './Services/apiService';
import DropDownPicker from 'react-native-dropdown-picker';
const StockReportFacility = () => {
  const informaitonAboutUser = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [id, setId] = useState(informaitonAboutUser.facilityid);

  const [dataDDL, setDataDDL] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [oldValue, setOldValue] = useState();
    

  const fetchData = async () => {
    if (value == 0 || value == null) {
      alert("Please Select Item")
      return;
    }
    try {     
     // alert("itemid sukhdev:"+value);
    const stockReportData = await fetchStockReport(id,value,"V");    
    setData(stockReportData);
    
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const fetchDataDrugs = async () => {
    try {     
      //alert("itemid drugs:"+value);
    const stockReportData = await fetchStockReport(id,"0","D");    
    setData(stockReportData);
    fetchDataDDL();
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const fetchDataCons = async () => {
    try {     
    //  alert("itemid consumables:"+value);
    const stockReportData = await fetchStockReport(id,"0","C");    
    setData(stockReportData);
    fetchDataDDL();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchDataDDL = async () => {
    try {     
    const stockReportDataDDL = await fetchfacstockReportddl(id);    
    setDataDDL(stockReportDataDDL);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  useEffect(() => { 
    fetchDataDDL();   
        //fetchData();
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
        <Text style={styles.cellText}>{index + 1}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.edlType}</Text>
      </View>
      
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
    <View>
<Text></Text>
<Text></Text>
</View>   
<View style={{ zIndex: 1000 }} >
            {dataDDL.length > 0 ? (
              <DropDownPicker
                open={open}
                value={value}
                searchable={true}
                items={dataDDL.map((item) => (
                  {
                    label: item.name,
                    value: item.itemid,
                  }))}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setData}
                containerStyle={{ height: 30 }}
                onChangeValue={(value) => {
                  if (value != null) {
                    setOldValue(value);
                 
                    if (value != oldValue) {
                     // fetchDataItemStock();
                     fetchData();
                    }

                  }

                }}
                dropDownContainerStyle={{ elevation: 1000, zIndex: 1000 }}
              />
            ) : (
              <Text>Loading data...</Text>
            )
            }
          </View>
<View>
<Text></Text>
<Text></Text>
</View>
<View style={StyleSheet.flatten([styles.cardItemRow, { justifyContent: 'space-between', flexDirection: 'row', marginTop:-10 }])}>
          <TouchableOpacity style={styles.button} onPress={fetchData}>
          <Text style={styles.buttonText}>Show</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={fetchDataDrugs}>
          <Text style={styles.buttonText}>Drugs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={fetchDataCons}>
          <Text style={styles.buttonText}>Consumables</Text>
        </TouchableOpacity>
        </View>
      <View style={styles.header}> 
      <Text style={styles.headerText}>SN</Text> 
      <Text style={styles.headerText}>Type</Text>     
        <Text style={styles.headerText}>Code</Text>
        <Text style={styles.headerText}>Item</Text>        
      
        <Text style={styles.headerText}>Stock</Text>      
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
    marginTop: -25,  
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  inputContainer: {
    flexDirection: 'row',

    paddingHorizontal: 10,
    
  },
  button: {

   
    paddingVertical: 10,
    backgroundColor: '#3377FF',
    borderRadius: 5,
    width:100,
   // alignItems: 'right',
    textAlign: 'center', 
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    alignSelf: 'center',
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
  },
  cellText: {
    fontSize: 14,
  },
  cardItemRow: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

});

export default StockReportFacility;
