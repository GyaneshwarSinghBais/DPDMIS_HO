import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { fetchMainCategoryService, fetchStockPerEDL, fetchStockPerNonEDLAg_ApprovedAI, fetchfacIndentAlert } from '../Services/apiService';
import DropDownPicker from 'react-native-dropdown-picker';
import { SegmentedButtons, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';



const IndentAlert = ({ navigation }) => {
    const informaitonAboutUser = useSelector((state) => state.user);
    const [data, setData] = useState([]);
    const [edlData, setEdlData] = useState(false);
    const [nonEdlData, setNonEdlData] = useState(false);
    const [id, setId] = useState(informaitonAboutUser.facilityid);

    const [dataDDL, setDataDDL] = useState([]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [oldValue, setOldValue] = useState();
    const [segmentValue, setsegmentValue] = React.useState('');

    const [edlDataLoaded, setEdlDataLoaded] = useState(false);
    const [nonEdlDataLoaded, setnonEdlDataLoaded] = useState(false);
    const [showButtonClicked, setShowButtonClicked] = useState(false);
    const drpdwnValue = ["Drugs", "Consumable & Others,", "Reagents"];

    const [refreshing, setRefreshing] = React.useState(false);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        if (value == 0 || value == null) {
            alert("Please Select Item")
            return;
        }
        if (segmentValue == 0 || segmentValue == null) {
            alert("Please Select EDL or Non-EDL")
            return;
        }

        try {
            setLoading(true);
            if (segmentValue == 'EDL') {
                // fetchStockPerEDLData();
                await fetchEDLIAlert();
                setNonEdlData(false);
                setEdlData(true);
            } else {
                await fetchNonEDLIAlert();
                setNonEdlData(true);
                setEdlData(false);
            }
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

    const fetchEDLIAlert = async () => {
        try {

            const resultData = await fetchfacIndentAlert(id, value, "Y");
            setData(resultData);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const fetchNonEDLIAlert = async () => {
        try {
            // alert("call Non EDL data");
            const resultData = await fetchfacIndentAlert(id, value, "N");
            setData(resultData);
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

    const navigateFunction = () => {
        const isedl = (segmentValue == 'EDL') ? 'Y' : 'N';
        const item1 = { "catid": value, "isedl": isedl }
        //alert(testid);
        //navigation.navigate("Add New Issue"); 
        navigation.navigate('Stock Out Detail', { item: item1 });
    }



    const renderItem = ({ item, index }) => (
        <View
            style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}
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
                <Text style={styles.cellText}>{item.facstock}</Text>
            </View>
            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.approvedaicmho}</Text>
            </View>
            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.facreqfoR3MONTH}</Text>
            </View>
        </View>
    );


    return (





        <View style={styles.container}>
            <View style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}>
                <SegmentedButtons
                    value={segmentValue}
                    onValueChange={setsegmentValue}
                    buttons={[
                        {
                            value: 'EDL',
                            label: 'EDL',
                            icon: 'medical-bag',
                        },
                        {
                            value: 'NONEDL',
                            label: 'Non EDL',
                            icon: 'bag-personal-outline',
                        },
                    ]}
                />
            </View>
            <View style={StyleSheet.flatten([{ justifyContent: 'space-between', flexDirection: 'row', zIndex: 1000 }])} >
                {dataDDL.length > 0 ? (
                    <DropDownPicker
                        open={open}
                        value={value}
                        searchable={true}
                        items={dataDDL.map((item) => (
                            {
                                label: item.categoryname,
                                value: item.categoryid,
                            }))}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setData}
                        containerStyle={{ height: 30, width: '90%', margin: 20 }}
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
                    <Text></Text>
                )
                }

                {/* <TouchableOpacity style={StyleSheet.flatten([styles.button, { margin: 20 }])} onPress={fetchData}>
                    <Text style={styles.buttonText}>Show</Text>
                </TouchableOpacity> */}




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

            {/* {edlData.length > 0 ?
                <View style={styles.card}>
                    <View style={styles.cardContent}>
                        <View style={styles.cardItem}>
                            <Text style={styles.label}>Total No EDL:</Text>
                            <Text style={styles.value}>{edlData[0].totalnos}</Text>
                        </View>
                        <View style={styles.cardItem}>
                            <Text style={styles.label}>No of Stock Out:</Text>

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
                            <Text style={styles.label}>No of {drpdwnValue[value - 1]} Available in Concern WH:</Text>
                            <Text style={styles.value}>{edlData[0].stockinwh}</Text>
                        </View>
                    </View>
                </View> :
                <Text></Text>
            
            } */}

            {/* {nonEdlData.length > 0 ?
                <View style={styles.card}>
                    <View style={styles.cardContent}>
                        <View style={styles.cardItem}>
                            <Text style={styles.label}>Total No EDL(Approved By CMHO):</Text>
                            <Text style={styles.value}>{nonEdlData[0].totalnos}</Text>
                        </View>
                        <View style={styles.cardItem}>
                            <Text style={styles.label}>Stock Out:</Text>
                            <Text onPress={() => navigateFunction()} style={styles.value}>{nonEdlData[0].stockout}</Text>
                        </View>
                        <View style={styles.cardItem}>
                            <Text style={styles.label}>Stock Out %:</Text>
                            <Text style={styles.value}>{nonEdlData[0].stockoutper} %</Text>
                        </View>
                        <View style={styles.cardItem}>
                            <Text style={styles.label}>No of {drpdwnValue[value - 1]} Available in Concern WH:</Text>
                            <Text style={styles.value}>{nonEdlData[0].stockinwh}</Text>
                        </View>
                    </View>
                </View> :
                <Text></Text>
               
            } */}
            <View style={styles.header}>

                <Text style={styles.headerText}>SN</Text>
                <Text style={styles.headerText}>Code</Text>
                <Text style={styles.headerText}>Item</Text>
                <Text style={styles.headerText}>Stock</Text>
                <Text style={styles.headerText}>Annul Indent</Text>
                <Text style={styles.headerText}>3 Month QTY</Text>
                {/* <Text style={styles.headerText}>Warehouse Name</Text> */}
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
        fontSize: 11,
    },
    valueStock: {
        flex: 1,
        textAlign: 'right',
        fontSize: 12,
        color: '#0000FF',
    },

});

export default IndentAlert;
