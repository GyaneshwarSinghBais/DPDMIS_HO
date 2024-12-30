import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import {fetchFACwiseStockoutPostion} from '../Services/apiService';
import DropDownPicker from 'react-native-dropdown-picker';
import {  Card, Title, Paragraph, ActivityIndicator, MD2Colors, Dialog, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-root-toast';
import { useRoute } from '@react-navigation/native';



const StockPositionDrill = ({ navigation }) => {
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
    const route = useRoute();
    var facilityid1 = route.params?.item.facilityid;
    var mcid1 = route.params?.item.mcid;
    var ftype1 = route.params?.item.rpttype;
    var edl1 = route.params?.item.edl;
    var edlndl1 = route.params?.item.edlndl;
    var total1 = route.params?.item.total;
    var title1 = route.params?.item.title;
    var cat1 = route.params?.item.cat;
    var facility1 = route.params?.item.facility;

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
            await fetchDrillData();
            //setNonEdlData([]);

        } catch (error) {
            console.error('Error:', error);
        } finally {
            hideDialog();
        }
    };
    const fetchDrillData = async () => {
        try {
         // alert("tota:"+route.params?.item.total+" facilityid: " + route.params?.item.facilityid + " ftype: " + route.params?.item.rpttype + " mcid " + route.params?.item.mcid);
            // alert("Show Data");    
            const resultData = await fetchFACwiseStockoutPostion(route.params?.item.rpttype,route.params?.item.facilityid,route.params?.item.mcid,route.params?.item.edl,"0",id);
                            //    fetchFACwiseStockoutPostion = async (ftype,facid,mcatid, EDLNedl, mitemid, userid)
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

    // useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', () => {

    //     });
    //     return unsubscribe;
    // }, [navigation]);

    useEffect(() => {
        // const unsubscribe = navigation.addListener('focus', () => {       
            setData([]);
            fetchData();      
        // });
        // return unsubscribe();
    }, [route.params]);

    const navigateFunction = () => {

        //navigation.navigate('Stock Out Detail', { item: item1 });
    }



    const renderItem = ({ item, index }) => {
        return (
            <Card style={styles.card}>
                <Card.Content>
                    <View style={styles.row}>
                        <View style={styles.column}>

                            <Title style={styles.header}>{item.itemname}Code{item.itemcode}</Title>
                 

                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Type/EDL Cat:</Title>
                                <Paragraph style={styles.value}>{item.itemtypename}/EDL:{item.edl}</Paragraph>
                            </View>

                         
                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Strength</Title>
                                <Paragraph style={styles.value}>{item.strengtH1}</Paragraph>
                            </View>
                             <View style={styles.rowItem}>
                                <Title style={styles.label}>Annual Indent Fixed by CMHO:</Title>
                                <Paragraph style={styles.value}>{item.aiqty}</Paragraph>
                            </View> 
                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Facility Stock:</Title>
                                <Paragraph style={styles.value}>{item.facstock}</Paragraph>
                            </View>
                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Issued by WH & Receipt Pending:</Title>
                                <Paragraph style={styles.value}>{item.whissuependinG_L180}</Paragraph>
                            </View>
                            
                            <View style={styles.rowItem}>
                                <Title style={styles.label}>CMHO Store Stock:</Title>
                                <Paragraph style={styles.value}>{item.cmhostk}</Paragraph>
                            </View>
                            <View style={styles.rowItem}>
                                <Title style={styles.label}>WH Ready Stock</Title>
                                <Paragraph style={styles.value}>{item.whready}</Paragraph>
                            </View>
                         

                            <View style={styles.rowItem}>
                                <Title style={styles.label}>WH Under QC Stock:</Title>
                                <Paragraph style={styles.value}>{item.whpending}</Paragraph>
                            </View>

                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Indent Pending in WH</Title>
                                <Paragraph style={styles.value}>{item.indentqtypending}</Paragraph>
                                
                            </View>

                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Inter Facility Transfer Receipt Pending:</Title>
                                <Paragraph style={styles.value}>{item.balifT_L180}</Paragraph>
                            </View>

                            <View style={styles.rowItem}>
                                <Title style={styles.label}>Local Purchase Order Receipt Pending</Title>
                                <Paragraph style={styles.value}>{item.ballP_L180}</Paragraph>
                            </View>

                            <View style={styles.rowItem}>
                                <Title style={styles.label}>NOC Taken LPO Pen:</Title>
                                <Paragraph style={styles.value}>{item.balnocafterlpo}</Paragraph>
                            </View>
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

          
            <View style={styles.card}>
                <View style={styles.cardContent}>
                <View style={styles.cardItem}>
                <Text style={styles.label}>Health Facility:</Text>
                    <Text style={styles.value}>{route.params?.item.facility}</Text>
                    </View>
                    <View style={styles.cardItem}>
                 
                        <Text style={styles.label}>{route.params?.item.title}</Text>
                        <Text style={styles.value}>{route.params?.item.total}</Text>
                    </View>
                    <View style={styles.cardItem}>
                        <Text style={styles.label}>Category:</Text>
                        <Text style={styles.value}>{route.params?.item.cat}/{route.params?.item.edlndl}</Text>
                    </View>
                </View>
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

    label1: {
        fontWeight: 'bold',
        fontSize: 10,  
        backgroundColor: '#FFFFFF',
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

export default StockPositionDrill;
