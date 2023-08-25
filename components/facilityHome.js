import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import TableComponent from './tableComponent';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
//import NavigationConfig from '../NavigationConfig';
import StockReportFacility from './stockReportFacility';
import { Logout } from './logout';
import IncompleteWardIssue from './FacilityOperation/IncompleteWardIssue';
import NewWardIssue from './FacilityOperation/NewWardIssue';
function Feed({ navigation }) {
  const informaitonAboutUser = useSelector((state) => state.user);

  return (
   

    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
    }}>
      <Text style={{
        fontFamily: 'Roboto',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#800000',
      }}>
        Welcome, {informaitonAboutUser.firstname}!
      </Text>
      <Text style={{
        fontFamily: 'Roboto',
        fontSize: 16,
        marginTop: 10,
        color: '#800080',
      }}>
         {informaitonAboutUser.emailid}
      </Text>
    </View>

    // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //   <Text>{informaitonAboutUser.firstname}</Text>
    //   <Text>{informaitonAboutUser.userid}</Text>
    //   <Text>{informaitonAboutUser.emailid}</Text>
    //   <Text>{informaitonAboutUser.pwd}</Text>
    //   <Text>{informaitonAboutUser.usertype}</Text>
    //   <Text>{informaitonAboutUser.districtid}</Text>
    //   <Text>{informaitonAboutUser.facilityid}</Text>
    //   <Button title="Open drawer" onPress={() => navigation.openDrawer()} />
    //   <Button title="Toggle drawer" onPress={() => navigation.toggleDrawer()} />     
    // </View>
  );
}

function Notifications() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications Screen gyan</Text>
    </View>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.toggleDrawer()}
      />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

export function MyDrawer() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={Feed} />
      {/* <Drawer.Screen name="Notifications" component={Notifications} /> */}
      <Drawer.Screen name="Warehouse Stock" component={TableComponent} />
      <Drawer.Screen name="Current Stock" component={StockReportFacility} />
      <Drawer.Screen name="Ward Issue" component={IncompleteWardIssue} />
      <Drawer.Screen name="Add New Issue" component={NewWardIssue} options={{
                  drawerItemStyle: { display: 'none' }
        }} />
      <Drawer.Screen name="Logout" component={Logout} />
    </Drawer.Navigator>
  );
}


// export default function FacilityHome() {
//   return (
//     <NavigationContainer>
//       <MyDrawer />
//     </NavigationContainer>
//   );
// }


