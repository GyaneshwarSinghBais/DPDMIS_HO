import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { fetchCOVBDril, fetchCOVDrillDown, fetchPriceBidDril } from '../Services/apiService';
import { SegmentedButtons, Card, Title, Paragraph, ActivityIndicator, MD2Colors, Dialog, Portal } from 'react-native-paper';
const PriceBidDrill = ({ navigation }) => {
    const [refreshing, setRefreshing] = React.useState(false);
    const informaitonAboutUser = useSelector((state) => state.user);
    const [data, setData] = useState([]);
    const [id, setId] = useState(informaitonAboutUser.facilityid);

    const route = useRoute();
    const RCValidIntID = route.params?.item.RCValidInt;
    const categoryId = route.params?.item.mcid;
    const Count = route.params?.item.nos;
    const MactName = route.params?.item.cat;
    const edltype = route.params?.item.edltype;
    const CoverValue = route.params?.item.CoverValue
    const edltypestr = route.params?.item.edltypestr;
    const [HTime, SetHTimeValue] = useState(null);
    const [TitalValue, SetTitalValue] = useState(null);

    const fetchData = async () => {
        var rcstatus = "";
        if (RCValidIntID == "1") {
            rcstatus = ":All";
        }
        else if (RCValidIntID == "2") {
            //RC  Valid
            rcstatus = ":RC Valid";
        }
        else if (RCValidIntID == "3") {
            //RC Not Valid
            rcstatus = ":RC Not Valid";
        }
        else {
        }

        var eldt = "";
        if (edltypestr == "EDL") {
            eldt = ":EDL";
        }
        else if (edltypestr == "Non EDL") {

            eldt = ":Non EDL";
        }
        else {
        }



        try {
            // alert("CoverValue:"+CoverValue+" RCValidIntID: " + RCValidIntID+" mcid:"+categoryId+" MactName:"+MactName+" Count:"+Count+" edltype:"+edltype);
            if (CoverValue == "1")
             {
                // 1:Price Bid
                SetTitalValue("Price Bid Details" + rcstatus);
                SetHTimeValue("Price DT");
                const reportData = await fetchPriceBidDril(RCValidIntID, categoryId, edltype);
                setData(reportData);
            }
            if (CoverValue == "2") {
                // 2:CovB
                SetHTimeValue("Cov-B DT");
                SetTitalValue("Cover-B Details" + rcstatus);
                const reportData = await fetchCOVDrillDown(RCValidIntID, categoryId, edltype, "3");
                setData(reportData);
            }
            if (CoverValue == "3") {
                // 3:Claim-Objection
                SetHTimeValue("C.Obj-DT");
                //  alert("Gyan:ategoryId"+categoryId+"edltype:"+edltype+"COvValue:+"+CoverValue);
                SetTitalValue("Claim-Objection Details" + rcstatus);
                const reportData = await fetchCOVDrillDown(RCValidIntID, categoryId, edltype, "7");
                setData(reportData);
            }
            if (CoverValue == "4") {
                // 4:Cov-A
                SetHTimeValue("Cov-A-DT");
                SetTitalValue("Cover-A Details" + rcstatus);
                const reportData = await fetchCOVDrillDown(RCValidIntID, categoryId, edltype, "2");
                setData(reportData);
            }
            if (CoverValue == "5") {
                // 5:Live-A
                SetHTimeValue("End-DT");
                // alert("categoryId"+categoryId+"edltype:"+edltype);
                SetTitalValue("Live Tender Details" + rcstatus);
                const reportData = await fetchCOVDrillDown(RCValidIntID, categoryId, edltype, "1");
                setData(reportData);
            }


            // alert(reportData);

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
                <Text style={styles.cellText}>{item.itemcode}</Text>
            </View>


            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.itemname}</Text>
            </View>

            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.schemecode}</Text>
            </View>

            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.pricebiddate}</Text>

            </View>



            {/* <View style={styles.cell}>
        <Text onPress={()=>alert(item.issueID)} style={styles.cellText}>{item.status}</Text>
      </View> */}

            {/* <View style={styles.cell}>
        <Text onPress={()=>navigateFunction(item)} style={styles.cellText}>{item.status}</Text>
      </View> */}

        </View>


    );



    return (

        <SafeAreaView style={styles.container1}>

            <View>
                <Title style={styles.header1}>{TitalValue}</Title>
            </View>
            <View style={styles.card}>
                <View style={styles.cardContent}>
                    <View style={styles.cardItem}>
                        <Text style={styles.label}>Category:</Text>
                        <Text style={styles.value}>{MactName}</Text>
                    </View>
                    <View style={styles.cardItem}>
                        <Text style={styles.label}>EDL Type:</Text>
                        <Text style={styles.value}>{edltypestr}</Text>
                    </View>
                    <View style={styles.cardItem}>
                        <Text style={styles.label}>No of Items:</Text>
                        <Text style={styles.value}>{Count}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.container}>

                <View style={styles.header}>
                    <Text style={styles.headerText}>S.No</Text>
                    <Text style={styles.headerText}>Code</Text>
                    <Text style={styles.headerText}>Item</Text>
                    <Text style={styles.headerText}>Tender</Text>

                    <Text style={styles.headerText}>{HTime}</Text>
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
        alignSelf: 'center',
        color: 'purple',
        fontSize: 13,
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
        alignSelf: 'center',
        color: 'purple',
        fontSize: 13,
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
export default PriceBidDrill;
