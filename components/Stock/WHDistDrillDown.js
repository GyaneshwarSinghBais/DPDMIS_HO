import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { Card, Title, Paragraph, ActivityIndicator, MD2Colors, Dialog, Portal } from 'react-native-paper';
//import Icon from 'react-native-vector-icons/FontAwesome';
//import Toast from 'react-native-root-toast';
import { useRoute } from '@react-navigation/native';
import { fetchDistFacwisestockIssuance } from '../Services/apiService';



const WHDistDrillDown = ({ navigation }) => {
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

    const [visible, setVisible] = React.useState(false);
    const hideDialog = () => setVisible(false);
    const [loading, setLoading] = useState(false);
    const [isFirstRender, setIsFirstRender] = useState(true);

    var route = useRoute();
    var itemid = route.params?.item.itemid;
    var itemname = route.params?.item.itemname;
    var fieldstock = route.params?.item.fieldstock;
    var userid = route.params?.item.userid;
    var cmho_coll = route.params?.item.cmho_coll;
    const fetAlertData = async () => {
        try {
            setVisible(true);
            // alert("ftype"+ftype+"hod"+hodid);
            setLoading(true);
            // alert("gajju Groupid" + route.params?.item.gormtypeid + "stkid " + route.params?.item.stk);
            //  const resultData = await fetchfitReportDetail("1", "Fit", "2024", "01");
            //const resultData = await fetchitemwisevariousStockposition ("1","0",gormtypeid1,"0","","0","0","0","0","0","0",readycnt,uqccnt,pipelinecnt,rccnt);
            //(mcid,  itemid, groupid, itemtypeid, edltype,edlcat,yearid,dhsai,dmai,totalai,redycnt,uqccnt,pipelinecnt,rccnt)
            //alert("stktype1: " + stktype1);
            //fetchDistFacwisestockIssuance = async (itemid, hodid,distid, facilityid,userid,coll_cmho)
            //alert(" itemid: " + itemid + " userid: " + userid + " cmho_coll: " + cmho_coll);
            const resultData = await fetchDistFacwisestockIssuance(itemid, "0", "0", "0", userid, cmho_coll);
            setData(resultData);

            // if (stk1 == '1') //RC
            // {
            //     if (stktype1 == "Group") {
            //         //alert("stk 1 and group");
            //         const resultData = await fetchitemwisevariousStockposition("1", "0", gormtypeid1, "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "Y", allwh1);
            //         setData(resultData);
            //     }
            //     else {
            //         //alert("stk 1 and edl");
            //         const resultData = await fetchitemwisevariousStockposition("1", "0", "0", gormtypeid1, "0", "0", "0", "0", "0", "0", "0", "0", "0", "Y", allwh1);
            //         setData(resultData);

            //     }

            // }

            // if (stk1 == '2') //ReadyStock
            // {
            //     if (stktype1 == "Group") {
            //        // alert("stk 2 and group");
            //         const resultData = await fetchitemwisevariousStockposition("1", "0", gormtypeid1, "0", "0", "0", "0", "0", "0", "0", "Y", "0", "0", "0", allwh1);
            //         setData(resultData);
            //     } else {
            //         //alert("stk 2 and edl");
            //         const resultData = await fetchitemwisevariousStockposition("1", "0", "0", gormtypeid1, "0", "0", "0", "0", "0", "0", "Y", "0", "0", "0", allwh1);
            //         setData(resultData);
            //     }
            // }


            // if (stk1 == '3') //UQC
            // {
            //     if (stktype1 == "Group") {
            //         //alert("stk 3 and group");
            //     const resultData = await fetchitemwisevariousStockposition("1", "0", gormtypeid1, "0", "0", "0", "0", "0", "0", "0", "0", "Y", "0", "0", allwh1);
            //     setData(resultData);
            //     } else {
            //         //alert("stk 3 and edl");
            //         const resultData = await fetchitemwisevariousStockposition("1", "0", "0", gormtypeid1, "0", "0", "0", "0", "0", "0", "0", "Y", "0", "0", allwh1);
            //         setData(resultData);  
            //     }
            // }


            // if (stk1 == '4') //Pipeline
            // {
            //     if (stktype1 == "Group") {
            //         //alert("stk 4 and group");
            //     const resultData = await fetchitemwisevariousStockposition("1", "0", gormtypeid1, "0", "0", "0", "0", "0", "0", "0", "0", "0", "Y", "0", allwh1);
            //     setData(resultData);
            //     } else {
            //         //alert("stk 4 and edl");
            //         const resultData = await fetchitemwisevariousStockposition("1", "0", "0", gormtypeid1, "0", "0", "0", "0", "0", "0", "0", "0", "Y", "0", allwh1);
            //         setData(resultData);
            //     }
            // }



        } catch (error) {
            console.error('Error:', error);
        } finally {
            hideDialog();
        }
    };
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetAlertData();
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);


    useEffect(() => {

        // var stktype1 = route.params?.stktype;
        // var gormtypeid1 = route.params?.item.gormtypeid;
        // var allwh1 = route.params?.item.allwh;
        // var stk1 = route.params?.item.stk;
        // var groupName = route.params?.item.groupName;
        // var warehouseName = route.params?.item.warehouseName;

        //alert("stktype1: " + stktype1 + "gormtypeid1: " + gormtypeid1 + "allwh1: " + allwh1 + "stk1: " + "groupName: " + groupName + "warehouseName: " + warehouseName)

        fetAlertData();
    }, []
    );


    useEffect(() => {

        if (!isFirstRender) {
            setData([]);
            fetAlertData();
        } else {
            setIsFirstRender(false);
        }

        // const unsubscribe = navigation.addListener('focus', () => {       
        // setData([]);
        // fetAlertData();
        // });
        // return unsubscribe();
    }, [route.params]);





    // useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', () => {
    //         setData([]);
    //         fetAlertData();
    //     });
    //     return unsubscribe;
    //   }, [navigation]);


    const navigateFunction = () => {
        navigation.navigate('Item Information');
    }




    const renderItem = ({ item, index }) => {
        return (


            <View
                style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow, styles.rowWithBorder]}
            >


                <View style={styles.cell}>
                    <Text style={styles.cellText}>{item.facname}</Text>
                </View>

                <View style={styles.cell}>
                    <Text style={styles.cellText}>{item.whissued}</Text>
                </View>

                <View style={styles.cell}>
                    <Text style={styles.cellText}>{item.totalstock}</Text>
                </View>

                <View style={styles.cell}>
                    <Text style={styles.cellText}>{item.consumption}</Text>
                </View>

                
            </View>
        );
    };




    return (

        <View style={styles.container}>
            <Text onPress={() => navigateFunction()}>Back</Text>
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



            {/* <View style={StyleSheet.flatten([{ justifyContent: 'space-between', flexDirection: 'row', zIndex: 1000, width: '90%' }])} >
                <TouchableOpacity style={StyleSheet.flatten([styles.button, { margin: 20 }])} onPress={fetchData}>
                    <Text style={styles.buttonText}>Show</Text>
                </TouchableOpacity>
            </View> */}

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


           

            <Title style={styles.headerMain}>Item Name: {itemname}</Title>
            <Title style={styles.headerMain}> Total Stock : {fieldstock}</Title>

             <View style={styles.header}>                 
                    <Text style={styles.headerText}>Facility</Text>
                    <Text style={styles.headerText}>Received WH</Text>
                    <Text style={styles.headerText}>Stock</Text>
                    <Text style={styles.headerText}>Consumption</Text>
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
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#F2F2F2',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
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
        alignItems: 'center',
        borderRightWidth: 1,
        borderRightColor: '#CCCCCC',
        padding: 5,
    },
    cellText: {
        fontSize: 11,
    },
    button: {
        marginLeft: 10,
        padding: 10,
        backgroundColor: '#3377FF',
        borderRadius: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    container1: {
        flex: 1,
    },
    scrollView1: {
        flex: 1,
        backgroundColor: 'pink',

        justifyContent: 'center',
    },
    card: {
        backgroundColor: '#F8F8F8',
        borderRadius: 8,
        padding: 16,
        marginBottom: 5,
        marginTop: 20,
    },
    cardContent: {
        flexDirection: 'column',
    },
    cardItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    label: {
        fontWeight: 'bold',
    },
    value: {
        flex: 1,
        textAlign: 'right',
        fontSize: 11,
    },

});

export default WHDistDrillDown;
