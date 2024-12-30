// Home.js
import React, { useState, useEffect } from "react";
import { View,TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  StyleSheet,
  Text,
  SafeAreaView,
} from "react-native";
import List from "./List";
import SearchBar from "./SearchBar";
import { fetchCGMSCPublicStock, fetchMainCategoryService } from "./Services/apiService";
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { Dialog, Portal } from 'react-native-paper';

const StockList= ({ navigation }) => {
  const [DataItem, setDataItem] = useState([]);
  const [dataDDLItem, setDataDDLItem] = useState([]);
  const [openItem, setOpenItem] = useState(false);
  const [valueItem, setValueItem] = useState(null);
  const [oldValueItem, setOldValueItem] = useState();
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [fakeData, setFakeData] = useState();
  const [data, setData] = useState([]);
  const [visible, setVisible] = React.useState(false);
  const hideDialog = () => setVisible(false);
  //const [loading, setLoading] = useState(false);
  // get data from the fake api endpoint
  // useEffect(() => {
  //   const getData = async () => {
  //     const apiResponse = await fetch(
  //       "https://my-json-server.typicode.com/kevintomas1995/logRocket_searchBar/languages"
  //     );
  //     const data = await apiResponse.json();
  //     setFakeData(data);
  //   };
  //   getData();
  // }, []);

  const resetDropdowns = () => {
    setDataDDLItem('');
    setData([]);
   

    // You can add other dropdown state variables here if needed
};
  useEffect(() => {
    //setLoading(false);
    const unsubscribe = navigation.addListener('focus', () => {
        resetDropdowns();
        fetchMainCategory();
    });
    return unsubscribe;
}, [navigation]);

  
  useEffect(() => {
    //setLoading(false);
    fetchMainCategory();
   /// fetchStocks();
    //fetchData();
}, []
);


const fetchMainCategory = async () => {
  try {
      //alert("main Cat:"+facid);
      const stockReportDataDDL = await fetchMainCategoryService("HOD");
      setDataDDLItem(stockReportDataDDL);
  } catch (error) {
      console.error('Error:', error);
  }
};
  const fetchStocks = async () => {
    try {
      setVisible(true);
      if (valueItem == 0 || valueItem == null) 
      {
          alert("Please Choose Category")
        
          return;
      }
     // alert(valueItem);
      
        const resultData = await fetchCGMSCPublicStock(valueItem);
        setData(resultData);
       // setLoading(true);
    } catch (error)
    {
        console.error('Error:', error);
    } 
    finally 
    {
        hideDialog();
    }
};

  return (



    <View style={styles.root}>
  <Text style={styles.buttonText}>.</Text>
  <Text style={styles.buttonText}>.</Text>


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

<View style={StyleSheet.flatten([{ justifyContent: 'space-between', flexDirection: 'row', zIndex: 999 }])} >
<Text style={styles.buttonText}>.</Text>
  <Text style={styles.buttonText}>.</Text>
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
        containerStyle={{ height: 30, width: '60%', margin: 30, zIndex: 1000 }}
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

<TouchableOpacity style={StyleSheet.flatten([styles.button, { margin: 20, }])} onPress={fetchStocks}>
    <Text style={styles.buttonText}>Show</Text>
</TouchableOpacity>

</View>

      {!clicked && 
      <Text style={styles.title}></Text>  //Heading inside text
      }
      {data.length > 0? <SearchBar
       searchPhrase={searchPhrase}
       setSearchPhrase={setSearchPhrase}
       clicked={clicked}
       setClicked={setClicked}
     /> : <View style={{flex:1, justifyContent:"center", alignItems:"center"}} > 
     <ActivityIndicator animating={true} color={MD2Colors.red800} />
     </View>
    }
    
     
      {(

          <List
            searchPhrase={searchPhrase}
            data={data}
            setClicked={setClicked}
          />

      )}
    </View>
  );
};

export default StockList;

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    width: "100%",
   marginTop: 5,
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: "10%",
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

  marginTop: 30,
  marginLeft: -15,
  paddingVertical: 10,
  backgroundColor: '#3377FF',
  borderRadius: 5,
  width: 100,
  // alignItems: 'right',
  textAlign: 'center',
  // alignSelf: 'right',



},
});