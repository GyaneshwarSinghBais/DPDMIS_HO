import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { fetchMainCategoryService, fetchStockPerEDL, fetchStockPerNonEDLAg_ApprovedAI, fetchSupplierLiability, fetchUnpaidSupplier, fetchfacIndentAlert } from '../Services/apiService';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-root-toast';
import { ActivityIndicator, MD2Colors, Dialog, Portal,Button } from 'react-native-paper';


const SupplierLiability = ({ navigation }) => {
    const informaitonAboutUser = useSelector((state) => state.user);
    const [data, setData] = useState([]);
    const [edlData, setEdlData] = useState(false);
    const [nonEdlData, setNonEdlData] = useState(false);
    const [id, setId] = useState(informaitonAboutUser.facilityid);

    const [dataDDL, setDataDDL] = useState([]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [oldValue, setOldValue] = useState();

    const [edlDataLoaded, setEdlDataLoaded] = useState(false);
    const [nonEdlDataLoaded, setnonEdlDataLoaded] = useState(false);
    const [showButtonClicked, setShowButtonClicked] = useState(false);
    const drpdwnValue = ["Drugs", "Consumable & Others,", "Reagents"];

    const [refreshing, setRefreshing] = React.useState(false);
    const [loading, setLoading] = useState(false);

    const fetchData = async ({ navigation }) => {
        if (value == 0 || value == null) {
            //alert("Please Select Item")
            let toast = Toast.show('Please Select Supplier', {
                duration: Toast.durations.LONG,
            });
            return;
        }

        try {
            setLoading(true);
            await fetchSupplierLiabilityData(value);
            setShowButtonClicked(true);

        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        if (edlData == true) {
            fetchEDLIAlert();
        } else {
            fetchNonEDLIAlert();
        }

        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    const fetchSupplierLiabilityData = async () => {
        try {

            const resultData = await fetchSupplierLiability(value);
            setData(resultData);
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const fetchDataDDL = async () => {
        try {
            //const stockReportDataDDL = await fetchfacstockReportddl(id);    
            const ddlData = await fetchUnpaidSupplier(id);
            setDataDDL(ddlData);
        } catch (error) {
            console.error('Error:', error);
        }
    };


    useEffect(() => {
        fetchDataDDL();
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
            setData([]);
            setValue(null);

        });
        return unsubscribe;
    }, [navigation]);

    const navigateFunction = (item) => {
        //alert("item: "+ JSON.stringify(item));
        //alert("value: " + value );

        navigation.navigate("Pending Payment PO's", { item: item, supplierid: value, });
    }



    const renderItem = ({ item, index }) => (
        <View
            style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}
        >

            {/* <View style={styles.cell}>
                <Text style={styles.cellText}>{index + 1}</Text>
            </View> */}

            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.fitunfit}</Text>
            </View>
            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.hodtype}</Text>
            </View>
            <View style={styles.cell}>
                <Text onPress={() => navigateFunction(item)} style={styles.cellText}>{item.nospo} <Icon name="link" size={18} color="red" /> </Text>
            </View>
            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.libamt}</Text>
            </View>
        </View>
    );


    return (





        <View style={styles.container}>

            <View style={StyleSheet.flatten([{ justifyContent: 'space-between', flexDirection: 'row', zIndex: 1000 }])} >
                {dataDDL.length > 0 ? (
                    <DropDownPicker
                        open={open}
                        value={value}
                        searchable={true}
                        items={dataDDL.map((item) => (
                            {
                                label: item.nospo,
                                value: item.supplierid,
                            }))}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setData}
                        containerStyle={{ height: 30, width: '90%', margin: 20 }}
                        placeholder='Select Supplier'
                        listMode='MODAL'
                        onChangeValue={(value) => {
                            if (value != null) {
                                setOldValue(value);
                                if (value != oldValue && oldValue != undefined) {
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
            <View style={{ marginTop: 20, marginBottom: 20, marginLeft: 10, marginRight: 10 }}>
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
            </View>

            <View style={styles.header}>

                {/* <Text style={styles.headerText}>SN</Text> */}
                <Text style={styles.headerText}>Fit/Unfit</Text>
                <Text style={styles.headerText}>HOD</Text>
                <Text style={styles.headerText}>No of PO</Text>
                <Text style={styles.headerText}>Liability<Icon name="rupee" size={15} color="#000000" /></Text>
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
        marginLeft: -15,
        paddingVertical: 10,
        backgroundColor: '#3377FF',
        borderRadius: 5,
        width: 100,
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
    },
    headerText: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'left',
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
    cardItemRow: {
        marginTop: 15,
        flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
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
    buttonLabel: {
        color: "#FFFFFF",
    },
    // cardItemRow: {
    //     flexDirection: 'row',
    //     // alignItems: 'center',
    //     justifyContent: 'space-between',
    //     marginBottom: 8,
    // },

    labelRow: {
        fontWeight: 'bold',
        marginRight: 5,
        fontSize: 12
    },
    value: {
        flex: 1,
        textAlign: 'right',
        fontSize: 11,
    },
    valueStock: {
        flex: 1,
        textAlign: 'right',
        fontSize: 12,
        color: '#0000FF',
    },

});

export default SupplierLiability;
