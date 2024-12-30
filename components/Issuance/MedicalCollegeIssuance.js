import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { fetchCStockValue, fetchFacilityMC, fetchMCAIVsIssuanceService, fetchMainCategoryService, fetchStockPerEDL, fetchStockPerNonEDLAg_ApprovedAI, fetchStockReport, fetchSupplierPO } from '../Services/apiService';
import DropDownPicker from 'react-native-dropdown-picker';
import {  Card, Title, Paragraph, ActivityIndicator, MD2Colors, Dialog, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-root-toast';
import { useRoute } from '@react-navigation/native';



const MedicalCollegeIssuance = ({ navigation }) => {
    const informaitonAboutUser = useSelector((state) => state.user);
    const [Data, setData] = useState([]);
    const [edlData, setEdlData] = useState([]);
    const [nonEdlData, setNonEdlData] = useState([]);
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
        fetchDataDDL();
       // fetchData();
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    const fetchData = async () => {

        if (value == 0 || value == null) 
        {
            alert("Select Medical College/Hospital")          
            return;
        }
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

    const fetchDataDDL = async () => {
        try {
 
           // alert("Fetch DDL");
            const ddlData = await fetchFacilityMC("364","0","0","0","0")
            setDataDDL(ddlData);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const fetchMCTransaction = async () => {
        try {
       
             //alert("facid"+value);

              const resultData = await fetchMCAIVsIssuanceService(value)             
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
        fetchDataDDL();
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

                            <Title style={styles.header}>{item.mcategory}</Title>

                            <View style={styles.rowItem}>
                                <Title style={styles.label}>1.Annual Indent:</Title>
                                <Paragraph style={styles.value}>{item.nositems}/{item.ivalue}<Icon name="rupee" size={15} color="#000000" /></Paragraph>
                            </View>
                        <View style={styles.rowItem}>
                                <Title style={styles.label}>2.Issued by Warehouse:</Title>
                                <Paragraph style={styles.value}>{item.nosissued}/{item.issueValued}<Icon name="rupee" size={15} color="#000000" /></Paragraph>
                            </View>
                            <View style={styles.rowItem}>
                                <Title style={styles.label}>3.Ready/Pipeline Stock against 1:</Title>
                                <Paragraph style={styles.value}>{item.readystkavailableAgainstAI}/{item.notIssuedOnlyPipeline}</Paragraph>
                            </View>
                       
                            <View style={styles.rowItem}>
                                <Title style={styles.label}>4.Balance Stock to be Lifted:</Title>
                                <Paragraph style={styles.value}>{item.nosBalanceStockAvailable}/{item.totalBAlStockValue}<Icon name="rupee" size={15} color="#000000" /></Paragraph>
                            </View>
                            <View style={styles.rowItem}>
                                <Title style={styles.label}>5.{item.mcategory} Not Lifted:</Title>
                                <Paragraph style={styles.value}>{item.notLiftedBalanceStock}</Paragraph>
                            </View>
                            <View style={styles.rowItem}>
                                <Title style={styles.label}>6.Stock out & Stock in other WH:</Title>
                                <Paragraph style={styles.value}>{item.concernStockoutButAvailableInOTherWH}</Paragraph>
                            </View>
                            <View style={styles.rowItem}>
                                <Title style={styles.label}>7.Lifted More against 1:</Title>
                                <Paragraph style={styles.value}>{item.issuedMorethanAI}/{item.issuedMorethanAIExtraVAlue}<Icon name="rupee" size={15} color="#000000" /></Paragraph>
                            </View>
                            <View style={styles.rowItem}>
                                <Title style={styles.label}>8.NOC Taken against 1:</Title>
                                <Paragraph style={styles.value}>{item.totalNOCTaken}/{item.totalNOCValue}<Icon name="rupee" size={15} color="#000000" /></Paragraph>
                            </View>   
                            <View style={styles.rowItem}>
                                <Title style={styles.label}>9.Local Purchase:</Title>
                                <Paragraph style={styles.value}>{item.lpoGen}/{item.lpovalue}<Icon name="rupee" size={15} color="#000000" /></Paragraph>
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
            <View style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}>
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
                        placeholder='Medical College/Hospital'
                        listMode='MODAL'
                        onChangeValue={(value) => {
                            if (value != null) {
                                setOldValue(value);
                                if (value != oldValue && oldValue != undefined) {
                                    //alert("ddl invoked: value" + value + "old value: " + oldValue);
                                    //fetchData();
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
            
            <View style={StyleSheet.flatten([{ justifyContent: 'space-between', flexDirection: 'row', zIndex: 1000, width: '20%' }])} >
                <TouchableOpacity style={StyleSheet.flatten([styles.button, { marginTop: 10, marginBottom:10, marginLeft:'50%',marginRight:'50%' }])} onPress={fetchData}>
                    <Text style={styles.buttonText}>Show</Text>         
                </TouchableOpacity>       
            </View>
            <View>
            <Title style={styles.header}>*Medical College/Hospital Transaction at a Glance*</Title>
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

export default MedicalCollegeIssuance;
