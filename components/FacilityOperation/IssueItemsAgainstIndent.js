import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Button, Dialog, Portal, PaperProvider } from 'react-native-paper';
//import { ScrollView } from 'react-native-virtualized-view'
//import { useNavigation } from '@react-navigation/native';
import { deleteIncompleteIssueItems, deleteWardIssues, fetchIncompleteWardIssueItems, fetchIndentItems, fetchItemStock, fetchWardIssueItems, postWardIssue, putCompleteWardIssues } from '../Services/apiService';


const IssueItemsAgainstIndent = ({ navigation, props }) => {
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

  const [visible, setVisible] = React.useState(true);

  const hideDialog = () => setVisible(false);

  const route = useRoute();
  //const navigation = useNavigation();

  //Successfully run on SAVE
  // const wardName = route.params?.item.wardName;
  // const wRequestBy = route.params?.item.wRequestBy;
  // const wrequestdate = route.params?.item.wrequestdate;
  // const issueDate = route.params?.item.issueDate;
  // const issueNo = route.params?.item.issueNo;
  // const issueID = route.params?.item.issueID;
  // const indentid = route.params?.item.indentid;

  //Successfully run on IN
  // const wardName = route.params?.item.wardname;
  // const wRequestBy = route.params?.item.wrequestby;
  // const wrequestdate = route.params?.item.wrequestdate;
  // const issueDate = route.params?.item.issuedate;
  // const issueNo = route.params?.item.issueno;
  // const issueID = route.params?.item.issueid;
  // const indentid = route.params?.item.indentid;



  const WARDNAME = route.params?.item.wardname;
  const WREQUESTBY = route.params?.item.wrequestby;
  const wrequestdate = route.params?.item.wrequestdate;
  const ISSUEDATE = route.params?.item.issuedate;
  const ISSUENO = route.params?.item.issueno;
  const ISSUEID = route.params?.item.issueid;
  const INDENTID = route.params?.item.indentid;

  const handleSelect = (item) => {
    // alert("selected change");
    setSelectedItem(item);
  };

  const IssueQtyEvent = async () => {
    if (issueQty !== null && !isNaN(issueQty) && issueQty !== 0) {
      const parsedQty = Number(issueQty);
      const stockQty = itemStockData[0].stock;

      if (parsedQty > Number(itemStockData[0].indentqty)) {
        alert("Issue quantity cannot be more than indent quantity.");
        return;
      }

      // alert("issueQty"+issueQty);
      // alert("itemStockData[0].multiple"+itemStockData[0].multiple);


      const myReminder = (issueQty % itemStockData[0].multiple);


      if (myReminder == 0) {


        if (parsedQty <= stockQty) {
          try {
            const issueData = {
              issueitemid: 0, // It's auto-generated
              issueid: ISSUEID, // Value from route params
              itemid: value, // Selected item value
              currentstock: itemStockData[0].stock, // Stock quantity
              allotted: parsedQty, // Allotted quantity (same as issueQty)
              issueqty: parsedQty, // Issue quantity
            };


            const response = await postWardIssue(issueData, id);
            getIncompleteWardIssueItems();
            setIssueQty(null);
            fetchData();
            alert("Successfull Issued " + parsedQty + " Quantity");
          }
          catch (error) {
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


  const deleteIncompIssueItems = async (isueItmId) => {
    try {
      //alert("isueItmId : "+isueItmId)
      const response = await deleteIncompleteIssueItems(isueItmId);
      setdeleteData(response);
      fetchData();
      getIncompleteWardIssueItems();
      alert("Item Deleted Successfully.");
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const fetchData = async () => {
    try {
      //alert("Indent Id: " + INDENTID);
      const response = await fetchIndentItems(INDENTID);
      //alert(JSON.stringify(response));         
      setData(response);
    } catch (error) {
      console.error('Error:', error);
    }
  };



  const fetchDataItemStock = async () => {
    try {
      const response = await fetchItemStock(id, value, INDENTID);
      setItemStockData(response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getIncompleteWardIssueItems = async () => {
    try {
      const response = await fetchIncompleteWardIssueItems(ISSUEID);

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

      <View >
        {/* <Text   onPress={() => deleteIncompIssueItems(item.issueItemID)} style={styles.buttonTextDelete}>Delete</Text> */}
        <Button icon="delete" mode="contained-tonal" buttonColor="#ff0000" textColor="#FFFFFF" onPress={() => deleteIncompIssueItems(item.issueItemID)} />
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
  //       <Text style={styles.cellText}>{item.wrequestdate}</Text>
  //     </View>

  //     <View style={styles.cell}>
  //       <Text style={styles.cellText}>{item.issueDate}</Text>
  //     </View>

  //     <View style={styles.cell}>
  //       <Text style={styles.cellText}>{item.issueNo}</Text>
  //     </View>

  const fnComplete = async () => {
    try {

      const response = await putCompleteWardIssues(ISSUEID);
      alert("Completed Sucessfully !!");
      navigation.navigate("Ward Issue Against Indent");
    } catch (error) {
      console.error('Error:', error);
    }

  }

  const fnDelete = async () => {
    try {
      const response = await deleteWardIssues(ISSUEID);
      alert("Deleted Sucessfully !!");
      navigation.navigate("Ward Issue Against Indent");
      //setData(response);
    } catch (error) {
      console.error('Error:', error);
    }
    //navigation.navigate("Ward Issue Against Indent");   
  }



  // const fnDeleteWardIssues = async () => {

  // };






  // ... (other parts of your code)

  <TouchableOpacity style={styles.button} onPress={IssueQtyEvent}>
    <Text style={styles.buttonText}>Add</Text>
  </TouchableOpacity>


  return (
    <>
      <SafeAreaView style={styles.container} >
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
            {/* <Text style={styles.cardHeader}>Ward Issues Against Indent</Text> */}
            <View style={styles.cardContent}>
              <View style={styles.cardItem}>
                <Text style={styles.label}>Ward Name:</Text>
                <Text style={styles.value}>{WARDNAME}</Text>
              </View>
              <View style={styles.cardItem}>
                <Text style={styles.label}>Issue Date:</Text>
                <Text style={styles.value}>{ISSUEDATE}</Text>
              </View>
              <View style={styles.cardItem}>
                <Text style={styles.label}>Issue No:</Text>
                <Text style={styles.value}>{ISSUENO}</Text>
              </View>
              {/* <View style={styles.cardItem}>
                <Text style={styles.label}>Issue Id:</Text>
                <Text style={styles.value}>{ISSUEID}</Text>
              </View>
              <View style={styles.cardItem}>
                <Text style={styles.label}>Indent Id:</Text>
                <Text style={styles.value}>{INDENTID}</Text>
              </View> */}
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
                  <Text style={styles.labelRow}>Indent: </Text>
                  <Text style={styles.valueStock}>{itemStockData[0].indentqty}</Text>
                  <Text>  |  </Text>
                  <Text style={styles.labelRow}>Stock: </Text>
                  <Text style={styles.valueStock}>{itemStockData[0].stock}</Text>
                  <Text>  |   </Text>
                  <Text style={styles.labelRow}>Multiple:</Text>
                  <Text style={styles.valueStock}>{itemStockData[0].multiple}</Text>
                </View>
                {/* <View style={StyleSheet.flatten([styles.cardItemRow, { justifyContent: 'space-between', flexDirection: 'row' }])}>
                  <Text style={styles.labelRow}>Indent QTY: </Text>
                  <Text style={styles.valueStock}>{itemStockData[0].indentqty}</Text>
                  <Text>     </Text>    
                  <Text>     </Text>    
                  <Text>     </Text>               
                </View> */}
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
            <View style={{ flex: 1 }}>
              <FlatList
                data={incompleteWardIssueItemsData}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderItem}
              />
            </View>
          </View>


        </View>

        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {/* style={styles.cardItem} */}
            <View>
              <Button icon="file-check" mode="contained-tonal" buttonColor="#097969" textColor="#FFFFFF" onPress={() => fnComplete()}>
                Complete
              </Button>
            </View>
            <View>
              <Button icon="delete" mode="contained-tonal" buttonColor="#ff0000" textColor="#FFFFFF" onPress={() => fnDelete()}>
                Delete
              </Button>
            </View>
          </View>
        </View>
      </SafeAreaView>

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Actions>
            <Button onPress={() => console.log('Cancel')} style={{color:'red'}}>Cancel</Button>
            <Button onPress={() => console.log('Ok')}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
    fontSize: 12
  },
  value: {
    flex: 1,
    textAlign: 'right',
    fontSize: 11,
  },
  valueStock: {
    flex: 1,
    textAlign: 'right',
    fontSize: 12,
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
  buttonComplete: {
    alignSelf: 'center',
    padding: 10,
    backgroundColor: '#097969',
    borderRadius: 5,
  },
  buttonDelete: {
    alignSelf: 'center',
    padding: 10,
    backgroundColor: '#D22B2B',
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

export default IssueItemsAgainstIndent