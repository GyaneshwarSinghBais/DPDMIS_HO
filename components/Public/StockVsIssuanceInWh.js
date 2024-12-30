import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, ScrollView, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { fetchDistFACwiseStockPostion, fetchDistrictDDL, fetchGroupName, fetchMainCategoryService, fetchMasitems, fetchPublicStockitems, fetchWHItemStock, fetchWarehouse, ftechItemWHStock } from '../Services/apiService';
import DropDownPicker from 'react-native-dropdown-picker';
// import { ActivityIndicator, MD2Colors, Dialog, Portal,Title } from 'react-native-paper';
import { SegmentedButtons, Card, Title, Paragraph, ActivityIndicator, MD2Colors, Dialog, Portal,Appbar } from 'react-native-paper';
import Toast from 'react-native-root-toast';
//import { SegmentedButtons } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import IOct from 'react-native-vector-icons/Octicons';
const StockVsIssuanceInWh = ({ navigation }) => {
    //const informaitonAboutUser = useSelector((state) => state.user);
    const [data, setData] = useState([]);
    //const [id, setId] = useState(informaitonAboutUser.facilityid);
    // const [roleid, setroleid] = useState(informaitonAboutUser.approle);
    // const [userid, setuserid] = useState(informaitonAboutUser.userid);
    const [isActivity, setIsActivity] = useState(false);
    const [HTime, SetHTimeValue] = useState(null);

    const [dataDDLGrp, setDataDDLGrp] = useState([]);
    const [openGrp, setOpenGrp] = useState(false);
    const [valueGrp, setValueGrp] = useState(null);
    const [oldValueGrp, setOldValueGrp] = useState();
    const [DataGrp, setDataGrp] = useState([]);

    const [dataItemDetail, setdataItemDetail] = useState([]);


    const [dataDDLItem, setDataDDLItem] = useState([]);
    const [openItem, setOpenItem] = useState(false);
    const [valueItem, setValueItem] = useState(null);
    const [oldValueItem, setOldValueItem] = useState();
    const [DataItem, setDataItem] = useState([]);  
    
    
    


    


    
    const [dataDDLWh, setDataDDLWh] = useState([]);
    const [openWh, setOpenWh] = useState(false);
    const [valueWh, setValueWh] = useState(null);
    const [oldValueWh, setOldValueWh] = useState();
    const [DataWh, setDataWh] = useState([]);
   

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
    //const [segmentValue, setsegmentValue] = React.useState('');

    const [TitalValue, SetTitalValue] = useState(null);
    //const drpdwnValue = ["Drugs", "Consumable & Others,", "Reagents"];

    const resetDropdowns = () => {
        // Reset the state variables for dropdown selections
        setValueGrp(null);
        setValueItem(null);
        SetTitalValue('');
        // You can add other dropdown state variables here if needed
    };


    const fetchData = async () => {

        if (valueWh == 0 || valueItem == null ) {    
            alert('Please Select Warehouse');    
            let toast = Toast.show('Please Select Warehouse', {
                duration: Toast.durations.LONG,
            });
            return;
        }


        if (valueItem == 0 || valueItem == null) {
            alert("Please Select Category")
            let toast = Toast.show('Please Select Category', {
                duration: Toast.durations.LONG,
            });
            return;
        }

       
        if (valueGrp == 0 || valueGrp == null) {   
            alert('Please Select Group');        
            let toast = Toast.show('Please Select Group', {
                duration: Toast.durations.LONG,
            });
            return;
        }



        try {
            setVisible(true);
            //fetchItemDetail();
            await fetchStockPos();
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


    const fetchStockPos = async () => {
        try {

            //SetTitalValue("Stock vs Issuance");
            // alert("valueYr:" + valueYr);
            const response = await fetchWHItemStock(valueWh,valueItem,valueGrp);
            setData(response);
            //alert(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };


    //DDL datas
    const fetchGroupNameData = async () => {
        try {
            // const ddlData = await fetchDistrictDDL(tfvalud,Whid,"0",userid,approle);
            //alert("valueitem: " + valueItem);
            const ddlData = await fetchGroupName('true',valueItem);
            setDataDDLGrp(ddlData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // const fetchItemDetail = async () => {
    //     try {
    //         // const ddlData = await fetchDistrictDDL(tfvalud,Whid,"0",userid,approle);
    //         //alert("valueitem: " + valueItem);
    //         const data = await fetchMasitems(valueYr, '0', '0', '0', '0', '0');
    //         setdataItemDetail(data);
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // };




    const fetchMainCategory = async () => {
        try {
            //alert("main Cat:"+facid);
            const stockReportDataDDL = await fetchMainCategoryService("HOD");
            setDataDDLItem(stockReportDataDDL);
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const fetchWarehouseData = async () => {
        try {
            //alert("main Cat:"+facid);
            const result = await fetchWarehouse(false);
            setDataDDLWh(result);
        } catch (error) {
            console.error('Error:', error);
        }
    };




    //Card datas





    useEffect(() => {
        //fetchDistrict();
        fetchWarehouseData();
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

    const renderItem = ({ item, index }) => {
        return (
            <Card style={styles.card}>
                      
                           {/* <Paragraph style={styles.header}>{item.groupname}</Paragraph> */}
                <Card.Content>
     
                    <View style={styles.row}>
                        <View style={styles.column}>
                          
                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Item Name With Code:</Title>
                                <Paragraph style={styles.value}>{item.itemname}</Paragraph>
                            </View>
                        
                            {/* <View style={styles.rowItem}>
                                <Title style={styles.label}>Item Code:</Title>
                                <Paragraph style={styles.value}>{item.itemcode}</Paragraph>
                            </View> */}
                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Items Type:</Title>
                                <Paragraph style={styles.value}>{item.itemtypename}</Paragraph>
                            </View>
                            <View style={styles.rowItem}>
                                <Title style={styles.label}>SKU:</Title>
                                <Paragraph style={styles.value}>{item.sku}</Paragraph>
                            </View>
                            {/* <View style={styles.rowItem}>
                                <Title style={styles.label}>Warehouse Name:</Title>
                                <Paragraph style={styles.value}>{item.warehousename}</Paragraph>
                            </View> */}
                            {/* <View style={styles.rowItem}>
                                <Title style={styles.label}>EDL Type:</Title>
                                <Paragraph style={styles.value}>{item.edltype}</Paragraph>
                            </View> */}
                            <View style={styles.rowItem}>
                                <Title style={styles.label}>WH Ready Stock:</Title>
                                <Paragraph style={styles.value}>{item.readyforissue}</Paragraph>
                            </View>
                            <View style={styles.rowItem}>
                                <Title style={styles.label}>WH Under QC Stock:</Title>
                                <Paragraph style={styles.value}>{item.pending}</Paragraph>
                            </View>
                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Current Fin.Year Issued Stock:</Title>
                                <Paragraph style={styles.value}>{item.issueqtY_CFY}</Paragraph>
                            </View>
                          
                        </View>
                    </View>
                </Card.Content>
            </Card>
        );
    };

    return (
        <View style={styles.container}>

            <Appbar.Header style={styles.headerApp}>
                <Appbar.BackAction onPress={() => navigation.navigate('Public Reports')} />
                <Appbar.Content title="Warehouse Stock" titleStyle={styles.headerTitle} />
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



            {dataDDLWh.length > 0 ? (
                <DropDownPicker
                    open={openWh}
                    value={valueWh}
                    searchable={true}
                    items={dataDDLWh.map((item) => (
                        {
                            label: item.warehousename,
                            value: item.warehouseid,
                        }))}
                    setOpen={setOpenWh}
                    setValue={setValueWh}
                    setItems={setDataWh}
                    placeholder='Select Warehouse'
                    listMode='MODAL'
                    containerStyle={{ height: 30, width: '90%', margin: 20, zIndex: 1000 }}
                    onChangeValue={(value) => {
                        if (value != null) {
                            setOldValueWh(value);
                            // alert("outside mcid:"+value);
                            // alert("outside oldValueItem:"+oldValueItem);
                            if (value != oldValueWh && value != undefined) {
                                //alert("ddl invoked: value" + value + "old value: " + oldValue);
                                //fetchData();
                                // alert("mcid:"+value);
                                // alert("oldValueItem:"+oldValueItem);
                                //fetchDistrict();
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
                                fetchGroupNameData();
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
            {/* <View style={{ height: 20, width: '60%', margin: 20 ,zIndex: 1000 }}
>
                <SegmentedButtons
                    value={segmentValue}
                    onValueChange={setsegmentValue}
                    buttons={[
                        {
                            value: 'Y',
                            label: 'EDL',

                        },
                        {
                            value: 'N',
                            label: 'Non EDL',

                        },
                       
                    ]}
                />
            </View> */}
            <View style={StyleSheet.flatten([{ justifyContent: 'space-between', flexDirection: 'row', zIndex: 999 }])} >

                {dataDDLGrp.length > 0 ? (
                    <DropDownPicker
                        open={openGrp}
                        value={valueGrp}
                        searchable={true}
                        items={dataDDLGrp.map((item) => (
                            {
                                label: item.groupname,
                                value: item.groupid,
                            }))}
                        setOpen={setOpenGrp}
                        setValue={setValueGrp}
                        setItems={setDataGrp}
                        containerStyle={{ height: 30, width: '60%', margin: 20 }}
                        placeholder='Select Group'
                        listMode='MODAL'
                        onChangeValue={(value) => {
                            if (value != null) {
                                setOldValueGrp(value);
                                if (value != oldValueGrp && oldValueGrp != undefined) {
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



                <View style={StyleSheet.flatten([{ justifyContent: 'space-between', flexDirection: 'row', zIndex: 1000, width: '90%' }])} >
                    <TouchableOpacity style={StyleSheet.flatten([styles.button, { margin: 20 }])} onPress={fetchData}>
                        <Text style={styles.buttonText}>Show</Text>
                    </TouchableOpacity>
                </View>

                {/* <TouchableOpacity style={StyleSheet.flatten([styles.button, { margin: 20, }])} onPress={fetchData}>
                    <Text style={styles.buttonText}>Show</Text>
                </TouchableOpacity> */}
            </View>
            {/* <View>
                <Title style={styles.header1}>{TitalValue}</Title>
            </View> */}
            { }


            <View style={styles.card}>
                {dataItemDetail.length > 0 && (
                    <View style={styles.cardContent}>
                        <View style={styles.cardItem}>
                            <Text style={styles.label}>Name:</Text>
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
                        <View style={styles.cardItem}>
                            <Text style={styles.label}>Group:</Text>
                            <Text style={styles.value}>{dataItemDetail[0].groupname}</Text>
                        </View>
                        <View style={styles.cardItem}>
                            <Text style={styles.label}>Type/EDL:</Text>
                            <Text style={styles.value}>{dataItemDetail[0].itemtypename}/{dataItemDetail[0].edl}</Text>
                        </View>
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
        marginLeft: -15,
        paddingVertical: 10,
        backgroundColor: '#3377FF',
        borderRadius: 5,
        width: 100,

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
        marginTop: 20,
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
        fontSize: 15
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
    card: {
        margin: 10,
        backgroundColor: '#FFFFFF',
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

});

export default StockVsIssuanceInWh;
