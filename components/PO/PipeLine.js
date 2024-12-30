import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import {ftechPipelinePODetails,ftechPipelinePOs } from '../Services/apiService';
import DropDownPicker from 'react-native-dropdown-picker';
import {  Card, Title, Paragraph, ActivityIndicator, MD2Colors, Dialog, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-root-toast';
import { useRoute } from '@react-navigation/native';



const PipeLine = ({ navigation }) => {
    const informaitonAboutUser = useSelector((state) => state.user);
    const [Data, setData] = useState([]);
    const [edlData, setEdlData] = useState([]);
    const [nonEdlData, setNonEdlData] = useState([]);
    const [id, setId] = useState(informaitonAboutUser.facilityid);
    const [TitalValue, SetTitalValue] = useState(null);
    const [dataDDL, setDataDDL] = useState([]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [oldValue, setOldValue] = useState();
    const [userid, setuserid] = useState(informaitonAboutUser.userid);

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
            alert("Select Any PO")          
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

        var facuserid = "0";
        if (id != null) {
          facuserid = id;
          SetTitalValue("Pipeline/in transit supplies for Warehouse");
        } 
        else 
        {
          SetTitalValue("Pipeline/in transit supplies for CGMSC");
        }

        try {
 
           // alert(facuserid);
            const ddlData = await ftechPipelinePOs("0",facuserid,userid)
            setDataDDL(ddlData);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const fetchMCTransaction = async () => {
       
        var facuserid = "0";
        if (id != null) {
          facuserid = id;

        } 
     
        try {
    
             //alert("PO"+value);
              const resultData = await ftechPipelinePODetails(value,"0","0",facuserid,userid)             
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

                            <Title style={styles.header}>{item.pono}/Dated:{item.soissuedate}</Title>

                            <View style={styles.rowItem}>
                                <Title style={styles.label}>1.Days Since PO:</Title>
                                <Paragraph style={styles.value}>{item.days} Days</Paragraph>
                            </View>

                            <View style={styles.rowItem}>
                                <Title style={styles.label}>2.Code/EDL type:</Title>
                                <Paragraph style={styles.value}>{item.itemcode}/{item.edltype}</Paragraph>
                            </View>
                           
                            <View style={styles.rowItem}>
                                <Title style={styles.label}>3.Item/Strength:</Title>
                                <Paragraph style={styles.value}>{item.itemname}/{item.strengtH1}</Paragraph>
                            </View>

                             
                            <View style={styles.rowItem}>
                                <Title style={styles.label}>4.SKU/NIB Required:</Title>
                                <Paragraph style={styles.value}>{item.unit}/{item.nablreq}</Paragraph>
                            </View>

                            <View style={styles.rowItem}>
                                <Title style={styles.label}>5.Ordered QTY:</Title>
                                <Paragraph style={styles.value}>{item.absqty}</Paragraph>
                            </View>
                            <View style={styles.rowItem}>
                                <Title style={styles.label}>6.Received QTY/%:</Title>
                                <Paragraph style={styles.value}>{item.receiptabsqty}/{item.recper}%</Paragraph>
                            </View>

                            <View style={styles.rowItem}>
                                <Title style={styles.label}>7.Pipeline QTY:</Title>
                                <Paragraph style={styles.value}>{item.pipelineqty}</Paragraph>
                            </View>
                            <View style={styles.rowItem}>
                                <Title style={styles.label}>8.Expected Delivery till:</Title>
                                <Paragraph style={styles.value}>{item.expecteddeliverydate}</Paragraph>
                            </View>
                          
                            <View style={styles.rowItem}>
                                <Title style={styles.label}>9.Dispatched QTY by Supplier:</Title>
                                <Paragraph style={styles.value}>{item.disqty}</Paragraph>
                            </View>
                            <View style={styles.rowItem}>
                                <Title style={styles.label}>10.Supplier:</Title>
                                <Paragraph style={styles.value}>{item.suppliername}</Paragraph>
                            </View>
                            <View style={styles.rowItem}>
                                <Title style={styles.label}>11.Contact:</Title>
                                <Paragraph style={styles.value}>{item.phonE1}/{item.email}</Paragraph>
                            </View>
                            <View style={styles.rowItem}>
                                <Title style={styles.label}>12.Ready/UQC Stock:</Title>
                                <Paragraph style={styles.value}>{item.ready}/{item.uqc}</Paragraph>
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
                                label: item.details,
                                value: item.ponoid,
                            }))}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setData}
                        containerStyle={{ height: 30, width: '90%', margin: 20 }}
                        placeholder='Select Pipeline POs'
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

export default PipeLine;
