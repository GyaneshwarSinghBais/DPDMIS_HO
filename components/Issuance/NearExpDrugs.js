import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import {fetchNearExpReportDrugs } from '../Services/apiService';
import { SegmentedButtons, Card, Title, Paragraph, ActivityIndicator, MD2Colors, Dialog, Portal } from 'react-native-paper';
const NearExpDrugs = ({ navigation }) => {
    const [refreshing, setRefreshing] = React.useState(false);
    const informaitonAboutUser = useSelector((state) => state.user);
    const [data, setData] = useState([]);
    const [id, setId] = useState(informaitonAboutUser.facilityid);

    const route = useRoute();
   // const item1 = {"nearexpcrit":segmentValue,"ItemBatch":fType,"mcid":valueItem,"Cat":cat,"total":tot,"expmonth":item.expirymonth}
    var nearexpcrit=route.params?.item.nearexpcrit;
    var ItemBatch = route.params?.item.ItemBatch;
    var mcid = route.params?.item.mcid;
    var MactName = route.params?.item.cat;
    var total = route.params?.item.total;
    var expmonth = route.params?.item.expmonth
    const [HTime, SetHTimeValue] = useState(null);
    const [TitalValue, SetTitalValue] = useState(null);
    const [visible, setVisible] = React.useState(false);
    const hideDialog = () => setVisible(false);

    const fetchData = async () => {
        var rpttype="";
     

        try {
            // alert("CoverValue:"+CoverValue+" RCValidIntID: " + RCValidIntID+" mcid:"+categoryId+" MactName:"+MactName+" Count:"+Count+" edltype:"+edltype);
            if(ItemBatch=="0")
            {
           //    alert("child page mcid:"+mcid+" nearexpcrit: " + nearexpcrit+" expmonth:"+expmonth);
           setVisible(true);
           //  setRefreshing(true);
             rpttype=MactName+"-wise Near Expiry"+" Month:"+expmonth+" Items:"+total;
             const reportData = await fetchNearExpReportDrugs(mcid,nearexpcrit,expmonth);
             setData(reportData);
             setRefreshing(false);
             SetTitalValue(rpttype);

          
            }
            if(ItemBatch=="1")
            {    
            const reportData = await fetchNearExpReportDrugs(mcid,nearexpcrit,expmonth);
            setData(reportData);
            }
            
           // alert(reportData);
            
        } 
        catch (error)
        {
            console.error('Error:', error);
        }
    
    finally 
    {
        hideDialog();
    }
        
    };
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
          fetchData();
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    useEffect(() => {
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

   


    const renderItem = ({ item, index }) => (
        <View
            style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow, styles.rowWithBorder]}
        >

            <View style={styles.cell}>
                <Text style={styles.cellText}>{index + 1}</Text>
            </View>

            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.itemcode}</Text>
            </View>


            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.itemname}</Text>
            </View>

            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.noofbatches}</Text>
            </View>
            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.qty}</Text>
            </View>

            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.nearexpvalue}</Text>
                
            </View>



        </View>


    );



    return (

        <SafeAreaView style={styles.container1}>
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
             <View>
            <Title style={styles.header1}>{TitalValue}</Title>
            </View>
        

            <View style={styles.container}>

                <View style={styles.header}>
                    <Text style={styles.headerText}>S.No</Text>
                    <Text style={styles.headerText}>Code</Text>
                    <Text style={styles.headerText}>Item</Text>
                    <Text style={styles.headerText}>Batches</Text>
                    <Text style={styles.headerText}>QTY</Text>
                    <Text style={styles.headerText}>Value(in Lacs)</Text>
                </View>
                <FlatList
                    data={data}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={renderItem}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                />
            </View>
            {/* </ScrollView> */}
        </SafeAreaView>
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
    header1: {
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
    headerMain: {
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
export default NearExpDrugs;
