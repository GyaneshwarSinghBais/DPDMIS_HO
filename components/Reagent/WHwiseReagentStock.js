import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { fetchCStockValue, fetchEquipments, fetchFacilityMC, fetchMCAIVsIssuanceService, fetchMainCategoryService, fetchStateReagent, fetchStockPerEDL, fetchStockPerNonEDLAg_ApprovedAI, fetchStockReport, fetchSupplierPO, fetchTenderStage, fetchWarehouseWiseReagent } from '../Services/apiService';
import DropDownPicker from 'react-native-dropdown-picker';
import { Card, Title, Paragraph, ActivityIndicator, MD2Colors, Dialog, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-root-toast';
import { useRoute } from '@react-navigation/native';



const ReagentStateStock = ({ navigation }) => {
    const informaitonAboutUser = useSelector((state) => state.user);

    const [edlData, setEdlData] = useState([]);
    const [nonEdlData, setNonEdlData] = useState([]);
    const [id, setId] = useState(informaitonAboutUser.facilityid);


    const [TitalValue, SetTitalValue] = useState(null);

    const [edlDataLoaded, setEdlDataLoaded] = useState(false);
    const [nonEdlDataLoaded, setnonEdlDataLoaded] = useState(false);
    const [showButtonClicked, setShowButtonClicked] = useState(false);

    const [Data, setData] = useState([]);      //ddl selected data
    const [dataDDL, setDataDDL] = useState([]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [oldValue, setOldValue] = useState();

    const [refreshing, setRefreshing] = React.useState(false);
    const [dataDDLyr, setDataDDLyr] = useState([]);
    const [openYr, setOpenYr] = useState(false);
    const [valueYr, setValueYr] = useState(null);
    const [oldValueYr, setOldValueYr] = useState();
    const [visible, setVisible] = React.useState(false);
    const [segmentValue, setSegmentValue] = React.useState('');
    const hideDialog = () => setVisible(false);




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

    // const fetchData = async () => {
    //     try {
    //         setVisible(true);
    //        // await fetchMCTransaction();
    //         //setNonEdlData([]);
    //     } catch (error) {
    //         console.error('Error:', error);
    //     } finally {
    //         hideDialog();
    //     }
    // };

    const fillEquipment = async () => {
        try {
            const resultData = await fetchEquipments();
            setDataDDL(resultData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchData = async () => {
        try {
            var mmidValue = "0";
            //alert("value: " + value);
            if (value == null  || value == 0) 
            {
               
                mmidValue = "0";
            }
            else
            {
                mmidValue=value;           
            }
            

            setVisible(true);
            const resultData = await fetchStateReagent(mmidValue);
            setData(resultData);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            hideDialog();
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
        fillEquipment();

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

    // useEffect(() => {
    //     if (nonEdlData.length > 0) {
    //         setnonEdlDataLoaded(true);
    //     }
    // }, [nonEdlData]
    // );

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            //fetAlertData();
            setValue('');
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

                            <Title style={styles.header}>{item.eqpname}</Title>

                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Type of Reagent Required:</Title>
                                <Paragraph style={styles.value}>{item.nosreagent}</Paragraph>
                            </View>

                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Stock Available With CGMSC:</Title>
                                <Paragraph style={styles.value}>{item.stkavailable}/{item.stockvaluecr}<Icon name="rupee" size={15} color="#000000" /></Paragraph>
                            </View>
                           
                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Reagent Issued by CGMSC in Year:</Title>
                                <Paragraph style={styles.value}>{item.nosissued}/{item.nosissuedvaluecr}<Icon name="rupee" size={15} color="#000000" /></Paragraph>
                            </View>
                

                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Issued by CGMSC but Receipt Pending :</Title>
                                <Paragraph style={styles.value}>{item.nosfacpipeline}/{item.nosfacpipelinevalue}<Icon name="rupee" size={15} color="#000000" /></Paragraph>
                            </View>

                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Lab Issued(Consumption):</Title>
                                <Paragraph style={styles.value}>{item.nosfaclabissued}/{item.faclabissuevaluecr}<Icon name="rupee" size={15} color="#000000" /></Paragraph>
                            </View>
                            
                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Stock Available With Facilities:</Title>
                                <Paragraph style={styles.value}>{item.nosfacstock}/{item.facstockvaluecr}<Icon name="rupee" size={15} color="#000000" /></Paragraph>
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

            <View style={{ marginRight: 20 }}>
                {dataDDL.length > 0 ? (
                    <DropDownPicker
                        open={open}
                        value={value}
                        searchable={true}
                        items={dataDDL.map((item) => (
                            {
                                label: item.eqpname,
                                value: item.mmid,
                            }))}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setData}
                        containerStyle={{ height: 30, width: '95%', margin: 20 }}

                        onChangeValue={(value) => {
                            if (value != null) {
                                setOldValue(value);
                                if (value != oldValue && oldValue != undefined) {
                                    //alert("ddl invoked: value" + value + "old value: " + oldValue);
                                    // fetchData();
                                }
                            }

                        }}
                        listMode="MODAL"
                        // modalProps={{ animationType: "fade", width: "50%", height: '50%'}}
                        // modalContentContainerStyle={{backgroundColor: "#fff", width:'50%', height:'50%'}}
                        placeholder="--All Equipment--"
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
                ListEmptyComponent={() => (
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Text>No Record Found</Text>
                    </View>
                )}
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

export default ReagentStateStock;
