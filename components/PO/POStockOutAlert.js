import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, ScrollView, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { fetchDistribution, fetchMainCategoryService, fetchPOAlertSummary } from '../Services/apiService';
import DropDownPicker from 'react-native-dropdown-picker';

import { ActivityIndicator, MD2Colors, Dialog, Portal,SegmentedButtons,Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-root-toast';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import Ticon from 'react-native-vector-icons/MaterialCommunityIcons';
import Io from 'react-native-vector-icons/Ionicons';




const POStockOutAlert = ({ navigation }) => {
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

    const [visible, setVisible] = React.useState(false);
    const hideDialog = () => setVisible(false);


    //const drpdwnValue = ["Drugs", "Consumable & Others,", "Reagents"];

    const resetDropdowns = () => {
        // Reset the state variables for dropdown selections
        // setValueYr(null);
        setValueItem(null);
        setData([]);
        setsegmentValue('')

        // You can add other dropdown state variables here if needed
    };


    const fetchData = async () => {

        if (valueItem == 0 || valueItem == null) {
            alert("Please Select Category")
           return;
       }
       if (segmentValue == "367" || segmentValue == "364" ) 
       {
        if (valueItem == 4 )
         {
            alert("Can`t Select AYUSH Drugs Category in Case of DHS/DME")
             return;
         }
       }
       if (segmentValue == "371" ) 
       {
        if (valueItem == 1 || valueItem == 3)
         {
            alert("Can`t Select Drugs/Reagent Category in Case of AYUSH")
             return;
         }
       }

       var cat="";   
if (valueItem == 1)
    {
        cat="Drugs";
    }
    else if(valueItem == "2")
      {
        cat="Consumables";
      }
      else if(valueItem == "3")
      {
        cat="Reagents";
      }
      else if(valueItem == "4")
      {
        cat="AYUSH";
      }
      else{
      }

        if (segmentValue == "367" || segmentValue == "364" || segmentValue == "371") 
        {

            if(segmentValue == "367")
            {
                SetTitalValue("DHS:Re-Order & Various Stock Alert:"+cat)
           }
          
           else if(segmentValue == "364")
           {
            SetTitalValue("DME:Re-Order & Various Stock Alert:"+cat)
           }
           else if(segmentValue == "371")
           {
            SetTitalValue("AYUSH:Re-Order & Various Stock Alert:"+cat)
           }
           

            try {
                setVisible(true);
               

                   await fetchPOalert(valueItem, segmentValue);
             
            } catch (error)
            {
                console.error('Error:', error);
            } 
            finally 
            {
                hideDialog();
            }
        }
        else {
            //alert("Please Select Directorate")
            let toast = Toast.show('Please Select Directorate', {
                duration: Toast.durations.LONG, 
              });
            return;
        }




    };


    const fetchPOalert = async (mcid, hodid) => {
        try {

           // alert(mcid+" hodid:"+hodid);
            const response = await fetchPOAlertSummary(mcid, hodid);
            setData(response);


        } catch (error) {
            console.error('Error:', error);
        }
    };



    const fetchMainCategory = async () => {
        try {
            //alert("main Cat:"+facid);
            const stockReportDataDDL = await fetchMainCategoryService("HOD");
            setDataDDLItem(stockReportDataDDL);
        } catch (error) {
            console.error('Error:', error);
        }
    };


    useEffect(() => {

        fetchMainCategory();
    }, []
    );


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
       
            resetDropdowns();
       
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

    const navigateFunction = (item,fType) => {
         var tot="";
            if(fType==0||fType==1||fType==2||fType==3)
            {
               //po alert
               if(fType==0)
               {
               tot=item.tobepocount;
               }
               else if(fType==1)
               {
                tot=item.stockout;
               }
               else if(fType==2)
               {
                tot=item.onlyqc;
               }
               else if(fType==3)
               {
                tot=item.onlypipeline;
               }
               
            const item1 = {"hodid":segmentValue,"ftype":fType,"mcid":item.mcid,"edltypevalue":item.edltypevalue,"rcstatusvalue":item.rcstatusvalue,"rcStatus":item.rcstatus,"edltype":item.edltype,"total":tot}
            //alert(JSON.stringify(item1));
            //alert("hodid"+segmentValue+" mcid"+valueItem+" ftype"+fType)
            //return;
             navigation.navigate('Stock Alerts', { item: item1 });    
            }
          
    
       }

    const renderItem = ({ item, index }) => (
        <View
            style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}
        >

      

            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.edltype}</Text>
            </View>
            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.rcstatus}</Text>
            </View>
          
            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.total}</Text>
            </View>
            
        
            <View style={styles.cell}>

            <Text onPress={() => navigateFunction(item,0)} style={styles.cellTextB}><Ticon name="cursor-pointer" size={14}  color="#008000" />{item.tobepocount}</Text> 
           
            </View>
            <View style={styles.cell}>
            <Text onPress={() => navigateFunction(item,1)} style={styles.cellTextB}><Ticon name="cursor-pointer" size={14}  color="#E10600" />{item.stockout}</Text> 
            
            </View>
            <View style={styles.cell}>
            <Text onPress={() => navigateFunction(item,2)} style={styles.cellTextB}><Ticon name="cursor-pointer" size={14}  color="#1252B3" />{item.onlyqc}</Text> 
           
            </View>
            <View style={styles.cell}>
            <Text onPress={() => navigateFunction(item,3)} style={styles.cellTextB}><Ticon name="cursor-pointer" size={14}  color="#7E12B3" />{item.onlypipeline}</Text> 
           
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

            <View style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}>
                <SegmentedButtons
                    value={segmentValue}
                    onValueChange={setsegmentValue}
                    buttons={[
                       
                        {
                            value: '367',
                            label: 'DHS',
                             icon: 'account-tie',
                        },
                        {
                            value: '364',
                            label: 'DME',
                            icon: 'doctor',
                            //  icon: 'bag-personal-outline',
                        },
                        {
                            value: '371',
                            label: 'AYUSH',
                            icon: 'flower-outline',
                            

                        },

                    ]}
                />
            </View>



            <View style={StyleSheet.flatten([{ justifyContent: 'space-between', flexDirection: 'row', zIndex: 999 }])} >

                {dataDDLItem.length > 0 ? (
                    <DropDownPicker
                        open={openItem}
                        value={valueItem}
                        searchable={true}
                        items={dataDDLItem.map((item) => (
                            {
                                label: item.categoryname,
                                value: item.categoryid,
                            }))}
                        setOpen={setOpenItem}
                        setValue={setValueItem}
                        setItems={setDataItem}
                        containerStyle={{ height: 30, width: '60%', margin: 20, zIndex: 1000 }}
                        placeholder='Select Category'
                        listMode='MODAL'
                        onChangeValue={(value) => {
                            if (value != null) {
                                setOldValueItem(value);
                                if (value != oldValueItem && oldValueItem != undefined) {
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

                <TouchableOpacity style={StyleSheet.flatten([styles.button, { margin: 20, }])} onPress={fetchData}>
                    <Text style={styles.buttonText}>Show</Text>
                </TouchableOpacity>

            </View>
            <View>
            <Title style={styles.header1}>{TitalValue}</Title>
            </View>

            <View style={styles.header}>

  
                <Text style={styles.headerText}>Type</Text>
                <Text style={styles.headerText}>RC</Text>
                <Text style={styles.headerText}>Items</Text>
                <Text style={styles.headerText}>Reorder</Text>
                <Text style={styles.headerText}>Stockout</Text>
                <Text style={styles.headerText}>UQC</Text>
                <Text style={styles.headerText}>Pipeline</Text>
   
            </View>
            <FlatList
                data={data}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderItem}
            // refreshControl={
            //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            // }
            />
             <View>
            <Title style={styles.footer1}>Note:</Title>
            </View>
            <View>
            <Title style={styles.footer1}>1.PO Alert: Balance Indent is Available & Stock is Less than One Quarter </Title>
            </View>
            <View>
            <Title style={styles.footer1}>1.Stock out: Ready Stock is not available</Title>
            </View>

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
        textAlign: 'center',
        //alignSelf: 'center'
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
        textAlign: 'center',
       // alignSelf:'center',
        color:'purple',
        fontSize:15,
        fontWeight: 'bold',
    },
    footer1: {
        backgroundColor: '#F2F2F2',
        borderBottomColor: '#CCCCCC',
        textAlign: 'left',
       // alignSelf:'left',
        color:'purple',
        fontSize:10,
       // textAlign: 'left',
    },
    headerText: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize:12,
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
        fontSize: 12, 
    },
    cellText: {
        fontSize: 13,
    },
    cellTextU: {
        fontSize: 14, 
    },
    cellTextB: {
        fontSize: 12,
       
        color: '#000000',
    },
    cellTextRed: {
        fontSize: 12,
        color: '#FF2400',
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

export default POStockOutAlert;
