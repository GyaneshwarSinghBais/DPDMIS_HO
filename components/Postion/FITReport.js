import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { fetchFunds, fetchTotalObjClaim, fetchTotalPriceBid, fetchTotalRC, fetchTotalTotalCovA, fetchTotalTotalCovB, fetchTotalTotalLive, fetchTotaltoBeTender, fetchfitReport } from '../Services/apiService';
import DropDownPicker from 'react-native-dropdown-picker';
import { SegmentedButtons, ActivityIndicator, MD2Colors, Dialog, Portal, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-root-toast';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import Ticon from 'react-native-vector-icons/MaterialCommunityIcons';
const FITReport = ({ navigation }) => {
    const informaitonAboutUser = useSelector((state) => state.user);
    const [data, setData] = useState([]);
    const [id, setId] = useState(informaitonAboutUser.facilityid);
    const [isActivity, setIsActivity] = useState(false);
    const [TitalValue, SetTitalValue] = useState(null);
    const [HeaderValue, SetHeaderValue] = useState(null);
    const [visible, setVisible] = React.useState(false);
    const hideDialog = () => setVisible(false);

    const [selectedData, setselectedData] = useState([]);      //ddl selected data
    const [dataDDL, setDataDDL] = useState([]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [oldValue, setOldValue] = useState();

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
    const [refreshing, setRefreshing] = React.useState(false);
    const [segmentValue, setSegmentValue] = React.useState('');
    const [segmentValueRC, setSegmentValueRC] = React.useState('');
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchData();
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);


    const fetchFundsData = async () => {
        try {           
            const response = await fetchFunds();
            setDataDDL(response);
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const fetchData = async () => {
         //   alert("segmentValueRC: " + segmentValueRC);
        // if (segmentValue == 0 || segmentValue == null) {
        //     alert("Please Select Tender Stage")
        //     return;
        // }

        if (value == 0 || value == null) {
            alert("Please Select Fund Head")
            return;
        }

        if (segmentValueRC == 0 || segmentValueRC == null) {
            alert("Please Select All/Fit to Pay/Not Fit Files")
            return;
        }
             
        if (segmentValueRC === '1') 
        {
            SetTitalValue("ALL Files");
            SetHeaderValue("Supplied Month");
        }
        if (segmentValueRC === '2') {
            SetTitalValue("Reday for Payment or Fit Files")     
            SetHeaderValue("Fit Month");          
        } 
        if (segmentValueRC === '3') 
        {                    //objeClaim
            SetTitalValue("Not Fit Files");  
            SetHeaderValue("Supplied Month");                
        } 
       

        if (segmentValueRC === "1" || segmentValueRC === "2" || segmentValueRC === "3") {
            try {



                setVisible(true);
              
               
                const response = await fetchfitReport(segmentValueRC, value);
                setData(response);
       
             
            } 
            catch (error)
             {
                console.error('Error:', error);
            } finally {
                hideDialog();
            }
        } else {
            //alert('Please Select any Stage');
            let toast = Toast.show('Please Select Fit - Unfit Status.', {
                duration: Toast.durations.LONG,
            });
            return;
        }
    };

    useEffect(() => {       
        fetchFundsData();
    }, []
    );


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setDataDDL('');
            setData([]);
        });
        return unsubscribe;
    }, [navigation]);

    const navigateFunction = (item) => {      
            const item1 = { "budgetid": value, "fitunfit": segmentValueRC, "yr": item.yr, "month": item.monthnumber }
            //    alert("item1:"+ JSON.stringify(item1) )
            navigation.navigate('Payment Pending File', { item: item1 });
      
    }


    const renderItem = ({ item, index }) => (
        <View style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
           

            <View style={styles.cell}>
                <Text  style={styles.cellText}>{item.fitmonth}</Text>

            </View>
            <View style={styles.cell}>
                <Text onPress={() => navigateFunction(item)} style={styles.cellText}><Ticon name="cursor-pointer" size={14} color="#0645AD" />{item.countfitfile}</Text>

            </View>
            <View style={styles.cell}>
                <Text  style={styles.cellText}>{item.tobepaydvalue}</Text>

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

            <View>
                {dataDDL.length > 0 ? (
                    <DropDownPicker
                        open={open}
                        value={value}
                        searchable={true}
                        items={dataDDL.map((item) => (
                            {
                                label: item.budgetname,
                                value: item.budgetid,
                            }))}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setselectedData}
                        containerStyle={{ height: 30, width: 280, margin: 20 }}
                        onChangeValue={(value) => {
                            if (value != null) {
                                setOldValue(value);
                                if (value != oldValue && oldValue != undefined) {
                                    //alert("ddl invoked: value" + value + "old value: " + oldValue);
                                    //fetchData();
                                }

                            }

                        }}
                        listMode="MODAL"
                        placeholder="Select Head"
                        dropDownContainerStyle={{ elevation: 1000, zIndex: 1000 }}
                    />
                ) : (
                    <Text>Loading data...</Text>
                )
                }
            </View>


            <View style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}>
                <SegmentedButtons
                    value={segmentValueRC}
                    onValueChange={setSegmentValueRC}
                    buttons={[
                        {
                            value: '1',
                            label: 'All',
                            icon: 'briefcase-edit',
                        },
                        {
                            value: '2',
                            label: 'Fit to Pay',
                            icon: 'file-sign',

                            //icon: 'medical-bag',
                        },
                        {
                            value: '3',
                            label: 'Not Fit',
                            icon: 'medical-bag',
                        },
                        // {
                        //     value: '3',
                        //     label: 'DME',
                        //   //  icon: 'bag-personal-outline',
                        // },


                    ]}
                />
            </View>

            <View style={{ width: '100%' }}>
                <TouchableOpacity style={[styles.button, { width: '100%' }]} onPress={fetchData}>
                    <Text style={styles.buttonText}>Show</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Title style={styles.header1}>{TitalValue}</Title>
            </View>
            <View>
                <Title style={styles.ValuesIn}>Amount in Cr.</Title>
            </View>
            <View style={styles.header}>
                {/* <Text style={styles.headerText}>SN</Text> */}
                <Text style={styles.headerText}>{HeaderValue}</Text>
                <Text style={styles.headerText}>No of PO</Text>
                <Text style={styles.headerText}>To be Paid<Icon name="rupee" size={15} color="#000000" /></Text>
            </View>

            <FlatList
                data={data}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderItem}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />


