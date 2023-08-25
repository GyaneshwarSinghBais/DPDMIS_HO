import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
//import SearchableDropdown from './SearchableDropdown';
import DropDownPicker from 'react-native-dropdown-picker';
import { fetchItemStock, fetchWardIssueItems } from '../Services/apiService';


const NewWardIssue = (props) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const informaitonAboutUser = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [itemStockData, setItemStockData] = useState([]);
  const [id, setId] = useState(informaitonAboutUser.facilityid);

  const [stockQty, setStockQty] = useState(null);
  const [multipleInfo, setMultipleInfo] = useState(null);
  const [issueQty, setIssueQty] = useState(null);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [label, setLabel] = useState(null);
  const [oldValue, setOldValue] = useState();

  const handleSelect = (item) => {
    alert("selected change");
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
      alert("called");
      const response = await fetchItemStock(id, value);
      //alert(JSON.stringify(response));         
      setItemStockData(response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
    //alert(JSON.stringify(data)); 
  }, []
  );

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
        Value : {value}  Data: {open}
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
            if(value != null)
            {
              oldValue = value;
              if(value != value)
              {
                alert("gyan");
              }
             
            }
           
          }}

        />
      ) : (
        <Text>Loading data...</Text>
      )}

      

{/* const [stockQty, setStockQty] = useState(null);
  const [multipleInfo, setMultipleInfo] = useState(null);
  const [issueQty, setIssueQty] = useState(null); */}


<View style={styles.inputContainer}>
<Text>Stock QTY</Text>
<TextInput
          style={styles.input}
          placeholder="Stock QTY"
          onChangeText={text => setStockQty(text)}
          value={stockQty}
        />
</View>
<View style={styles.inputContainer}>
<Text>Multiple</Text>
<TextInput
          style={styles.input}
          placeholder="Multiple"
          onChangeText={text => setMultipleInfo(text)}
          value={multipleInfo}
        />
</View>
<View style={styles.inputContainer}>
<Text>To Be Issued</Text>
<TextInput
          style={styles.input}
          placeholder="Issue QTY"
          onChangeText={text => setIssueQty(text)}
          value={issueQty}
        />
</View>
      <TouchableOpacity style={styles.button} onPress={fetchDataItemStock}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>


      {/* <SearchableDropdown
        data={data}
        onSelect={handleSelect}
      /> */}



    </View>
  )
}

//NewWardIssue.propTypes = {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    padding: 16,
    width: '80%',
    // marginBottom: 600,
    marginTop: -500,
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
});

export default NewWardIssue