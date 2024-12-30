import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, ScrollView, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { fetchDistribution, fetchMainCategoryService, fetchNearExpService, fetchPOAlertSummary } from '../Services/apiService';
import DropDownPicker from 'react-native-dropdown-picker';

import { ActivityIndicator, MD2Colors, Dialog, Portal,SegmentedButtons,Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-root-toast';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import Ticon from 'react-native-vector-icons/MaterialCommunityIcons';
import Io from 'react-native-vector-icons/Ionicons';




const Nearexp = ({ navigation }) => {
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
        setValueItem(null);
        setData([]);
        setsegmentValue('')
    };


    const fetchData = async () => {
        if (segmentValue == 0 || segmentValue == null) 
        {
            alert("Please Choose Near Expiry Criteria")
          
            return;
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
      else
      {
        cat="All Categories";
      }

        if (segmentValue == "3" || segmentValue == "8") 
        {

            if(segmentValue == "3")
            {
                SetTitalValue("Near Expiry in Next 4 Month for "+cat)
           }
          
           else if(segmentValue == "8")
           {
            SetTitalValue("Near Expiry in Next 9 Month for "+cat)
           }
         
           

            try {
                setVisible(true);
                if (valueItem == 0 || valueItem == null) 
                {
                    await fetchNearExp("0", segmentValue);
               }
               else
               {

                   await fetchNearExp(valueItem, segmentValue);
               }
             
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
            let toast = Toast.show('Please Near Exp Criteria', {
                duration: Toast.durations.LONG, 
              });
            return;
        }




    };


    const fetchNearExp = async (mcid, nexppara) => {
        try {

        //    alert(mcid+" nexppara:"+nexppara);
            const response = await fetchNearExpService(mcid, nexppara);
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
        return unsubscribe();
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
            if(fType==0||fType==1)
            {
               
               if(fType==0)
               {
                //item
               tot=item.noofitems;
               }
               else if(fType==1)
               {
                //batch
                tot=item.noofbatches;
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
                     else
                     {
                       cat="All Categories";
                     }
                     var fmcatid;
                     if(valueItem==0 || valueItem==null)
                     {
                        fmcatid="0";
                     }
                     else
                     { fmcatid=valueItem;
                     }
                     
               
            var item1 = {"nearexpcrit":segmentValue,"ItemBatch":fType,"mcid":fmcatid,"cat":cat,"total":tot,"expmonth":item.expirymonth}
            //alert(JSON.stringify(item1));
           
            //return;
            if(fType=="0")
            {
                //alert(" var nearexpcrit "+segmentValue+" mcid"+fmcatid+" ItemBatch"+fType+" cat"+cat+" total"+tot+"expmonth:"+item.expirymonth)
                navigation.navigate('Near Exp Item-wise', { item: item1 }); 
            }
            if(fType=="1")
            {
              //  alert("batch nearexpcrit"+segmentValue+" mcid"+fmcatid+" ItemBatch"+fType+" ftype"+cat+" total"+tot+"expmonth:"+item.expirymonth)
               navigation.navigate('Near Exp Batch-wise', { item: item1 }); 
            }              
            }
       }
    const renderItem = ({ item, index }) => (
        <View
            style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}
        >

<View style={styles.cell}>
                <Text style={styles.cellText}>{index + 1}</Text>
            </View>

       
            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.expirymonth}</Text>
            </View>
          

        
            <View style={styles.cell}>

            <Text onPress={() => navigateFunction(item,0)} style={styles.cellTextB}><Ticon name="cursor-pointer" size={14}  color="#008000" />{item.noofitems}</Text> 
           
            </View>
            <View style={styles.cell}>
            <Text onPress={() => navigateFunction(item,1)} style={styles.cellTextB}><Ticon name="cursor-pointer" size={14}  color="#E10600" />{item.noofbatches}</Text> 
            
            </View>
           
            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.nearexpvalue}</Text>
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
                            value: '3',
                            label: 'Next 4 Month',
                             icon: 'bell-ring',
                          
                        },
                        {
                            value: '8',
                            label: 'Next 9 Month',
                            icon: 'bell-plus',
                            //  icon: 'bag-personal-outline',
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

  
       
            <Text style={styles.headerText}>SN</Text>
                <Text style={styles.headerText}>Expiry Month</Text>
                <Text style={styles.headerText}>Items</Text>
                <Text style={styles.headerText}>Batches</Text>
         
                <Text style={styles.headerText}>Near Exp<Icon name="rupee" size={15} color="#000000" /></Text>
   
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
            <Title style={styles.footer1}>1.Current Month Near Expiry Items, cannot be issue from the FEFO System</Title>
            </View>
            <View>
            <Title style={styles.footer1}>2.Action:Consuption to be ensured before its expiry</Title>
            </View>
            <View>
            <Title style={styles.footer1}>2.Circulation:By Letter/by Awareness near expiry items to be used</Title>
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

export default Nearexp;
