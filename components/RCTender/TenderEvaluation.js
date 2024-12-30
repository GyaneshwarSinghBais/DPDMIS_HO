import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { fetchTotalObjClaim, fetchTotalPriceBid, fetchTotalRC, fetchTotalTotalCovA, fetchTotalTotalCovB, fetchTotalTotalLive, fetchTotaltoBeTender } from '../Services/apiService';
import DropDownPicker from 'react-native-dropdown-picker';
import { SegmentedButtons,ActivityIndicator, MD2Colors, Dialog, Portal,Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-root-toast';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import Ticon from 'react-native-vector-icons/MaterialCommunityIcons';
const TenderEvaluation = ({ navigation }) => {
    const informaitonAboutUser = useSelector((state) => state.user);
    const [data, setData] = useState([]);
    const [id, setId] = useState(informaitonAboutUser.facilityid);
    const [isActivity, setIsActivity] = useState(false);
    const [TitalValue, SetTitalValue] = useState(null);
    const [visible, setVisible] = React.useState(false);
    const hideDialog = () => setVisible(false);

    const [dataDDLyr, setDataDDLyr] = useState([]);
    const [openYr, setOpenYr] = useState(false);
    const [valueYr, setValueYr] = useState(null);
    const [oldValueYr, setOldValueYr] = useState();
    const [DataYr, setDataYr] = useState([
        { label: 'Price Opened', value: '1' },
        { label: 'Cover-B', value: '2' },
        { label: 'Claim-Objection', value: '3' },
        { label: 'Cover-A', value: '4' },
        { label: 'Live', value: '5' },
        // { label: 'To be Tender', value: '6' },
    ]);

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
    const [segmentValue, setSegmentValue] = React.useState('');
    const [segmentValueRC, setSegmentValueRC] = React.useState('');
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchData();
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);


    const fetchData = async () => {

        if (segmentValue == 0 || segmentValue == null) {
            alert("Please Select Tender Stage")
           return;
       }

        if (segmentValueRC == 0 || segmentValueRC == null) {
            alert("Please Select All/RC Valid/RC Not Valid")
           return;
       }
var rcstatus="";
       if(segmentValueRC == "1")
       {
        //ALL
        rcstatus=":All";
        }
      else if(segmentValueRC == "2")
      {
       //RC  Valid
       rcstatus=":RC Valid";
      }
      else if(segmentValueRC == "3")
      {
       //RC Not Valid
       rcstatus=":RC Not Valid";
      }

        if (segmentValue === "1" || segmentValue === "2" || segmentValue === "3" || segmentValue === "4" || segmentValue === "5" || segmentValue === "6") {
            try {
                setVisible(true);
                //console.log("segment Value: " + segmentValue);
                if (segmentValue === '1') {
                    //pricebid
                    //alert(segmentValueRC);
                  
                    SetTitalValue("Price Bid "+rcstatus);
                    const response = await fetchTotalPriceBid(segmentValueRC);
                   setData(response);
                } else if (segmentValue === '2') {
                    //covB
                    SetTitalValue("Cover-B "+rcstatus);
                    const response = await fetchTotalTotalCovB(segmentValueRC,"3");
                    setData(response);
                } else if (segmentValue === '3') {
                    //objeClaim
                    SetTitalValue("Under Claim Objection "+rcstatus);
                    const response = await fetchTotalTotalCovB(segmentValueRC,"7");
                    setData(response);
                } else if (segmentValue === '4') {
                    //covA
                    SetTitalValue("Cover-A "+rcstatus);
                    const response = await fetchTotalTotalCovB(segmentValueRC,"2");
                    setData(response);
                } else if (segmentValue === '5') {
                    //live
                    SetTitalValue("Live in Tender "+rcstatus);
                    const response = await fetchTotalTotalLive(segmentValueRC);
                    setData(response);
                } else if (segmentValue === '6') {
                    //tobeTender
                    SetTitalValue("To be Tender/Retender "+rcstatus);
                    const response = await fetchTotaltoBeTender();
                    setData(response);
                } else {
                    //alert('Please Select any Stage');
                    let toast = Toast.show('Please Select any Stage', {
                        duration: Toast.durations.LONG,                       
                      });
                    return;
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                hideDialog();
            }
        } else {
            //alert('Please Select any Stage');
            let toast = Toast.show('Please Select any Stage', {
                duration: Toast.durations.LONG,               
              });
            return;
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setValueYr('');
            setData([]);
        });
        return unsubscribe;
    }, [navigation]);

    const navigateFunction = (item,edltype) => {
       var edltypestr="";
         if(edltype=="1")
         {

            edltypestr="EDL";
            const item1 = { "RCValidInt": segmentValueRC, "mcid": item.mcid,"nos":item.edl,"cat":item.mcategory,"edltype":edltype,"CoverValue":segmentValue,"edltypestr":edltypestr}
         //   alert("mcid:"+segmentValue)
            navigation.navigate('Price Bid Details', { item: item1 });
         }
         else if(edltype=="2")
         {
            edltypestr="Non EDL";
            const item1 = { "RCValidInt": segmentValueRC, "mcid": item.mcid,"nos":item.nedl,"cat":item.mcategory,"edltype":edltype,"CoverValue":segmentValue,"edltypestr":edltypestr}
            navigation.navigate('Price Bid Details', { item: item1 });
         }
         else if(edltype=="3")
         {
            edltypestr="Total";
            const item1 = { "RCValidInt": segmentValueRC, "mcid": item.mcid,"nos":item.total,"cat":item.mcategory,"edltype":edltype,"CoverValue":segmentValue,"edltypestr":edltypestr}
            navigation.navigate('Price Bid Details', { item: item1 });
         }
         else{
            edltypestr="NA";
         }
     
      }
    

    const renderItem = ({ item, index }) => (
        <View style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
         
            <View style={styles.cell}>
                
                <Text style={styles.cellText}>{item.mcategory}</Text>
            </View>


            <View style={styles.cell}>
            <Text onPress={() => navigateFunction(item,1)} style={styles.cellTextB}><Ticon name="cursor-pointer" size={14}  color="#FF2400" />{item.edl}</Text>
       
            </View>
            <View style={styles.cell}>
            <Text onPress={() => navigateFunction(item,2)} style={styles.cellTextB}><Ticon name="cursor-pointer" size={14} color="#0645AD" />{item.nedl}</Text>
              
            </View>
            <View style={styles.cell}>
            <Text onPress={() => navigateFunction(item,3)} style={styles.cellTextB}><Icon5 name="search-plus" size={13} color="#008000" />{item.total}</Text>
              
            </View>
            <View style={styles.cell}>
                <Text style={styles.cellTextB}>{item.nostender}</Text>
            </View>
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

            <View>
                <DropDownPicker
                    open={openYr}
                    value={valueYr}
                    items={DataYr}
                    setOpen={setOpenYr}
                    setValue={setValueYr}
                    setItems={setDataYr}
                    zIndex={999}
                    style={{ marginRight: 20, }}
                    placeholder="Select Tender Stage"
                    onChangeValue={(value) => setSegmentValue(value)}
                    listMode='MODAL'
                />
            </View>


            <View style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}>
                    <SegmentedButtons
                        value={segmentValueRC}
                        onValueChange={setSegmentValueRC}
                        buttons={[
                            {
                                value: '1',
                                label: 'All',
                                icon: 'briefcase-edit',
                            },
                            {
                                value: '2',
                                label: 'RC',
                                icon: 'file-sign',
                               
                                //icon: 'medical-bag',
                            },
                            {
                                value: '3',
                                label: 'No-RC',
                                icon: 'medical-bag',
                            },
                            // {
                            //     value: '3',
                            //     label: 'DME',
                            //   //  icon: 'bag-personal-outline',
                            // },


                        ]}
                    />
                </View>

            <View style={{ width: '100%' }}>
                <TouchableOpacity style={[styles.button, { width: '100%' }]} onPress={fetchData}>
                    <Text style={styles.buttonText}>Show</Text>
                </TouchableOpacity>
            </View>
            <View>
            <Title style={styles.header1}>{TitalValue}</Title>
            </View>
            <View style={styles.header}>
                {/* <Text style={styles.headerText}>SN</Text> */}
                <Text style={styles.headerText}>Category</Text>
                <Text style={styles.headerText}>EDL</Text>
                <Text style={styles.headerText}>Non EDL</Text>
                <Text style={styles.headerText}>Total</Text>
                <Text style={styles.headerText}>Tender</Text>
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
        margin: 20
    },
    button: {
        marginTop: 25,
        marginLeft: 0,
        marginBottom: 20,
        paddingVertical: 10,
        backgroundColor: '#3377FF',
        borderRadius: 5,
        width: 100,
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        alignSelf: 'center',
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
        fontSize:18,
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
    },
    cellText: {
        fontSize: 14,
    },
    cellTextB: {
        fontSize: 15,
        fontWeight: "bold",
        color: '#000000',
    },
});

export default TenderEvaluation;
