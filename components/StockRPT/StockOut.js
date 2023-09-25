import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { fetchMainCategoryService, fetchStockPerEDL, fetchStockPerNonEDLAg_ApprovedAI, fetchStockReport } from '../Services/apiService';
import DropDownPicker from 'react-native-dropdown-picker';
import { SegmentedButtons } from 'react-native-paper';


const StockOut = () => {
    const informaitonAboutUser = useSelector((state) => state.user);
    const [Data, setData] = useState([]);
    const [edlData, setEdlData] = useState([]);
    const [nonEdlData, setNonEdlData] = useState([]);
    const [id, setId] = useState(informaitonAboutUser.facilityid);

    const [dataDDL, setDataDDL] = useState([]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [oldValue, setOldValue] = useState();
    const [segmentValue, setsegmentValue] = React.useState('');

    const [edlDataLoaded, setEdlDataLoaded] = useState(false);
    const [nonEdlDataLoaded, setnonEdlDataLoaded] = useState(false);
    const [showButtonClicked, setShowButtonClicked] = useState(false);
    const drpdwnValue = ["Drugs","Consumable & Others,","Reagents"];


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
            if(segmentValue == 'EDL'){
                fetchStockPerEDLData();
                setNonEdlData([]);
            }else{
                fetchStockPerNonEDLAg_ApprovedAIData();
                setEdlData([]);
            }
            setShowButtonClicked(true);   

        } catch (error) {
            console.error('Error:', error);
        }
    };
    const fetchStockPerEDLData = async () => {
        try {
            const resultData = await fetchStockPerEDL(id, value);
            setEdlData(resultData);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const fetchStockPerNonEDLAg_ApprovedAIData = async () => {
        try {
            const resultData = await fetchStockPerNonEDLAg_ApprovedAI(id, value);
            setNonEdlData(resultData);
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
        console.log(edlData);
        if(edlData.length > 0)
        {
           console.log("use effect edl data");
            setEdlDataLoaded(true); 
        }      
    }, [edlData]
    );

    useEffect(() => {
        if(nonEdlData.length > 0)
        {
            setnonEdlDataLoaded(true); 
        }      
    }, [nonEdlData]
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
                        containerStyle={{ height: 30, width: 450, margin: 20 }}
                        onChangeValue={(value) => {
                            if (value != null) {
                                setOldValue(value);
                                if (value != oldValue && oldValue != undefined) {
                                    //alert("ddl invoked: value" + value + "old value: " + oldValue);
                                    fetchData();
                                }

                            }

                        }}
                        dropDownContainerStyle={{ elevation: 1000, zIndex: 1000 }}
                    />
                ) : (
                  <Text></Text>               
                )
                }

                <TouchableOpacity style={StyleSheet.flatten([styles.button, { margin: 20 }])} onPress={fetchData}>
                    <Text style={styles.buttonText}>Show</Text>
                </TouchableOpacity>
            </View>

            {edlData.length > 0 ?
                <View style={styles.card}>
                    <View style={styles.cardContent}>
                        <View style={styles.cardItem}>
                            <Text style={styles.label}>Total No EDL:</Text>
                            <Text style={styles.value}>{edlData[0].totalnos}</Text>
                        </View>
                        <View style={styles.cardItem}>
                            <Text style={styles.label}>Stock Out:</Text>
                            <Text style={styles.value}>{edlData[0].stockout}</Text>
                        </View>
                        <View style={styles.cardItem}>
                            <Text style={styles.label}>Stock Out %:</Text>
                            <Text style={styles.value}>{edlData[0].stockoutper} %</Text>
                        </View>
                        <View style={styles.cardItem}>
                            <Text style={styles.label}>No of {drpdwnValue[value-1]} Available in Concern WH:</Text>
                            <Text style={styles.value}>{edlData[0].stockinwh}</Text>
                        </View>
                    </View>
                </View> :
                <Text></Text>
                //   (showButtonClicked && !edlDataLoaded) ?
                //   <Text>No Records Found</Text> : null
            }

            {nonEdlData.length > 0 ?
                <View style={styles.card}>
                    <View style={styles.cardContent}>
                        <View style={styles.cardItem}>
                            <Text style={styles.label}>Total No EDL(Approved By CMHO):</Text>
                            <Text style={styles.value}>{nonEdlData[0].totalnos}</Text>
                        </View>
                        <View style={styles.cardItem}>
                            <Text style={styles.label}>Stock Out:</Text>
                            <Text style={styles.value}>{nonEdlData[0].stockout}</Text>
                        </View>
                        <View style={styles.cardItem}>
                            <Text style={styles.label}>Stock Out %:</Text>
                            <Text style={styles.value}>{nonEdlData[0].stockoutper} %</Text>
                        </View>
                        <View style={styles.cardItem}>
                            <Text style={styles.label}>No of {drpdwnValue[value-1]} Available in Concern WH:</Text>
                            <Text style={styles.value}>{nonEdlData[0].stockinwh}</Text>
                        </View>
                    </View>
                </View> :
                 <Text></Text>
                //   (showButtonClicked && !nonEdlDataLoaded) ?
                //   <Text>No Records Found</Text> : null
            }


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
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    button: {

        marginTop: 15,
        paddingVertical: 10,
        backgroundColor: '#3377FF',
        borderRadius: 5,
        width: 100,
        alignItems: 'right',
        textAlign: 'center',
        alignSelf: 'right',

    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
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
        textAlign: 'center',
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
        alignItems: 'center',
    },
    cellText: {
        fontSize: 14,
    },
    cardItemRow: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
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
    cardItemRow: {
        flexDirection: 'row',
        alignItems: 'center',
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

export default StockOut;
