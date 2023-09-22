import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, SafeAreaView, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Button, Dialog, Portal } from 'react-native-paper';
//import { ScrollView } from 'react-native-virtualized-view'
//import { useNavigation } from '@react-navigation/native';
import { deleteIncompleteIssueItems, deleteReceipts, deleteWardIssues, fetchIncompleteWardIssueItems, fetchIndentItems, fetchItemStock, fetchRacks, fetchReceiptDetails, fetchReceiptItemsDDL, fetchReceiptItemsDetail, fetchReceiptItms, fetchWardIssueItems, postWardIssue, putCompleteWardIssues, putReceipts } from '../Services/apiService';



const WHReceiptItems = ({ navigation, props }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const informaitonAboutUser = useSelector((state) => state.user);
  const [selectedItem, setSelectedItem] = useState(null);
  const [data, setData] = useState([]);
  const [FlatListData, setFlatListData] = useState([]);
  //const [deleteData, setdeleteData] = useState([]);
  const [itemStockData, setItemStockData] = useState([]);
  const [id, setId] = useState(informaitonAboutUser.facilityid);
  const [stockQty, setStockQty] = useState(null);
  // const [multipleInfo, setMultipleInfo] = useState(null);
  const [issueQty, setIssueQty] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [oldValue, setOldValue] = useState();
  const [inwno, setinwno] = useState();
  const [isItemStockDatSet, setIsItemStockDatSet] = useState(false);
  const [receivedItemsGrid, setReceivedItemsGrid] = useState([]);
  const [visible, setVisible] = React.useState(true);
  const [receiptitems, setReceiptitems] = useState([]);

  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [oldValue1, setOldValue1] = useState();
  const [racks, setRacks] = useState([]);
 
  //const [receiptDetails, setReceiptDetails] = useState([]);

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



  // const WARDNAME = route.params?.item.wardname;
  // const WREQUESTBY = route.params?.item.wrequestby;
  // const wrequestdate = route.params?.item.wrequestdate;
  const RDATE = route.params?.item.facreceiptdate;
  const RNO = route.params?.item.facreceiptno;
  const WHID = route.params?.item.warehouseid;
  const RECEIPTID = route.params?.item.facreceiptid;
  const INDENTID = route.params?.item.indentid;

  const handleSelect = (item) => {
    // alert("selected change");
    setSelectedItem(item);
  };

  const ReceiveQtyEvent = async () => {
   

      if (value1 == 0 || value1 == null) {
        alert("Please Select Rack")
        return;
      }



      


     

      
          try {
            const receiptData = {
              facreceiptitemid: 0,
              facreceiptid: RECEIPTID
             // itemid: 0, //get value api side
             // indentitemid: 2163804,
             // absrqty: 1800
            };


            alert("Before posting: "+ JSON.stringify(receiptData) + "value1: " + value1 + "value: " + value);
            const response = await fetchReceiptItms(receiptData, value1, id, RECEIPTID, value);  
            fetchReceiptItems();
            fetchRcptDetails();
            alert("Item Successfull Received ");
          }
          catch (error) {
            console.error("Error posting issue:", error);
          }
       
      
   
  };


  const deleteReceiptItems = async (itm) => {
    try {
      alert("before api call : "+ JSON.stringify(itm))
      const response = await deleteReceiptItems(itm.inwno,itm.facreceiptitemid,itm.itemid,itm.facreceiptid,itm.absrqty);
      setdeleteData(response);
      fetchRcptDetails();
      alert("Item Deleted Successfully.");
    } catch (error) {
      console.error('Error:', error);
    }
  };






  const fetchReceiptItems = async () => {
    try {

      const response = await fetchReceiptItemsDDL(id, RECEIPTID, INDENTID);
      setReceiptitems(response);
      //alert("id: "+ id);  
      //alert("RECEIPTID: "+RECEIPTID);  
      //alert("INDENTID: "+INDENTID);  
      //alert(" inside fetchReceiptitems: " + JSON.stringify(response));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchRacksData = async () => {
    try {
      const response = await fetchRacks(id);
      setRacks(response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchRcptDetails = async () => {
    try {
      const response = await fetchReceiptDetails("NO",id,RECEIPTID);
      setReceivedItemsGrid(response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

 

  const fetchReceiptItemsDetailData = async () => {
    try {
      alert("id: " + id + "RECEIPTID: " + RECEIPTID + "inwno: " + inwno);
      const response = await fetchReceiptItemsDetail(id, RECEIPTID, INDENTID, "231832");
      setItemStockData(response);
      //alert("GetDataFroMDDL_Selection: "+response);  
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchReceiptItems();
    fetchReceiptItemsDetailData();
    fetchRcptDetails();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    fetchReceiptItems();
    fetchRcptDetails();
    //fetchRcptDetails();
  }, []);


  const renderItem = ({ item, index }) => (
    <View
      style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow, styles.rowWithBorder]}
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
        <Text style={styles.cellText}>{item.batchno}</Text>
      </View>

      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.absrqty}</Text>
      </View>

      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.expdate}</Text>
      </View>

      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.locationno}</Text>
      </View>

      <View >       
        <Button icon="delete" mode="contained-tonal" buttonColor="#ff0000" textColor="#FFFFFF" onPress={() => deleteReceiptItems(item)} />
      </View>
      <View style={styles.cell}>
        <Text onPress={() => navigateFunction(item)} style={styles.cellText}>{item.status}</Text>
      </View>

    </View>


  );

  useEffect(() => {
    if (itemStockData.length > 0) {
      // alert("itemStockData update : " + JSON.stringify(itemStockData));
      // alert("itemStockData.itemid : " + JSON.stringify(itemStockData[0].itemid))
      setIsItemStockDatSet(true);
      fetchRcptDetails();
    }
  }, [itemStockData]);




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

      const response = await putReceipts(RECEIPTID);
      alert("Completed Sucessfully !!");
      navigation.navigate("Receipt From Warehouse");
    } catch (error) {
      console.error('Error:', error);
    }

  }

  const fnDelete = async () => {
    try {
      const response = await deleteReceipts(RECEIPTID);
      alert("Deleted Sucessfully !!");
      navigation.navigate("Receipt From Warehouse");
      //setData(response);
    } catch (error) {
      console.error('Error:', error);
    }
   // navigation.navigate("Ward Issue Against Indent");   
  }



  // const fnDeleteWardIssues = async () => {

  // };






  // ... (other parts of your code)

  <TouchableOpacity style={styles.button} onPress={ReceiveQtyEvent}>
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

          <View style={styles.card} refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
            {/* <Text style={styles.cardHeader}>Ward Issues Against Indent</Text> */}
            <View style={styles.cardContent}>
              {/* <View style={styles.cardItem}>
                <Text style={styles.label}>Ward Name:</Text>
                <Text style={styles.value}>{WARDNAME}</Text>
              </View> */}
              <View style={styles.cardItem}>
                <Text style={styles.label}>Receipt Date:</Text>
                <Text style={styles.value}>{RDATE}</Text>
              </View>
              <View style={styles.cardItem}>
                <Text style={styles.label}>Receipt No:</Text>
                <Text style={styles.value}>{RNO}</Text>
              </View>
              <View style={styles.cardItem}>
                <Text style={styles.label}>Receipt Id:</Text>
                <Text style={styles.value}>{RECEIPTID}</Text>
              </View>
              <View style={styles.cardItem}>
                <Text style={styles.label}>Indent Id:</Text>
                <Text style={styles.value}>{INDENTID}</Text>
              </View>
            </View>
          </View>

          <Text>
            {/* Value : {value}  Data: {open} */}
            {/* Selected Item: {selectedItem ? selectedItem.label : 'None'} */}
          </Text>

          <View style={{ zIndex: 1000 }} >
            {receiptitems.length > 0 ? (
              <DropDownPicker
                open={open}
                value={value}
                searchable={true}
                items={receiptitems.map((item) => (
                  {
                    label: item.name,
                    value: item.inwno,
                  }))}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setReceiptitems}
                // defaultValue={selectedItem ? selectedItem.value : null}
                containerStyle={{ height: 40 }}
                onChangeValue={(value) => {
                  if (value != null) {
                    setOldValue(value);
                    setinwno(value);
                    if (value != oldValue) {
                      //alert("dropdown invoked");
                      fetchReceiptItemsDetailData();
                      fetchRacksData();
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
              <View style={styles.cardContent}>
                <View style={StyleSheet.flatten([styles.cardItemRow, { justifyContent: 'space-between', flexDirection: 'row' }])}>
                  <Text style={styles.labelRow}>Receipt QTY: </Text>
                  <Text style={styles.valueStock}>{itemStockData[0].name}</Text>
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label} >Rack : </Text>
              

                <View style={{ zIndex: 1000, width:175, marginRight:10 }} >
                  {receiptitems.length > 0 ? (
                    //Rack Dropdown
                    <DropDownPicker
                      open={open1}
                      value={value1}
                      searchable={true}
                      items={racks.map((item) => (
                        {
                          label: item.locationno, 
                          value: item.rackid, 
                        }))}
                      setOpen={setOpen1}
                      setValue={setValue1}
                      setItems={setRacks}
                      // defaultValue={selectedItem ? selectedItem.value : null}
                      containerStyle={{ height: 40 }}
                      onChangeValue={(value1) => {
                        if (value1 != null) {
                          setOldValue1(value);
                          //setinwno(value);
                          if (value1 != oldValue1) {
                            //alert("dropdown invoked");
                            //fetchReceiptItemsDetailData();
                            //incompleteWardIssueItemsData
                          }

                        }
                      }}
                      dropDownContainerStyle={{ elevation: 1000, zIndex: 1000 }}
                      dropDownPosition = "top"
                    />
                  ) : (
                    <Text>Loading data...</Text>
                  )
                  }
                </View>

                <TouchableOpacity style={styles.button} onPress={() => ReceiveQtyEvent()}>
                  <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
              </View>



            </View>) : (
            <View>
              <Text>

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
                data={receivedItemsGrid}
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

      {/* <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Actions>
            <Button onPress={() => console.log('Cancel')} style={{ color: 'red' }}>Cancel</Button>
            <Button onPress={() => console.log('Ok')}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal> */}
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

export default WHReceiptItems