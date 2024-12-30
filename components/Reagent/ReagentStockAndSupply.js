import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { fetchIndentPendingDetails, fetchReagentStockAndSupply } from '../Services/apiService';
import DropDownPicker from 'react-native-dropdown-picker';
import { Card, Title, Paragraph, ActivityIndicator, MD2Colors, Dialog, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-root-toast';
import { useRoute } from '@react-navigation/native';



const ReagentStockAndSupply = ({ navigation }) => {
    const informaitonAboutUser = useSelector((state) => state.user);
    const [Data, setData] = useState([]);
    // const [edlData, setEdlData] = useState([]);
    // const [nonEdlData, setNonEdlData] = useState([]);
    const [id, setId] = useState(informaitonAboutUser.facilityid);

    const [dataDDL, setDataDDL] = useState([]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [oldValue, setOldValue] = useState();


    const [edlDataLoaded, setEdlDataLoaded] = useState(false);
    const [nonEdlDataLoaded, setnonEdlDataLoaded] = useState(false);
    const [showButtonClicked, setShowButtonClicked] = useState(false);

    const [refreshing, setRefreshing] = React.useState(false);

    const [visible, setVisible] = React.useState(false);
    const hideDialog = () => setVisible(false);

    // const item1 = {"pendingcri":segmentValue,"clause":fType,"total":tot,"whid":item.warehouseid}
    const route = useRoute();
    const stkp = route.params?.item.stkp;



    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchData();
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    const resetDropdowns = () => {

        fetchData();


        // You can add other dropdown state variables here if needed
    };


    const fetchData = async () => {


        try {
            setVisible(true);
            await fetchReagentStockAndSupplyData();
            //setNonEdlData([]);

        } catch (error) {
            console.error('Error:', error);
        } finally {
            hideDialog();
        }
    };
    const fetchReagentStockAndSupplyData = async () => {
        try {

            // alert("vlaue in WHID: " + whid1 + "  " + pendingcri1 + "  " + hodtype1);
            // alert("Show Data");    
            const resultData = await fetchReagentStockAndSupply(stkp);
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
        fetchData();
    }, []
    );

    useEffect(() => {
        // const unsubscribe = navigation.addListener('focus', () => {       
        setData([]);
        fetchData();
        // });
        // return unsubscribe();
    }, [route.params]);



    // useEffect(() => {
    //     //console.log(edlData);
    //     if (edlData.length > 0) {
    //         // console.log("use effect edl data");
    //         setEdlDataLoaded(true);
    //     }
    // }, [edlData]
    // );

    // useEffect(() => {
    //     if (nonEdlData.length > 0) {
    //         setnonEdlDataLoaded(true);
    //     }
    // }, [nonEdlData]
    // );

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            resetDropdowns();
            setRefreshing(true);
            fetchData();
            setTimeout(() => {
                setRefreshing(false);
            }, 2000);


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

                            <Title style={styles.header}>{item.per} Facility: {item.facilityname}</Title>

                            <View>
                                <View style={styles.rowItem}>
                                    <Title style={styles.label}>Health Facility:</Title>
                                    <Paragraph style={styles.value}>{item.facilityname}</Paragraph>
                                </View>

                                <View style={styles.rowItem}>
                                    <Title style={styles.label}>Equipment Name:</Title>
                                    <Paragraph style={styles.value}>{item.eqpname}</Paragraph>
                                </View>

                                <View style={styles.rowItem}>
                                    <Title style={styles.label}>Reagent Quantity:</Title>
                                    <Paragraph style={styles.value}>{item.nosreagent}</Paragraph>
                                </View>

                                <View style={styles.rowItem}>
                                    <Title style={styles.label}>Stock Available:</Title>
                                    <Paragraph style={styles.value}>{item.stkavailable}</Paragraph>
                                </View>

                                <View style={styles.rowItem}>
                                    <Title style={styles.label}>Stock Value (CR):</Title>
                                    <Paragraph style={styles.value}>{item.stockvaluecr}</Paragraph>
                                </View>

                                <View style={styles.rowItem}>
                                    <Title style={styles.label}>Issued Quantity:</Title>
                                    <Paragraph style={styles.value}>{item.nosissued}</Paragraph>
                                </View>

                                <View style={styles.rowItem}>
                                    <Title style={styles.label}>Issued Value (CR):</Title>
                                    <Paragraph style={styles.value}>{item.nosissuedvaluecr}</Paragraph>
                                </View>

                                <View style={styles.rowItem}>
                                    <Title style={styles.label}>Facility Pipeline Quantity:</Title>
                                    <Paragraph style={styles.value}>{item.nosfacpipeline}</Paragraph>
                                </View>

                                <View style={styles.rowItem}>
                                    <Title style={styles.label}>Facility Pipeline Value:</Title>
                                    <Paragraph style={styles.value}>{item.nosfacpipelinevalue}</Paragraph>
                                </View>

                                <View style={styles.rowItem}>
                                    <Title style={styles.label}>Facility Lab Issued Quantity:</Title>
                                    <Paragraph style={styles.value}>{item.nosfaclabissued}</Paragraph>
                                </View>

                                <View style={styles.rowItem}>
                                    <Title style={styles.label}>Facility Lab Issue Value (CR):</Title>
                                    <Paragraph style={styles.value}>{item.faclabissuevaluecr}</Paragraph>
                                </View>

                                <View style={styles.rowItem}>
                                    <Title style={styles.label}>Facility Stock Quantity:</Title>
                                    <Paragraph style={styles.value}>{item.nosfacstock}</Paragraph>
                                </View>

                                <View style={styles.rowItem}>
                                    <Title style={styles.label}>Facility Stock Value (CR):</Title>
                                    <Paragraph style={styles.value}>{item.facstockvaluecr}</Paragraph>
                                </View>

                                <View style={styles.rowItem}>
                                    <Title style={styles.label}>Stock Status:</Title>
                                    <Paragraph style={styles.value}>{item.stkp}</Paragraph>
                                </View>
                            </View>




                            {/*   <View style={styles.rowItem}>
                                <Title style={styles.label}>Ordered/Received Qty:</Title>
                                <Paragraph style={styles.value}>{item.poqty}/{item.receiptqty}</Paragraph>
                            </View>
                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Last MRC Date:</Title>
                                <Paragraph style={styles.value}>{item.lastmrcdt}</Paragraph>
                            </View>
                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Received Value</Title>
                                <Paragraph style={styles.value}>{item.rvaluelacs} lacs</Paragraph>
                            </View>
                         

                            <View style={styles.rowItem}>
                                <Title style={styles.label}>SD/QC Passed Date:</Title>
                                <Paragraph style={styles.value}>{item.sddate}/{item.lastqcpaadeddt}</Paragraph>
                            </View>

                            <View style={styles.rowItem}>
                                <Title style={styles.label}>File on Desk:</Title>
                                <Paragraph style={styles.value}>{item.presentfile}</Paragraph>
                                
                            </View>

                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Status:</Title>
                                <Paragraph style={styles.value}>{item.filefinstatus}</Paragraph>
                            </View>

                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Nasti No/Nasti Date:</Title>
                                <Paragraph style={styles.value}>{item.fileno}/{item.filedt}</Paragraph>
                            </View>

                            <View style={styles.rowItem}>
                                <Title style={styles.label}>PO Status/Reason:</Title>
                                <Paragraph style={styles.value}>{item.fitunfit}/{item.reasonname}</Paragraph>
                            </View> */}

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

export default ReagentStockAndSupply;
