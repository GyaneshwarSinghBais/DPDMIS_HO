import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { fetchFacilityAvailableItem, fetchFacilityIndentToWH, fetchFacilityIssueToOtherFacility, fetchFacilityReceiptAgainstIndent, fetchFacilityReceiptFromOtherFacilityOrLP, fetchFacilityWardIssue, fetchItemDetail, fetchMainCategoryService, fetchStockPerEDL, fetchStockPerNonEDLAg_ApprovedAI, fetchStockReport, fetchWHissueToFacility, fetchYear } from '../Services/apiService';
import DropDownPicker from 'react-native-dropdown-picker';
import { ActivityIndicator, Colors } from 'react-native-paper';
//import { SegmentedButtons } from 'react-native-paper';

const FacilitySupplyChain = ({ navigation }) => {
    const informaitonAboutUser = useSelector((state) => state.user);
    const [edlData, setEdlData] = useState([]);
    const [nonEdlData, setNonEdlData] = useState([]);
    const [id, setId] = useState(informaitonAboutUser.facilityid);
    const [isActivity, setIsActivity] = useState(false);


    const [dataDDLyr, setDataDDLyr] = useState([]);
    const [openYr, setOpenYr] = useState(false);
    const [valueYr, setValueYr] = useState(null);
    const [oldValueYr, setOldValueYr] = useState();
    const [DataYr, setDataYr] = useState([]);


    const [dataDDLItem, setDataDDLItem] = useState([]);
    const [openItem, setOpenItem] = useState(false);
    const [valueItem, setValueItem] = useState(null);
    const [oldValueItem, setOldValueItem] = useState();
    const [DataItem, setDataItem] = useState([]);


    const [itemDetail, setItemDetail] = useState([]);
    const [FacilityIndentToWH, setFacilityIndentToWH] = useState([]);
    const [WHissueToFacility, setWHissueToFacility] = useState([]);
    const [FacilityReceiptAgainstIndent, setFacilityReceiptAgainstIndent] = useState([]);
    const [FacilityReceiptFromOtherFacilityOrLP, setFacilityReceiptFromOtherFacilityOrLP] = useState([]);
    const [FacilityWardIssue, setFacilityWardIssue] = useState([]);
    const [FacilityIssueToOtherFacility, setFacilityIssueToOtherFacility] = useState([]);

    //const [segmentValue, setsegmentValue] = React.useState('');


    //const drpdwnValue = ["Drugs", "Consumable & Others,", "Reagents"];


    const fetchData = async () => {
        if (valueYr == 0 || valueYr == null) {
            alert("Please Select Year")
            return;
        }
        if (valueItem == 0 || valueItem == null) {
            alert("Please Select Item")
            return;
        }

        try {
            fetchItemDetailData();
            fetchFacilityIndentToWHData();
            fetchWHissueToFacilityData();
            fetchFacilityReceiptAgainstIndentData();
            fetchFacilityReceiptFromOtherFacilityOrLPData();
            fetchFacilityWardIssueData();
            fetchFacilityIssueToOtherFacilityData();

        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchItemDetailData = async () => {
        try {
            const resultData = await fetchItemDetail(id, valueYr, valueItem);
            setItemDetail(resultData);
        } catch (error) {
            console.error('Error:', error);
        }
    };


    //DDL datas
    const fetchYearData = async () => {
        try {
            const ddlData = await fetchYear(id);
            setDataDDLyr(ddlData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchFacilityAvailableItemData = async () => {
        try {
            const ddlData = await fetchFacilityAvailableItem(id);
            setDataDDLItem(ddlData);
        } catch (error) {
            console.error('Error:', error);
        }
    };


    //Card datas
    const fetchFacilityIndentToWHData = async () => {
        try {
            //alert("id: " + id + " valueYr: " + valueYr + "valueItem: " + valueItem);
            const resultData = await fetchFacilityIndentToWH(id, valueYr, valueItem);
            setFacilityIndentToWH(resultData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchWHissueToFacilityData = async () => {
        try {
            const resultData = await fetchWHissueToFacility(id, valueYr, valueItem);
            setWHissueToFacility(resultData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchFacilityReceiptAgainstIndentData = async () => {
        try {
            const resultData = await fetchFacilityReceiptAgainstIndent(id, valueYr, valueItem);
            setFacilityReceiptAgainstIndent(resultData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchFacilityReceiptFromOtherFacilityOrLPData = async () => {
        try {
            const resultData = await fetchFacilityReceiptFromOtherFacilityOrLP(id, valueYr, valueItem);
            setFacilityReceiptFromOtherFacilityOrLP(resultData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchFacilityWardIssueData = async () => {
        try {
            const resultData = await fetchFacilityWardIssue(id, valueYr, valueItem);
            setFacilityWardIssue(resultData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchFacilityIssueToOtherFacilityData = async () => {
        try {
            const resultData = await fetchFacilityIssueToOtherFacility(id, valueYr, valueItem);
            setFacilityIssueToOtherFacility(resultData);
        } catch (error) {
            console.error('Error:', error);
        }
    };




    useEffect(() => {
        fetchYearData();
        fetchFacilityAvailableItemData();
    }, []
    );



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

    const navigateFunction = () => {
        const isedl = (segmentValue == 'EDL') ? 'Y' : 'N';
        const item1 = { "catid": value, "isedl": isedl }
        //alert(testid);
        //navigation.navigate("Add New Issue"); 
        navigation.navigate('Stock Out Detail', { item: item1 });
    }


    return (





        <View style={styles.container}>
            {/* <View style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}>
                <SegmentedButtons
                    value={segmentValue}
                    onValueChange={setsegmentValue}
                    buttons={[
                        {
                            value: 'EDL',
                            label: 'EDL',
                            icon: 'medical-bag',
                        },
                        {
                            value: 'NONEDL',
                            label: 'Non EDL',
                            icon: 'bag-personal-outline',
                        },
                    ]}
                />
            </View> */}
            
            {dataDDLItem.length > 0 ? (
                <DropDownPicker
                    open={openItem}
                    value={valueItem}
                    searchable={true}
                    items={dataDDLItem.map((item) => (
                        {
                            label: item.name,
                            value: item.itemid,
                        }))}
                    setOpen={setOpenItem}
                    setValue={setValueItem}
                    setItems={setDataItem}
                    containerStyle={{ height: 30, width: '90%', margin: 20, zIndex: 1000 }}
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
                <Text></Text>
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
                                label: item.accyear,
                                value: item.accyrsetid,
                            }))}
                        setOpen={setOpenYr}
                        setValue={setValueYr}
                        setItems={setDataYr}
                        containerStyle={{ height: 30, width: '60%', margin: 20 }}
                        onChangeValue={(value) => {
                            if (value != null) {
                                setOldValueYr(value);
                                if (value != oldValueYr && oldValueYr != undefined) {
                                    //alert("ddl invoked: value" + value + "old value: " + oldValue);
                                    //fetchData();
                                }

                            }

                        }}
                        dropDownContainerStyle={{ elevation: 1000, zIndex: 1000 }}
                    />
                ) : (
                    <Text></Text>
                )
                }



                <TouchableOpacity style={StyleSheet.flatten([styles.button, { margin: 20, }])} onPress={fetchData}>
                    <Text style={styles.buttonText}>Show</Text>
                </TouchableOpacity>
            </View>

            {/* <ActivityIndicator animating={isActivity} /> */}
            <ScrollView>
                {itemDetail.length > 0 ?
                    <View style={styles.card}>
                        <View style={styles.cardContent}>
                            <View style={styles.cardItem}>
                                <Text style={styles.label}>Item Code:</Text>
                                <Text style={styles.value}>{itemDetail[0].itemcode}</Text>
                            </View>
                            <View style={styles.cardItem}>
                                <Text style={styles.label}>Item:</Text>
                                <Text style={styles.value}>{itemDetail[0].itemname} </Text>
                            </View>
                            <View style={styles.cardItem}>
                                <Text style={styles.label}>Strength:</Text>
                                <Text style={styles.value}>{itemDetail[0].strengtH1} </Text>
                            </View>
                            <View style={styles.cardItem}>
                                <Text style={styles.label}>Item Type:</Text>
                                <Text style={styles.value}>{itemDetail[0].itemtypename} </Text>
                            </View>
                            <View style={styles.cardItem}>
                                <Text style={styles.label}>EDL Category:</Text>
                                <Text style={styles.value}>{itemDetail[0].edlcatname} </Text>
                            </View>
                            <View style={styles.cardItem}>
                                <Text style={styles.label}>EDL:</Text>
                                <Text style={styles.value}>{itemDetail[0].edl} </Text>
                            </View>
                            <View style={styles.cardItem}>
                                <Text style={styles.label}>Facility Annual Indent:</Text>
                                <Text style={styles.value}>{itemDetail[0].aifacility} </Text>
                            </View>
                            <View style={styles.cardItem}>
                                <Text style={styles.label}>Approved Annual Indent(By CMHO):</Text>
                                <Text style={styles.value}>{itemDetail[0].approvedaicmho} </Text>
                            </View>
                        </View>
                    </View> :
                    <Text></Text>
                }


                <View style={styles.card}>
                    <View style={styles.cardContent}>


                        <View style={styles.cardItem}>
                            <Text style={styles.label}>Indent to WH:</Text>
                            {WHissueToFacility.length > 0 ?
                                <Text style={styles.value}>{WHissueToFacility[0].facindenttowh} </Text>
                                :
                                <Text></Text>}
                        </View>



                        <View style={styles.cardItem}>
                            <Text style={styles.label}>Issue to Facility:</Text>
                            {WHissueToFacility.length > 0 ?
                                <Text style={styles.value}>{WHissueToFacility[0].facindenttowh}</Text>
                                :
                                <Text></Text>
                            }
                        </View>




                        <View>
                            <View style={styles.cardItem}>
                                <Text style={styles.label}>Issue to Facility:</Text>
                                {FacilityReceiptAgainstIndent.length > 0 ?
                                    <Text style={styles.value}>{FacilityReceiptAgainstIndent[0].whissuetofac}</Text>
                                    :
                                    <Text></Text>
                                }
                            </View>
                            <View style={styles.cardItem}>
                                <Text style={styles.label}>Receipt Against Indent:</Text>
                                {FacilityReceiptAgainstIndent.length > 0 ?
                                    <Text style={styles.value}>{FacilityReceiptAgainstIndent[0].facreceiptagnindnet}</Text>
                                    :
                                    <Text></Text>
                                }
                            </View>
                        </View>



                        <View style={styles.cardItem}>
                            <Text style={styles.label}>Receipt From Other Facility or LP:</Text>
                            {FacilityReceiptFromOtherFacilityOrLP.length > 0 ?
                                <Text style={styles.value}>{FacilityReceiptFromOtherFacilityOrLP[0].facindenttowh} </Text>
                                :
                                <Text></Text>}
                        </View>



                        <View style={styles.cardItem}>
                            <Text style={styles.label}>Ward Issue:</Text>
                            {FacilityWardIssue.length > 0 ?
                                <Text style={styles.value}>{FacilityWardIssue[0].facindenttowh}</Text>
                                :
                                <Text></Text>
                            }
                        </View>



                        <View style={styles.cardItem}>
                            <Text style={styles.label}>Issue to Other Facility :</Text>
                            {FacilityIssueToOtherFacility.length > 0 ?
                                <Text style={styles.value}>{FacilityIssueToOtherFacility[0].facindenttowh} </Text>
                                :
                                <Text></Text>
                            }
                        </View>
                    </View>
                </View>

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
        fontSize: 11,
    },
    valueStock: {
        flex: 1,
        textAlign: 'right',
        fontSize: 12,
        color: '#0000FF',
    },

});

export default FacilitySupplyChain;
