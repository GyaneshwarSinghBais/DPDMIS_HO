import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import {fetchitemwisevariousStockposition } from '../Services/apiService';
import {  Card, Title, Paragraph, ActivityIndicator, MD2Colors, Dialog, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-root-toast';
import { useRoute } from '@react-navigation/native';



const StockDrill = ({ navigation }) => {
    const informaitonAboutUser = useSelector((state) => state.user);
    const [Data, setData] = useState([]);
    const [id, setId] = useState(informaitonAboutUser.facilityid);

    const [dataDDL, setDataDDL] = useState([]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [oldValue, setOldValue] = useState();


    const [refreshing, setRefreshing] = React.useState(false);

    const [visible, setVisible] = React.useState(false);
    const hideDialog = () => setVisible(false);


    const route = useRoute();
    const stktype = route.params?.stktype;
    const gormtypeid = route.params?.item.gormtypeid;
    const allwh = route.params?.item.allwh;
    const stk = route.params?.item.stk;
    

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchData();
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    const fetchData = async () => {

        try {
            setVisible(true);
            await fetstockdata();
            //setNonEdlData([]);

        } catch (error) {
            console.error('Error:', error);
        } finally {
            hideDialog();
        }
    };
    const fetstockdata = async () => {
        try {
          

            var gid=route.params?.item.gormtypeid;
            var itemtypeid="0";
            alert("goritemid:"+gid );
            // if(route.params?.stktype == "Item")
            // {
            //     gid="0";
            //     itemtypeid=route.params?.item.gormtypeid;
            // }
          
            alert("gajju Groupid" + gid + " itemtypeid " + route.params?.item.gormtypeid + " stkid " + route.params?.item.stk);
            var rccnt="0"; var readycnt="Y";var uqccnt="0";pipelinecnt="0";
        //    if(route.params?.item.stk=="1")
        //    {
        //     rccnt="Y";
        //    }
        //    if(route.params?.item.stk=="2")
        //    {
        //     readycnt="Y";
        //    }
        //    if(route.params?.item.stk=="3")
        //    {
        //     uqccnt="Y";
        //    }
        //    if(route.params?.item.stk=="4")
        //    {
        //     pipelinecnt="Y";
        //    }
           

            //alert(readycnt);    
      //  fetchitemwisevariousStockposition = async (mcid,  itemid, groupid, itemtypeid, edltype,edlcat,yearid,dhsai,dmai,totalai,redycnt,uqccnt,pipelinecnt,rccnt)
        
            const resultData = await fetchitemwisevariousStockposition ("1","0",route.params?.item.gormtypeid,"0","","0","0","0","0","0","0",readycnt,uqccnt,pipelinecnt,rccnt);

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


    // useEffect(() => {
    //     // const unsubscribe = navigation.addListener('focus', () => {       
    //         setData([]);
    //         fetchData();      
    //     // });
    //     // return unsubscribe();
    // }, [route.params]);

    // const navigateFunction = () => {

        //navigation.navigate('Stock Out Detail', { item: item1 });
    //}



    const renderItem = ({ item, index }) => {
        return (
            <Card style={styles.card}>
                <Card.Content>
                    <View style={styles.row}>
                        <View style={styles.column}>

                            <Title style={styles.header}>{item.itemname} Code {item.itemcode}</Title>

                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Strength:</Title>
                                <Paragraph style={styles.value}>{item.strengtH1}</Paragraph>
                            </View>
                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Unit/Item Type:</Title>
                                <Paragraph style={styles.value}>{item.unit}/{item.itemtypename}</Paragraph>
                            </View>
                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Ready Stock:</Title>
                                <Paragraph style={styles.value}>{item.readystock}</Paragraph>
                            </View>
                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Under QC Stock:</Title>
                                <Paragraph style={styles.value}>{item.qcstock}</Paragraph>
                            </View>
                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Pipeline Stock:</Title>
                                <Paragraph style={styles.value}>{item.totalpiplie}</Paragraph>
                            </View>
                            {/* <View style={styles.rowItem}>
                                <Title style={styles.label}>itemtypename:</Title>
                                <Paragraph style={styles.value}>{item.unit}/{item.qctest}</Paragraph>
                            </View> */}
                            {/* <View style={styles.rowItem}>
                                <Title style={styles.label}>PO Date:</Title>
                                <Paragraph style={styles.value}></Paragraph>
                            </View> */}
                            {/* <View style={styles.rowItem}>
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

export default StockDrill;
