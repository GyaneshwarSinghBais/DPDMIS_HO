import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import { fetchItemStock, fetchWardIssueItems } from '../Services/apiService';


const NewWardIssue = (props) => {
  const informaitonAboutUser = useSelector((state) => state.user);
  const [selectedItem, setSelectedItem] = useState(null);  
  const [data, setData] = useState([]);
  const [itemStockData, setItemStockData] = useState([]);
  const [id, setId] = useState(informaitonAboutUser.facilityid);
  // const [stockQty, setStockQty] = useState(null);
  // const [multipleInfo, setMultipleInfo] = useState(null);
  const [issueQty, setIssueQty] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [oldValue, setOldValue] = useState(); 
  const [isItemStockDatSet, setIsItemStockDatSet] = useState(false);

  const handleSelect = (item) => {
   // alert("selected change");
    setSelectedItem(item);
  };

  const fetchData = async () => {
    try {
      const response = await fetchWardIssueItems(id);
      //alert(JSON.stringify(response));         
      setData(response);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const fetchDataItemStock = async () => {
    try {
      //alert("function called, id : " + id + "value : " + value);
      const response = await fetchItemStock(id, value);
      //alert("response : " + JSON.stringify(response)); 
      setItemStockData(response);
      //alert("itemStockData : " + JSON.stringify(itemStockData))
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();     
  }, []);

  // useEffect(()=>{
  //   if(itemStockData.length > 0){
  //     alert("itemStockData update : " + JSON.stringify(itemStockData));       
  //     alert("itemStockData.itemid : "+ JSON.stringify(itemStockData[0].itemid))       
  //     setIsItemStockDatSet(true);
  //   }
  // },[itemStockData]);


  

  // <View style={styles.cell}>
  //       <Text style={styles.cellText}>{index+1}</Text>
  //     </View>

  //     <View style={styles.cell}>
  //       <Text style={styles.cellText}>{item.wardName}</Text>
  //     </View>

  //     <View style={styles.cell}>
  //       <Text style={styles.cellText}>{item.wRequestBy}</Text>
  //     </View>

  //     <View style={styles.cell}>
  //       <Text style={styles.cellText}>{item.wRequestDate}</Text>
  //     </View>

  //     <View style={styles.cell}>
  //       <Text style={styles.cellText}>{item.issueDate}</Text>
  //     </View>

  //     <View style={styles.cell}>
  //       <Text style={styles.cellText}>{item.issueNo}</Text>
  //     </View>

  const route = useRoute();
  const wardName = route.params?.item.wardName;
  const wRequestBy = route.params?.item.wRequestBy;
  const wRequestDate = route.params?.item.wRequestDate;
  const issueDate = route.params?.item.issueDate;
  const issueNo = route.params?.item.issueNo;
  const issueID = route.params?.item.issueID;

  const IssueQtyEvent = () => {
    // Check if issueQty is not null and is a valid number
    if (issueQty !== null && !isNaN(issueQty)) {
      const parsedQty = Number(issueQty);
      const stockQty = itemStockData[0].stock;
  
      // Check if issueQty is within the stockQty limit
      if (parsedQty <= stockQty) {
        // Your logic to save data can be placed here
        // For example: saveData(parsedQty);
  
        // Clear issueQty after successful validation and data saving
        setIssueQty(null);
      } else {
        // Display an alert or update the UI to indicate an error
        alert("Issue quantity cannot exceed stock quantity.");
      }
    } else {
      // Display an alert or update the UI to indicate an error
      alert("Please enter a valid issue quantity.");
    }
  };
  
  // ... (other parts of your code)
  
  <TouchableOpacity style={styles.button} onPress={IssueQtyEvent}>
    <Text style={styles.buttonText}>Add</Text>
  </TouchableOpacity>
  

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardHeader}>Issue Details</Text>
        <View style={styles.cardContent}>
          <View style={styles.cardItem}>
            <Text style={styles.label}>Ward Name:</Text>
            <Text style={styles.value}>{wardName}</Text>
          </View>
          <View style={styles.cardItem}>
            <Text style={styles.label}>Requested By:</Text>
            <Text style={styles.value}>{wRequestBy}</Text>
          </View>
          <View style={styles.cardItem}>
            <Text style={styles.label}>Request Date:</Text>
            <Text style={styles.value}>{wRequestDate}</Text>
          </View>
          <View style={styles.cardItem}>
            <Text style={styles.label}>Issue Date:</Text>
            <Text style={styles.value}>{issueDate}</Text>
          </View>
          <View style={styles.cardItem}>
            <Text style={styles.label}>Issue No:</Text>
            <Text style={styles.value}>{issueNo}</Text>
          </View>
        </View>
      </View>

      <Text>
        {/* Value : {value}  Data: {open} */}
        {/* Selected Item: {selectedItem ? selectedItem.label : 'None'} */}
      </Text>
      {data.length > 0 ? (
        <DropDownPicker
          open={open}
          value={value}
          searchable={true}
          items={data.map((item) => (
            {
              label: item.name,
              value: item.itemid,
            }))}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setData}
          // defaultValue={selectedItem ? selectedItem.value : null}
          containerStyle={{ height: 40 }}

          onChangeValue={(value) => {
            if (value != null) {
              setOldValue(value);
              if (value != oldValue) {  
                //alert("onchangeValue Called, after it fetchDataItemStock() will be called")             
                fetchDataItemStock();
              }

            }

          }}

        />
      ) : (
        <Text>Loading data...</Text>
      )
      }


{itemStockData.length > 0 ? (
      <View style={styles.card}>
        <Text style={styles.cardHeader}>Item Details</Text>
        <View style={styles.cardContent}>
          <View style={styles.cardItem}>
            <Text style={styles.label}>Stock QTY: </Text>
            <Text style={styles.value}>{itemStockData[0].stock}</Text>
          </View>
          <View style={styles.cardItem}>
            <Text style={styles.label}>Multiple:</Text>
            <Text style={styles.value}>{itemStockData[0].multiple}</Text>
          </View>              
        </View>

        <View style={styles.inputContainer}>
        <Text style={styles.label} >To Be Issued : </Text>
        <TextInput
          style={styles.input}
          placeholder="Issue QTY"
          keyboardType="numeric"
          onChangeText={text => setIssueQty(text)}
          value={issueQty}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={()=>IssueQtyEvent()}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>

      </View>):(
        <Text>
          {/* Loding Item Details ... */}
          </Text>
      )}

      

    </View>
  )
}

//NewWardIssue.propTypes = {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  card: {
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  cardHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  cardContent: {
    flexDirection: 'column',
  },
  cardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
  },
  value: {
    flex: 1,
    textAlign: 'right',
  },
  selectedItem: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    alignSelf: 'center',
    padding: 10,
    backgroundColor: '#3377FF',
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

export default NewWardIssue