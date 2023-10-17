
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button, Platform,  TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import { fetchFacilityWards, fetchMonthIndentProgram, postWardIssueMaster, postWhIndentNo } from '../Services/apiService';
import {  TextInput } from 'react-native-paper';
//import DatePicker from 'react-native-date-picker'
// import { DatePicker } from 'native-base'
import DateTimePicker from '@react-native-community/datetimepicker';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/FontAwesome';

const GenerateWarehouseIndent = ({ navigation }) => {
  const informaitonAboutUser = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [issueInfoData, setIssueInfoData] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [id, setId] = useState(informaitonAboutUser.facilityid);

  const [date, setDate] = useState(new Date())
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('Empty');

  const [requestedDate, setRequestedDate] = useState('');
  const [issuedDate, setIssuedDate] = useState('');
  const [requestedBy, setRequestedBy] = useState('');

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

  const generateIssueNo = async (val) => {

    if (value == 0 || value == null) {
      alert("Please Select Program")
      return;
    }

    if (requestedDate == "") {
      alert("Please Enter Indent Date")
      return;
    }

    // if (requestedBy == "") {
    //   alert("Please Enter Requested By")
    //   return;
    // }
   
    try {
    //   const WIssueMaster = {
    //     issueid: 0, // It's auto-generated
    //     facilityid: id, // Value from route params
    //     //issueno: "123",
    //     issuedate: text, // Stock quantity
    //     issueddate: text,
    //     wrequestdate: text,
       
    //     // isuseapp: 'Y',
    //     // issuetype: "NO", // Issue quantity
    //     wardid: value,
    //   };

        alert("Function Call");
      const result = await postWhIndentNo(id,text,value);   
      //alert("print result: " + JSON.stringify(result));
      //console.log("print result: " + JSON.stringify(result));
      setIssueInfoData(result);        
    }
    catch (error) {
      console.error("Error posting issue:", error);
    }

    //generate code & call postWardIssno

    // alert("successfully generated")

  }



  const fetchfacWardsForDropDown = async () => {
    try {
      const response = await fetchMonthIndentProgram();
      setData(response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchfacWardsForDropDown();
  }, []);

  // useEffect(() => {
  //   alert("after hooked: " + issueInfoData);
  //   if(issueInfoData != "")
  //   {   alert("after hooked: " + issueInfoData[0].result.value);
  //     navigation.navigate('Add New Issue', { item: issueInfoData[0].result.value});
  //   }   
  // }, [issueInfoData]);

  useEffect(() => {
    console.log("issueInfoData :" + issueInfoData.length)
    console.log("issueInfoData.length :" + issueInfoData.length);
    
    if (issueInfoData != 0 && issueInfoData != undefined) {
      console.log("inside useeffect");
          const dataToPass = {
            nocid: issueInfoData.result.value[0].nocid, 
             reqDate:  issueInfoData.result.value[0].reqDate, 
             reqno:  issueInfoData.result.value[0].reqno, 
             indentid: issueInfoData.result.value[0].indentid,
      };
    
    //   const REQUESTID = route.params?.item.nocid;
    //   const INDENTDATE = route.params?.item.reqDate;
    //   const INDENTNO = route.params?.item.reqno;
    //   const INDENTID = route.params?.item.indentid;
      console.log("Data to Pass: " + JSON.stringify(dataToPass));
      navigation.navigate('Warehouse Indent', { item: dataToPass });
    }
  }, [issueInfoData]);





  return (
    <>   
      <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.cardHeader}>Add New Indent</Text>
          <View style={{ zIndex: 1000 }} >
            {data.length > 0 ? (
              <DropDownPicker
                open={open}
                value={value}
                searchable={true}
                items={data.map((Ward) => (
                  {
                    label: Ward.program,
                    value: Ward.programid,
                  }))}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setData}
                // defaultValue={selectedItem ? selectedItem.value : null}
                containerStyle={{ height: 40 }}
                onChangeValue={(value) => {

                }
                }
                dropDownContainerStyle={{ elevation: 1000, zIndex: 1000 }}
              />
            ) : (
              <Text>Loading data...</Text>
            )
            }
          </View>
          <View>
            <View style={styles.inputContainer}>
              <Text style={styles.label} >Indent Date: </Text>
              <TextInput
                style={styles.input}
                placeholder="dd/m/yyyy"
                // keyboardType="numeric"
                onChangeText={text => setRequestedDate(text)}
                value={requestedDate}  
                disabled="true"              
              />
              <TouchableOpacity style={styles.iconContainer} onPress={() => showMOde('date')}>
                <Text style={styles.iconContainer} onPress={() => showMOde('date')}>
                  <Icon name="calendar" size={20} color="blue" />
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

            {/* <View style={styles.inputContainer}>
              <Text style={styles.label}>Requested By: </Text>
              <TextInput
                style={styles.input}
                placeholder=""
                onChangeText={text => setRequestedBy(text)} // Create a new state variable for Issued Date
                value={requestedBy}
              />
            </View> */}

            {/* Add DateTimePicker for "Issued Date" */}


            {/* <View style={{ marginTop: 20 }}>             
                <Button title='DatePicker' onPress={() => showMOde('date')} />    
            </View> */}
          </View>
          <View>
            <View style={styles.cell}>
              <TouchableOpacity style={styles.button} onPress={() => generateIssueNo(id)}>
                <Text style={styles.buttonTextGenrate}>Generate</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* <Button title="Open" onPress={() => setOpenDate(true)} />
      <DatePicker
        modal
        open={openDate}
        date={date}
        onConfirm={(date) => {
          setOpenDate(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpenDate(false)
        }}
      /> */}


        {/* <DatePicker
          defaultDate={new Date(2018, 4, 4)}
          minimumDate={new Date(2018, 1, 1)}
          maximumDate={new Date(2018, 12, 31)}
          locale={"en"}
          timeZoneOffsetInMinutes={undefined}
          modalTransparent={false}
          animationType={"fade"}
          androidMode={"default"}
          placeHolderText="Select date"
          textStyle={{ color: "green" }}
          placeHolderTextStyle={{ color: "#d3d3d3" }}
          onDateChange={this.setDate}
        /> */}




        {/* <Text>
          Date: {this.state.chosenDate.toString().substr(4, 12)}
        </Text> */}



        {/* <View style={{ margin: 20 }}>
          <Button title='TimePicker' onPress={() => showMOde('time')} />
        </View> */}






        {/* <StatusBar style="auto" /> */}
      </SafeAreaView>
    </>
  )
}

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
    marginBottom: 5,
    marginTop: 20,
  },
  cardHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  datePickerStyle: {
    width: 230,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    flex: 1, // Take up available space
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginLeft: 10, // Adjust the spacing between the label and input
  },
  button: {
    backgroundColor: 'green',
    borderRadius: 5,
    padding: 10,
    width: 200,
    alignSelf: 'center',
    marginTop: 20
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  iconContainer: {
    padding: 10,
  },
  buttonTextGenrate: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center'
  },
});


export default GenerateWarehouseIndent