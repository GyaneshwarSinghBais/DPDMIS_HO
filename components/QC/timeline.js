import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, ScrollView, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { fetchQCLabOutTime, fetchQCLabWithTime, fetchTotalAcceptance, fetchTotalRC } from '../Services/apiService';
import DropDownPicker from 'react-native-dropdown-picker';
import { ActivityIndicator, MD2Colors, Dialog, Portal ,SegmentedButtons,Title} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import Toast from 'react-native-root-toast';
import Ticon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon6 from 'react-native-vector-icons/Fontisto';


const Timeline = ({ navigation }) => {
    const informaitonAboutUser = useSelector((state) => state.user);
    const [data, setData] = useState([]);
    const [id, setId] = useState(informaitonAboutUser.facilityid);
    const [isActivity, setIsActivity] = useState(false);


    const [dataDDLyr, setDataDDLyr] = useState([]);
    const [openYr, setOpenYr] = useState(false);
    const [valueYr, setValueYr] = useState(null);
    const [oldValueYr, setOldValueYr] = useState();
    const [DataYr, setDataYr] = useState([]);
    const [TitalValue, SetTitalValue] = useState(null);
    const [HTime, SetHTimeValue] = useState(null);
    const [StyleValue, SetStyleValue] = useState(null);
    
    const [visible, setVisible] = React.useState(false);
    const hideDialog = () => setVisible(false);


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
    const fetchData = async () => {


        if (segmentValue == "1" || segmentValue == "2") {


            try {
                setVisible(true);
                if (segmentValue == 1) {
                    //  alert(segmentValue);
                    SetTitalValue("Out of Testing Timeline")
                    SetHTimeValue("Exceeded")
                    SetStyleValue("styles.cellTextRed")

                    const response = await fetchQCLabOutTime();
                    setData(response);


                }
                else {
                    //  alert(segmentValue);
                    SetTitalValue("Within Testing Timeline")
                    SetHTimeValue("Days Left")
                    SetStyleValue("styles.cellTextGreen")
                    const response = await fetchQCLabWithTime();
                    setData(response);
                }


            } catch (error) {
                console.error('Error:', error);
            } finally {
                hideDialog();
            }
        }
        else {
            // alert("Please Select Rate QC Lab Out Timeline or QC Lab Within Timeline")
            let toast = Toast.show('Please Select Rate QC Lab Out Timeline or QC Lab Within Timeline', {
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



    const navigateFunction = (item) => {
        var edltypestr="";
        if (segmentValue == 1) 
        {
            //Out of Timeline Drril
           // alert("mcid:"+segmentValue)
          //  alert(item.exceddedsincetimelinE1);
             const item1 = { "Timeline": segmentValue, "mcid": item.mcid,"cat":item.mcategory,"dayID":item.exceddedsincetimelinE1,"exceddedsincetimeline":item.exceddedsincetimeline}
          //   alert("mcid:"+segmentValue)
             navigation.navigate('QC Out of Timeline in Lab', { item: item1 });
        }
        else{
            alert("No Drill for Within Timeline");
        }
        
          
      
       }

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
                <Text style={styles.cellText}>{item.nositems}</Text>
            </View>
          

            <View style={styles.cell}>
            {/* <Text onPress={() => navigateFunction(item)} style={styles.cellTextB}><Icon5 name="search-plus" size={12} color="#0645AD" />{item.nosbatch}</Text> */}
            <Text onPress={() => navigateFunction(item)} style={styles.cellTextB}><Ticon name="cursor-pointer" size={20} color="#FF2400" />{item.nosbatch}</Text>
            </View>
            <View style={styles.cell}>
            

                <Text style={styles.cellText}>{item.uqcvalue}</Text>
            </View>
            <View style={styles.cell}>
                <Text style={StyleValue}>{item.exceddedsincetimeline}</Text>
                
            </View>
            {/* <View style={styles.cell}>
                <Text style={styles.cellText}>{item.exceddedsincetimelinE1}</Text>

            </View> */}
            

        </View>
    );

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

            <View style={StyleSheet.flatten([{ justifyContent: 'space-between', flexDirection: 'column', zIndex: 999 }])} >


                <View style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}>
                    <SegmentedButtons
                        value={segmentValue}
                        onValueChange={setsegmentValue}
                        buttons={[
                            {
                                value: '1',
                                label: 'Out of Timeline',
                                icon: "timer-off",
                            },
                            {
                                value: '2',
                                label: 'Within Timeline',
                                 icon: 'clock',
                            },
                            // {
                            //     value: '3',
                            //     label: 'DME',
                            //   //  icon: 'bag-personal-outline',
                            // },


                        ]}
                    />
                </View>
                <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'center', marginLeft: 40 }}>
                    <TouchableOpacity style={StyleSheet.flatten([styles.button, { margin: 20, width: '100%' }])} onPress={fetchData}>
                        <Text style={styles.buttonText}>Show</Text>
                    </TouchableOpacity>
                </View>

            </View>
            <View>
    
            <Title style={styles.header1}><Icon6 name="laboratory" size={25} color="#000000" /> {TitalValue}</Title>
            </View>
            <View style={styles.header}>

                {/* <Text style={styles.headerText}>SN</Text> */}
                <Text style={styles.headerText}>Category</Text>
                <Text style={styles.headerText}>Items</Text>
                <Text style={styles.headerText}>Batches</Text>
                <Text style={styles.headerText}>Value<Icon name="rupee" size={15} color="#000000" /></Text>
                <Text style={styles.headerText}>{HTime}</Text>
           

                {/* <Text style={styles.headerText}>Warehouse Name</Text> */}
            </View>
            <FlatList
                data={data}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderItem}
            // refreshControl={
            //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            // }
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
    cellTextB: {
        fontSize: 15,
        fontWeight: "bold",
        color: '#000000',
    },
    cellText15: {
        fontSize: 12,
        color: '#C21807',
        fontWeight: "bold",
    },
    cellText7: {
        fontSize: 12,
        color: '#FF2400',
        fontWeight: "bold",
    },

    cellTextRed: {
        fontSize: 12,
        color: '#C21807',
        fontWeight: "bold",
    },
    cellTextGreen: {
        fontSize: 12,
        color: '#008000',
        fontWeight: "bold",
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

});

export default Timeline;
