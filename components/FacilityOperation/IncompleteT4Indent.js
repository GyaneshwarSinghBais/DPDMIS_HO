import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList,ScrollView  } from 'react-native';
import { useSelector } from 'react-redux';
import { fetchIncomplWardIndentMaster, fetchIncompleteWardIssue } from '../Services/apiService';
import StockReportFacility from '../stockReportFacility';
import NewWardIssue from './NewWardIssue';
import { TouchableOpacity } from 'react-native';


const IncompleteT4Indent = ({ navigation }) => {
  const informaitonAboutUser = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [id, setId] = useState(informaitonAboutUser.facilityid);

  
    

  const fetchData = async () => {
    try {     
    const stockReportData = await fetchIncomplWardIndentMaster(id);    
    setData(stockReportData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {    
        fetchData();
  },[]
  );


  const renderItem = ({ item, index }) => (
    <View
      style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow, styles.rowWithBorder]}
    >

     <View style={styles.cell}>
        <Text style={styles.cellText}>{index+1}</Text>
      </View>

      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.wardname}</Text>
      </View>

      {/* <View style={styles.cell}>
        <Text style={styles.cellText}>{item.nocid}</Text>
      </View>

      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.windentno}</Text>
      </View>
      
       <View style={styles.cell}>
        <Text style={styles.cellText}>{item.issuedt}</Text>
      </View>

       <View style={styles.cell}>
        <Text style={styles.cellText}>{item.issueno}</Text>
      </View>
      */}

      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.requesteddate}</Text>
      </View>

      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.nos}</Text>
      </View>

      
      {/* <View style={styles.cell}>
        <Text onPress={()=>alert(item.issueID)} style={styles.cellText}>{item.status}</Text>
      </View> */}

    <View style={styles.cell}>
        <Text onPress={()=>navigateFunction(item)} style={styles.cellText}>{item.dstatus}</Text>
      </View>
     
    </View>

    
  );

const navigateFunction = (item) => {    
    //navigation.navigate('Add New Issue', { item: item, });
    //if issue no already genrated then navigate... else ... genrate issue no and take issue data then navigate
  if(item.issueid == "" || item.issueid == null)
  {
    alert("Issue id is null for IndentId "+ item.nocid);
    //Ask Issue Date and generate IssueID then..
    //navigate  and show only indented items in ddl and not more than indented qty
  }
  else
  {
    alert("Issue id = "+ item.issueid + " and  IndentId "+ item.nocid )
    //navigate directly and show only indented items in ddl and not more than indented qty
  }

}

const navigationFunctionForAdd = () => {
   navigation.navigate('AddWardIssueMaster');
}


  return (
    
   
    <View style={styles.container}>    

<View style={{width:200,alignSelf:'center',padding:10}}>
<TouchableOpacity style={styles.button} onPress={navigationFunctionForAdd}>
          <Text style={styles.buttonText}>Add New Issuance</Text>
        </TouchableOpacity>
        </View>

      <View style={styles.header}>   
      <Text style={styles.headerText}>S.No</Text>    
        <Text style={styles.headerText}>Ward</Text>            
        <Text style={styles.headerText}>Indent Date</Text>
        <Text style={styles.headerText}>Indented Items</Text> 
        <Text style={styles.headerText}>Status</Text> 
      </View>
      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
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
    padding:5,
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
});

export default IncompleteT4Indent;
