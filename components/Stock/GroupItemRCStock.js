import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { fetchGroupItemtypeRCStock, fetchWarehouse } from '../Services/apiService';
import DropDownPicker from 'react-native-dropdown-picker';
import { SegmentedButtons,ActivityIndicator, MD2Colors, Dialog, Portal,Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-root-toast';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import Ticon from 'react-native-vector-icons/MaterialCommunityIcons';
const GroupItemRCStock = ({ navigation }) => {
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


    const [dataDDLItem, setDataDDLItem] = useState([]);
    const [openItem, setOpenItem] = useState(false);
    const [valueItem, setValueItem] = useState(null);
    const [oldValueItem, setOldValueItem] = useState();
    const [DataItem, setDataItem] = useState([]);

    const [dataDDL, setDataDDL] = useState([]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [oldValue, setOldValue] = useState();

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

    const getWarehouseNameById = (warehouseId) => {
        const warehouse = dataDDL.find(item => item.warehouseid === warehouseId);
        return warehouse ? warehouse.warehousename : 'Warehouse Not Found';
      };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fillWH();
        fetchData();
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    const fillWH = async () => {
        try {
               //  alert('inside fillwh');
            const response = await fetchWarehouse("true");
            setDataDDL(response);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    const fetchData = async () => {

    
        if (segmentValueRC == 0 || segmentValueRC == null) {
            alert("Please Group or Item Type")
           return;
       }
       var rcstatus="";
       if(segmentValueRC == "1")
       {
       
        SetTitalValue("Group wise Drugs RC & Stock Position")
        }
     if(segmentValueRC == "2")
      {
       //RC  Valid
       SetTitalValue("Item Type wise Drugs RC & Stock Position")
      }
    

        if (segmentValueRC == "1" || segmentValueRC == "2" ) 
        {
            try {
               
                
                //console.log("segment Value: " + segmentValue);
                if (segmentValueRC == '1')
                {
                   //alert(value);
                   setVisible(true);
                   const response = await fetchGroupItemtypeRCStock("1","Group",value);
                   setData(response);
                }
                else 
                {
                   // alert(value);
                    setVisible(true);
                    const response = await fetchGroupItemtypeRCStock("1","Item",value);
                    setData(response);
                }
                
            } catch (error) {
                console.error('Error:', error);
            } finally {
              
                hideDialog();
            }
        } else {
            //alert('Please Select any Stage');
            let toast = Toast.show('Please Group or Item Type', {
                duration: Toast.durations.LONG,               
              });
            return;
        }
    };

    useEffect(() => {
        fillWH();       
    }, []
    );

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setValueYr('');
            setData([]);
        });
        return unsubscribe;
    }, [navigation]);

    const navigateFunction = (item,edltype) => {

        //id 1 =rc,id=2 ready,id 3 uqc,id 4 pipline
        var stktype="0";

        const whName = getWarehouseNameById(value);

        if(segmentValueRC == "1")
        {
            stktype="Group";
        }
        if(segmentValueRC == "2")
        {
            stktype="Item";
        }


        if(edltype=="1")
        {
            //RC
  
           const item1 = { "stktype": stktype, "gormtypeid": item.id,"allwh":value,"stk":edltype,"warehouseName":whName,"groupName": item.particular} 
           //alert(JSON.stringify(item1));
           navigation.navigate('Stock Details', { item: item1 });
        }
         else if(edltype=="2")
         {

           // Ready
           const item1 = { "stktype": stktype, "gormtypeid": item.id,"allwh":value,"stk":edltype,"warehouseName":whName,"groupName": item.particular}
           //alert(JSON.stringify(item1));
           navigation.navigate('Stock Details', { item: item1 });
         }
         else if(edltype=="3")
         {
      
            // UQC
            const item1 = { "stktype": stktype, "gormtypeid": item.id,"allwh":value,"stk":edltype,"warehouseName":whName,"groupName": item.particular}
            navigation.navigate('Stock Details', { item: item1 });
         }
         else if(edltype=="4")
         {
    
             // Pipline
             const item1 = { "stktype": stktype, "gormtypeid": item.id,"allwh":value,"stk":edltype,"warehouseName":whName,"groupName": item.particular}
            navigation.navigate('Stock Details', { item: item1 });
         }
         else
         {
  
         }
     
      }
    

    const renderItem = ({ item, index }) => (
        <View style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
         
         {/* <View style={styles.cell}>
                <Text style={styles.cellText}>{index + 1}</Text>
            </View> */}

            <View style={styles.cell}>
                
                <Text style={styles.cellText}>{item.particular}</Text>
            </View>


             <View style={styles.cell}>
            <Text onPress={() => navigateFunction(item,1)} style={styles.cellTextB}><Ticon name="cursor-pointer" size={12}  color="#FF2400" />{item.rc}</Text>
       
            </View> 
            <View style={styles.cell}>
            <Text onPress={() => navigateFunction(item,2)} style={styles.cellTextB}><Ticon name="cursor-pointer" size={12} color="#0645AD" />{item.readycnt}</Text>
              
            </View>
            <View style={styles.cell}>
            <Text onPress={() => navigateFunction(item,3)} style={styles.cellTextB}><Ticon name="cursor-pointer" size={12} color="#008000" />{item.uqccount}</Text>
              
            </View>
            <View style={styles.cell}>
            <Text onPress={() => navigateFunction(item,4)} style={styles.cellTextB}><Ticon name="cursor-pointer" size={12} color="#008000" />{item.piplinecnt}</Text>
              
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

            <View style={{ marginRight: 20 }}>
                {dataDDL.length > 0 ? (
                    <DropDownPicker
                        open={open}
                        value={value}
                        searchable={true}
                        items={dataDDL.map((item) => (
                            {
                                label: item.warehousename,
                                value: item.warehouseid,
                            }))}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setData}
                        containerStyle={{ height: 30, width: '95%', margin: 20 }}

                        onChangeValue={(value) => {
                            if (value != null) {
                                setOldValue(value);
                                if (value != oldValue && oldValue != undefined) {
                                    //alert("ddl invoked: value" + value + "old value: " + oldValue);
                                    // fetchData();
                                }
                            }

                        }}
                        listMode="MODAL"
                        // modalProps={{ animationType: "fade", width: "50%", height: '50%'}}
                        // modalContentContainerStyle={{backgroundColor: "#fff", width:'50%', height:'50%'}}
                        // placeholder="--All Warehouse--"
                        dropDownContainerStyle={{ elevation: 1000, zIndex: 1000 }}
                    />
                ) : (
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                        <ActivityIndicator animating={true} color={MD2Colors.red800} />
                    </View>
                )
                }
            </View>


            <View style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}>
                    <SegmentedButtons
                        value={segmentValueRC}
                        onValueChange={setSegmentValueRC}
                        buttons={[
                            {
                                value: '1',
                                label: 'Group wise',
                                icon: 'briefcase-edit',
                            },
                            {
                                value: '2',
                                label: 'Item Type wise',
                                icon: 'file-sign',
                               
                                //icon: 'medical-bag',
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
                <Text style={styles.headerText}>RC</Text>
                <Text style={styles.headerText}>Ready</Text>
                <Text style={styles.headerText}>UQC</Text>
                <Text style={styles.headerText}>Pipeline</Text>
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
        fontSize: 12,
    },
    cellTextB: {
        fontSize: 15,
        fontWeight: "bold",
        color: '#000000',
    },
});

export default GroupItemRCStock;
