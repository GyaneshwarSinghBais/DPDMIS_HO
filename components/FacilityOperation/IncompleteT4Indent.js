import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { fetchIncomplWardIndentMaster, postIssueNoAgainstIndent } from '../Services/apiService';
import { TouchableOpacity } from 'react-native';
import { Modal, Portal, Button, PaperProvider, TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-root-toast';



const IncompleteT4Indent = ({ navigation }) => {
  const informaitonAboutUser = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [issueDate, setissueDate] = useState('');
  const [returnDataFrompostIssueNoAgainstIndent, setreturnDataFrompostIssueNoAgainstIndent] = useState([]);
  const [id, setId] = useState(informaitonAboutUser.facilityid);
  const [seletedRowNocId, setSeletedRowNocId] = useState('');


  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [date, setDate] = useState(new Date())
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  //const [dateText, setDateText] = useState('Empty');

  const [text, setText] = React.useState("");


  const issueData = {
    issueid: 0,
    facilityid: id,
    //issueno: "123",
    issuedate: text,
    issueddate: text,
    indentid: seletedRowNocId
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate);

    // var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    //   "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    //  let datetosend = tempDate.getDate() + '-' + monthNames[tempDate.getMonth()] + '-' + tempDate.getFullYear();
    //  alert(datetosend);
    //  setissueDate(datetosend);

    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
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

  




  const fetchData = async () => {
    try {
      const stockReportData = await fetchIncomplWardIndentMaster(id);
      setData(stockReportData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const postIssueNo = async () => {
    try {     
      const returnData = await postIssueNoAgainstIndent(issueData);
      setreturnDataFrompostIssueNoAgainstIndent(returnData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []
  );


  const renderItem = ({ item, index }) => (
    <View
      style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow, styles.rowWithBorder]}
    >

      <View style={styles.cell}>
        <Text style={styles.cellText}>{index + 1}</Text>
      </View>

      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.wardname}</Text>
      </View>

      {/* <View style={styles.cell}>
        <Text style={styles.cellText}>{item.nocid}</Text>
      </View>

      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.windentno}</Text>
      </View>
      
       <View style={styles.cell}>
        <Text style={styles.cellText}>{item.issuedt}</Text>
      </View>

       <View style={styles.cell}>
        <Text style={styles.cellText}>{item.issueno}</Text>
      </View>
      */}

      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.requesteddate}</Text>
      </View>

      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.nos}</Text>
      </View>


      {/* <View style={styles.cell}>
        <Text onPress={()=>alert(item.issueID)} style={styles.cellText}>{item.status}</Text>
      </View> */}

      <View style={styles.cell}>
        <Text onPress={() => navigateFunction(item)} style={styles.cellText}>{item.dstatus}</Text>
      </View>

    </View>


  );

  const navigateFunction = (item) => {
    //navigation.navigate('Add New Issue', { item: item, });
    //if issue no already genrated then navigate... else ... genrate issue no and take issue data then navigate
    if (item.issueid == "" || item.issueid == null) {
      //alert("Issue id is null for IndentId " + item.nocid);
      setSeletedRowNocId(item.nocid);
      setVisible(true);
      //Ask Issue Date and generate IssueID then..
      //navigate  and show only indented items in ddl and not more than indented qty
    }
    else {
      alert("Issue id = " + item.issueid + " and  IndentId " + item.nocid)
      //navigate directly and show only indented items in ddl and not more than indented qty
    }

  }

  const navigationFunctionForAdd = () => {
    navigation.navigate('AddWardIssueMaster');
  }


  const issueDateSaveAndGenerate = () => {
    if (text == '' || text == null) {
      let toast = Toast.show('Please Enter Issue Date.', {
        duration: Toast.durations.LONG,
      });
      return;
    }  
    postIssueNo();

  }


  return (
    <>
      <PaperProvider>
        <Portal>
          <View style={styles.container}>

            <View style={{ width: 200, alignSelf: 'center', padding: 10 }}>
              <TouchableOpacity style={styles.button} onPress={navigationFunctionForAdd}>
                <Text style={styles.buttonText}>Add New Issuance</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.header}>
              <Text style={styles.headerText}>S.No</Text>
              <Text style={styles.headerText}>Ward</Text>
              <Text style={styles.headerText}>Indent Date</Text>
              <Text style={styles.headerText}>Indented Items</Text>
              <Text style={styles.headerText}>Status</Text>
            </View>
            <FlatList
              data={data}
              keyExtractor={(_, index) => index.toString()}
              renderItem={renderItem}
            />
          </View>


          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <Text style={styles.modalHeaderText}>Issue Date:</Text>
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: '85%', }}>
                <TextInput
                  label="Issue Date"
                  value={text}
                  onChangeText={text => setText(text)}
                  style={styles.input} // Add styling to the input text
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
              Save
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

export default IncompleteT4Indent;
