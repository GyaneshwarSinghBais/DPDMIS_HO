import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, ScrollView, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { fetchTotalAcceptance, fetchTotalRC } from '../Services/apiService';
import DropDownPicker from 'react-native-dropdown-picker';
import { SegmentedButtons, Card, Title, Paragraph, ActivityIndicator, MD2Colors, Dialog, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-root-toast';



const RCAcceptanceTotal = ({ navigation }) => {
    const informaitonAboutUser = useSelector((state) => state.user);
    const [data, setData] = useState([]);
    const [id, setId] = useState(informaitonAboutUser.facilityid);
    const [isActivity, setIsActivity] = useState(false);
    const [SegValue, SetSegValueData] = useState(null);

    const [visible, setVisible] = React.useState(false);
    const hideDialog = () => setVisible(false);

    const [dataDDLyr, setDataDDLyr] = useState([]);
    const [openYr, setOpenYr] = useState(false);
    const [valueYr, setValueYr] = useState(null);
    const [oldValueYr, setOldValueYr] = useState();
    const [DataYr, setDataYr] = useState([]);


    const [dataDDLItem, setDataDDLItem] = useState([]);
    const [openItem, setOpenItem] = useState(false);
    const [valueItem, setValueItem] = useState(null);
    const [oldValueItem, setOldValueItem] = useState();
    const [DataItem, setDataItem] = useState([]);


    const [itemDetail, setItemDetail] = useState([]);
    const [FacilityIndentToWH, setFacilityIndentToWH] = useState([]);
    const [WHissueToFacility, setWHissueToFacility] = useState([]);
    const [FacilityReceiptAgainstIndent, setFacilityReceiptAgainstIndent] = useState([]);
    const [FacilityReceiptFromOtherFacilityOrLP, setFacilityReceiptFromOtherFacilityOrLP] = useState([]);
    const [FacilityWardIssue, setFacilityWardIssue] = useState([]);
    const [FacilityIssueToOtherFacility, setFacilityIssueToOtherFacility] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [segmentValue, setsegmentValue] = React.useState('');

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchData();
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    const fetchData = async () => {

        //console.log("segmentValue: " + segmentValue);

        if (segmentValue == 0 || segmentValue == null) {
            alert("Please Rate Contract or Acceptance")
            return;
        }

        if (segmentValue == "1" || segmentValue == "2") {


            try {
                setVisible(true);

                if (segmentValue == 2) {
                    //  alert(segmentValue);

                    const response = await fetchTotalAcceptance();
                    setData(response);
                    SetSegValueData("*New Acceptance(RC to be Submitted)*")

                }
                else {
                    //  alert(segmentValue);
                    const response = await fetchTotalRC();
                    setData(response);
                    SetSegValueData("*Valid Rate Contract at a Glance*")
                }


            } catch (error) {
                console.error('Error:', error);
            } finally {
                hideDialog();
            }
        }
        else {
            //alert("Please Select Rate Contract or Acceptance")
            let toast = Toast.show('Please Select Rate Contract or Acceptance', {
                duration: Toast.durations.LONG,

            });
            return;
        }

    };






    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setsegmentValue('');
            setData([]);
        });
        return unsubscribe;
    }, [navigation]);



    // useEffect(() => {
    //     console.log(edlData);
    //     if (edlData.length > 0) {
    //         console.log("use effect edl data");

    //     }
    // }, [edlData]
    // );

    // useEffect(() => {
    //     if (nonEdlData.length > 0) {
    //     }
    // }, [nonEdlData]
    // );

    // const navigateFunction = () => {
    //     const isedl = (segmentValue == 'EDL') ? 'Y' : 'N';
    //     const item1 = { "catid": value, "isedl": isedl }
    //     //alert(testid);
    //     //navigation.navigate("Add New Issue"); 
    //     navigation.navigate('Stock Out Detail', { item: item1 });
    // }

    const renderItem = ({ item, index }) => (
        <View
            style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}
        >

            {/* <View style={styles.cell}>
                <Text style={styles.cellText}>{index + 1}</Text>
            </View> */}

            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.mcategory}</Text>
            </View>
            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.edl}</Text>
            </View>
            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.nedl}</Text>
            </View>
            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.total}</Text>
            </View>


        </View>
    );

    return (
        <View style={styles.container}>

            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog} dismissable={false}>
                    <Dialog.Title></Dialog.Title>
                    <Dialog.Content>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                            <ActivityIndicator animating={true} color={MD2Colors.red800} size={'large'} />
                        </View>
                    </Dialog.Content>
                    <Dialog.Title></Dialog.Title>
                </Dialog>
            </Portal>


            <View style={StyleSheet.flatten([{ justifyContent: 'space-between', flexDirection: 'column', zIndex: 999 }])} >


                <View style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}>
                    <SegmentedButtons
                        value={segmentValue}
                        onValueChange={setsegmentValue}
                        buttons={[
                            {
                                value: '1',
                                label: 'Rate Contract',
                                icon: 'file-sign',
                                //  I6: 'file-signature',
                            },
                            {
                                value: '2',
                                label: 'Acceptance',
                                icon: 'file-star',
                            },
                            // {
                            //     value: '3',
                            //     label: 'DME',
                            //   //  icon: 'bag-personal-outline',
                            // },


                        ]}
                    />
                </View>
                {/* <View style={{ marginLeft: 40 }}>
                    <TouchableOpacity style={StyleSheet.flatten([styles.button, { margin: 20, width: '100%' }])} onPress={fetchData}>
                        <Text style={styles.buttonText}>Show</Text>
                    </TouchableOpacity>
                </View> */}
                <View style={StyleSheet.flatten([{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', zIndex: 1000, width: '90%' }])} >
                    <TouchableOpacity style={StyleSheet.flatten([styles.button, { marginTop: 20, marginBottom: 20, marginLeft:'5%'  }])} onPress={fetchData}>
                        <Text style={styles.buttonText}>Show</Text>
                    </TouchableOpacity>
                </View>

            

                <View>
                    <Title style={styles.headerMain}>{SegValue}</Title>
                </View>

            </View>

            <View style={styles.header}>

                {/* <Text style={styles.headerText}>SN</Text> */}
                <Text style={styles.headerText}>Category</Text>
                <Text style={styles.headerText}>EDL</Text>
                <Text style={styles.headerText}>Non EDL</Text>
                <Text style={styles.headerText}>Total</Text>

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

        marginTop: 25,
        marginLeft: -15,
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

    headerMain: {
        flexDirection: 'row',
        backgroundColor: '#F2F2F2',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
        alignSelf: 'center',
        color: 'purple',
        fontSize: 15,
        fontWeight: 'bold',
    },
    headerMainText: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center',
    },

});

export default RCAcceptanceTotal;
