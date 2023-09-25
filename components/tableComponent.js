import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { fetchMainCategoryService, fetchWarehouseStockReport } from './Services/apiService';
import { useSelector } from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';

const TableComponent = () => {
  const informaitonAboutUser = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [id, setId] = useState('');
  const [facid, setFacid] = useState(informaitonAboutUser.facilityid);

  const [dataDDL, setDataDDL] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [oldValue, setOldValue] = useState();

  const fetchData = async () => {
    try {
      const response = await fetchWarehouseStockReport(id, facid, "0");
      setData(response);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const fetchDataWithMCAt = async () => {
    try {

      const response = await fetchWarehouseStockReport("0", facid, value);
      setData(response);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const fetchMainCategory = async () => {
    try {
      //alert("main Cat:"+facid);
      const stockReportDataDDL = await fetchMainCategoryService(facid);
      setDataDDL(stockReportDataDDL);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  useEffect(() => {
    fetchMainCategory();
  }, []
  );

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
        <Text style={styles.cellText}>{item.itemname}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.sku}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.readyforissue}</Text>
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

      <View style={StyleSheet.flatten([{ justifyContent: 'space-between', flexDirection: 'row', zIndex: 1000 }])} >
        {dataDDL.length > 0 ? (
          <DropDownPicker
            open={open}
            value={value}
            searchable={false}
            items={dataDDL.map((item) => (
              {
                label: item.categoryname,
                value: item.categoryid,
              }))}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setData}
            containerStyle={{ height: 20, width: 200, }}
            onChangeValue={(value) => {
              if (value != null) {
                setOldValue(value);

                if (value != oldValue) {
                  // fetchDataItemStock();
                  //  fetchData();
                }

              }

            }}
            dropDownContainerStyle={{ elevation: 1000, zIndex: 500 }}
          />
        ) : (
          <Text>Loading data...</Text>
        )

        }

        <TouchableOpacity style={styles.buttonAll} onPress={fetchDataWithMCAt}>
          <Text style={styles.buttonTextAll}>Show All</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text></Text>
        <Text></Text>
      </View>

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
        <Text style={styles.headerText}>Ready</Text>
        <Text style={styles.headerText}>UQC</Text>
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
    // alignItems: 'center',
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

  buttonAll: {

    //marginTop: 40,
    paddingVertical: 10,
    backgroundColor: '#3377FF',
    borderRadius: 5,
    width: 100,
    textAlign: 'center',
   
  },
  buttonTextAll: {
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
    // alignItems: 'center',
  },
  cellText: {
    fontSize: 14,
  },
  cardItemRow: {
    flexDirection: 'row',
    //alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
});

export default TableComponent;
