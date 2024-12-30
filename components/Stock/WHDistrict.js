import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, RefreshControl, FlatList ,ScrollView} from 'react-native';

import { fetchCGMSCStockQTY, fetchPublicStockitems, fetchdhsDmeYearConsumption, fetchgetDhsDmeStock, fetchitemIndentQuantity } from '../Services/apiService';
import { useSelector } from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-root-toast';
import { Card, Title, Paragraph, ActivityIndicator, MD2Colors, Dialog, Portal, Badge } from 'react-native-paper';
import Ticon from 'react-native-vector-icons/MaterialCommunityIcons';

const WHDistrict = ({ navigation }) => {
  const informaitonAboutUser = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [TitalValue, SetTitalValue] = useState(null);
  const [dataIndentQty, setDataIndentQty] = useState([]);
  const [getDhsDmeStock, setgetDhsDmeStock] = useState([]);
  const [dataDmeYearConsumption, setDataDmeYearConsumption] = useState([]);
  const [id, setId] = useState('');
  const [facid, setFacid] = useState(informaitonAboutUser.facilityid);
  const [roleid, setroleid] = useState(informaitonAboutUser.approle);
  const [userid, setuserid] = useState(informaitonAboutUser.userid);
  const [refreshing, setRefreshing] = React.useState(false);

  const [dataDDL, setDataDDL] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [oldValue, setOldValue] = useState();

  const [visible, setVisible] = React.useState(false);
  const hideDialog = () => setVisible(false);
  const [WHCGMSCValue, setWHCGMSCValue] = useState(null);
  const [WHCDistValue, setWHCDistValue] = useState(null);
  const [WHDMEInsValue, setWHDMEInsValue] = useState(null);
  const fetchData = async () => {

    if (id == null || id == '') {
      //alert("Please Select Category")
      let toast = Toast.show('Please Enter Item Code or Name', {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
      });
      return;
    }

    try {
      setVisible(true);
      //alert("value:" + value);
      const response = await fetchCGMSCStockQTY(value, "0", userid, roleid);
      setData(response);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      hideDialog();
    }
  };


  const fetchDataWithMCAt = async () => {

    if (value == null) {
      //alert("Please Select Category")
      let toast = Toast.show('Please Select Category', {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
      });

      //toast();
      return;
    }

    try {
      setVisible(true);
      var whid = "0";
      var fuserid = "0";
      // const [WHCDistValue, setWHCDistValue] = useState(null);
      // const [WHDMEInsValue, setWHDMEInsValue] = useState(null);
      if (facid != null) {
        whid = facid;
        SetTitalValue("Warehouse Stock Detail");
        setWHCGMSCValue("Warehouse");
        setWHCDistValue("Covering District");
        setWHDMEInsValue("DME Institute");
      }
      else {
        fuserid = userid;
        SetTitalValue("Warehouse Stock Detail");
        setWHCGMSCValue("Warehouse");
        setWHDMEInsValue("DME Institute");
        setWHCDistValue("District");
      }




      //done 1
      const response = await fetchCGMSCStockQTY(value, "0", whid, fuserid, roleid);
      setData(response);

      //done 2

      const responseIndentQuantity = await fetchitemIndentQuantity(value, whid, "0", fuserid, roleid);
      setDataIndentQty(responseIndentQuantity);

      //done 3

      const responseDhsDmeStock = await fetchgetDhsDmeStock(value, "0", whid, "0", "0", fuserid, roleid);
      setgetDhsDmeStock(responseDhsDmeStock);

      //  alert("DHS DME Stock "+whid+"userid" + fuserid+"role"+roleid);
      const responseDmeYearConsumption = await fetchdhsDmeYearConsumption(value, "0", whid, "0", "0", fuserid, roleid);
      setDataDmeYearConsumption(responseDmeYearConsumption);
    } catch (error) {
      //alert("catch block");
      console.error('Error:', error);
    } finally {
      //alert("finally hideDialog()");
      hideDialog();
    }
  };


  const fetchMainCategory = async () => {
    try {
      //alert("main Cat:"+facid);
      const stockReportDataDDL = await fetchPublicStockitems("0");
      setDataDDL(stockReportDataDDL);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  useEffect(() => {
    fetchMainCategory();
  }, []
  );


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setValue(null);
      setDataDDL([]);
      setData([]);
      setId('');
      fetchMainCategory();
    });
    return unsubscribe;
  }, [navigation]);


  const navigateFunction = (item) => {

    if (item.itemid == "" || item.itemid == null) {

      //setSeletedRowNocId(item.nocid);
      //setVisible(true);
      alert("Please Select any item");
    }
    else {

      // alert ("itemid:"+item.itemid);
      navigation.navigate('WHStock', { item: item });

      //navigate directly and show only indented items in ddl and not more than indented qty
    }

  }

  //   const renderItem = ({ item, index }) => (
  //     <View
  //       style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}
  //     >

  //       <View style={styles.cell}>
  //         <Text style={styles.cellText}>{index + 1}</Text>
  //       </View>
  // {/* 
  //       <View style={styles.cell}>
  //         <Text style={styles.cellText}>{item.itemcode}</Text>
  //       </View> */}
  //       <View style={styles.cell}>
  //             <Text onPress={() => navigateFunction(item)} style={styles.cellTextB}><Ticon name="cursor-pointer" size={14}  color="#E10600" />{item.itemcode}</Text> 

  //             </View>

  //       <View style={styles.cell}>
  //         <Text style={styles.cellText}>{item.itemname}</Text>
  //       </View>
  //       <View style={styles.cell}>
  //         <Text style={styles.cellText}>{item.sku}</Text>
  //       </View>
  //       <View style={styles.cell}>
  //         <Text style={styles.cellText}>{item.readyforissue}</Text>
  //       </View>
  //       <View style={styles.cell}>
  //         <Text style={styles.cellText}>{item.pending}</Text>
  //       </View>


  //       {/* <View style={styles.cell}>
  //         <Text onPress={() => navigateFunction(item)} style={styles.cellText}><Icon name="arrow-right" size={10} color="#0645AD" /></Text>
  //       </View> */}
  //       {/* <View style={styles.cell}>
  //         <Text style={styles.cellText}>{item.warehousename}</Text>
  //       </View> */}
  //     </View>
  //   );

  const renderItem = ({ item, index }) => {
    return (

      // <Card style={styles.card}>
      //   <Card.Content>

      <View style={styles.row}>
        <View style={styles.column}>

          <Title style={styles.header}>{TitalValue}</Title>

          <View style={styles.rowItem}>
            <Title style={styles.label}>Code</Title>
            <Paragraph style={styles.value}>{item.itemcode}</Paragraph>
          </View>
          <View style={styles.rowItem}>
            <Title style={styles.label}>EDL Category:</Title>
            <Paragraph style={styles.value}>{item.edl}/{item.edltype}</Paragraph>
          </View>


          <View style={styles.rowItem}>
            <Title style={styles.label}>Item Type:</Title>
            <Paragraph style={styles.value}>{item.itemtypename}</Paragraph>
          </View>

          <View style={styles.rowItem}>
            <Title style={styles.label}>Group:</Title>
            <Paragraph style={styles.value}>{item.groupname}</Paragraph>
          </View>

          <View style={styles.rowItem}>
            <Title style={styles.label}>Item Name:</Title>
            <Paragraph style={styles.value}>{item.itemname}</Paragraph>
          </View>

          <View style={styles.rowItem}>
            <Title style={styles.label}>Strength:</Title>
            <Paragraph style={styles.value}>{item.strengtH1}</Paragraph>
          </View>


          <View style={styles.rowItem}>
            <Title style={styles.label}>SKU(Unit):</Title>
            <Paragraph style={styles.value}>{item.sku}</Paragraph>
          </View>
          <View style={styles.rowItem}>
            <Title style={styles.label}>{WHCGMSCValue} Stock(In SKU):</Title>
            <Paragraph style={styles.value}>{item.readyforissue}</Paragraph>
          </View>

          <View style={styles.rowItem}>
            <Title style={styles.label}>{WHCGMSCValue} UQC Stock(In SKU):</Title>
            <Paragraph style={styles.value}>{item.pending}</Paragraph>
          </View>
          <View style={styles.rowItem}>
            <Title style={styles.label}>{WHCGMSCValue} Pipeline Stock(In SKU):</Title>
            <Paragraph style={styles.value}>{item.totlpipeline}</Paragraph>
          </View>

          <View style={styles.cell}>
            <Text onPress={() => navigateFunction(item)} style={styles.value}> <Badge>Show Warehouse Stock</Badge><Ticon name="cursor-pointer" size={14} color="#E10600" /></Text>

          </View>

        </View>
      </View>

      //   </Card.Content>
      // </Card>

    );
  };





  const renderItemIndentQty = ({ item, index }) => {
    return (

      // <Card style={styles.card}>
      //   <Card.Content>

      <View style={styles.row}>
        <View style={styles.column}>

          <Title style={styles.header}>Indent vs Issuance</Title>


          <View style={styles.rowItem}>
            <Title style={styles.label}>{WHCDistValue} Annual Indent (In Nos):</Title>
            <Paragraph style={styles.value}>{item.dhsai}</Paragraph>
          </View>
          <View style={styles.rowItem}>
            <Title style={styles.label}>{WHCDistValue} Issued Quantity (In Nos):</Title>
            <Paragraph style={styles.value}>{item.dhsissue}</Paragraph>
          </View>

          <View style={styles.rowItem}>
            <Title style={styles.label}>{WHCDistValue} Issued %:</Title>
            <Paragraph style={styles.value}>{item.dhsissuep}</Paragraph>
          </View>

          <View style={styles.rowItem}>
            <Title style={styles.label}>{WHDMEInsValue} Annual Indent (In Nos):</Title>
            <Paragraph style={styles.value}>{item.dmeai}</Paragraph>
          </View>

          <View style={styles.rowItem}>
            <Title style={styles.label}>{WHDMEInsValue} Issued Quantity (In Nos) </Title>
            <Paragraph style={styles.value}>{item.dmeissue}</Paragraph>
          </View>

          <View style={styles.rowItem}>
            <Title style={styles.label}>{WHDMEInsValue} Issued %:</Title>
            <Paragraph style={styles.value}>{item.dmeissueper}</Paragraph>
          </View>

          {/* <View style={styles.rowItem}>
            <Title style={styles.label}>AYUSH Annual Indent for {WHCGMSCValue}:</Title>
            <Paragraph style={styles.value}>{item.ayushai}</Paragraph>
          </View>

          <View style={styles.rowItem}>
            <Title style={styles.label}>AYUSH Issued Quantity by {WHCGMSCValue}</Title>
            <Paragraph style={styles.value}>{item.ayushissue}</Paragraph>
          </View>

          <View style={styles.rowItem}>
            <Title style={styles.label}>Ayush Issue% by {WHCGMSCValue}</Title>
            <Paragraph style={styles.value}>{item.ayushissueper}</Paragraph>
          </View> */}

          {/* <View style={styles.cell}>
             <Text onPress={() => navigateFunction(item)} style={styles.value}>Show Warehouse Stock<Ticon name="cursor-pointer" size={14}  color="#E10600" /></Text> 
            
              </View> */}

        </View>
      </View>

      //   </Card.Content>
      // </Card>
    );
  };






  const renderFieldStock = ({ item, index }) => {
    return (

      // <Card style={styles.card}>
      //   <Card.Content>

      <View style={styles.row}>
        <View style={styles.column}>

          <Title style={styles.header}>Field Stocks & Consumption</Title>

          {/* <View style={styles.rowItem}>
            <Title style={styles.label}>Unit Count:</Title>
            <Paragraph style={styles.value}>{item.unitcount}</Paragraph>
          </View> */}

          <View style={styles.rowItem}>
            <Title style={styles.label}>Stock (In Nos):</Title>
            {/* <Paragraph style={styles.value}>{item.fieldstock}</Paragraph> */}
            <Text onPress={() => navigateFunctionFile(item)} style={styles.cellText}>
              <Ticon name="cursor-pointer" size={14} color="#0000FF" /> {item.fieldstock}
            </Text>
          </View>


        </View>
      </View>

    );
  };

  const navigateFunctionFile = (item) => {
    //alert(JSON.stringify(item));
    //navigation.navigate("Add New Issue"); 
    var item1 = { "itemid": item.itemid, "itemname": item.itemname, "fieldstock": item.fieldstock, "userid": userid, "cmho_coll": roleid }
    //alert(JSON.stringify(item1));
    navigation.navigate('Facility Wise Stock Status', { item: item1 });
  }

  // var itemid = route.params?.item.itemid;

  // var itemname = route.params?.item.itemname;

  // var fieldstock = route.params?.item.fieldstock;
  // var fieldstocksku = route.params?.item.fieldstocksku;
  // var userid = route.params?.item.fieldstocksku;
  // var cmho_coll = route.params?.item.fieldstocksku;


  const renderFieldConsumption = ({ item, index }) => {
    return (

      // <Card style={styles.card}>
      //   <Card.Content>

      <View style={styles.row}>
        <View style={styles.column}>

          {/* <Title style={styles.header}>Field Consumption</Title> */}

          <View style={styles.rowItem}>
            <Title style={styles.label}>Issued to OPD/IPD(In Nos):</Title>
            <Paragraph style={styles.value}>{item.issueqty}</Paragraph>
          </View>

        {/* add blank lines for bottom visibility */}
          <View style={styles.rowItem}>
            <Title style={styles.label}></Title>
            <Paragraph style={styles.value}></Paragraph>
          </View>
          
          <View style={styles.rowItem}>
            <Title style={styles.label}></Title>
            <Paragraph style={styles.value}></Paragraph>
          </View>

        

          {/* <View style={styles.rowItem}>
            <Title style={styles.label}>Unit Count:</Title>
            <Paragraph style={styles.value}>{item.unitcount}</Paragraph>
          </View> */}




        </View>
      </View>

    );
  };


  return (
    <View style={styles.container}>

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} dismissable={false} >
          <Dialog.Title></Dialog.Title>
          <Dialog.Content>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
              <ActivityIndicator animating={true} color={MD2Colors.red800} size={'large'} />
            </View>
          </Dialog.Content>
          <Dialog.Title></Dialog.Title>
        </Dialog>
      </Portal>

      <View style={StyleSheet.flatten([{ justifyContent: 'space-between', flexDirection: 'row', zIndex: 1000, }])} >
        {dataDDL.length > 0 ? (
          <DropDownPicker
            open={open}
            value={value}
            searchable={true}
            items={dataDDL.map((item) => (
              {
                label: item.details,
                value: item.id,
              }))}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setData}
            placeholder='Select Item'
            listMode='MODAL'
            containerStyle={{ height: 20, width: '60%', marginBottom: 10, marginLeft: 20, marginRight: 0, marginTop: 20 }}
            onChangeValue={(value) => {
              if (value != null) {
                setOldValue(value);

                if (value != oldValue) {
                  // fetchDataItemStock();
                  //  fetchData();
                }

              }

            }}
            dropDownContainerStyle={{ elevation: 1000, zIndex: 500, border: 2 }}
          />
        ) : (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
            <ActivityIndicator animating={true} color={MD2Colors.red800} />
          </View>
        )

        }

        <TouchableOpacity style={styles.buttonAll} onPress={fetchDataWithMCAt}>
          <Text style={styles.buttonTextAll}>Show</Text>
        </TouchableOpacity>
      </View>
    


      <Card style={styles.card}>
        <Card.Content>
          <View>
           
              <ScrollView >

                <FlatList
                  data={data}
                  keyExtractor={(_, index) => index.toString()}
                  renderItem={renderItem}
                  refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                  }
                  scrollEnabled={false}
                />



                <FlatList
                  data={dataIndentQty}
                  keyExtractor={(_, index) => index.toString()}
                  renderItem={renderItemIndentQty}
                  refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                  }
                  scrollEnabled={false}
                />




                <FlatList
                  data={getDhsDmeStock}
                  keyExtractor={(_, index) => index.toString()}
                  renderItem={renderFieldStock}
                  refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                  }
                  scrollEnabled={false}
                />




                <FlatList
                  data={dataDmeYearConsumption}
                  keyExtractor={(_, index) => index.toString()}
                  renderItem={renderFieldConsumption}
                  refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                  }
                  scrollEnabled={false}
                />




              </ScrollView>
           
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   inputContainer: {

//     flexDirection: 'row',
//     // alignItems: 'center',
//     justifyContent:'space-between',
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     margin: 20,
//     marginTop: -15,
//   },
//   input: {
//     flex: 1,

//     height: 40,
//     borderColor: '#CCCCCC',
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingHorizontal: 10,
//   },
//   button: {

//     marginLeft: 10,
//     padding: 10,
//     backgroundColor: '#3377FF',
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: '#FFFFFF',
//     fontWeight: 'bold',
//   },

//   buttonAll: {

//     //marginTop: 40,
//     paddingVertical: 10,
//     backgroundColor: '#3377FF',
//     borderRadius: 5,
//     width: 100,
//     textAlign: 'center',
//     marginRight: 20,
//     marginTop: 23
//   },
//   buttonTextAll: {
//     color: '#FFFFFF',
//     fontWeight: 'bold',
//     alignSelf: 'center',
//   },
//   header: {
//     flexDirection: 'row',
//     backgroundColor: '#F2F2F2',
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderBottomWidth: 1,
//     borderBottomColor: '#CCCCCC',
//   },
//   headerText: {
//     flex: 1,
//     fontWeight: 'bold',
//     textAlign: 'left',
//   },
//   row: {
//     flexDirection: 'row',
//     paddingHorizontal: 10,
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#CCCCCC',
//   },
//   evenRow: {
//     backgroundColor: '#F8F8F8',
//   },
//   oddRow: {
//     backgroundColor: '#FFFFFF',
//   },
//   cell: {
//     flex: 1,
//     // alignItems: 'center',
//   },
//   cellText: {
//     fontSize: 14,
//   },
//   cardItemRow: {
//     flexDirection: 'row',
//     //alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//   },
// });

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
    marginRight: 20,
    marginTop: 23
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
    alignSelf: 'center',
    color: 'purple',
    fontSize: 13,
    fontWeight: 'bold',
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

  label: {
    fontWeight: 'bold',
    fontSize: 10,
  },
  cardItemRow: {
    flexDirection: 'row',
    // alignItems: 'center',
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
    fontSize: 10,
  },
  valueStock: {
    flex: 1,
    textAlign: 'right',
    fontSize: 12,
    color: '#0000FF',
  },

  cardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  labelContainer: {
    width: '50%',
    marginRight: 5,
  },
  valueContainer: {
    width: '50%',
  },



  card: {
    margin: 10,
    backgroundColor: '#FFFFFF',
    //borderWidth: 1
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
  },
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 10,
  },
  value: {
    fontSize: 16,
    color: '#666',
  },



});
export default WHDistrict;
