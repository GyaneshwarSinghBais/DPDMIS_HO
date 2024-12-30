import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, ScrollView, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import {fetchDistFACwiseStockPostion, fetchDistrictDDL, fetchMainCategoryService } from '../Services/apiService';
import DropDownPicker from 'react-native-dropdown-picker';
// import { ActivityIndicator, MD2Colors, Dialog, Portal,Title } from 'react-native-paper';
import { SegmentedButtons, Card, Title, Paragraph, ActivityIndicator, MD2Colors, Dialog, Portal } from 'react-native-paper';
import Toast from 'react-native-root-toast';
//import { SegmentedButtons } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import IOct from 'react-native-vector-icons/Octicons';
import Ticon from 'react-native-vector-icons/MaterialCommunityIcons';
const DistStockPosition = ({ navigation }) => {
    const informaitonAboutUser = useSelector((state) => state.user);
    const [data, setData] = useState([]);
    const [id, setId] = useState(informaitonAboutUser.facilityid);
    const [roleid, setroleid] = useState(informaitonAboutUser.approle);
    const [userid, setuserid] = useState(informaitonAboutUser.userid);
    const [isActivity, setIsActivity] = useState(false);
    const [HTime, SetHTimeValue] = useState(null);

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

    const [visible, setVisible] = React.useState(false);
    const hideDialog = () => setVisible(false);


    const [itemDetail, setItemDetail] = useState([]);
    const [FacilityIndentToWH, setFacilityIndentToWH] = useState([]);
    const [WHissueToFacility, setWHissueToFacility] = useState([]);
    const [FacilityReceiptAgainstIndent, setFacilityReceiptAgainstIndent] = useState([]);
    const [FacilityReceiptFromOtherFacilityOrLP, setFacilityReceiptFromOtherFacilityOrLP] = useState([]);
    const [FacilityWardIssue, setFacilityWardIssue] = useState([]);
    const [FacilityIssueToOtherFacility, setFacilityIssueToOtherFacility] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [segmentValue, setsegmentValue] = React.useState('');

    const [TitalValue, SetTitalValue] = useState(null);
    //const drpdwnValue = ["Drugs", "Consumable & Others,", "Reagents"];

    const resetDropdowns = () => {
        // Reset the state variables for dropdown selections
        setValueYr(null);
        setValueItem(null);
        SetTitalValue('');
        // You can add other dropdown state variables here if needed
    };


    const fetchData = async () => {

        if (valueItem == 0 || valueItem == null) {
            alert("Please Select Category")
            let toast = Toast.show('Please Select Category', {
                duration: Toast.durations.LONG,
            });
            return;
        }

        if (valueItem == 3 || valueItem == 4 ) {
            alert("Please Wait for AYUSH/Reagent Category Stocks")
            let toast = Toast.show('Please Wait for AYUSH/Reagent Category', {
                duration: Toast.durations.LONG,
            });
            return;
        }

        if (valueYr == 0 || valueYr == null) {
            alert("Please Select Year")
            let toast = Toast.show('Please Select District', {
                duration: Toast.durations.LONG,
            });
            return;
        }
        if (segmentValue == 0 || segmentValue == null) {
            alert("Please Select EDL or Non EDL")
           //let toast = Toast.show('Please Select Category', {
             //  duration: Toast.durations.LONG,            });
           return;
       }



        try {
            setVisible(true);
            await fetchStockPos();
            // fetchFacilityIndentToWHData();
            // fetchWHissueToFacilityData();
            // fetchFacilityReceiptAgainstIndentData();
            // fetchFacilityReceiptFromOtherFacilityOrLPData();
            // fetchFacilityWardIssueData();
            // fetchFacilityIssueToOtherFacilityData();

        } catch (error) {
            console.error('Error:', error);
        } finally {
            hideDialog();
        }
    };


    const fetchStockPos = async () => {


        var cat="";   
        if (valueItem == 1)
            {
                cat="Drugs:";
            }
            else if(valueItem == "2")
              {
                cat="Consumables:";
              }
              else if(valueItem == "3")
              {
                cat="Reagents:";
              }
              else if(valueItem == "4")
              {
                cat="AYUSH:";
              }
              else{
              }
        
              var edlndl="";  
        
              if (segmentValue == "Y")
              {
                edlndl="EDL";
                SetHTimeValue("Getatable");
              }
              else{
                edlndl="Non EDL";
                SetHTimeValue("AI");
            }


        try {
           

                SetTitalValue(edlndl+" "+cat+"Facility Stocks vs WH Stocks Against Stock-out");
       
                //alert(segmentValue);
                const response = await fetchDistFACwiseStockPostion(valueYr, "0", valueItem,segmentValue,"0",id);
                setData(response);
           
             
            

            //alert(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };


    //DDL datas
    const fetchDistrict = async () => {

        var tfvalud = "0";
        var idvalue="0"
        if (id != null) {
            tfvalud = false;
            idvalue=id;

        } 
        else
        {
            tfvalud = false;
        }
        var approle="0"
        if (roleid == "Collector")
        {
            approle="Coll";
        }
        if (roleid == "CMHO")
        {
            approle="CMHO";
        }

        var Whid="0"
        if (roleid == "WH")
        {
            Whid=id;
        }


        
       //alert(roleid+"usr:"+userid);
        try {
            const ddlData = await fetchDistrictDDL(tfvalud,Whid,"0",userid,approle);
            setDataDDLyr(ddlData);
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




    //Card datas





    useEffect(() => {
        fetchDistrict();

        fetchMainCategory();
        setsegmentValue('');
    }, []
    );


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            //setDataDDLItem([]);
            //setWHissueToFacility([]);    
            resetDropdowns();
            setData([]);
            setsegmentValue('');
            // setItemDetail([]);
            // setWHissueToFacility([]);
            // setWHissueToFacility([]);
            // setFacilityReceiptAgainstIndent([]);
            // setFacilityReceiptFromOtherFacilityOrLP([]);
            // setFacilityWardIssue([]);
            // setFacilityIssueToOtherFacility([]);
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


    const navigateFunction = (item,fType) => {
        var tot="";
        var title="";
           if(fType==3||fType==1||fType==2||fType==4)
           {
              
              if(fType==1)
              {
               //item
               title="Stock Available in Warehosue";
              tot=item.whstkcnt;
              }
              else if(fType==2)
              {
               //facnotreceived
               title="Stock Issued by Warheouse& Not Received";
               tot=item.recpendingatfacilily;
              }
              else if(fType==3)
              {
               //facnotreceived
               title="Stock-out in Health Facility";
               tot=item.stockoutnos;
              }
              else if(fType==4)
              {
               //facnotreceived
               title="Stock Avaialble in Health Facility";
               tot=item.facstkcnt;
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
                    
                    var edlndl="";  
        
                    if (segmentValue == "Y")
                    {
                      edlndl="EDL";
                      SetHTimeValue("Getatable");
                    }
                    else{
                      edlndl="Non EDL";
                      SetHTimeValue("AI");
                  }
           var item1 = {"edl":segmentValue,"rpttype":fType,"mcid":valueItem,"edlndl":edlndl,"cat":cat,"total":tot,"facilityid":item.facilityid,"title":title,"facility":item.facilityname}
           //alert(JSON.stringify(item1));
          
           //return;
           if(fType=="1")
           {
              // alert("WH stock availab EDL "+segmentValue+" mcid"+valueItem+" fType"+fType+" cat"+cat+" total"+tot+"facilityid:"+item.facilityid)
               navigation.navigate('Facility Stock-out Position', { item: item1 }); 
           }
           if(fType=="2")
           {
         //  alert("STock out issued by wh and not recived in fact "+segmentValue+" mcid"+valueItem+" fType"+fType+" cat"+cat+" total"+tot+"facilityid:"+item.facilityid)
             navigation.navigate('Facility Stock-out Position', { item: item1 }); 
           }  
           if(fType=="3")
           {
          // alert("STock out in facility "+segmentValue+" mcid"+valueItem+" fType"+fType+" cat"+cat+" total"+tot+"facilityid:"+item.facilityid)
             navigation.navigate('Facility Stock-out Position', { item: item1 }); 
           }   
           if(fType=="4")
           {
           //alert("STock available in faciliyt "+segmentValue+" mcid"+valueItem+" fType"+fType+" cat"+cat+" total"+tot+"facilityid:"+item.facilityid)
             navigation.navigate('Facility Stock-out Position', { item: item1 }); 
           }     

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
                <Text style={styles.cellText}>{item.facilityname}</Text>
            </View>
            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.nositems}</Text>
            </View>
            <View style={styles.cell}>

                <Text onPress={() => navigateFunction(item,4)} style={styles.cellTextB}><Ticon name="cursor-pointer" size={14}  color="#008000" />{item.facstkcnt}</Text> 
            </View>
            <View style={styles.cell}>
   
                <Text onPress={() => navigateFunction(item,3)} style={styles.cellTextB}><Ticon name="cursor-pointer" size={14}  color="#FF0000" />{item.stockoutnos}</Text> 
            </View>
            <View style={styles.cell}>
             
                <Text onPress={() => navigateFunction(item,2)} style={styles.cellTextB}><Ticon name="cursor-pointer" size={14}  color="#0000FF" />{item.recpendingatfacilily}</Text> 
            </View>
            <View style={styles.cell}>
          
                <Text onPress={() => navigateFunction(item,1)} style={styles.cellTextB}><Ticon name="cursor-pointer" size={14}  color="#800000" />{item.whstkcnt}</Text> 
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
                    placeholder='Select Category'
                    listMode='MODAL'
                    containerStyle={{ height: 30, width: '90%', margin: 20, zIndex: 1000 }}
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
<View style={{ height: 40, width: '60%', margin: 20 ,zIndex: 1000 }}
>
                <SegmentedButtons
                    value={segmentValue}
                    onValueChange={setsegmentValue}
                    buttons={[
                        {
                            value: 'Y',
                            label: 'EDL',

                        },
                        {
                            value: 'N',
                            label: 'Non EDL',

                        },
                       
                    ]}
                />
            </View>
            <View style={StyleSheet.flatten([{ justifyContent: 'space-between', flexDirection: 'row', zIndex: 999 }])} >

                {dataDDLyr.length > 0 ? (
                    <DropDownPicker
                        open={openYr}
                        value={valueYr}
                        searchable={true}
                        items={dataDDLyr.map((item) => (
                            {
                                label: item.districtname,
                                value: item.districtid,
                            }))}
                        setOpen={setOpenYr}
                        setValue={setValueYr}
                        setItems={setDataYr}
                        containerStyle={{ height: 30, width: '60%', margin: 20 }}
                        placeholder='Select District'
                        listMode='MODAL'
                        onChangeValue={(value) => {
                            if (value != null) {
                                setOldValueYr(value);
                                if (value != oldValueYr && oldValueYr != undefined) {
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



            <View style={StyleSheet.flatten([{ justifyContent: 'space-between', flexDirection: 'row', zIndex: 1000, width: '90%' }])} >
                <TouchableOpacity style={StyleSheet.flatten([styles.button, { margin: 20 }])} onPress={fetchData}>
                    <Text style={styles.buttonText}>Show</Text>         
                </TouchableOpacity>       
            </View>

              {/* <TouchableOpacity style={StyleSheet.flatten([styles.button, { margin: 20, }])} onPress={fetchData}>
                    <Text style={styles.buttonText}>Show</Text>
                </TouchableOpacity> */}
            </View> 
            <View>
            <Title style={styles.header1}>{TitalValue}</Title>
            </View>
            <View style={styles.header}>

           
                <Text style={styles.headerText}>Facility</Text>
                <Text style={styles.headerText}>{HTime}</Text>
                <Text style={styles.headerText}>Stock</Text>
                <Text style={styles.headerText}>Stock-out</Text>
                <Text style={styles.headerText}>WH Issued</Text>
                <Text style={styles.headerText}>WH Stock</Text>
              
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
  
        textAlign: 'center',
     

        // marginTop: 15,
        // paddingVertical: 10,
        // backgroundColor: '#3377FF',
        // borderRadius: 5,
        // width: '100%',
        // textAlign: 'center',


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
    cellTextB: {
        fontSize: 12,
       
        color: '#000000',
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

});

export default DistStockPosition;
