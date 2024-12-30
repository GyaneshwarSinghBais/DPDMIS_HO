import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, ScrollView, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { fetchIndentPendingWH, fetchMainCategoryService} from '../Services/apiService';
import DropDownPicker from 'react-native-dropdown-picker';

import { ActivityIndicator, MD2Colors, Dialog, Portal,SegmentedButtons,Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-root-toast';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import Ticon from 'react-native-vector-icons/MaterialCommunityIcons';
import Io from 'react-native-vector-icons/Ionicons';




const IndentPending = ({ navigation }) => {
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

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchData();
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);
    //const drpdwnValue = ["Drugs", "Consumable & Others,", "Reagents"];

    const resetDropdowns = () => {
        // Reset the state variables for dropdown selections
        // setValueYr(null);
        //setValueItem(null);
        setData([]);
        setsegmentValue('')

        // You can add other dropdown state variables here if needed
    };


    const fetchData = async () => {
     //   alert("button clicked");
   //  setData([]);
        if (segmentValue == 0 || segmentValue == null) 
        {
            alert("Please Choose Pending Criteria")
          
            return;
        }


        if (segmentValue == "1" || segmentValue == "2"||segmentValue == "3"||segmentValue == "4") 
        {

            if(segmentValue == "1")
            {
                SetTitalValue("Indent Pending in Warehouse: All");
           }
          
           else if(segmentValue == "2")
           {
            SetTitalValue("Indent Pending in Warehouse Under 7 Days");
           }
           else if(segmentValue == "3")
           {
            SetTitalValue("Indent Pending in Warehouse Under 7-15 Days");
           }
           else if(segmentValue == "4")
           {
            SetTitalValue("Indent Pending in Warehouse More than 15 Days");
           }
            try {
                setVisible(true);
                if (segmentValue == 1) 
                {
                    await fetchIndentPendingWH1("All", "0");
               }
               if (segmentValue == 2) 
                {
                    await fetchIndentPendingWH1("0", "Under 7 Days");
               }
               if (segmentValue == 3) 
            {
                    await fetchIndentPendingWH1("0", "7-15 Days");
               }
               if (segmentValue == 4) 
               {
                   await fetchIndentPendingWH1("0", ">15 Days");
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
            let toast = Toast.show('Please Choose Pending Criteria', {
                duration: Toast.durations.LONG, 
              });
            return;
        }




    };

 
    const fetchIndentPendingWH1 = async (per,clause) => {
        try {

          //  alert(" InPending per:"+per+" clause"+clause);
            const response = await fetchIndentPendingWH(per,clause);
            setData(response);


        } catch (error) {
            console.error('Error:', error);
        }
    };


    useEffect(() => {

        setsegmentValue('');
        setData([]);
      //  fetchData();
    }, []
    );


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
       
            resetDropdowns();
           // setRefreshing(true);
       //  fetchData();
            // setTimeout(() => {
            //     setRefreshing(false);
            // }, 2000);
       
        });
        return unsubscribe;
    }, [navigation]);



    const navigateFunction = (item,fType) => {
         var tot="";
          
               if(fType==0)
               {
             
               tot=item.nosindent;
               }
                if(fType==367)
               {
             
                tot=item.dhs;
               }
    
               if(fType==364)
               {
             
                tot=item.dmefac;
               }
               if(fType==371)
               {
                tot=item.ayush;
               }
               
            const item1 = {"pendingcri":segmentValue,"hodtype":fType,"total":tot,"whid":item.warehouseid}
           // alert(JSON.stringify(item1));
            var fmcatid;
           
             
           
        //alert("All "+segmentValue+" mcid"+fmcatid+" ItemBatch"+fType+" cat"+cat+" total"+tot+"expmonth:"+item.expirymonth)
        navigation.navigate('Indent Pending Details', { item: item1 }); 
            
                    
            
       }
    const renderItem = ({ item, index }) => (
        <View
            style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}
        >
{/* 
<View style={styles.cell}>
                <Text style={styles.cellText}>{index + 1}</Text>
            </View> */}

       
            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.warehousename}</Text>
            </View>
          

        
            <View style={styles.cell}>

            <Text onPress={() => navigateFunction(item,0)} style={styles.cellTextB}><Ticon name="cursor-pointer" size={14}  color="#008000" />{item.nosindent}</Text> 
           
            </View>
            <View style={styles.cell}>
            <Text onPress={() => navigateFunction(item,367)} style={styles.cellTextB}><Ticon name="cursor-pointer" size={14}  color="#E10600" />{item.dhs}</Text> 
            
            </View>
            <View style={styles.cell}>
            <Text onPress={() => navigateFunction(item,364)} style={styles.cellTextB}><Ticon name="cursor-pointer" size={14}  color="#E10600" />{item.dmefac}</Text> 
            
            </View>
            <View style={styles.cell}>
            <Text onPress={() => navigateFunction(item,371)} style={styles.cellTextB}><Ticon name="cursor-pointer" size={14}  color="#E10600" />{item.ayush}</Text> 
            
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
                            value: '1',
                            label: 'All',
                        
                          
                        },
                        {
                            value: '2',
                            label: '<7day',
                      
                            //  icon: 'bag-personal-outline',
                        },
                        {
                            value: '3',
                            label: '7-15day',
                          
                            //  icon: 'bag-personal-outline',
                        },
                        {
                            value: '4',
                            label: '>15day',
                            icon: 'bell-plus',
                       
                        },

                    ]}
                />
            </View>



            <View style={StyleSheet.flatten([{ justifyContent: 'space-between', flexDirection: 'row', zIndex: 999 }])} >

                {/* {dataDDLItem.length > 0 ? (
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
                } */}

                <TouchableOpacity style={StyleSheet.flatten([styles.button, { margin: 20, }])} onPress={fetchData}>
                    <Text style={styles.buttonText}>Show</Text>
                </TouchableOpacity>

            </View>
            <View>
            <Title style={styles.header1}>{TitalValue}</Title>
            </View>

            <View style={styles.header}>

  
       
            {/* <Text style={styles.headerText}>SN</Text> */}
                <Text style={styles.headerText}>Warehouse</Text>
                <Text style={styles.headerText}>Indents</Text>
                <Text style={styles.headerText}>DHS</Text>
                <Text style={styles.headerText}>DME</Text>
                <Text style={styles.headerText}>AYUSH</Text>
         
       
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

export default IndentPending;
