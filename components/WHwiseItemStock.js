import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { fetchWHStockQTY } from './Services/apiService';
const WHwiseItemStock = ({ navigation }) => {
    const [refreshing, setRefreshing] = React.useState(false);
    const informaitonAboutUser = useSelector((state) => state.user);
    const [data, setData] = useState([]);
    const [id, setId] = useState(informaitonAboutUser.facilityid);

    const route = useRoute();
    const mitemid=route.params?.item.itemid;
    const categoryId = route.params?.item.catid;
    const isEDL = route.params?.item.isedl;
    const mitemname = route.params?.item.itemname;



    const fetchData = async () => {
        try {
           // alert("drill down side itemid: " + mitemid );

            const reportData = await fetchWHStockQTY(mitemid,"0");
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
    }, []
    );

    const unsubscribe = navigation.addListener('focus', () => {
        fetchData();
    });


    const renderItem = ({ item, index }) => (
        <View
            style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow, styles.rowWithBorder]}
        >

            {/* <View style={styles.cell}>
                <Text style={styles.cellText}>{index + 1}</Text>
            </View> */}

            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.warehousename}</Text>
            </View>


            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.readyforissue}</Text>
            </View>

            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.pending}</Text>
            </View>

            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.supplierpipeline}</Text>
            </View>

            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.iwhpipeline}</Text>
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


            <View style={styles.card}>
                <View style={styles.cardContent}>
                    <View style={styles.cardItem}>
                        <Text style={styles.label}>Is EDL:</Text>
                        <Text style={styles.value}>{isEDL=='Y'?'Yes':'No'}</Text>
                    </View>
                    <View style={styles.cardItem}>
                        <Text style={styles.label}>Item:</Text>
                        <Text style={styles.value}>{mitemname}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.container}>

                <View style={styles.header}>
                    {/* <Text style={styles.headerText}>S.No</Text> */}
                    <Text style={styles.headerText}>Warehouse</Text>
                    <Text style={styles.headerText}>Ready</Text>
                    <Text style={styles.headerText}>UQC</Text>
                    <Text style={styles.headerText}>Pipeline</Text>
                    <Text style={styles.headerText}>IWH Pipeline</Text>
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
export default WHwiseItemStock;
