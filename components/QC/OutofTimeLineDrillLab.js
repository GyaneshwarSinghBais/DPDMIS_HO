import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { fetchCOVBDril, fetchCOVDrillDown, fetchPriceBidDril, fetchQCLabOutTimeBatchwise, fetchQCLabOutTimeLabDetails } from '../Services/apiService';
import { SegmentedButtons, Card, Title, Paragraph, ActivityIndicator, MD2Colors, Dialog, Portal } from 'react-native-paper';
const OutofTimeLineDrillLab = ({ navigation }) => {
    const [refreshing, setRefreshing] = React.useState(false);
    const informaitonAboutUser = useSelector((state) => state.user);
    const [data, setData] = useState([]);
    const [id, setId] = useState(informaitonAboutUser.facilityid);
  
    const route = useRoute();
    const itemname=route.params?.item.itemname;
    const categoryId = route.params?.item.mcid;
    const MactName = route.params?.item.cat;
    const itemtype = route.params?.item.itemtype;
    const exceddedsincetimeline = route.params?.item.exceddedsincetimeline;
    const batchno = route.params?.item.batchno;
    const [HTime, SetHTimeValue] = useState(null);
    const [TitalValue, SetTitalValue] = useState(null);
    const fetchData = async () => {


        var msg1="";
    

     

          msg1= "Sample Pending in Lab for "+itemname+"("+itemtype+"):Bach No: "+batchno;
      
        try {
          
          // alert("catid"+categoryId,"Days"+exceddedsincetimeline+" Batchno"+batchno);
            SetTitalValue(msg1);
            const reportData = await fetchQCLabOutTimeLabDetails(categoryId,exceddedsincetimeline,batchno);
            setData(reportData);
            
            
        } catch (error) {
            console.error('Error:', error);
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
       //setData([]);
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
                <Text style={styles.cellText}>{item.labname}</Text>
            </View>


            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.labreceiptdate}</Text>
            </View>
            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.nosdays}</Text>
            </View>

            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.phonE1}</Text>
            </View>
        </View>
    );
    return (

        <SafeAreaView style={styles.container1}>

             <View>
            <Title style={styles.header1}>{TitalValue}</Title>
            </View>
          

            <View style={styles.container}>

                <View style={styles.header}>
                    <Text style={styles.headerText}>S.No</Text>
                    <Text style={styles.headerText}>Lab</Text>
                 
                    <Text style={styles.headerText}>Received Date</Text>
                    <Text style={styles.headerText}>Days Since</Text>
                    <Text style={styles.headerText}>Lab Contact</Text>
                 
         
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
export default OutofTimeLineDrillLab;
