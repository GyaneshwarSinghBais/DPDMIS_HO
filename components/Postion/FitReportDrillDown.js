import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { fetchPOAlertDetails, fetchfitReportDetail } from '../Services/apiService';
import DropDownPicker from 'react-native-dropdown-picker';
import { Card, Title, Paragraph, ActivityIndicator, MD2Colors, Dialog, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-root-toast';
import { useRoute } from '@react-navigation/native';



const FitReportDrillDown = ({ navigation }) => {
    const informaitonAboutUser = useSelector((state) => state.user);
    const [Data, setData] = useState([]);
    const [edlData, setEdlData] = useState([]);
    const [nonEdlData, setNonEdlData] = useState([]);
    const [id, setId] = useState(informaitonAboutUser.facilityid);

    const [dataDDL, setDataDDL] = useState([]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [oldValue, setOldValue] = useState();

    const [TitalValue, SetTitalValue] = useState(null);
    const [edlDataLoaded, setEdlDataLoaded] = useState(false);
    const [nonEdlDataLoaded, setnonEdlDataLoaded] = useState(false);
    const [showButtonClicked, setShowButtonClicked] = useState(false);

    const [refreshing, setRefreshing] = React.useState(false);

    const [visible, setVisible] = React.useState(false);
    const hideDialog = () => setVisible(false);
    const [loading, setLoading] = useState(false);

    var route = useRoute();
    var budgetid = route.params?.item.budgetid;
    var fitunfit = route.params?.item.fitunfit;
    var yr = route.params?.item.yr;
    var month = route.params?.item.month;




    const fetAlertData = async () => {
        try {
            setVisible(true);
            // alert("ftype"+ftype+"hod"+hodid);
            setLoading(true);
            const resultData = await fetchfitReportDetail(budgetid, fitunfit, yr, month);
            setData(resultData);
        } catch (error) {
            console.error('Error:', error);
        }  finally {
            hideDialog();
        }
    };
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetAlertData();
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);


    useEffect(() => {

        fetAlertData();
    }, []
    );


    useEffect(() => {
        // const unsubscribe = navigation.addListener('focus', () => {       
        setData([]);
        fetAlertData();
        // });
        // return unsubscribe();
    }, [route.params]);





    // useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', () => {
    //         setData([]);
    //         fetAlertData();
    //     });
    //     return unsubscribe;
    //   }, [navigation]);


    const navigateFunction = () => {
        navigation.navigate('Pending For Payment');
    }


    const renderItem = ({ item, index }) => {
        return (


            <Card style={styles.card}>
                <Card.Content>
                    <View style={styles.row}>
                        <View style={styles.column}>

                            <Title style={styles.header}>{item.pono}/Dated:{item.podate} </Title>
                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Directorate:</Title>
                                <Paragraph style={styles.value}>{item.hodtype}</Paragraph>
                            </View>
                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Supplier:</Title>
                                <Paragraph style={styles.value}>{item.suppliername}</Paragraph>
                            </View>

                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Item/code:</Title>
                                <Paragraph style={styles.value}>{item.itemname}/{item.itemcode}</Paragraph>
                            </View>

                            
                       

                        
                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Order Qty:</Title>
                                <Paragraph style={styles.value}>{item.poqty}</Paragraph>
                            </View>

                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Order Value:</Title>
                                <Paragraph style={styles.value}>{item.totalpovalue}<Icon name="rupee" size={15} color="#000000" /></Paragraph>
                            </View>

                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Received Qty:</Title>
                                <Paragraph style={styles.value}>{item.receiptqty}</Paragraph>
                            </View>
                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Received%:</Title>
                                <Paragraph style={styles.value}>{item.toreceper}%</Paragraph>
                            </View>

                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Received Value:</Title>
                                <Paragraph style={styles.value}>{item.receiptvalue}<Icon name="rupee" size={15} color="#000000" /></Paragraph>
                            </View>



                            <View style={styles.rowItem}>
                                <Title style={styles.label}>MRC Date:</Title>
                                <Paragraph style={styles.value}>{item.mrcdate}</Paragraph>
                            </View>
                            <View style={styles.rowItem}>
                                <Title style={styles.label}>QC Date:</Title>
                                <Paragraph style={styles.value}>{item.lastqcpaadeddt}</Paragraph>
                            </View>


                            <View style={styles.rowItem}>
                                <Title style={styles.label}>SD Submisison Date/SD Date:</Title>
                                <Paragraph style={styles.value}>{item.sddate}/{item.phyreceiptdt}</Paragraph>
                            </View>

                         
                       
                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Fit Date(Based on MRC/SD Date):</Title>
                                <Paragraph style={styles.value}>{item.fitdate}</Paragraph>
                            </View>
{/* 
                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Last MRC Date:</Title>
                                <Paragraph style={styles.value}>{item.lastmrcdt}</Paragraph>
                            </View> */}

                      
                         

                            {/* <View style={styles.rowItem}>
                                <Title style={styles.label}>Library Without Admission:</Title>
                                <Paragraph style={styles.value}>{item.libwithoutadm}</Paragraph>
                            </View>

                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Library With Admission:</Title>
                                <Paragraph style={styles.value}>{item.libwithadm}</Paragraph>
                            </View> */}

                        
                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Present File Status:</Title>
                                <Paragraph style={styles.value}>{item.presentfile}</Paragraph>
                            </View>

                        
                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Fit or Unfit/Status:</Title>
                                <Paragraph style={styles.value}>{item.fitunfit}/{item.paymentrequired}</Paragraph>
                            </View>
                          

                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Reason for Not fit(if any):</Title>
                                <Paragraph style={styles.value}>{item.reasonname || 'N/A'}</Paragraph>
                            </View>

                         


                       

                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Sanction Status:</Title>
                                <Paragraph style={styles.value}>{item.sanctionstatus}</Paragraph>
                            </View>
                            
                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Nasti No:</Title>
                                <Paragraph style={styles.value}>{item.fileno}</Paragraph>
                            </View>

                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Nati Date:</Title>
                                <Paragraph style={styles.value}>{item.filedt}</Paragraph>
                            </View>


                        </View>
                    </View>
                </Card.Content>
            </Card>
        );
    };




    return (

        <View style={styles.container}>
            <Text onPress={() => navigateFunction()}>Back</Text>
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
            


            {/* <View style={StyleSheet.flatten([{ justifyContent: 'space-between', flexDirection: 'row', zIndex: 1000, width: '90%' }])} >
                <TouchableOpacity style={StyleSheet.flatten([styles.button, { margin: 20 }])} onPress={fetchData}>
                    <Text style={styles.buttonText}>Show</Text>
                </TouchableOpacity>
            </View> */}

            {/* {edlData.length > 0 ?
                <View style={styles.card}>
                    <View style={styles.cardContent}>
                        <View style={styles.cardItem}>
                            <Text style={styles.label}>Total No of EDL For Facility:</Text>
                            <Text style={styles.value}>{edlData[0].totalnos}</Text>
                        </View>
                        <View style={styles.cardItem}>
                            <Text style={styles.label}>No of Stock Out on Above:</Text>

                            <Text onPress={() => navigateFunction()} icon="cursor-default-click" style={[styles.value, { color: '#0645AD', fontWeight: 900, textDecorationLine: 'underline', fontStyle: 'italic' }]}>
                                <Icon name="arrow-right" size={18} color="#0645AD" />
                                <Text>  </Text>
                                {edlData[0].stockout}
                            </Text>
                        </View>
                        <View style={styles.cardItem}>
                            <Text style={styles.label}>Stock Out %:</Text>
                            <Text style={styles.value}>{edlData[0].stockoutper} %</Text>
                        </View>
                        <View style={styles.cardItem}>
                            <Text style={styles.label}>No of {drpdwnValue[value - 1]} Stock in Concern Warehouse:</Text>
                            <Text style={styles.value}>{edlData[0].stockinwh}</Text>
                        </View>
                    </View>
                </View> :
                <Text></Text>

            } */}


            {/* <View style={styles.header}>
                    <Text style={styles.headerText}>SN</Text>
                    <Text style={styles.headerText}>EDL Category</Text>
                    <Text style={styles.headerText}>Category</Text>
                    <Text style={styles.headerText}>Items</Text>
                    <Text style={styles.headerText}>Ready</Text>
                    <Text style={styles.headerText}>UQC</Text>
                    <Text style={styles.headerText}>Pipelined Items</Text>
                    <Text style={styles.headerText}>Ready Issue Value</Text>
                    <Text style={styles.headerText}>QC Pending Value</Text>
                    <Text style={styles.headerText}>Pipeline Value</Text>
                </View> */}

            <FlatList
                data={Data}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderItem}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
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

        marginTop: 15,
        paddingVertical: 10,
        backgroundColor: '#3377FF',
        borderRadius: 5,
        width: '100%',
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
        alignSelf: 'center',
        color: 'purple',
        fontSize: 13,
        fontWeight: 'bold',
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

export default FitReportDrillDown;
