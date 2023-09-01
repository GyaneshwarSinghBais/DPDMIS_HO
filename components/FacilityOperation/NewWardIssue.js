import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, ScrollView, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import { deleteIncompleteIssueItems, fetchIncompleteWardIssueItems, fetchItemStock, fetchWardIssueItems, postWardIssue } from '../Services/apiService';


const NewWardIssue = (props) => {
  const informaitonAboutUser = useSelector((state) => state.user);
  const [selectedItem, setSelectedItem] = useState(null);
  const [data, setData] = useState([]);
  const [FlatListData, setFlatListData] = useState([]);
  const [deleteData, setdeleteData] = useState([]);
  const [itemStockData, setItemStockData] = useState([]);
  const [id, setId] = useState(informaitonAboutUser.facilityid);
  // const [stockQty, setStockQty] = useState(null);
  // const [multipleInfo, setMultipleInfo] = useState(null);
  const [issueQty, setIssueQty] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [oldValue, setOldValue] = useState();
  //const [isItemStockDatSet, setIsItemStockDatSet] = useState(false);
  const [incompleteWardIssueItemsData, setIncompleteWardIssueItemsData] = useState([]);

  const handleSelect = (item) => {
    // alert("selected change");
    setSelectedItem(item);
  };


  const deleteIncompIssueItems = async (isueItmId) => {
    try {
      //alert("isueItmId : "+isueItmId)
      const response = await deleteIncompleteIssueItems(isueItmId);
      alert(JSON.stringify(response));         
      setdeleteData(response);
      alert("Item Deleted Successfully.");
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const fetchData = async () => {
    try {
      const response = await fetchWardIssueItems(id, issueID);
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

  const getIncompleteWardIssueItems = async () => {
    try {
      const response = await fetchIncompleteWardIssueItems(issueID);

      setIncompleteWardIssueItemsData(response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
    getIncompleteWardIssueItems();
  }, []);


  const renderItem = ({ item, index }) => (
    <View
      style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow, styles.rowWithBorder]}
    >

      <View style={styles.cell}>
        <Text style={styles.cellText}>{index + 1}</Text>
      </View>

      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.itemCode}</Text>
      </View>

      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.itemName}</Text>
      </View>

      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.issueQty}</Text>
      </View>

      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.batchno}</Text>
      </View>

      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.expdate}</Text>
      </View>

      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.locationno}</Text>
      </View>

      <View style={styles.cell}>
        <Text onPress={()=>deleteIncompIssueItems(item.issueItemID)}  style={styles.buttonTextDelete}>Delete</Text>
      </View>


      {/* <View style={styles.cell}>
        <Text onPress={()=>alert(item.issueID)} style={styles.cellText}>{item.status}</Text>
      </View> */}

      <View style={styles.cell}>
        <Text onPress={() => navigateFunction(item)} style={styles.cellText}>{item.status}</Text>
      </View>

    </View>


  );

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

  const IssueQtyEvent = async () => {
    if (issueQty !== null && !isNaN(issueQty) && issueQty !== 0) {
      const parsedQty = Number(issueQty);
      const stockQty = itemStockData[0].stock;

      // alert("issueQty"+issueQty);
      // alert("itemStockData[0].multiple"+itemStockData[0].multiple);
     

      const myReminder = (issueQty % itemStockData[0].multiple);
      

      if (myReminder == 0) {


        if (parsedQty <= stockQty) {
          try {
            const issueData = {
              issueitemid: 0, // It's auto-generated
              issueid: issueID, // Value from route params
              itemid: value, // Selected item value
              currentstock: itemStockData[0].stock, // Stock quantity
              allotted: parsedQty, // Allotted quantity (same as issueQty)
              issueqty: parsedQty, // Issue quantity
            };

           
            const response = await postWardIssue(issueData, id);          
            getIncompleteWardIssueItems();           
            setIssueQty(null);
            alert("Successfull Issued "+ parsedQty + " Quantity");
          } catch (error) {
            console.error("Error posting issue:", error);
          }
        }
        else {
          alert("Issue quantity cannot be more than stock quantity.");
        }
      } else {
        alert("Enter Quantity Shoud be Multiple of" + itemStockData[0].multiple);
      }
    } else {
      alert("Please Enter Valid Issue Quantity.");
      //alert("मेरा नाम जोकर हिट मूवी  ");
    }
  };

  // ... (other parts of your code)

  <TouchableOpacity style={styles.button} onPress={IssueQtyEvent}>
    <Text style={styles.buttonText}>Add</Text>
  </TouchableOpacity>


  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          {/* 
    <View style={styles.cardContent}>
              <View style={StyleSheet.flatten([styles.cardItemRow, { justifyContent: 'space-between', flexDirection:'row' }])}>
              
                <Text style={styles.labelRow}>Stock QTY: </Text>
                <Text style={styles.valueStock}>{itemStockData[0].stock}</Text>
              <Text>     </Text>
                <Text style={styles.labelRow}>Multiple:</Text>
                <Text style={styles.valueStock}>{itemStockData[0].multiple}</Text>
             
              </View> */}

          <View style={styles.card}>
            <Text style={styles.cardHeader}>Ward Issues</Text>
            <View style={styles.cardContent}>
              <View style={styles.cardItem}>
                <Text style={styles.label}>Ward Name:</Text>
                <Text style={styles.value}>{wardName}</Text>
              </View>
              <View style={styles.cardItem}>
                <Text style={styles.label}>Issue Date:</Text>
                <Text style={styles.value}>{issueDate}</Text>
              </View>
              <View style={styles.cardItem}>
                <Text style={styles.label}>Issue No:</Text>
                <Text style={styles.value}>{issueNo}</Text>
              </View>
              <View style={styles.cardItem}>
                <Text style={styles.label}>Issue Id:</Text>
                <Text style={styles.value}>{issueID}</Text>
              </View>
            </View>
          </View>

          <Text>
            {/* Value : {value}  Data: {open} */}
            {/* Selected Item: {selectedItem ? selectedItem.label : 'None'} */}
          </Text>

          <View style={{ zIndex: 1000 }} >
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
                      //incompleteWardIssueItemsData
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

        
            {itemStockData.length > 0 ? (
              <View style={styles.card}>
                {/* <Text style={styles.cardHeader}>Item Issuance</Text> */}
                <View style={styles.cardContent}>
                  <View style={StyleSheet.flatten([styles.cardItemRow, { justifyContent: 'space-between', flexDirection: 'row' }])}>

                    <Text style={styles.labelRow}>Stock QTY: </Text>
                    <Text style={styles.valueStock}>{itemStockData[0].stock}</Text>
                    <Text>     </Text>
                    <Text style={styles.labelRow}>Multiple:</Text>
                    <Text style={styles.valueStock}>{itemStockData[0].multiple}</Text>

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
                  <TouchableOpacity style={styles.button} onPress={() => IssueQtyEvent()}>
                    <Text style={styles.buttonText}>Add</Text>
                  </TouchableOpacity>
                </View>



              </View>) : (
              <View>
                <Text>
                  {/* Loding Item Details ... */}
                </Text>
              </View>
            )}

         
          {/* {showIncompleteWardIssueItems()} */}

          <View style={styles.containerGrid}>
            <View style={styles.header}>
              <Text style={styles.headerText}>S.No</Text>
              <Text style={styles.headerText}>Code</Text>
              <Text style={styles.headerText}>Item</Text>
              <Text style={styles.headerText}>Qty</Text>
              <Text style={styles.headerText}>Batch No.</Text>
              <Text style={styles.headerText}>Exp Date</Text>
              <Text style={styles.headerText}>Rack</Text>
              <Text style={styles.headerText}>Delete</Text>
            </View>
            <View style={{flex: 1}}>
              <FlatList
                data={incompleteWardIssueItemsData}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderItem}               
              />
            </View>
          </View>


        </View>
      </SafeAreaView>
    </>
  )
}


