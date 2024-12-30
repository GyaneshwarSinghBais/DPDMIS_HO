import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, ScrollView, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { fetPOReceiptData, fetchMainCategoryService, fetchYear, fetchYearWiseRC } from '../Services/apiService';
import DropDownPicker from 'react-native-dropdown-picker';
import { ActivityIndicator, MD2Colors, Dialog, Portal,Title } from 'react-native-paper';
import Toast from 'react-native-root-toast';


//import { SegmentedButtons } from 'react-native-paper';

const YearWiseRC = ({ navigation }) => {
    const informaitonAboutUser = useSelector((state) => state.user);
    const [data, setData] = useState([]);
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

    const [visible, setVisible] = React.useState(false);
    const hideDialog = () => setVisible(false);
    const [TitalValue, SetTitalValue] = useState(null);

    const [itemDetail, setItemDetail] = useState([]);
    const [FacilityIndentToWH, setFacilityIndentToWH] = useState([]);
    const [WHissueToFacility, setWHissueToFacility] = useState([]);
    const [FacilityReceiptAgainstIndent, setFacilityReceiptAgainstIndent] = useState([]);
    const [FacilityReceiptFromOtherFacilityOrLP, setFacilityReceiptFromOtherFacilityOrLP] = useState([]);
    const [FacilityWardIssue, setFacilityWardIssue] = useState([]);
    const [FacilityIssueToOtherFacility, setFacilityIssueToOtherFacility] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    //const [segmentValue, setsegmentValue] = React.useState('');


    //const drpdwnValue = ["Drugs", "Consumable & Others,", "Reagents"];

    const resetDropdowns = () => {
        // Reset the state variables for dropdown selections
        setValueYr(null);
        setValueItem(null);
        // You can add other dropdown state variables here if needed
    };


    const fetchData = async () => {

        if (valueItem == 0 || valueItem == null) {
            alert("Please Select Category")
           return;
       }

        if (valueItem == 0 || valueItem == null) {
            let toast = Toast.show('Please Select Category', {
                duration: Toast.durations.LONG,
            });
            return;
        }
        try {
            setVisible(true);
            await fetchPOData();
          
        } catch (error) {
            console.error('Error:', error);
        } finally {
            hideDialog();
        }
    };


    const fetchPOData = async () => {

       
        var cat="";   
        if (valueItem == 1)
            {
                cat="Drugs";
            }
            else if(valueItem == "2")
              {
                cat="Consumables";
              }
              else if(valueItem == "3")
              {
                cat="Reagents";
              }
              else if(valueItem == "4")
              {
                cat="AYUSH";
              }
              else{
              }
              

        try {
            SetTitalValue("RC Valid During Year:"+cat);
                const response = await fetchYearWiseRC(valueItem);
                setData(response);
            
        } catch (error) {
            console.error('Error:', error);
        }
    };




    const fetchMainCategory = async () => {
        try {
           
            const stockReportDataDDL = await fetchMainCategoryService("HOD");
            setDataDDLItem(stockReportDataDDL);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
     

        fetchMainCategory();
    }, []
    );


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            //setDataDDLItem([]);
            //setWHissueToFacility([]);    
            resetDropdowns();
            setData([]);
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
                <Text style={styles.cellText}>{item.accyear}</Text>
            </View>
            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.edl}</Text>
            </View>
            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.nonedl}</Text>
            </View>
            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.allrc}</Text>
            </View>


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

                



                <TouchableOpacity style={StyleSheet.flatten([styles.button, { margin: 20, }])} onPress={fetchData}>
                    <Text style={styles.buttonText}>Show</Text>
                </TouchableOpacity>
            </View>

            <View>
            <Title style={styles.header1}>{TitalValue}</Title>
            </View>

            <View style={styles.header}>
                <Text style={styles.headerText}>SN</Text>
                <Text style={styles.headerText}>Year</Text>
                <Text style={styles.headerText}>EDL</Text>
                <Text style={styles.headerText}>Non EDL</Text>
                <Text style={styles.headerText}>Total</Text>
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
    header1: {
        flexDirection: 'row',
        backgroundColor: '#F2F2F2',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
        alignSelf:'center',
        color:'purple',
        fontSize:18,
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

});

export default YearWiseRC;