<View>
            <Title style={styles.footer1}>Note:</Title>
            </View>
            <View>
            <Title style={styles.footer1}>1.Above Files are Not Paid through DPDMIS System.</Title>
            </View>
            <View>
            <View>
            <Title style={styles.footer1}>2.Quality Control Passed against supplied items for which QC is required.</Title>
            </View>
            <Title style={styles.footer1}>3.Fit Month :Based on Received  and Security deposit Submission Date.</Title>
            </View>
            <View>
            <Title style={styles.footer1}>4.More than 90% Supplied against Order.</Title>
            </View>
           
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        margin: 20
    },
    button: {
        marginTop: 25,
        marginLeft: 0,
        marginBottom: 20,
        paddingVertical: 10,
        backgroundColor: '#3377FF',
        borderRadius: 5,
        width: 100,
    },
    footer1: {
        backgroundColor: '#F2F2F2',
        borderBottomColor: '#CCCCCC',
        textAlign: 'left',
       // alignSelf:'left',
        color:'purple',
        fontSize:10,
      
    },
    buttonText: {
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
        fontSize: 18,
        fontWeight: 'bold',
    },
    ValuesIn: {
        flexDirection: 'row',
        backgroundColor: '#F2F2F2',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
        alignSelf: 'right',
        color: 'red',
        fontSize: 14,

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
    },
    cellText: {
        fontSize: 14,
    },
    cellTextB: {
        fontSize: 15,
        fontWeight: "bold",
        color: '#000000',
    },
});

export default FITReport;
