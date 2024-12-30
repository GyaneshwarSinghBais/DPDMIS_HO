import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import {fetchfacilityddl, fetchfacstockstatuscount } from '../Services/apiService';
import DropDownPicker from 'react-native-dropdown-picker';
import { Card, Title, Paragraph, ActivityIndicator, MD2Colors, Dialog, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-root-toast';
import { useRoute } from '@react-navigation/native';



const DistPostion = ({ navigation }) => {
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
        { label: 'EDL Drugs', value: '0' },
        { label: 'EDL Consumables', value: '1' },
        { label: 'Non-EDL Drugs', value: '2' },
        { label: 'Non-EDL Consumables', value: '3' },

        // { label: 'Cover-B', value: '3' },
        // { label: 'Cover-C', value: '5' },
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

    const fetchfacdetails = async () => {
        try {           
         
            const response = await fetchfacilityddl(id,"0","2","0") ;
            setDataDDL(response);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchData = async () => {


        try {
            setVisible(true);
            await fetFacstatus();
            //setNonEdlData([]);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            hideDialog();
        }
    };


    const fetFacstatus = async () => {
        try {
            //alert("Cover-Stage_Value" + segmentValue);
            var covstatus = "0";
            if (segmentValue != 0) {
                covstatus = segmentValue;
            }

            if (segmentValue == "0")
            {
             
               SetTitalValue("Stock Status Status:EDL Drugs" );
            }
            if (covstatus == "1")
            {
      
               SetTitalValue("Stock Status Status:EDL Consumables" );
            }
            if (covstatus == "2")
            {
    
                SetTitalValue("Stock Status Status:Non-EDL Drugs" );
            }
            if (covstatus == "3")
            {
          
                SetTitalValue("Stock Status Status:Non-EDL Consumables" );
            }
         
            var sendfacid="0";
            alert("id"+ id+"ddl:"+value);
            if (value != 0 || value != null) 
            {
                sendfacid=value
            }
            const resultData = await fetchfacstockstatuscount(sendfacid,id,"EDL","2")
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
        fetchfacdetails();

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

                            <Title style={styles.mainHeader}>Health Facility:{item.facilityname}</Title>

                            <View style={styles.rowItem}>
                                <Title style={styles.label}>1.No of Items:</Title>
                                <Paragraph style={styles.value}>{item.nositems}</Paragraph>
                            </View>

                            <View style={styles.rowItem}>
                                <Title style={styles.label}>2.Items, Stock Available:</Title>
                                <Paragraph style={styles.value}>{item.facstkcnt}</Paragraph>
                            </View>
                            <View style={styles.rowItem}>
                            <Title style={styles.label}>3.Stock Out</Title>
                                <Paragraph style={styles.value}>{item.stockoutnos}</Paragraph>
                            </View>
                            <View style={styles.rowItem}>
                            <Title style={styles.label}>4.Stock Out %:</Title>
                                <Paragraph style={styles.value}>{item.stockoutp}</Paragraph>
                            </View>

                            <View style={styles.rowItem}>
                            <Title style={styles.label}>5.Stock in Warehouse Against-3:</Title>
                                <Paragraph style={styles.value}>{item.whstkcnt}</Paragraph>
                            </View>
                            <View style={styles.rowItem}>
                            <Title style={styles.label}>6.Stock in CMHO Store Against-3:</Title>
                                <Paragraph style={styles.value}>{item.cmhostkcnt}</Paragraph>
                            </View>

                          

                            <Title style={styles.subHeader}>Other Stock Position</Title>

                           
                            <View style={styles.rowItem}>
                               <Title style={styles.label}>1.Items, Under QC in Warehoues:</Title>
                                <Paragraph style={styles.value}>{item.whuqcStkcnt}</Paragraph>
                            </View>

                            <View style={styles.rowItem}>
                            <Title style={styles.label}>2.Items, Indent Pending in Warehoues:</Title>
                                <Paragraph style={styles.value}>{item.indenT_TOWH_PENDING}</Paragraph>
                            </View>

                            <View style={styles.rowItem}>
                            <Title style={styles.label}>3.Items, Receipt Pending Issued from Warehouse:</Title>
                                <Paragraph style={styles.value}>{item.whissuE_REC_PENDING_L180CNT}</Paragraph>
                            </View>
                            <View style={styles.rowItem}>                       
                                <Title style={styles.label}>4.Items, Receipt Pending Issued from other Facility:</Title>
                                <Paragraph style={styles.value}>{item.balifT6MONTH}</Paragraph>
                            </View>
                            <View style={styles.rowItem}>
                            <Title style={styles.label}>5.Items, Receipt Pending Against Local Purchase:</Title>
                                <Paragraph style={styles.value}>{item.lP_PIPELINE180CNT}</Paragraph>
                           
                            </View>

                            <View style={styles.rowItem}>
                            <Title style={styles.label}>6.Items, Local Purchase Pending Against NOC:</Title>
                                <Paragraph style={styles.value}>{item.noctakeN_NO_LPO}</Paragraph>
                           
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
                    placeholder="Select Status"
                    onChangeValue={(value) => setSegmentValue(value)}
                    listMode='MODAL'
                />
            </View>

            <View style={StyleSheet.flatten([{ justifyContent: 'space-between', flexDirection: 'row', zIndex: 1000 }])} >
                {dataDDL.length > 0 ? (
                    <DropDownPicker
                        open={open}
                        value={value}
                        searchable={true}
                        items={dataDDL.map((item) => (
                            {
                                label: item.facilityname,
                                value: item.facilityid,
                            }))}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setData}
                        containerStyle={{ height: 30, width: '90%', margin: 20 }}
                        placeholder='Select Facility'
                        listMode='MODAL'
                        onChangeValue={(value) => {
                            if (value != null) {
                                setOldValue(value);
                                if (value != oldValue && oldValue != undefined) {
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
    mainHeader: {
        flexDirection: 'row',
        backgroundColor: '#F2F2F2',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
        alignSelf: 'center',
        color: '#222D80',
        fontSize: 13,
        fontWeight: 'bold',
    },
    subHeader: {
        flexDirection: 'row',       
        paddingHorizontal: 10,
        paddingVertical: 5,        
        alignSelf: 'center',
        color: '#222D80',
        fontSize: 12,
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

export default DistPostion;