// const showIncompleteWardIssueItems = () => {
//   return(
//     <View style={styles.container}>     
//     <View style={styles.header}>   
//     <Text style={styles.headerText}>S.No</Text>    
//       <Text style={styles.headerText}>Ward</Text>
//       <Text style={styles.headerText}>Request By</Text>        
//       <Text style={styles.headerText}>Request Date</Text>
//       <Text style={styles.headerText}>Issue Date</Text>      
//       <Text style={styles.headerText}>Issue No</Text> 
//       <Text style={styles.headerText}>Status</Text> 
//     </View>
//     <FlatList
//       data={incompleteWardIssueItemsData}
//       keyExtractor={(_, index) => index.toString()}
//       renderItem={renderItem}
//     />
//   </View>

//)

//}


//NewWardIssue.propTypes = {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  containerGrid: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,

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
  cardItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  labelRow: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  value: {
    flex: 1,
    textAlign: 'right',
    fontSize: 11,
  },
  valueStock: {
    flex: 1,
    textAlign: 'right',
    fontSize: 15,
    color: '#0000FF',
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
  buttonTextDelete: {
    color: '#FF0000',
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
    margin: 5,
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
  cell: {
    flex: 1,
    alignItems: 'center',
    borderRightColor: '#CCCCCC',
    padding: 5,
  },
  cellText: {
    fontSize: 11,
  },

});

export default NewWardIssue