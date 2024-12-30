import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, ScrollView, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { fetchDistFACwiseStockPostion, fetchDistrictDDL, fetchDistwiseIssuance, fetchMainCategoryService, fetchMasitems, fetchPublicStockitems, ftechItemWHStock } from '../Services/apiService';
import DropDownPicker from 'react-native-dropdown-picker';
// import { ActivityIndicator, MD2Colors, Dialog, Portal,Title } from 'react-native-paper';
import { SegmentedButtons, Card, Title, Paragraph, ActivityIndicator, MD2Colors, Dialog, Portal, Appbar } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-root-toast';
//import { SegmentedButtons } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import IOct from 'react-native-vector-icons/Octicons';
const IssuanceToDistOrHospital = ({ navigation }) => {
    //const informaitonAboutUser = useSelector((state) => state.user);
    const [data, setData] = useState([]);
    //const [id, setId] = useState(informaitonAboutUser.facilityid);
    // const [roleid, setroleid] = useState(informaitonAboutUser.approle);
    // const [userid, setuserid] = useState(informaitonAboutUser.userid);
    const [isActivity, setIsActivity] = useState(false);
    const [HTime, SetHTimeValue] = useState(null);

    const [dataDDLyr, setDataDDLyr] = useState([]);
    const [openYr, setOpenYr] = useState(false);
    const [valueYr, setValueYr] = useState(null);
    const [oldValueYr, setOldValueYr] = useState();
    const [DataYr, setDataYr] = useState([]);

    const [dataItemDetail, setdataItemDetail] = useState([]);
    const [text, setText] = useState('');
    const [textTo, setTextTo] = useState('');


    const [dataDDLItem, setDataDDLItem] = useState([]);
    const [openItem, setOpenItem] = useState(false);
    const [valueItem, setValueItem] = useState(null);
    const [oldValueItem, setOldValueItem] = useState();
    const [DataItem, setDataItem] = useState([]);

    const [visible, setVisible] = React.useState(false);
    const hideDialog = () => setVisible(false);


    const [itemDetail, setItemDetail] = useState([]);
    const [FacilityIndentToWH, setFacilityIndentToWH] = useState([]);
    const [WHissueToFacility, setWHissueToFacility] = useState([]);
    const [FacilityReceiptAgainstIndent, setFacilityReceiptAgainstIndent] = useState([]);
    const [FacilityReceiptFromOtherFacilityOrLP, setFacilityReceiptFromOtherFacilityOrLP] = useState([]);
    const [FacilityWardIssue, setFacilityWardIssue] = useState([]);
    const [FacilityIssueToOtherFacility, setFacilityIssueToOtherFacility] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [segmentValue, setsegmentValue] = React.useState('');

    const [date, setDate] = useState(new Date())
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [dateText, setDateText] = useState('Empty');

    const [dateTo, setDateTo] = useState(new Date())
    const [modeTo, setModeTo] = useState('date');
    const [showTo, setShowTo] = useState(false);
    const [dateTextTo, setDateTextTo] = useState('Empty');


    const [TitalValue, SetTitalValue] = useState(null);
    //const drpdwnValue = ["Drugs", "Consumable & Others,", "Reagents"];

    const resetDropdowns = () => {
        // Reset the state variables for dropdown selections
        setValueYr(null);
        setValueItem(null);
        SetTitalValue('');
        // You can add other dropdown state variables here if needed
    };


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        //let fTime = 'Hours: ' + tempDate.getHours() + ' | Minutes: ' + tempDate.getMinutes();
        //setText(fDate + '\n' + fTime);
        setText(fDate);
        setRequestedDate(fDate);
        //console.log(fDate + ' (' + fTime + ')')
    }

    const onChangeTo = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowTo(Platform.OS === 'ios');
        setDateTo(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        //let fTime = 'Hours: ' + tempDate.getHours() + ' | Minutes: ' + tempDate.getMinutes();
        //setText(fDate + '\n' + fTime);
        setTextTo(fDate);
        setRequestedDateTo(fDate);
        //console.log(fDate + ' (' + fTime + ')')
    }

    const showMOde = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }


    const showMOdeTo = (currentMode) => {
        setShowTo(true);
        setModeTo(currentMode);
    }





    const fetchData = async () => {

        if (valueItem == 0 || valueItem == null) {
            alert("Please Select Category")
            let toast = Toast.show('Please Select Category', {
                duration: Toast.durations.LONG,
            });
            return;
        }

        if (segmentValue == null || segmentValue == '' ) {
            alert("Please Select Directorate")
            let toast = Toast.show('Please Select Directorate', {
                duration: Toast.durations.LONG,
            });
            return;
        }

        // if (valueItem == 3 || valueItem == 4 ) {
        //     alert("Please Wait for AYUSH/Reagent Category Stocks")
        //     let toast = Toast.show('Please Wait for AYUSH/Reagent Category', {
        //         duration: Toast.durations.LONG,
        //     });
        //     return;
        // }

        // if (valueYr == 0 || valueYr == null) {
        //     alert("Please Select Year")
        //     let toast = Toast.show('Please Select District', {
        //         duration: Toast.durations.LONG,
        //     });
        //     return;
        // }



        try {
            setVisible(true);
            fetchItemDetail();
            await fetchDistwiseIssuanceData();
            // fetchFacilityIndentToWHData();
            // fetchWHissueToFacilityData();
            // fetchFacilityReceiptAgainstIndentData();
            // fetchFacilityReceiptFromOtherFacilityOrLPData();
            // fetchFacilityWardIssueData();
            // fetchFacilityIssueToOtherFacilityData();

        } catch (error) {
            console.error('Error:', error);
        } finally {
            hideDialog();
        }
    };


    const fetchDistwiseIssuanceData = async () => {
        try {
            //SetTitalValue("Stock vs Issuance");
            //alert("inside fetchDistwiseIssuanceData" );
            let fromDate = 0;
            let toDate = 0;
            if(text != null){
                fromDate = text;
            }
            if(textTo != null){
                toDate = textTo;
            }
           // alert("itemid"+valueItem+" seg "+segmentValue+"itemiid:"+valueYr);
            //const response = await fetchDistwiseIssuance(valueItem,'0',segmentValue,fromDate,toDate);
            const response = await fetchDistwiseIssuance(valueYr,'0',segmentValue,"0","0");
            setData(response);
            //alert(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };


    //DDL datas
    const fetchDistrict = async () => {
        try {
            // const ddlData = await fetchDistrictDDL(tfvalud,Whid,"0",userid,approle);
            //alert("valueitem: " + valueItem);
            const ddlData = await fetchPublicStockitems(valueItem);
            setDataDDLyr(ddlData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchItemDetail = async () => {
        try {
            // const ddlData = await fetchDistrictDDL(tfvalud,Whid,"0",userid,approle);
            //alert("valueitem: " + valueItem);
            const data = await fetchMasitems(valueYr, '0', '0', '0', '0', '0');
            setdataItemDetail(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };




    const fetchMainCategory = async () => {
        try {
            //alert("main Cat:"+facid);
            const stockReportDataDDL = await fetchMainCategoryService("HOD");
            setDataDDLItem(stockReportDataDDL);
        } catch (error) {
            console.error('Error:', error);
        }
    };




    //Card datas





    useEffect(() => {
        //fetchDistrict();

        fetchMainCategory();
        // setsegmentValue('');
    }, []
    );


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            //setDataDDLItem([]);
            //setWHissueToFacility([]);    
            resetDropdowns();
            setData([]);
            //setsegmentValue('');
            // setItemDetail([]);
            // setWHissueToFacility([]);
            // setWHissueToFacility([]);
            // setFacilityReceiptAgainstIndent([]);
            // setFacilityReceiptFromOtherFacilityOrLP([]);
            // setFacilityWardIssue([]);
            // setFacilityIssueToOtherFacility([]);
        });
        return unsubscribe;
    }, [navigation]);



    // useEffect(() => {
    //     console.log(edlData);
    //     if (edlData.length > 0) {
    //         console.log("use effect edl data");

    //     }
    // }, [edlData]
    // );

    // useEffect(() => {
    //     if (nonEdlData.length > 0) {
    //     }
    // }, [nonEdlData]
    // );

    // const navigateFunction = () => {
    //     const isedl = (segmentValue == 'EDL') ? 'Y' : 'N';
    //     const item1 = { "catid": value, "isedl": isedl }
    //     //alert(testid);
    //     //navigation.navigate("Add New Issue"); 
    //     navigation.navigate('Stock Out Detail', { item: item1 });
    // }

    const renderItem = ({ item, index }) => (


        <View
            style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}
        >

            <View style={styles.cell}>
                <Text style={styles.cellText}>{index + 1}</Text>
            </View>

            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.districtname}</Text>
            </View>
            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.issuedsku}</Text>
            </View>
            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.issuednos}</Text>
            </View>
        


        </View>
    );

    return (
        <View style={styles.container}>

            <Appbar.Header style={styles.headerApp}>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="Issuance to District/Hospitals" titleStyle={styles.headerTitle} />
            </Appbar.Header>

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

            {dataDDLItem.length > 0 ? (
                <DropDownPicker
                    open={openItem}
                    value={valueItem}
                    searchable={true}
                    items={dataDDLItem.map((item) => (
                        {
                            label: item.categoryname,
                            value: item.categoryid,
                        }))}
                    setOpen={setOpenItem}
                    setValue={setValueItem}
                    setItems={setDataItem}
                    placeholder='Select Category'
                    listMode='MODAL'
                    containerStyle={{ height: 30, width: '90%', margin: 20, zIndex: 1000 }}
                    onChangeValue={(value) => {
                        if (value != null) {
                            setOldValueItem(value);
                            // alert("outside mcid:"+value);
                            // alert("outside oldValueItem:"+oldValueItem);
                            if (value != oldValueItem && value != undefined) {
                                //alert("ddl invoked: value" + value + "old value: " + oldValue);
                                //fetchData();
                                // alert("mcid:"+value);
                                // alert("oldValueItem:"+oldValueItem);
                                fetchDistrict();
                                //fetchItemDetail();
                            }

                        }

                    }}
                    dropDownContainerStyle={{ elevation: 1000, zIndex: 1000 }}
                />
            ) : (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                    <ActivityIndicator animating={true} color={MD2Colors.red800} />
                </View>
            )
            }

            <View style={StyleSheet.flatten([{ justifyContent: 'space-between', flexDirection: 'row', zIndex: 999 }])} >

                {dataDDLyr.length > 0 ? (
                    <DropDownPicker
                        open={openYr}
                        value={valueYr}
                        searchable={true}
                        items={dataDDLyr.map((item) => (
                            {
                                label: item.details,
                                value: item.id,
                            }))}
                        setOpen={setOpenYr}
                        setValue={setValueYr}
                        setItems={setDataYr}
                        containerStyle={{ height: 30, width: '90%', margin: 20 }}
                        placeholder='Select Item'
                        listMode='MODAL'
                        onChangeValue={(value) => {
                            if (value != null) {
                                setOldValueYr(value);
                                if (value != oldValueYr && oldValueYr != undefined) {
                                    //alert("ddl invoked: value" + value + "old value: " + oldValue);
                                    //fetchData();
                                    // fetchItemDetail();
                                }

                            }

                        }}
                        dropDownContainerStyle={{ elevation: 1000, zIndex: 1000 }}
                    />
                ) : (
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                        <ActivityIndicator animating={true} color={MD2Colors.red800} />
                    </View>
                )
                }





                {/* <TouchableOpacity style={StyleSheet.flatten([styles.button, { margin: 20, }])} onPress={fetchData}>
                    <Text style={styles.buttonText}>Show</Text>
                </TouchableOpacity> */}
            </View>


            <View style={{ height: 40, width: '60%', margin: 20, zIndex: 1000 }}
            >
                <SegmentedButtons
                    value={segmentValue}
                    onValueChange={setsegmentValue}
                    buttons={[
                        {
                            value: '0',
                            label: 'All',

                        },
                        {
                            value: '2',
                            label: 'DHS',

                        },
                        {
                            value: '3',
                            label: 'DME',

                        },
                        {
                            value: '7',
                            label: 'Ayush',

                        },
                    ]}
                />
            </View>

            {/* <View style={{ flexDirection: "row" }}>
                <View style={{ width: '85%', }}>
                    <Text> From Date : </Text>
                    <TextInput
                        label="From Date"
                        value={text}
                        onChangeText={text => setText(dateText)}
                        style={{borderColor:'red',height:40}} // Add styling to the input text
                    />
                </View>
                <View>
                    <TouchableOpacity style={{ width: 20, height: 20 }} onPress={() => showMOde('date')}>
                        <Text style={{ width: 30, height: 30 }} onPress={() => showMOde('date')}>
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
            </View> */}

            {/* <View style={{ flexDirection: "row" }}>
                <View style={{ width: '85%', }}>
                    <Text> To Date : </Text>
                    <TextInput
                        label="To Date"
                        value={textTo}
                        onChangeText={text => setTextTo(dateTextTo)}
                        style={styles.input} // Add styling to the input text
                    />
                </View>
                <View>
                    <TouchableOpacity style={{ width: 20, height: 20 }} onPress={() => showMOdeTo('date')}>
                        <Text style={{ width: 30, height: 30 }} onPress={() => showMOdeTo('date')}>
                            <Icon name="calendar" size={30} color="purple" />
                        </Text>
                    </TouchableOpacity>

                    {showTo && (<DateTimePicker
                        textID='dateTimePickerTo'
                        value={dateTo}
                        mode={modeTo}
                        is24Hour={true}
                        display='default'
                        onChange={onChangeTo}
                    />)}
                </View>
            </View> */}

            <View style={StyleSheet.flatten([{ justifyContent: 'space-between', flexDirection: 'row', zIndex: 1000, width: '90%' }])} >
                <TouchableOpacity style={StyleSheet.flatten([styles.button, { margin: 20 }])} onPress={fetchData}>
                    <Text style={styles.buttonText}>Show</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.card}>
                {dataItemDetail.length > 0 && (
                    <View style={styles.cardContent}>
                        <View style={styles.cardItem}>
                            <Text style={styles.label}>Item:</Text>
                            <Text style={styles.value}>{dataItemDetail[0].name}</Text>
                        </View>
                        {/* <View style={styles.cardItem}>
                            <Text style={styles.label}>Code:</Text>
                            <Text style={styles.value}>{dataItemDetail[0].itemcode}</Text>
                        </View> */}
                        <View style={styles.cardItem}>
                            <Text style={styles.label}>Strength:</Text>
                            <Text style={styles.value}>{dataItemDetail[0].strengtH1}</Text>
                        </View>

                        {/* <View style={styles.cardItem}>
                            <Text style={styles.label}>Code:</Text>
                            <Text style={styles.value}>{dataItemDetail[0].unitcount}</Text>
                        </View> */}
                        {/* <View style={styles.cardItem}>
                            <Text style={styles.label}>Group:</Text>
                            <Text style={styles.value}>{dataItemDetail[0].groupname}</Text>
                        </View> */}
                        {/* <View style={styles.cardItem}>
                            <Text style={styles.label}>Type/EDL:</Text>
                            <Text style={styles.value}>{dataItemDetail[0].itemtypename}/{dataItemDetail[0].edl}</Text>
                        </View> */}
                        {/* <View style={styles.cardItem}>
                            <Text style={styles.label}>:</Text>
                            <Text style={styles.value}></Text>
                        </View> */}
                        <View style={styles.cardItem}>
                            <Text style={styles.label}>Stock Keeping Unit(SKU):</Text>
                            <Text style={styles.value}>{dataItemDetail[0].unit}</Text>
                        </View>
                        {/* <View style={styles.cardItem}>
                            <Text style={styles.label}>EDL Type:</Text>
                            <Text style={styles.value}>{dataItemDetail[0].edltype}</Text>
                        </View> */}
                    </View>
                )}
            </View>

            <View style={styles.header}>
                <Text style={styles.headerText}>S.No</Text>
                <Text style={styles.headerText}>District</Text>
                <Text style={styles.headerText}>Issued by WH (in SKU)</Text>
                <Text style={styles.headerText}>Issued by WH (in Nos)</Text>

                {/* <Text style={styles.headerText}>Warehouse Name</Text> */}
            </View>

            <FlatList
                data={data}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderItem}
            // refreshControl={
            //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            // }
            />

        </View>
    );
};

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

        marginTop: 25,
        marginLeft: 15,
        paddingVertical: 10,
        backgroundColor: '#3377FF',
        borderRadius: 5,
        width: '100%',

        textAlign: 'center',


        // marginTop: 15,
        // paddingVertical: 10,
        // backgroundColor: '#3377FF',
        // borderRadius: 5,
        // width: '100%',
        // textAlign: 'center',


    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#F2F2F2',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
    },
    header1: {
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
        textAlign: 'left',
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
    cardItemRow: {
        marginTop: 15,
        flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    card: {
        backgroundColor: '#F8F8F8',
        borderRadius: 8,
        padding: 16,
        marginBottom: 5,
        marginTop: 5,
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
    // cardItemRow: {
    //     flexDirection: 'row',
    //     // alignItems: 'center',
    //     justifyContent: 'space-between',
    //     marginBottom: 8,
    // },

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
    headerApp: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },

});

export default IssuanceToDistOrHospital;
