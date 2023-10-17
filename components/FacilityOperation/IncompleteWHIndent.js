import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { fetchIndenttoWH } from '../Services/apiService';
import StockReportFacility from '../stockReportFacility';
import NewWardIssue from './NewWardIssue';
import { TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';



const IncompleteWHIndent = ({ navigation }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const informaitonAboutUser = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [id, setId] = useState(informaitonAboutUser.facilityid);




  const fetchData = async () => {
    try {
      const CompIncompIndentToWH = await fetchIndenttoWH(id, "I");
      setData(CompIncompIndentToWH);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    fetchData();
  }, []
  );

  const unsubscribe = navigation.addListener('focus', () => {
    fetchData();
  });


  const renderItem = ({ item, index }) => (
    <View
      style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow, styles.rowWithBorder]}
    >

      <View style={styles.cell}>
        <Text style={styles.cellText}>{index + 1}</Text>
      </View>

      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.reqDate}</Text>
      </View>

      {/* <View style={styles.cell}>
        <Text style={styles.cellText}>{item.indentid}</Text>
      </View>

      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.warehouseid}</Text>
      </View>

      

      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.nocid}</Text>
      </View> */}

      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.nositemsreq}/{item.nosissued}</Text>
      </View>

      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.whissuedt}</Text>
      </View>


      {/* <View style={styles.cell}>
        <Text onPress={()=>alert(item.issueID)} style={styles.cellText}>{item.status}</Text>
      </View> */}

      <View style={styles.cell}>
        <Text onPress={() => navigateFunction(item)} style={[styles.cellText,{width:25,height:25}]}>{(item.istatus) == "I" ?  <Icon name="link" size={18} color="#0000FF" /> : "C"} </Text>
      </View>

    </View>


  );

  const navigateFunction = (item) => {
    //alert(testid);
    //console.log("inside item: " + JSON.stringify(item));
    navigation.navigate('Warehouse Indent', { item: item });
  }

  const navigationFunctionForAdd = () => {
    navigation.navigate('Add New Indent');
  }


  return (

    <SafeAreaView style={styles.container1}>
      {/* <ScrollView
      contentContainerStyle={styles.scrollView1}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }> */}

      <View style={styles.container}>

        <View style={{ width: 200, alignSelf: 'center', padding: 10 }}>
          <TouchableOpacity style={styles.button} onPress={navigationFunctionForAdd}>
            <Text style={styles.buttonText}>Add New Indent</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.header}>
          <Text style={styles.headerText}>S.No</Text>
          <Text style={styles.headerText}>Indent DT</Text>
          {/* <Text style={styles.headerText}>Request By</Text>        
        <Text style={styles.headerText}>Request Date</Text> */}
          <Text style={styles.headerText}>Indented/Issued Items</Text>
          <Text style={styles.headerText}>WH Issue DT</Text>
          <Text style={styles.headerText}>Action</Text>
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
      {/* </ScrollView> */}
    </SafeAreaView>
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
    borderRightWidth: 1,
    borderRightColor: '#CCCCCC',
    padding: 5,
  },
  cellText: {
    fontSize: 11,
  },
  button: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#3377FF',
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  container1: {
    flex: 1,
  },
  scrollView1: {
    flex: 1,
    backgroundColor: 'pink',

    justifyContent: 'center',
  },

});

export default IncompleteWHIndent;
