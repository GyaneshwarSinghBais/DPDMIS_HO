import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { fetchIncomplReceiptMasterWH, postReceiptMaster } from '../Services/apiService';
import { TouchableOpacity } from 'react-native';
import { Modal, Portal, Button, PaperProvider, TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-root-toast';


const WHReceiptMaster = ({ navigation }) => {
  const informaitonAboutUser = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [id, setId] = useState(informaitonAboutUser.facilityid);
  const [receiptInfoData, setReceiptInfoData] = useState([]);


  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [date, setDate] = useState(new Date())
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  //const [dateText, setDateText] = useState('Empty');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate);

    //let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
    let fDate = (tempDate.getMonth() + 1) + '/' + tempDate.getDate() + '/' + tempDate.getFullYear();
    //let fTime = 'Hours: ' + tempDate.getHours() + ' | Minutes: ' + tempDate.getMinutes();
    //setText(fDate + '\n' + fTime);
    setText(fDate);
    setRequestedDate(fDate);
    //console.log(fDate + ' (' + fTime + ')')
  }


  const showMOde = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  }

  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10, // Add rounded corners
    margin: 20, // Add margin to the modal
  };

  const [text, setText] = React.useState("");




  const fetchData = async () => {
    try {
      alert("before calling grid ");
      const stockReportData = await fetchIncomplReceiptMasterWH(id);
      alert("inside fetch: " + JSON.stringify(stockReportData));
      setData(stockReportData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {    
    fetchData();
  }, []
  );

  useEffect(() => {
    if (receiptInfoData && receiptInfoData.result && receiptInfoData.result.value) {
      const dataToPass = receiptInfoData.result.value[0];
      //navigation.navigate('Add New Issue', { item: dataToPass });
      alert("Navigation Happen");
    }
  }, [receiptInfoData]);



  const renderItem = ({ item, index }) => (
    <View
      style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow, styles.rowWithBorder]}
    >

      <View style={styles.cell}>
        <Text style={styles.cellText}>{index + 1}</Text>
      </View>

      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.reqdate}</Text>
      </View>

      {/* <View style={styles.cell}>
        <Text style={styles.cellText}>{item.nocid}</Text>
      </View>

      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.whissueno}</Text>
      </View>
      
       <View style={styles.cell}>
        <Text style={styles.cellText}>{item.whissuedt}</Text>
      </View>

       <View style={styles.cell}>
        <Text style={styles.cellText}>{item.INDENTID}</Text>
      </View>
      */}
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.nositemsreq}/{item.nositemsissued}</Text>
      </View>


      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.whissuedt}</Text>
      </View>

      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.facreceiptdate}</Text>
      </View>
      <View style={styles.cell}>
        <Text onPress={() => navigateFunction(item)} style={styles.cellText}>{item.rstatus}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.warehouseid}</Text>
      </View>

      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.indentid}</Text>
      </View>

      {/* <Text style={styles.headerText}>SN</Text>
              <Text style={styles.headerText}>Indented DT</Text>
              <Text style={styles.headerText}>Indented/Issued</Text>
              <Text style={styles.headerText}>WH Issued DT</Text>
              <Text style={styles.headerText}>Received DT</Text>
              <Text style={styles.headerText}>Rec. Status</Text>
              <Text style={styles.headerText}>Wid</Text>
              <Text style={styles.headerText}>Indentid</Text> */}

      {/* <View style={styles.cell}>
        <Text onPress={()=>alert(item.issueID)} style={styles.cellText}>{item.status}</Text>
      </View> */}



    </View>


  );

  const navigateFunction = (item) => {
    //navigation.navigate('Add New Issue', { item: item, });
    //if issue no already genrated then nave ... genrate issue no and take issue data then navigate
    if (item.facreceiptid == "" || item.facreceiptid == null && item.indentid != null) {
      //alert("Issue id is null for IndentId " + item.nocid);
      setVisible(true);
      //Ask Issue Date and generate IssueID then..
      //navigate  and show only indented items in ddl and not more than indented qty
    }
    else if (item.facreceiptid == "" || item.facreceiptid == null && (item.indentid == "" || item.indentid == null)) {
      alert("Not Issued by Warehouse, You can Receipt after Warehouse Issuance")
    }

    else {
      alert("facreceiptid = " + item.facreceiptid + " and  IndentId " + item.indentid)
      //navigate directly and show only indented items in ddl and not more than indented qty
    }

  }

  const navigationFunctionForAdd = () => {
    navigation.navigate('AddWardIssueMaster');
  }


  const issueDateSaveAndGenerate = async () => {
    if (text == '' || text == null) {
      let toast = Toast.show('Please Enter Receipt Date.', {
        duration: Toast.durations.LONG,
      });
      return;
    }

    alert("Button Pressed");

    try {
      const WReceiptMaster = {
        // issueid: 0, // It's auto-generated
        // facilityid: id, // Value from route params
        // //issueno: "123",
        // issuedate: text, // Stock quantity
        // issueddate: text,
        // wrequestdate: text,
        // wrequestby: requestedBy, // Allotted quantity (same as issueQty)
        // // isuseapp: 'Y',
        // // issuetype: "NO", // Issue quantity
        // wardid: value,

        facreceiptid: 0,
        facilityid: id,
        // indentid: data.indentid,
        indentid: "237516",
        // warehouseid: data.warehouseid,
         warehouseid: "2617",
        facreceiptdate: text

      };

      
      const returnResult = await postReceiptMaster(WReceiptMaster, id);
      setReceiptInfoData(returnResult);
    }
    catch (error) {
      console.error("Error posting issue:", error);
    }


  }


  return (
    <>
      <PaperProvider>
        <Portal>
          <View style={styles.container}>



            <View style={styles.header}>
              <Text style={styles.headerText}>SN</Text>
              <Text style={styles.headerText}>Indented DT</Text>
              <Text style={styles.headerText}>Indented/Issued</Text>
              <Text style={styles.headerText}>WH Issued DT</Text>
              <Text style={styles.headerText}>Received DT</Text>
              <Text style={styles.headerText}>Rec. Status</Text>
              <Text style={styles.headerText}>Wid</Text>
              <Text style={styles.headerText}>Indentid</Text>
            </View>
            <FlatList
              data={data}
              keyExtractor={(_, index) => index.toString()}
              renderItem={renderItem}
            />
          </View>


          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <Text style={styles.modalHeaderText}>Receipt Date:</Text>
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: '85%', }}>
                <TextInput
                  label="Receipt Date"
                  value={text}
                  onChangeText={text => setText(text)}
                  style={styles.input} // Add styling to the input text
                  disabled="true"
                />
              </View>
              <View>
                <TouchableOpacity style={styles.iconContainer} onPress={() => showMOde('date')}>
                  <Text style={styles.iconContainer} onPress={() => showMOde('date')}>
                    <Icon name="calendar" size={30} color="purple" />
                  </Text>
                </TouchableOpacity>

                {show && (<DateTimePicker
                  textID='dateTimePicker'
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display='default'
                  onChange={onChange}
                />)}
              </View>
            </View>

            <Button
              mode="contained"
              onPress={() => issueDateSaveAndGenerate()}
            >
              Genenate
            </Button>
          </Modal>

        </Portal>
        {/* <Button style={{ marginTop: 30 }} onPress={showModal}>
          Show
        </Button> */}
      </PaperProvider>

    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    borderRightWidth: 1,
    borderRightColor: '#CCCCCC',
    padding: 5,
  },
  cellText: {
    fontSize: 11,
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
    alignSelf: 'center',
  },

  modalHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10, // Add margin below the header text
  },

  input: {
    marginBottom: 20, // Add margin below the input text
  },

  iconContainer: {
    padding: 10,
  },



});

export default WHReceiptMaster;
