import React, { useState ,useEffect}from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import SearchableDropdown from './SearchableDropdown';
import { fetchWardIssueItems } from '../Services/apiService';


const NewWardIssue = (props) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const informaitonAboutUser = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [id, setId] = useState(informaitonAboutUser.facilityid);

  const handleSelect = (item) => {
    setSelectedItem(item);
  };

  const fetchData = async () => {
    try {     
      const response = await fetchWardIssueItems('23345');               
      setData(response);      
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {    
    fetchData();
},[]
);

  // <View style={styles.cell}>
  //       <Text style={styles.cellText}>{index+1}</Text>
  //     </View>

  //     <View style={styles.cell}>
  //       <Text style={styles.cellText}>{item.wardName}</Text>
  //     </View>

  //     <View style={styles.cell}>
  //       <Text style={styles.cellText}>{item.wRequestBy}</Text>
  //     </View>

  //     <View style={styles.cell}>
  //       <Text style={styles.cellText}>{item.wRequestDate}</Text>
  //     </View>

  //     <View style={styles.cell}>
  //       <Text style={styles.cellText}>{item.issueDate}</Text>
  //     </View>

  //     <View style={styles.cell}>
  //       <Text style={styles.cellText}>{item.issueNo}</Text>
  //     </View>

  const route = useRoute();
  const wardName = route.params?.item.wardName;
  const wRequestBy = route.params?.item.wRequestBy;
  const wRequestDate = route.params?.item.wRequestDate;
  const issueDate = route.params?.item.issueDate;
  const issueNo = route.params?.item.issueNo;
  const issueID = route.params?.item.issueID;

  return (
    <View style={styles.container}>

{/* <Text>Selected Item: {selectedItem ? selectedItem.label : 'None'}</Text>
      <SearchableDropdown
        data={data.item.id}
        onSelect={handleSelect}
      /> */}


      {/* <View style={styles.card}>
        <Text style={styles.cardHeader}>Issue Details</Text>
        <View style={styles.cardContent}>
          <View style={styles.cardItem}>
            <Text style={styles.label}>Ward Name:</Text>
            <Text style={styles.value}>{wardName}</Text>
          </View>
          <View style={styles.cardItem}>
            <Text style={styles.label}>Requested By:</Text>
            <Text style={styles.value}>{wRequestBy}</Text>
          </View>
          <View style={styles.cardItem}>
            <Text style={styles.label}>Request Date:</Text>
            <Text style={styles.value}>{wRequestDate}</Text>
          </View>
          <View style={styles.cardItem}>
            <Text style={styles.label}>Issue Date:</Text>
            <Text style={styles.value}>{issueDate}</Text>
          </View>
          <View style={styles.cardItem}>
            <Text style={styles.label}>Issue No:</Text>
            <Text style={styles.value}>{issueNo}</Text>
          </View>
        </View>
      </View> */}


     
    
   
    </View>
  )
}

//NewWardIssue.propTypes = {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    padding: 16,
    width: '80%',
    marginBottom: 600,
  },
  cardHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
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
  value: {
    flex: 1,
    textAlign: 'right',
  },
});

export default NewWardIssue