import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, ScrollView, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { GetFinalStatusPendingInHOQC, GetPendingToDropByItem, GetPendingToPickByItem, GetPendingToReceiptInHO, GetPendingToReceiptInLab, GetPendingToSendToLab, GetUnderLabSinceXdaysOutOfTimeline, GetUnderLabSinceXdaysWithinTimeline, fetchDistribution, fetchItemDetailDDL, fetchMainCategoryService, fetchNearExpService, fetchPOAlertSummary, fetchPendingToDrop, fetchPendingToPick, fetchWarehouse } from '../Services/apiService';
import DropDownPicker from 'react-native-dropdown-picker';

import { ActivityIndicator, MD2Colors, Dialog, Portal, Title, Checkbox } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-root-toast';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import Ticon from 'react-native-vector-icons/MaterialCommunityIcons';
import Io from 'react-native-vector-icons/Ionicons';




const ItemTracking = ({ navigation }) => {
    const informaitonAboutUser = useSelector((state) => state.user);
    const [data, setData] = useState([]);
    const [dataPickByItem, setDataPickByItem] = useState([]);
    const [dataItemPendingToDropHO, setDataItemPendingToDropHO] = useState([]);
    const [dataPendingToSendToLab, setDataPendingToSendToLab] = useState([]);
    const [dataPendingToReceiptInHO, setDataPendingToReceiptInHO] = useState([]);
    const [dataUnderLabSinceXdaysWithinTimeline, setDataUnderLabSinceXdaysWithinTimeline] = useState([]);
    const [dataUnderLabSinceXdaysOutOfTimeline, setDataUnderLabSinceXdaysOutOfTimeline] = useState([]);
    const [dataFinalStatusPendingInHOQC, setDataFinalStatusPendingInHOQC] = useState([]);
    const [id, setId] = useState(informaitonAboutUser.facilityid);
    const [isActivity, setIsActivity] = useState(false);

    const [isPublicUser, setIsPublicUser] = useState(false);


    const [dataDDLyr, setDataDDLyr] = useState([]);
    const [openYr, setOpenYr] = useState(false);
    const [valueYr, setValueYr] = useState(null);
    const [oldValueYr, setOldValueYr] = useState();
    const [DataYr, setDataYr] = useState([]);
    const [TitalValue, SetTitalValue] = useState(null);

    const [dataDDLItem, setDataDDLItem] = useState([]);
    const [openItem, setOpenItem] = useState(false);
    const [valueItem, setValueItem] = useState(null);
    const [itemDetails, setItemDetails] = useState(null);
    const [oldValueItem, setOldValueItem] = useState();
    const [DataItem, setDataItem] = useState([]);


    const [itemDetail, setItemDetail] = useState([]);
    const [FacilityIndentToWH, setFacilityIndentToWH] = useState([]);
    const [WHissueToFacility, setWHissueToFacility] = useState([]);
    const [FacilityReceiptAgainstIndent, setFacilityReceiptAgainstIndent] = useState([]);
    const [FacilityReceiptFromOtherFacilityOrLP, setFacilityReceiptFromOtherFacilityOrLP] = useState([]);
    const [FacilityWardIssue, setFacilityWardIssue] = useState([]);
    const [FacilityIssueToOtherFacility, setFacilityIssueToOtherFacility] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    //const [segmentValue, setsegmentValue] = React.useState('');

    const [visible, setVisible] = React.useState(false);
    const hideDialog = () => setVisible(false);


    //const drpdwnValue = ["Drugs", "Consumable & Others,", "Reagents"];

    const resetDropdowns = () => {
        setValueItem(null);
        setData([]);
        // setsegmentValue('')
    };


    const fetchData = async () => {
        if (!valueItem) {
            alert('Please Select Item.');
            return;
        }

        showItemDetails();

        try {
            setVisible(true);
            const response = await GetPendingToPickByItem(valueItem);
            setDataPickByItem(response);

            const response1 = await GetPendingToDropByItem(valueItem);
            setDataItemPendingToDropHO(response1);

            const response2 = await GetPendingToSendToLab(valueItem);
            setDataPendingToSendToLab(response2);

            // const response3 = await GetPendingToReceiptInHO(valueItem);
            // setDataPendingToReceiptInHO(response3);

            const response3 = await GetPendingToReceiptInLab(valueItem);
            setDataPendingToReceiptInHO(response3);

            const response4 = await GetUnderLabSinceXdaysWithinTimeline(valueItem);
            setDataUnderLabSinceXdaysWithinTimeline(response4);

            const response5 = await GetUnderLabSinceXdaysOutOfTimeline(valueItem);
            setDataUnderLabSinceXdaysOutOfTimeline(response5);

            const response6 = await GetFinalStatusPendingInHOQC(valueItem);
            setDataFinalStatusPendingInHOQC(response6);


        } catch (error) {
            console.error('Error:', error);
        }
        finally {
            hideDialog();
        }

        // if (segmentValue == 0 || segmentValue == null) {
        //     alert("Please Choose Pending Type");
        //     return;
        // }

        //        var cat="";   
        // if (valueItem == 1)
        //     {
        //         cat="Drugs";
        //     }
        //     else if(valueItem == "2")
        //       {
        //         cat="Consumables";
        //       }
        //       else if(valueItem == "3")
        //       {
        //         cat="Reagents";
        //       }
        //       else if(valueItem == "4")
        //       {
        //         cat="AYUSH";
        //       }
        //       else
        //       {
        //         cat="All Categories";
        //       }

        // if (segmentValue == "PTP" || segmentValue == "PTD") {

        //     if (segmentValue == "PTP") {
        //         SetTitalValue("Pending to Pick in Warehouses")
        //     }

        //     else if (segmentValue == "PTD") {
        //         SetTitalValue("Pending to Drop in HO")
        //     }



        //     try {
        //         setVisible(true);
        //         if (valueItem == 0 || valueItem == null || valueItem == 1) {
        //             if (segmentValue == "PTP") {
        //                 const response = await fetchPendingToPick(0);
        //                 setData(response);
        //             }
        //             else if (segmentValue == "PTD") {
        //                 const response = await fetchPendingToDrop(0);
        //                 setData(response);
        //             }
        //         }
        //         else {
        //             if (segmentValue == "PTP") {
        //                 const response = await fetchPendingToPick(valueItem);
        //                 setData(response);
        //             }
        //             else if (segmentValue == "PTD") {
        //                 const response = await fetchPendingToDrop(valueItem);
        //                 setData(response);
        //             }
        //         }

        //     } catch (error) {
        //         console.error('Error:', error);
        //     }
        //     finally {
        //         hideDialog();
        //     }
        // }
        // else {
        //     //alert("Please Select Directorate")
        //     let toast = Toast.show('Please Near Exp Criteria', {
        //         duration: Toast.durations.LONG,
        //     });
        //     return;
        // }




    };


    // const fetchNearExp = async (mcid, nexppara) => {
    //     try {

    //         //    alert(mcid+" nexppara:"+nexppara);
    //         const response = await fetchNearExpService(mcid, nexppara);
    //         setData(response);


    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // };



    const fetchItemDetailDDLData = async () => {
        try {
            //alert("main Cat:"+facid);
            const dataDDL = await fetchItemDetailDDL();
            setDataDDLItem(dataDDL);
        } catch (error) {
            console.error('Error:', error);
        }
    };


    useEffect(() => {

        fetchItemDetailDDLData();
    }, []
    );


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            resetDropdowns();
            setItemDetails(null);
        });
        return unsubscribe();
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



    // const navigateFunction = (item, fType) => {
    //     var tot = "";
    //     if (fType == 0 || fType == 1) {

    //         if (fType == 0) {
    //             //item
    //             tot = item.noofitems;
    //         }
    //         else if (fType == 1) {
    //             //batch
    //             tot = item.noofbatches;
    //         }
    //         var cat = "";
    //         if (valueItem == 1) {
    //             cat = "Drugs";
    //         }
    //         else if (valueItem == "2") {
    //             cat = "Consumables";
    //         }
    //         else if (valueItem == "3") {
    //             cat = "Reagents";
    //         }
    //         else if (valueItem == "4") {
    //             cat = "AYUSH";
    //         }
    //         else {
    //             cat = "All Categories";
    //         }
    //         var fmcatid;
    //         if (valueItem == 0 || valueItem == null) {
    //             fmcatid = "0";
    //         }
    //         else {
    //             fmcatid = valueItem;
    //         }


    //         var item1 = { "nearexpcrit": segmentValue, "ItemBatch": fType, "mcid": fmcatid, "cat": cat, "total": tot, "expmonth": item.expirymonth }
    //         //alert(JSON.stringify(item1));

    //         //return;
    //         if (fType == "0") {
    //             //alert(" var nearexpcrit "+segmentValue+" mcid"+fmcatid+" ItemBatch"+fType+" cat"+cat+" total"+tot+"expmonth:"+item.expirymonth)
    //             navigation.navigate('Near Exp Item-wise', { item: item1 });
    //         }
    //         if (fType == "1") {
    //             //  alert("batch nearexpcrit"+segmentValue+" mcid"+fmcatid+" ItemBatch"+fType+" ftype"+cat+" total"+tot+"expmonth:"+item.expirymonth)
    //             navigation.navigate('Near Exp Batch-wise', { item: item1 });
    //         }
    //     }
    // }

    const showItemDetails = () => {
        const selectedItem = dataDDLItem.find(item => item.itemid === valueItem);
        setItemDetails(selectedItem);
    };

    const renderItem = ({ item, index }) => (
        <View
            style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}
        >

            {/* <View style={styles.cell}>
                <Text style={styles.cellText}>{index + 1}</Text>
            </View> */}

            <View style={styles.cell}>
                <Text style={styles.cellText}>{index + 1}: {item.warehousename}</Text>
            </View>

            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.batchno}</Text>
            </View>

            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.pendingdays}</Text>
            </View>

            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.qdocketno}</Text>
            </View>

        </View>
    );

    const renderItemPendingToDropHO = ({ item, index }) => (
        <View
            style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}
        >

            {/* <View style={styles.cell}>
                <Text style={styles.cellText}>{index + 1}</Text>
            </View> */}

            <View style={styles.cell}>
                <Text style={styles.cellText}>{index + 1}: {item.warehousename}</Text>
            </View>

            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.batchno}</Text>
            </View>

            {/* <View style={styles.cell}>
                <Text style={styles.cellText}>{item.pendingdays}</Text>
            </View> */}



            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.pickdate1}</Text>
            </View>

            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.qdocketno}</Text>
            </View>

        </View>
    );


    const renderPendingToSendToLab = ({ item, index }) => (
        <View
            style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}
        >

            {/* <View style={styles.cell}>
                <Text style={styles.cellText}>{index + 1}</Text>
            </View> */}



            <View style={styles.cell}>
                <Text style={styles.cellText}>{index + 1}: {item.noofdays}</Text>
            </View>

            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.noofitems}</Text>
            </View>

            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.noofsamples}</Text>
            </View>

            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.noofdockets}</Text>
            </View>

            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.nooflabs}</Text>
            </View>

        </View>
    );

    const renderPendingToReceiptInHO = ({ item, index }) => (
        <View
            style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}
        >

            {/* <View style={styles.cell}>
                <Text style={styles.cellText}>{index + 1}</Text>
            </View> */}



            <View style={styles.cell}>
                <Text style={styles.cellText}>{index + 1}: {item.warehousename}</Text>
            </View>

            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.batchno}</Text>
            </View>

            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.dropdate}</Text>
            </View>

            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.qdocketno}</Text>
            </View>

        </View>
    );



    const renderUnderLabSinceXdaysWithinTimeline = ({ item, index }) => (
        <View
            style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}
        >

            {/* <View style={styles.cell}>
                <Text style={styles.cellText}>{index + 1}</Text>
            </View> */}



            <View style={styles.cell}>
                <Text style={styles.cellText}>{index + 1}: {item.noofdays}</Text>
            </View>

            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.noofitems}</Text>
            </View>

            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.noofsamples}</Text>
            </View>

            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.noofdockets}</Text>
            </View>

            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.nooflabs}</Text>
            </View>


        </View>
    );


    const renderUnderLabSinceXdaysOutOfTimeline = ({ item, index }) => (
        <View
            style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}
        >

            {/* <View style={styles.cell}>
                <Text style={styles.cellText}>{index + 1}</Text>
            </View> */}



            <View style={styles.cell}>
                <Text style={styles.cellText}>{index + 1}: {item.noofdays}</Text>
            </View>

            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.noofitems}</Text>
            </View>

            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.noofsamples}</Text>
            </View>

            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.noofdockets}</Text>
            </View>

            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.nooflabs}</Text>
            </View>


        </View>
    );

    const renderFinalStatusPendingInHOQC = ({ item, index }) => (
        <View
            style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}
        >

            {/* <View style={styles.cell}>
                <Text style={styles.cellText}>{index + 1}</Text>
            </View> */}



            <View style={styles.cell}>
                <Text style={styles.cellText}>{index + 1}: {item.noofdays}</Text>
            </View>

            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.noofitems}</Text>
            </View>

            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.noofsamples}</Text>
            </View>

            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.nooflabs}</Text>
            </View>

        </View>
    );


    const renderCheckbox = (data, label) => (
        <View key={label} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
            <Checkbox
                status={data.length > 0 ? 'checked' : 'unchecked'}
                disabled={isPublicUser}
            />
            <Text>{label}</Text>
        </View>
    );


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





            <View style={StyleSheet.flatten([{ justifyContent: 'space-between', flexDirection: 'row', zIndex: 999 }])} >

                {dataDDLItem.length > 0 ? (
                    <DropDownPicker
                        open={openItem}
                        value={valueItem}
                        searchable={true}
                        items={dataDDLItem.map((item) => (
                            {
                                label: item.detailid,
                                value: item.itemid,
                            }))}
                        setOpen={setOpenItem}
                        setValue={setValueItem}
                        setItems={setDataItem}
                        containerStyle={{ height: 30, width: '60%', margin: 20, zIndex: 1000 }}
                        placeholder='Select Item'
                        listMode='MODAL'
                        onChangeValue={(value) => {
                            if (value != null) {
                                setOldValueItem(value);
                                if (value != oldValueItem && oldValueItem != undefined) {
                                    //alert("ddl invoked: value" + value + "old value: " + oldValue);
                                    //fetchData();
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

                <TouchableOpacity style={StyleSheet.flatten([styles.button, { margin: 20, }])} onPress={fetchData}>
                    <Text style={styles.buttonText}>Show</Text>
                </TouchableOpacity>


            </View>
            <View>
                <Title style={styles.header1}>{TitalValue}</Title>
            </View>
            <ScrollView>
                <View>

                    {itemDetails && (
                        <View style={styles.detailsContainer}>
                            {/* <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Item ID:</Text>
                        <Text style={styles.detailValue}>{itemDetails.itemid}</Text>
                    </View> */}
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Category:</Text>
                                <Text style={styles.detailValue}>{itemDetails.mcategory}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Item Name:</Text>
                                <Text style={styles.detailValue}>{itemDetails.itemname}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Strength:</Text>
                                <Text style={styles.detailValue}>{itemDetails.strengtH1}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Unit:</Text>
                                <Text style={styles.detailValue}>{itemDetails.unit}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Warehouse Nos:</Text>
                                <Text style={styles.detailValue}>{itemDetails.noswh}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Ready for Issue:</Text>
                                <Text style={styles.detailValue}>{itemDetails.readyforissue}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>UQC Quantity:</Text>
                                <Text style={styles.detailValue}>{itemDetails.uqcqty}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Batch Nos:</Text>
                                <Text style={styles.detailValue}>{itemDetails.nosbatches}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Last MRC Date:</Text>
                                <Text style={styles.detailValue}>{itemDetails.lastmrcdt}</Text>
                            </View>
                            {/* <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Detail ID:</Text>
                        <Text style={styles.detailValue}>{itemDetails.detailid}</Text>
                    </View> */}
                        </View>
                    )}
                </View>


                {dataPickByItem.length > 0 && (
                    <>
                        <View style={[styles.header, { marginTop: 15 }]}>
                            <Text style={{ fontSize: 20 }}>Pending to Pick In Warehouse</Text>
                        </View>
                        <View style={styles.header}>
                            {/* <Text style={styles.headerText}>SN</Text> */}
                            <Text style={styles.headerText}>WH</Text>
                            <Text style={styles.headerText}>Batch</Text>
                            <Text style={styles.headerText}>Pending Days</Text>
                            <Text style={styles.headerText}>Docket</Text>

                        </View>
                        <FlatList
                            data={dataPickByItem}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={renderItem}
                        />
                    </>
                )}

                {dataItemPendingToDropHO.length > 0 && (
                    <>
                        <View style={[styles.header, { marginTop: 15 }]}>
                            <Text style={{ fontSize: 20 }}>Pending to Drop in HO</Text>
                        </View>
                        <View style={styles.header}>
                            {/* <Text style={styles.headerText}>SN</Text> */}
                            <Text style={styles.headerText}>WH</Text>
                            <Text style={styles.headerText}>Batch</Text>
                            <Text style={styles.headerText}>Picked</Text>
                            <Text style={styles.headerText}>Docket</Text>
                        </View>
                        <FlatList
                            data={dataItemPendingToDropHO}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={renderItemPendingToDropHO}
                        />
                    </>
                )}

                {dataPendingToReceiptInHO.length > 0 && (
                    <>
                        <View style={[styles.header, { marginTop: 15 }]}>
                            <Text style={{ fontSize: 20 }}>Pending to Receipt in HO</Text>
                        </View>
                        <View style={styles.header}>
                            {/* <Text style={styles.headerText}>SN</Text> */}
                            <Text style={styles.headerText}>WH</Text>
                            <Text style={styles.headerText}>Batch</Text>
                            <Text style={styles.headerText}>Drop Dt</Text>
                            <Text style={styles.headerText}>Docket</Text>

                        </View>
                        <FlatList
                            data={dataPendingToReceiptInHO}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={renderPendingToReceiptInHO}
                        />
                    </>
                )}

                {dataPendingToSendToLab.length > 0 && (
                    <>
                        <View style={[styles.header, { marginTop: 15 }]}>
                            <Text style={{ fontSize: 20 }}>Pending to Send to Lab</Text>
                        </View>
                        <View style={styles.header}>
                            {/* <Text style={styles.headerText}>SN</Text> */}
                            <Text style={styles.headerText}>Days</Text>
                            <Text style={styles.headerText}>Items</Text>
                            <Text style={styles.headerText}>Samples</Text>
                            <Text style={styles.headerText}>Dockets</Text>
                            <Text style={styles.headerText}>Labs</Text>
                        </View>
                        <FlatList
                            data={dataPendingToSendToLab}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={renderPendingToSendToLab}
                        />
                    </>
                )}




                {dataUnderLabSinceXdaysWithinTimeline.length > 0 && (
                    <>
                        <View style={[styles.header, { marginTop: 15 }]}>
                            <Text style={{ fontSize: 20 }}>Under Lab Since X days Within Timeline</Text>
                        </View>
                        <View style={styles.header}>
                            {/* <Text style={styles.headerText}>SN</Text> */}
                            <Text style={styles.headerText}>Days</Text>
                            <Text style={styles.headerText}>Items</Text>
                            <Text style={styles.headerText}>Samples</Text>
                            <Text style={styles.headerText}>Dockets</Text>
                            <Text style={styles.headerText}>Labs</Text>
                        </View>
                        <FlatList
                            data={dataUnderLabSinceXdaysWithinTimeline}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={renderUnderLabSinceXdaysWithinTimeline}
                        />
                    </>
                )}


                {dataUnderLabSinceXdaysOutOfTimeline.length > 0 && (
                    <>
                        <View style={[styles.header, { marginTop: 15 }]}>
                            <Text style={{ fontSize: 20 }}>Under Lab Since X days Out of Timeline</Text>
                        </View>
                        <View style={styles.header}>
                            {/* <Text style={styles.headerText}>SN</Text> */}
                            <Text style={styles.headerText}>Days</Text>
                            <Text style={styles.headerText}>Items</Text>
                            <Text style={styles.headerText}>Samples</Text>
                            <Text style={styles.headerText}>Dockets</Text>
                            <Text style={styles.headerText}>Labs</Text>
                        </View>
                        <FlatList
                            data={dataUnderLabSinceXdaysOutOfTimeline}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={renderUnderLabSinceXdaysOutOfTimeline}
                        />
                    </>
                )}


                {dataFinalStatusPendingInHOQC.length > 0 && (
                    <>
                        <View style={[styles.header, { marginTop: 15 }]}>
                            <Text style={{ fontSize: 20 }}>Final Status Pending in HO QC</Text>
                        </View>
                        <View style={styles.header}>
                            {/* <Text style={styles.headerText}>SN</Text> */}
                            <Text style={styles.headerText}>Days</Text>
                            <Text style={styles.headerText}>Items</Text>
                            <Text style={styles.headerText}>Samples</Text>
                            <Text style={styles.headerText}>Labs</Text>
                        </View>
                        <FlatList
                            data={dataFinalStatusPendingInHOQC}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={renderFinalStatusPendingInHOQC}
                        />
                    </>
                )}


                {/* <View style={{ padding: 20 }}>
                    <Text>Item Availability Status</Text>
                    {renderCheckbox(dataPickByItem, 'Pick By Item')}
                    {renderCheckbox(dataItemPendingToDropHO, 'Item Pending to Drop HO')}
                    {renderCheckbox(dataPendingToSendToLab, 'Pending to Send to Lab')}
                    {renderCheckbox(dataPendingToReceiptInHO, 'Pending to Receipt in HO')}
                    {renderCheckbox(dataUnderLabSinceXdaysWithinTimeline, 'Under Lab Since X days Within Timeline')}
                    {renderCheckbox(dataUnderLabSinceXdaysOutOfTimeline, 'Under Lab Since X days Out of Timeline')}
                    {renderCheckbox(dataFinalStatusPendingInHOQC, 'Final Status Pending in HOQC')}
                </View> */}

            </ScrollView>

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
        // alignItems: 'right',
        textAlign: 'center',
        // alignSelf: 'right',



    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
        //alignSelf: 'center'
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
        textAlign: 'center',
        // alignSelf:'center',
        color: 'purple',
        fontSize: 15,
        fontWeight: 'bold',
    },
    footer1: {
        backgroundColor: '#F2F2F2',
        borderBottomColor: '#CCCCCC',
        textAlign: 'left',
        // alignSelf:'left',
        color: 'purple',
        fontSize: 10,
       // textAlign: 'left',
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
        fontSize: 9,
    },
    cellTextU: {
        fontSize: 14,
    },
    cellTextB: {
        fontSize: 12,

        color: '#000000',
    },
    cellTextRed: {
        fontSize: 12,
        color: '#FF2400',
        fontWeight: "bold",
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





    dropdownContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 999,
        margin: 20,
    },
    dropdown: {
        height: 30,
        width: '60%',
        zIndex: 1000,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        marginTop: 25,
        paddingVertical: 10,
        backgroundColor: '#3377FF',
        borderRadius: 5,
        width: 100,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    detailsContainer: {
        margin: 20,
        padding: 10,
        backgroundColor: '#F2F2F2',
        borderRadius: 5,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    detailLabel: {
        fontWeight: 'bold',
        fontSize: 14,
        marginRight: 10,
    },
    detailValue: {
        fontStyle: 'italic',
        fontSize: 12,
    },

});

export default ItemTracking;
