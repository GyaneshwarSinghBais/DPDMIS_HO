import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { fetchCStockValue, fetchMainCategoryService, fetchStockPerEDL, fetchStockPerNonEDLAg_ApprovedAI, fetchStockReport, fetchWarehouse } from '../Services/apiService';
import DropDownPicker from 'react-native-dropdown-picker';
import { SegmentedButtons, Card, Title, Paragraph, ActivityIndicator, MD2Colors, Dialog, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-root-toast';




const CStock = ({ navigation }) => {
    const informaitonAboutUser = useSelector((state) => state.user);
    const [Data, setData] = useState([]);
    const [edlData, setEdlData] = useState([]);
    const [nonEdlData, setNonEdlData] = useState([]);
    const [id, setId] = useState(informaitonAboutUser.facilityid);
    const [TitalValue, SetTitalValue] = useState(null);
    const [dataDDL, setDataDDL] = useState([]);
    const [dataDDLwarehouse, setDataDDLwarehouse] = useState([]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [oldValue, setOldValue] = useState();
    const [segmentValue, setsegmentValue] = React.useState('');

    const [edlDataLoaded, setEdlDataLoaded] = useState(false);
    const [nonEdlDataLoaded, setnonEdlDataLoaded] = useState(false);
    const [showButtonClicked, setShowButtonClicked] = useState(false);

    const [refreshing, setRefreshing] = React.useState(false);

    

    const [visible, setVisible] = React.useState(false);
    const hideDialog = () => setVisible(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchData();
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    const fetchData = async () => {

        if (segmentValue == 0 || segmentValue == null) {
             alert("Please Select Category")
            //let toast = Toast.show('Please Select Category', {
              //  duration: Toast.durations.LONG,            });
            return;
        }
        try {
            setVisible(true);
            await GetStockData();
            //setNonEdlData([]);

        } catch (error) {
            console.error('Error:', error);
        } finally {
            hideDialog();
        }
    };
    const GetStockData = async () => {
        try {
           // alert("Show value " + value );
            let valueConditional = 0;
            if(value != "1")
            {
                //alert(value);
                SetTitalValue("Warehouse Stock at a Glance");
                valueConditional = value;
            }
          
          
            else if(value == "1" )
            {
                //alert(value);
                SetTitalValue("CGMSC Stock at a Glance");
            }
            
            else
            {
                //alert(value);
                SetTitalValue("CGMSC Stock at a Glance");
            }
            
            // alert('valueConditional' + valueConditional);
            // return;
            const resultData = await fetchCStockValue(segmentValue, valueConditional);
            setEdlData(resultData);
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const fetchDataDDL = async () => {
        try {
            //const stockReportDataDDL = await fetchfacstockReportddl(id);    
            const ddlData = await fetchMainCategoryService(id);
            setDataDDL(ddlData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fillWH = async () => {
        try {
               //  alert('inside fillwh');
            const response = await fetchWarehouse("true");
            setDataDDLwarehouse(response);
        } catch (error) {
            console.error('Error:', error);
        }
    };


    useEffect(() => {
        fetchDataDDL();
        fillWH();
        //fetchData();
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
            setEdlData([]);
            setNonEdlData([]);
            setsegmentValue('');
        });
        return unsubscribe;
    }, [navigation]);

    const navigateFunction = () => {

        //navigation.navigate('Stock Out Detail', { item: item1 });
    }



    const renderItem = ({ item, index }) => {
        return (
            <Card style={styles.card}>
                      
                           <Paragraph style={styles.header}>{item.edlcat}</Paragraph>
                <Card.Content>
     
                    <View style={styles.row}>
                        <View style={styles.column}>
                            {/* <View style={styles.rowItem}>
                                <Title style={styles.label}>SN:</Title>
                                <Paragraph style={styles.value}>{index + 1}</Paragraph>
                            </View> */}
                            
                          

                            {/* <View style={styles.rowItem}>
                                <Title style={styles.label}>EDL Category:</Title>
                                <Paragraph style={styles.value}>{item.edlcat}</Paragraph>
                            </View> */}
                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Item Category:</Title>
                                <Paragraph style={styles.value}>{item.mcategory}</Paragraph>
                            </View>
                            {/* <View style={styles.rowItem}>
                                <Title style={styles.label}>Items:</Title>
                                <Paragraph style={styles.value}>{item.noofitems}</Paragraph>
                            </View> */}
                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Items in Ready Stock:</Title>
                                <Paragraph style={styles.value}>{item.noofitemsready}({item.readyforissuevalue} Cr.)</Paragraph>
                            </View>
                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Items in UQC Stock:</Title>
                                <Paragraph style={styles.value}>{item.noofitemsuqc}({item.qcpendingvalue} Cr.)</Paragraph>
                            </View>
                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Items in Pipeline Stock:</Title>
                                <Paragraph style={styles.value}>{item.noofitemspipeline}({item.pipelinevalue} Cr.)</Paragraph>
                            </View>
                            {/* <View style={styles.rowItem}>
                                <Title style={styles.label}>Ready Issue Value:</Title>
                                <Paragraph style={styles.value}>{item.readyforissuevalue}</Paragraph>
                            </View> */}
                            {/* <View style={styles.rowItem}>
                                <Title style={styles.label}>QC Pending Value:</Title>
                                <Paragraph style={styles.value}>{item.qcpendingvalue}</Paragraph>
                            </View> */}
                            {/* <View style={styles.rowItem}>
                                <Title style={styles.label}>Pipeline Value:</Title>
                                <Paragraph style={styles.value}>{item.pipelinevalue}</Paragraph>
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

            <View style={{ marginRight: 20 }}>
                {dataDDL.length > 0 ? (
                    <DropDownPicker
                        open={open}
                        value={value}
                        searchable={true}
                        items={dataDDLwarehouse.map((item) => (
                            {
                                label: item.warehousename,
                                value: item.warehouseid,
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
                        // placeholder="--All Warehouse--"
                        dropDownContainerStyle={{ elevation: 1000, zIndex: 1000 }}
                    />
                ) : (
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                        <ActivityIndicator animating={true} color={MD2Colors.red800} />
                    </View>
                )
                }
            </View>

            <View style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}>
                <SegmentedButtons
                    value={segmentValue}
                    onValueChange={setsegmentValue}
                    buttons={[
                        {
                            value: '1',
                            label: 'Drugs',

                        },
                        {
                            value: '2',
                            label: 'Consumables',

                        },
                        {
                            value: '3',
                            label: 'Reagents',

                        },
                        {
                            value: '4',
                            label: 'AYUSH',

                        },
                    ]}
                />
            </View>
            <View style={StyleSheet.flatten([{ justifyContent: 'space-between', flexDirection: 'row', zIndex: 1000, width: '90%' }])} >
                <TouchableOpacity style={StyleSheet.flatten([styles.button, { margin: 20 }])} onPress={fetchData}>
                    <Text style={styles.buttonText}>Show</Text>         
                </TouchableOpacity>       
            </View>
            <View>
                <Title style={styles.header}>{TitalValue}</Title>
            </View>

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
                data={edlData}
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
        alignSelf:'center',
        color:'purple',
        fontSize:13,
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

export default CStock;
