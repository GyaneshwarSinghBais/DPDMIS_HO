import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, RefreshControl, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { fetchIntransitIssues, ftechRecRemarksWithIssues, insertTBLRECVPROGRESSHOREMARKS } from '../Services/apiService';
import DropDownPicker from 'react-native-dropdown-picker';
import { Card, Title, Paragraph, ActivityIndicator, MD2Colors, Dialog, Portal, TextInput, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-root-toast';
import { useRoute } from '@react-navigation/native';



const PipeLineIssueRPT = ({ navigation }) => {
    const informaitonAboutUser = useSelector((state) => state.user);
    const [Data, setData] = useState([]);
    const [edlData, setEdlData] = useState([]);
    const [nonEdlData, setNonEdlData] = useState([]);
    const [id, setId] = useState(informaitonAboutUser.facilityid);
    const [roleid, setroleid] = useState(informaitonAboutUser.approle);
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
    const hideDialogScrollable = () => setVisible(false);
    const [dialogContent, setDialogContent] = useState([]);
    const [remark, setRemark] = useState(""); 

    const [visibleScrollableDialog, setVisibleScrollableDialog] = React.useState(false);


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

        if (value == null) {
            alert("Select Any  Issues")
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
            SetTitalValue("Issues on Warehouse Receipts");
        }
        else {
            SetTitalValue("Issues on Warehouse Receipts");
        }

        try {

            //   alert(facuserid);
            //  const ddlData = await ftechPipelinePOs("0",facuserid,userid)
            const ddlData = await ftechRecRemarksWithIssues("True", facuserid, roleid, userid)

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
            //    alert("WH"+facuserid+" Value"+value) ;     
            //alert("PO"+value);
            const resultData = await fetchIntransitIssues(facuserid, userid, value)
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
            setValue("");
            setData([]);
        });
        return unsubscribe;
    }, [navigation]);



    const navigateFunction = (item) => {
        //alert("item: " + item);
        if(id != null){
            alert("Warehouse Cannot Response as HO");
            return;
        }
        setDialogContent(item);
        renderDialogContent(item);
        setVisibleScrollableDialog(true);
        setRemark("");
    }


    const navigateFunctionDialog = async (item) => {
        try {
          //  alert("press click:"+jason.stringitem);
        // alert("press click: " + JSON.stringify(item.data));
        // alert ("Before API progressID:"+item.progressid+" remid:"+item.remid+" remarks:"+remark);
            const resultData = await insertTBLRECVPROGRESSHOREMARKS(item.progressid, item.remid, remark,userid);           
            alert("Remark Saved Successfully.");
            setRemark("");
            setVisibleScrollableDialog(false);
        } catch (error) {
            console.error('Error:', error);
        }
    }





    const renderDialogContent = (item) => {

        if (!item) {
            return null; // or handle the case when item is null
        }

        return (
            <ScrollView contentContainerStyle={{ height: 600 }}>

                <Title >{item.pono}/Dated:{item.podate}</Title>

                <Divider />


                <View style={styles.row}>
                    <Text style={[styles.labelRow, { marginTop: 30 }]}>Remark: </Text>
                </View>


                <View style={{ marginTop: 20 }}>
                    <TextInput 
                     mode="outlined"
                     label="HO Remark"
                     placeholder="HO Remark"
                     value={remark}
                     onChangeText={setRemark}
                    style={styles.input} 
                    multiline={true} 
                    maxLength={300} />                 
                </View>

                


                <View style={{ marginTop: 20 }}>
                    {/* <Title style={styles.label}>8.Remark:</Title> */}
                    <Text onPress={() => navigateFunctionDialog(item)} style={[styles.linkText, styles.linkButton]}>
                        Update Remark
                    </Text>
                </View>

                {/* <View style={styles.row}>
                    <Text style={styles.labelRow}>District: </Text>
                    <Text style={styles.value}>{item.district}</Text>
                </View> */}
            </ScrollView>
        );
    };




    const renderItem = ({ item, index }) => {



        return (


            <Card style={styles.card}>
                <Card.Content>
                    <View style={styles.row}>
                        <View style={styles.column}>

                            <Title style={styles.header}>{item.pono}/Dated:{item.podate}</Title>

                            <View style={styles.rowItem}>
                                <Title style={styles.label}>1.Warehousename:</Title>
                                <Paragraph style={styles.value}>{item.warehousename}</Paragraph>
                            </View>

                            <View style={styles.rowItem}>
                                <Title style={styles.label}>2.Receipt Issues:</Title>
                                <Paragraph style={styles.value}>{item.progress}</Paragraph>
                            </View>
                            <View style={styles.rowItem}>
                                <Title style={styles.label}>3.Remarks:</Title>
                                <Paragraph style={styles.value}>{item.remarks}</Paragraph>
                            </View>
                            <View style={styles.rowItem}>
                                <Title style={styles.label}>4.Action Date:</Title>
                                <Paragraph style={styles.value}>{item.entrydate}</Paragraph>
                            </View>



                            <View style={styles.rowItem}>
                                <Title style={styles.label}>5.Code</Title>
                                <Paragraph style={styles.value}>{item.itemcode}</Paragraph>
                            </View>

                            <View style={styles.rowItem}>
                                <Title style={styles.label}>6.Item</Title>
                                <Paragraph style={styles.value}>{item.itemname}</Paragraph>
                            </View>

                            <View style={styles.rowItem}>
                                <Title style={styles.label}>7.Supplier:</Title>
                                <Paragraph style={styles.value}>{item.suppliername}</Paragraph>
                            </View>

                            <View style={styles.rowItem}>
                                <Title style={styles.label}>8.HO Lastest Response:</Title>
                                <Paragraph style={styles.value}>{item.horemarks}</Paragraph>
                            </View>

                            <View style={styles.rowItem}>
                                <Title style={styles.label}>9.HO Response Date:</Title>
                                <Paragraph style={styles.value}>{item.entrydt}</Paragraph>
                            </View>

                            <View style={styles.cell}>
                                {/* <Title style={styles.label}>8.Remark:</Title> */}
                                <Text onPress={() => navigateFunction(item)} style={[styles.linkText, styles.linkButton]}>
                                    {/* {item.status} */} Entry Remarks Here ...
                                </Text>
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
                <Dialog visible={visibleScrollableDialog} onDismiss={hideDialogScrollable}>
                    <Dialog.ScrollArea>
                        <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
                            {renderDialogContent(dialogContent)}
                        </ScrollView>
                    </Dialog.ScrollArea>
                    <Dialog.Actions>
                        <Text onPress={() => setVisibleScrollableDialog(false)}>
                            <Icon name="close" size={18} color="#A9A9A9" />
                        </Text>
                    </Dialog.Actions>
                </Dialog>
            </Portal>


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
                                label: item.remarks,
                                value: item.remid,
                            }))}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setData}
                        containerStyle={{ height: 30, width: '90%', margin: 20 }}
                        placeholder='Select Issues'
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

            <View style={StyleSheet.flatten([{ justifyContent: 'space-between', flexDirection: 'row', zIndex: 1000, width: '50%' }])} >
                <TouchableOpacity style={StyleSheet.flatten([styles.button, { marginTop: 10, marginBottom: 10, marginLeft: '50%', marginRight: '50%' }])} onPress={fetchData}>
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
    input: {
        backgroundColor: "white"
    },
    linkText: {
        // Your existing styles for the text
        textAlign: 'center',
        fontSize: 16,
      },
      linkButton: {
        backgroundColor: '#3377FF',
        color: '#FFFFFF',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
      },


});

export default PipeLineIssueRPT;
