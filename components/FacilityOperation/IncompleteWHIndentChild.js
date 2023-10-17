import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Button, Dialog, Portal, PaperProvider } from 'react-native-paper';
//import { ScrollView } from 'react-native-virtualized-view'
//import { useNavigation } from '@react-navigation/native';
import { completemascgmscnoc, deleteCgmscNOCitems, deleteCgmscNOCitemsALL, deleteIncompleteIssueItems, deleteWardIssues, fetchFacMonthIndentItems, fetchIncompleteWardIssueItems, fetchIndentItems, fetchItemStock, fetchMainCategoryService, fetchSavedFacIndentItems, fetchStockPerEDL, fetchWardIssueItems, fetchfacIndentAlert1, postNOCitems, postWardIssue, putCompleteWardIssues } from '../Services/apiService';


const IncompleteWHIndentChild = ({ navigation, props }) => {
  const informaitonAboutUser = useSelector((state) => state.user);
  const [selectedItem, setSelectedItem] = useState(null);
  const [data, setData] = useState([]);
  const [FlatListData, setFlatListData] = useState([]);
  const [deleteData, setdeleteData] = useState([]);
  const [itemStockData, setItemStockData] = useState([]);
  const [id, setId] = useState(informaitonAboutUser.facilityid);
  // const [stockQty, setStockQty] = useState(null);
  // const [multipleInfo, setMultipleInfo] = useState(null);
  const [requestQty, setRequestQty] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [oldValue, setOldValue] = useState();

  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [oldValue1, setOldValue1] = useState();

  //const [isItemStockDatSet, setIsItemStockDatSet] = useState(false);
  const [savedFacilityIndentItemsData, setSavedFacilityIndentItemsData] = useState([]);
  const [monthIndentItemsData, setMonthIndentItemsData] = useState([]);
  const [indentAlertData, setIndentAlertData] = useState([]);

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



  //{"nocid":190796,"nositemsreq":15,"nosissued":0,"warehouseid":0,"reqDate":"05-OCT-23","reqno":"23413/NC00094/23-24","whissuedt":null,"istatus":"I","indentid":0,"facreceiptid":null}
  const REQUESTID = route.params?.item.nocid;
  const INDENTDATE = route.params?.item.reqDate;
  const INDENTNO = route.params?.item.reqno;
  const INDENTID = route.params?.item.indentid;


  const handleSelect = (item) => {
    // alert("selected change");
    setSelectedItem(item);
  };

  const RequestQtyEvent = async () => {
    if (requestQty !== null && !isNaN(requestQty) && requestQty !== 0) {
      const parsedQty = Number(requestQty);
      const stockQty = indentAlertData[0].facstock;

      // if (parsedQty > Number(indentAlertData[0].whready)) {
      //   alert("Request quantity cannot be more than Warehouse Stock Qty.");
      //   return;
      // }

      // alert("issueQty"+issueQty);
      // alert("itemStockData[0].multiple"+itemStockData[0].multiple);


      const myReminder = (requestQty % indentAlertData[0].unitcount);


      if (myReminder == 0) {



        try {
          const postData = {
            sr: 0,
            itemid: value1,
            nocid: REQUESTID,
            requestedqty: requestQty,
            whstock: indentAlertData[0].whready,
            //"cgmsclremarks": "test",
            status: "IN",
            //"approvedqty": 0,
            //"bookedqty": 1000,
            //"bookedflag": "B",
            stockinhand: indentAlertData[0].facstock
          };


          const response = await postNOCitems(postData);
          fetchSavedFacIndentItemsData();
          setRequestQty(null);
          fetchData();
          alert("Successfull Requested " + parsedQty + " Quantity");
        }
        catch (error) {
          console.error("Error posting request:", error);
        }

      } else {
        alert("Enter Quantity Shoud be Multiple of" + indentAlertData[0].unitcount);
      }
    } else {
      alert("Please Enter Valid Issue Quantity.");
    }
  };


  const deleteCgmscNOCitemsData = async (srid) => {
    try {    
      const response = await deleteCgmscNOCitems(srid);
      setdeleteData(response);
      fetchData();
      fetchSavedFacIndentItemsData();
      alert("Item Deleted Successfully.");
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const fetchData = async () => {
    try {
      //alert("Indent Id: " + INDENTID);
      const response = await fetchMainCategoryService(id);
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

  const fetchSavedFacIndentItemsData = async () => {
    try {
      //alert("before call 1" + route.params?.item.nocid);
      const response = await fetchSavedFacIndentItems(route.params?.item.nocid);
      setSavedFacilityIndentItemsData(response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchFacMonthIndentItemsData = async () => {
    try {
      //alert("fetchFacMonthIndentItemsData childPage", id);
      const response = await fetchFacMonthIndentItems(id, value, INDENTID);
      //setIncompleteWardIssueItemsData(response);
      setMonthIndentItemsData(response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchfacIndentAlert1Data = async () => {
    try {
      const response = await fetchfacIndentAlert1(id, value, 'NA', value1);
      setIndentAlertData(response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchSavedFacIndentItemsData();
  }, []);


  const renderItem = ({ item, index }) => (
    <View
      style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow, styles.rowWithBorder]}
    >

      <View style={styles.cell}>
        <Text style={styles.cellText}>{index + 1}</Text>
      </View>

      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.itemname}</Text>
      </View>

      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.stockinhand}</Text>
      </View>

      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.whindentQTY}</Text>
      </View>

      
      {/* <View style={styles.cell}>
        <Text onPress={()=>alert(item.issueID)} style={styles.cellText}>{item.status}</Text>
      </View> */}

      <View >
        {/* <Text   onPress={() => deleteIncompIssueItems(item.issueItemID)} style={styles.buttonTextDelete}>Delete</Text> */}
        <Button icon="delete" mode="contained-tonal" buttonColor="#ff0000" textColor="#FFFFFF" onPress={() => deleteCgmscNOCitemsData(item.sr)} />
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
alert("inside fnComplete: "+ route.params?.item.nocid)
      const response = await completemascgmscnoc(route.params?.item.nocid);
      alert("Completed Sucessfully !!");
      navigation.navigate("Indent to Warehouse");
    } catch (error) {
      console.error('Error:', error);
    }

  }

  const fnDelete = async () => {
    try {
      const response = await deleteCgmscNOCitemsALL(route.params?.item.nocid);
      alert("Deleted Sucessfully !!");
      navigation.navigate("Indent to Warehouse");
      //setData(response);
    } catch (error) {
      console.error('Error:', error);
    }
    //navigation.navigate("Ward Issue Against Indent");   
  }



  // const fnDeleteWardIssues = async () => {

  // };






  // ... (other parts of your code)

  <TouchableOpacity style={styles.button} onPress={RequestQtyEvent}>
    <Text style={styles.buttonText}>Request</Text>
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
                <Text style={styles.label}>Request Id:</Text>
                <Text style={styles.value}>{REQUESTID}</Text>
              </View>
              <View style={styles.cardItem}>
                <Text style={styles.label}>Indent Date:</Text>
                <Text style={styles.value}>{INDENTDATE}</Text>
              </View>
              <View style={styles.cardItem}>
                <Text style={styles.label}>Indent No:</Text>
                <Text style={styles.value}>{INDENTNO}</Text>
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

          <View style={{ zIndex: 1000, marginTop: 20 }} >
            {data.length > 0 ? (
              <DropDownPicker
                open={open}
                value={value}
                searchable={true}
                items={data.map((item) => (
                  {
                    label: item.categoryname,
                    value: item.categoryid,
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
                      fetchFacMonthIndentItemsData();
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


          <View style={{ zIndex: 1000, marginTop: 20 }} >
            {monthIndentItemsData.length > 0 ? (
              <DropDownPicker
                open={open1}
                value={value1}
                searchable={true}
                items={monthIndentItemsData.map((item) => (
                  {
                    label: item.name,
                    value: item.itemid,
                  }))}
                setOpen={setOpen1}
                setValue={setValue1}
                setItems={setMonthIndentItemsData}
                // defaultValue={selectedItem ? selectedItem.value : null}
                containerStyle={{ height: 40 }}
                onChangeValue={(value) => {
                  if (value != null) {
                    setOldValue1(value);

                    if (value != oldValue1) {
                      fetchfacIndentAlert1Data();
                      //fetchDataItemStock();
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


          {indentAlertData.length > 0 ? (
            <View style={styles.card}>
              {/* <Text style={styles.cardHeader}>Item Issuance</Text> */}
              <View style={styles.cardContent}>
                <View style={StyleSheet.flatten([styles.cardItemRow, { justifyContent: 'space-between', flexDirection: 'row' }])}>
                  <Text style={styles.labelRow}>Facility Stock: </Text>
                  <Text style={styles.valueStock}>{indentAlertData[0].facstock}</Text>
                  <Text>  |  </Text>
                  <Text style={styles.labelRow}>Warehouse Stock: </Text>
                  <Text style={styles.valueStock}>{indentAlertData[0].whready}</Text>
                  <Text>  |   </Text>
                  <Text style={styles.labelRow}>Unit Count:</Text>
                  <Text style={styles.valueStock}>{indentAlertData[0].unitcount}</Text>
                </View>
                <View style={StyleSheet.flatten([styles.cardItemRow, { justifyContent: 'space-between', flexDirection: 'row' }])}>
                  <Text style={styles.labelRow}>Annual Indent: </Text>
                  <Text style={styles.valueStock}>{indentAlertData[0].aifacility}</Text>
                  <Text>  |  </Text>
                  <Text style={styles.labelRow}>Balance AI: </Text>
                  <Text style={styles.valueStock}>{indentAlertData[0].balai}</Text>
                  <Text>  |  </Text>
                  <Text style={styles.labelRow}>Type: </Text>
                  <Text style={styles.valueStock}>{indentAlertData[0].itemtypename}</Text>

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
                <Text style={styles.label} >Request QTY : </Text>
                <TextInput
                  style={styles.input}
                  placeholder={"Multiple of:   X " + indentAlertData[0].unitcount}
                  keyboardType="numeric"
                  onChangeText={text => setRequestQty(text)}
                  value={requestQty}
                />
                <TouchableOpacity style={styles.button} onPress={() => RequestQtyEvent()}>
                  <Text style={styles.buttonText}>Request</Text>
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
              <Text style={styles.headerText}>Item</Text>
              <Text style={styles.headerText}>Stock</Text>
              <Text style={styles.headerText}>indent Qty</Text>
              <Text style={styles.headerText}>Status</Text>
              {/* <Text style={styles.headerText}>Action</Text> */}
            </View>
            <View style={{ flex: 1 }}>
              <FlatList
                data={savedFacilityIndentItemsData}
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
            <Button onPress={() => console.log('Cancel')} style={{color:'red'}}>Cancel</Button>
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

export default IncompleteWHIndentChild