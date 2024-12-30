import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import {fetchDHSIndentvsIssuance } from '../Services/apiService';
import DropDownPicker from 'react-native-dropdown-picker';
import { Card, Title, Paragraph, ActivityIndicator, MD2Colors, Dialog, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-root-toast';
import { useRoute } from '@react-navigation/native';



const DHSStatus = ({ navigation }) => {
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
        { label: 'Overall', value: '0' },
        { label: 'Mitanin', value: '1' },
        { label: 'EDL', value: '2' },
        { label: 'Non-EDL', value: '3' },

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
             
               SetTitalValue("C.F.Y. DHS Indent Status :Overall Items" );
            }
            if (covstatus == "1")
            {
      
               SetTitalValue("C.F.Y. DHS Indent Status :Mitanin" );
            }
            if (covstatus == "2")
            {
    
                SetTitalValue("C.F.Y. DHS Indent Status :EDL Items" );
            }
            if (covstatus == "3")
            {
          
                SetTitalValue("C.F.Y. DHS Indent Status :Non EDL Items" );
            }
            // if (covstatus == "5")
            // {
          
            //    SetTitalValue("Stage:Cover C Opened" );
            // }
            // if (covstatus == "7")
            // {
          
            //    SetTitalValue("Stage:Under Claim Objection" );
            // }

           // alert("mcid"+ segmentValue);
            const resultData = await fetchDHSIndentvsIssuance(segmentValue,"1")
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

                            <Title style={styles.mainHeader}>Category:{item.mcategory}</Title>

                            <View style={styles.rowItem}>
                                <Title style={styles.label}>No of Items in indent:</Title>
                                <Paragraph style={styles.value}>{item.nos}</Paragraph>
                            </View>

                            <View style={styles.rowItem}>
                                <Title style={styles.label}>No of items issued:</Title>
                                <Paragraph style={styles.value}>{item.isscount}</Paragraph>
                            </View>
                            <View style={styles.rowItem}>
                            <Title style={styles.label}>Issued %:</Title>
                                <Paragraph style={styles.value}>{item.issuedper}</Paragraph>
                            </View>

                            <View style={styles.rowItem}>
                            <Title style={styles.label}>No of item Stock Available:</Title>
                                <Paragraph style={styles.value}>{item.nosstock}</Paragraph>
                            </View>
                            <View style={styles.rowItem}>
                            <Title style={styles.label}>No of item in Pipeline:</Title>
                                <Paragraph style={styles.value}>{item.nospipeline}</Paragraph>
                            </View>

                            <View style={styles.rowItem}>
                            <Title style={styles.label}>No of item RC Valid:</Title>
                                <Paragraph style={styles.value}>{item.rc}</Paragraph>
                            </View>

                            <Title style={styles.subHeader}>Tender Status of RC Not Valid items</Title>

                           
                            <View style={styles.rowItem}>
                               <Title style={styles.label}>No of items Accepted:</Title>
                                <Paragraph style={styles.value}>{item.accepted}</Paragraph>
                            </View>

                            <View style={styles.rowItem}>
                            <Title style={styles.label}>No of items Price Opened:</Title>
                                <Paragraph style={styles.value}>{item.priceopened}</Paragraph>
                            </View>

                            <View style={styles.rowItem}>
                            <Title style={styles.label}>No of items Under Evaluation:</Title>
                                <Paragraph style={styles.value}>{item.evaluation}</Paragraph>
                            </View>
                            <View style={styles.rowItem}>                       
                                <Title style={styles.label}>No of items Live in Tender/Re-Tender:</Title>
                                <Paragraph style={styles.value}>{item.live}</Paragraph>
                            </View>
                            <View style={styles.rowItem}>
                            <Title style={styles.label}>No of items To be Tender/Re-Tender:</Title>
                                <Paragraph style={styles.value}>{item.tobe}</Paragraph>
                           
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

export default DHSStatus;
