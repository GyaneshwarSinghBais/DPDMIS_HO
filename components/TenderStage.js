import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { fetchCStockValue, fetchFacilityMC, fetchMCAIVsIssuanceService, fetchMainCategoryService, fetchStockPerEDL, fetchStockPerNonEDLAg_ApprovedAI, fetchStockReport, fetchSupplierPO, fetchTenderStage } from '../Services/apiService';
import DropDownPicker from 'react-native-dropdown-picker';
import { Card, Title, Paragraph, ActivityIndicator, MD2Colors, Dialog, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-root-toast';
import { useRoute } from '@react-navigation/native';



const TenderStage = ({ navigation }) => {
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
    const [dataDDLyr, setDataDDLyr] = useState([]);
    const [openYr, setOpenYr] = useState(false);
    const [valueYr, setValueYr] = useState(null);
    const [oldValueYr, setOldValueYr] = useState();
    const [visible, setVisible] = React.useState(false);
    const [segmentValue, setSegmentValue] = React.useState('');
    const hideDialog = () => setVisible(false);
    const [DataYr, setDataYr] = useState([
        { label: 'All', value: '0' },
        { label: 'Live', value: '1' },
        { label: 'Cover-A', value: '2' },
        { label: 'Object Claim', value: '7' },
        { label: 'Cover-B', value: '3' },
        { label: 'Cover-C', value: '5' },
    ]);

    // const route = useRoute();
    // const supplierId = route.params?.supplierid;
    // const fitnessStatus = route.params?.item.fitunfit;
    // const hodType = route.params?.item.hodtype;

    const resetDropdowns = () => {
        setOpen(null);
        setValue(null);


    };
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    const fetchData = async () => {


        try {
            setVisible(true);
            await fetchMCTransaction();
            //setNonEdlData([]);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            hideDialog();
        }
    };


    const fetchMCTransaction = async () => {
        try {
            //alert("Cover-Stage_Value" + segmentValue);
            var covstatus = "0";
            if (segmentValue != 0) {
                covstatus = segmentValue;
            }

            if (segmentValue == "0")
            {
             
               SetTitalValue("Stage:All" );
            }
            if (covstatus == "1")
            {
      
               SetTitalValue("Stage:Live" );
            }
            if (covstatus == "2")
            {
    
               SetTitalValue("Stage:Cover A Opened" );
            }
            if (covstatus == "3")
            {
          
               SetTitalValue("Stage:Cover B Opened" );
            }
            if (covstatus == "5")
            {
          
               SetTitalValue("Stage:Cover C Opened" );
            }
            if (covstatus == "7")
            {
          
               SetTitalValue("Stage:Under Claim Objection" );
            }



          
            var mcid = "1";
            //alert("mcid: " + mcid + "covstatus: " + covstatus);
            const resultData = await fetchTenderStage(mcid, covstatus)
            setData(resultData);
        } catch (error) {
            console.error('Error:', error);
        }
    };


    // const fetchDataDDL = async () => {
    //     try {
    //         //const stockReportDataDDL = await fetchfacstockReportddl(id);    
    //         const ddlData = await fetchMainCategoryService(id);
    //         setDataDDL(ddlData);
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // };


    useEffect(() => {
        //fetchDataDDL();
        resetDropdowns();

        //  fetchData();
    }, []
    );



    useEffect(() => {
        //console.log(edlData);
        if (edlData.length > 0) {
            // console.log("use effect edl data");
            setEdlDataLoaded(true);
        }
    }, [edlData]
    );

    useEffect(() => {
        if (nonEdlData.length > 0) {
            setnonEdlDataLoaded(true);
        }
    }, [nonEdlData]
    );

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setValueYr('');
            setData([]);

        });
        return unsubscribe;
    }, [navigation]);

    const navigateFunction = () => {

        //navigation.navigate('Stock Out Detail', { item: item1 });
    }



    const renderItem = ({ item, index }) => {



        return (


            <Card style={styles.card}>
                <Card.Content>
                    <View style={styles.row}>
                        <View style={styles.column}>

                            <Title style={styles.header}>{item.schemecode}/Category:{item.categoryname}</Title>

                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Tender:</Title>
                                <Paragraph style={styles.value}>{item.schemename}</Paragraph>
                            </View>

                            <View style={styles.rowItem}>
                                <Title style={styles.label}>e-ProcNo:</Title>
                                <Paragraph style={styles.value}>{item.eprocno}</Paragraph>
                            </View>
                            <View style={styles.rowItem}>
                            <Title style={styles.label}>Tender Current Status:</Title>
                                <Paragraph style={styles.value}>{item.status}</Paragraph>
                            </View>

                            <View style={styles.rowItem}>
                            <Title style={styles.label}>Start Date:</Title>
                                <Paragraph style={styles.value}>{item.startdt}</Paragraph>
                            </View>
                            <View style={styles.rowItem}>
                            <Title style={styles.label}>End Date:</Title>
                                <Paragraph style={styles.value}>{item.actclosingdt}</Paragraph>
                            </View>

                            <View style={styles.rowItem}>
                            <Title style={styles.label}>Prebid Date:</Title>
                                <Paragraph style={styles.value}>{item.prebidenddt}</Paragraph>
                            </View>

                           
                            <View style={styles.rowItem}>
                               <Title style={styles.label}>Total Items:</Title>
                                <Paragraph style={styles.value}>{item.noofitems}/(EDL:{item.itemaedl})</Paragraph>
                            </View>

                            <View style={styles.rowItem}>
                            <Title style={styles.label}>Cover A Date:</Title>
                                <Paragraph style={styles.value}>{item.coV_A_OPDATE}</Paragraph>
                            </View>

                            <View style={styles.rowItem}>
                            <Title style={styles.label}>Object Claim Date:</Title>
                                <Paragraph style={styles.value}>{item.dA_DATE}</Paragraph>
                            </View>
                            <View style={styles.rowItem}>                       
                                <Title style={styles.label}>Claim Objection Date:</Title>
                                <Paragraph style={styles.value}>{item.dA_DATE}</Paragraph>
                            </View>
                            <View style={styles.rowItem}>
                            <Title style={styles.label}>Bid Found:</Title>
                                <Paragraph style={styles.value}>{item.noofitemscounta}</Paragraph>
                           
                            </View>
                            <View style={styles.rowItem}>                       
                                <Title style={styles.label}>No of Bidders:</Title>
                                <Paragraph style={styles.value}>{item.nooF_BID_A}</Paragraph>
                            </View>
                            <View style={styles.rowItem}>                       
                                <Title style={styles.label}>Cover B Date:</Title>
                                <Paragraph style={styles.value}>{item.coV_B_OPDATE}</Paragraph>
                            </View>
                            <View style={styles.rowItem}>                       
                                <Title style={styles.label}>Cover C Date:</Title>
                                <Paragraph style={styles.value}>{item.pricebiddate}</Paragraph>
                            </View>
    
                            <View style={styles.rowItem}>
                            <Title style={styles.label}>Price Opened,Pending for Accept/Reject:</Title>
                                <Paragraph style={styles.value}>{item.pricenotaccpT_REJECT}</Paragraph>
                            </View>
                            <View style={styles.rowItem}>
                            <Title style={styles.label}>Remarks:</Title>
                                <Paragraph style={styles.value}>{item.remarksdata}</Paragraph>
                            </View>



                        </View>
                    </View>
                </Card.Content>
            </Card>
        );
    };




    return (





        <View style={styles.container}>


            {/* <View style={{ marginTop: 20, marginBottom: 20, marginLeft: 10, marginRight: 10 }}>
                <Button
                    mode="contained"
                    buttonColor="#728FCE"
                    textColor="#FFFFFF"
                    labelStyle={styles.buttonLabel}
                    onPress={fetchData}
                    loading={loading}
                >
                    Show
                </Button>
            </View> */}

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

            <View style={{ marginHorizontal: 20 }}>
                <DropDownPicker
                    open={openYr}
                    value={valueYr}
                    items={DataYr}
                    setOpen={setOpenYr}
                    setValue={setValueYr}
                    setItems={setDataYr}
                    zIndex={999}
                    style={{ marginRight: 20, }}
                    placeholder="Select Tender Stage"
                    onChangeValue={(value) => setSegmentValue(value)}
                    listMode='MODAL'
                />
            </View>

            <View style={{ marginHorizontal: 20 }} >
                <TouchableOpacity style={StyleSheet.flatten([styles.button])} onPress={fetchData}>
                    <Text style={styles.buttonText}>Show</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Title style={styles.header}>{TitalValue}</Title>
            </View>


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

export default TenderStage;
