import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view'
import { useSelector } from 'react-redux';
import { fetchCurrentLiability, fetchFunds, fetchFundvsExpd } from '../Services/apiService';
import DropDownPicker from 'react-native-dropdown-picker';
import { SegmentedButtons, ActivityIndicator, MD2Colors, Portal, Title, Card, Paragraph, Dialog } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-root-toast';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import Ticon from 'react-native-vector-icons/MaterialCommunityIcons';
const FundVsExpd = ({ navigation }) => {

    const informaitonAboutUser = useSelector((state) => state.user);

    const [id, setId] = useState(informaitonAboutUser.facilityid);
    const [isActivity, setIsActivity] = useState(false);
    const [TitalValue, SetTitalValue] = useState(null);
    const [HeaderValue, SetHeaderValue] = useState(null);
    const [visible, setVisible] = React.useState(false);
    const hideDialog = () => setVisible(false);
    const [Data, setData] = useState([]);
    const [selectedData, setselectedData] = useState([]);      //ddl selected data
    const [dataDDL, setDataDDL] = useState([]);
    const [dataCurrentLiability, setDataCurrentLiability] = useState([]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [oldValue, setOldValue] = useState();

    const [dataDDLItem, setDataDDLItem] = useState([]);
    const [openItem, setOpenItem] = useState(false);
    const [valueItem, setValueItem] = useState(null);
    const [oldValueItem, setOldValueItem] = useState();
    const [DataItem, setDataItem] = useState([]);


    const [refreshing, setRefreshing] = React.useState(false);

    const [segmentValueRC, setSegmentValueRC] = React.useState('');
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchFundsData();
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

    const fetchCurrentLiabilityData = async () => {
        try {
            if (value == 0 || value == null) {
                alert("Please Select Fund Head")
                return;
            }     
            const response = await fetchCurrentLiability(value);
            setDataCurrentLiability(response);
        } catch (error) {
            console.error('Error:', error);
        }finally{
            hideDialog();
        }
    };


    const fetchData = async () => {


        // if (segmentValueRC === '545') {
        // alert("Year 2024-25 will start from 1 Apr-24");
        // return;                
        // }

        if (value == 0 || value == null) {
            alert("Please Select Fund Head")
            return;
        }

        var budgetid = "0";
        if (value == 0 || value == null) {
            budgetid = "0";
        }
        else {
            budgetid = value;
        }


        if (segmentValueRC == 0 || segmentValueRC == null) {
            alert("Please Select Financial Year")
            return;
        }

        if (segmentValueRC === '542') {
            SetTitalValue("Fund Vs Expenditure:2022-23");
            //SetHeaderValue("Supplied Month");
        }
        if (segmentValueRC === '544') {
            SetTitalValue("Fund Vs Expenditure:2023-24")
            // SetHeaderValue("Fit Month");    
            fetchCurrentLiabilityData();
        }
        if (segmentValueRC === '545') {
            SetTitalValue("Fund Vs Expenditure:2024-25");
            fetchCurrentLiabilityData();
            //SetHeaderValue("Supplied Month");                
        }


        if (segmentValueRC === "542" || segmentValueRC === "544" || segmentValueRC === "545") {
            try {



                setVisible(true);

                // alert(value + "year:" + segmentValueRC);
                const response = await fetchFundvsExpd(value, segmentValueRC);
                setData(response);


            }
            catch (error) {
                console.error('Error:', error);
            } finally {
                if(segmentValueRC != 544) //2023-24... if 544 hiding happen in another method , search hideDialog();
                hideDialog();
            }
        } else {
            //alert('Please Select any Stage');
            let toast = Toast.show('Please Select Financial Year.', {
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
            //setDataDDL('');

            setData([]);
            setDataCurrentLiability([]);
            setSegmentValueRC('');
        });
        return unsubscribe;
    }, [navigation]);

    const navigateFunction = (item) => {
        const item1 = { "budgetid": value, "fitunfit": segmentValueRC, "yr": item.yr, "month": item.monthnumber }
        //    alert("item1:"+ JSON.stringify(item1) )
        navigation.navigate('Payment Pending File', { item: item1 });

    }


    const renderItemCurrentLiability = ({ item, index }) => {
        return (
            <View>

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


                <Card style={styles.card}>
                    <Card.Content>
                        <View style={styles.row}>
                            <View style={styles.column}>

                                <Title style={styles.header}>Liability Details</Title>

                                <View style={styles.rowItem}>
                                    <Title style={styles.label}>Total No of POs:</Title>
                                    <Paragraph style={styles.value}>{item.totalfile}</Paragraph>
                                </View>

                                <View style={styles.rowItem}>
                                    <Title style={styles.label}>Total Liability Amount</Title>
                                    <Paragraph style={styles.value}>{item.totlibwithadm}<Icon name="rupee" size={15} color="#000000" /></Paragraph>
                                </View>

                                <View style={styles.rowItem}>
                                    <Title style={styles.label}>No of POs Fit for Payment:</Title>
                                    <Paragraph style={styles.value}>{item.nooffilefit}</Paragraph>
                                </View>

                                <View style={styles.rowItem}>
                                    <Title style={styles.label}>Fit for Payment Amount:</Title>
                                    <Paragraph style={styles.value}>{item.fitlibvalewithadmin}<Icon name="rupee" size={15} color="#000000" /></Paragraph>
                                </View>

                                <View style={styles.rowItem}>
                                    <Title style={styles.label}>No of POs Not Fit for Payment:</Title>
                                    <Paragraph style={styles.value}>{item.nooffilenotfit}</Paragraph>
                                </View>

                                <View style={styles.rowItem}>
                                    <Title style={styles.label}>Not Fit for Payment Amount:</Title>
                                    <Paragraph style={styles.value}>{item.notfitlibvalewithadmin}<Icon name="rupee" size={15} color="#000000" /></Paragraph>
                                </View>

                                <View style={styles.rowItem}>
                                    <Title style={styles.label}>Pipeline Value:</Title>
                                    <Paragraph style={styles.value}>{item.pipelinevalue}<Icon name="rupee" size={15} color="#000000" /></Paragraph>
                                </View>

                                <View style={styles.rowItem}>
                                    <Title style={styles.label}>Not Fit But Item Received Amount:</Title>
                                    <Paragraph style={styles.value}>{item.notfitbutreceived}<Icon name="rupee" size={15} color="#000000" /></Paragraph>
                                </View>

                                <View style={styles.rowItem}>
                                    <Title style={styles.label}>POs Time Expired but can be Extend Amount:</Title>
                                    <Paragraph style={styles.value}>{item.extandablE_LIB_CR}<Icon name="rupee" size={15} color="#000000" /></Paragraph>
                                </View>

                                <View style={styles.rowItem}>
                                    <Title style={styles.label}>Sanction Generated:</Title>
                                    <Paragraph style={styles.value}>{item.sancamountadm}<Icon name="rupee" size={15} color="#000000" /></Paragraph>
                                </View>

                                {/* <View style={styles.rowItem}>
                                <Title style={styles.label}>Total PO Value:</Title>
                                <Paragraph style={styles.value}>{item.totalpovalue}</Paragraph>
                            </View>

                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Total PO Value Adm:</Title>
                                <Paragraph style={styles.value}>{item.totalpovalueadm}</Paragraph>
                            </View>

                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Receipt Value:</Title>
                                <Paragraph style={styles.value}>{item.receiptvalue}</Paragraph>
                            </View>

                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Sanc Amount:</Title>
                                <Paragraph style={styles.value}>{item.sancamount}</Paragraph>
                            </View>

                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Withheld Amount:</Title>
                                <Paragraph style={styles.value}>{item.witheldamt}</Paragraph>
                            </View>

                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Fit Lib:</Title>
                                <Paragraph style={styles.value}>{item.fitlib}</Paragraph>
                            </View>

                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Not Fit Lib:</Title>
                                <Paragraph style={styles.value}>{item.notfitlib}</Paragraph>
                            </View> */}


                            </View>
                        </View>
                    </Card.Content>
                </Card>
            </View>
        );
    };


    const renderItem = ({ item, index }) => {



        return (


            <Card style={styles.card}>
                <Card.Content>
                    <View style={styles.row}>
                        <View style={styles.column}>

                            <Title style={styles.header}>Fund Head:{item.budgetname}</Title>

                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Opening Balance:</Title>
                                <Paragraph style={styles.value}>{item.opbalance}<Icon name="rupee" size={15} color="#000000" /></Paragraph>
                            </View>

                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Fund Received During Year:</Title>
                                <Paragraph style={styles.value}>{item.actrecyear}<Icon name="rupee" size={15} color="#000000" /></Paragraph>
                            </View>

                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Adjusted Amount:</Title>
                                <Paragraph style={styles.value}>{item.totadujst}<Icon name="rupee" size={15} color="#000000" /></Paragraph>
                            </View>


                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Refund Amount:</Title>
                                <Paragraph style={styles.value}>{item.refundamt}<Icon name="rupee" size={15} color="#000000" /></Paragraph>
                            </View>

                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Fund Available During Year:</Title>
                                <Paragraph style={styles.value}>{item.totalfundavl}<Icon name="rupee" size={15} color="#000000" /></Paragraph>
                            </View>

                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Paid Amount:</Title>
                                <Paragraph style={styles.value}>{item.totpaid}<Icon name="rupee" size={15} color="#000000" /></Paragraph>
                            </View>
                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Closing Balance:</Title>
                                <Paragraph style={styles.value}>{item.closingbal}<Icon name="rupee" size={15} color="#000000" /></Paragraph>
                            </View>
                        </View>
                    </View>
                </Card.Content>
            </Card>
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
                        containerStyle={{ height: 30, width: '90%', margin: 20 }}
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
                        placeholder="Select Fund"
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
                            value: '542',
                            label: '2022-23',
                            icon: 'briefcase-edit',
                        },
                        {
                            value: '544',
                            label: '2023-24',
                            icon: 'file-sign',

                            //icon: 'medical-bag',
                        },
                        {
                            value: '545',
                            label: '2024-25',
                            icon: 'file-sign',
                          //  disabled: 'true',

                            //icon: 'medical-bag',
                        },



                    ]}
                />
            </View>

            <View style={{ width: '100%' }}>
                <TouchableOpacity style={[styles.button, { width: '100%' }]} onPress={fetchData}>
                    <Text style={styles.buttonText}>Show</Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View>
                    <Title style={styles.header1}>{TitalValue}</Title>
                </View>
                <View>
                    <Title style={styles.ValuesIn}>Amount in Cr.</Title>
                </View>


                <FlatList
                    data={Data}
                    keyExtractor={(_, index) => index.toString()}
                    ListEmptyComponent={() => (
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Text>-</Text>
                        </View>
                    )}
                    renderItem={renderItem}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                />

                <View>
                    {( segmentValueRC == '545') ?
                        (
                            <FlatList
                                data={dataCurrentLiability}
                                keyExtractor={(_, index) => index.toString()}
                                ListEmptyComponent={() => (
                                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                        <Text>-</Text>
                                    </View>
                                )}
                                renderItem={renderItemCurrentLiability}
                            />
                        )
                        : (<Text></Text>)}
                </View>
            </ScrollView>





            <View>
                <Title style={styles.footer1}>Note:</Title>
            </View>
            <View>
                <Title style={styles.footer1}>Fund Received & Expenditure is based on Received/Payment entered through DPDMIS.</Title>
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
        color: 'purple',
        fontSize: 10,
       // textAlign: 'left',
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

export default FundVsExpd;
