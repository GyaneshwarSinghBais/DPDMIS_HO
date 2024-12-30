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


import { Logout } from './logout';
import { Searchbar, useTheme } from 'react-native-paper';
import WHReceiptItems from './FacilityOperation/WHReceiptItems';
import WelcomeView from './WelcomeView';
import StockOut from './StockRPT/StockOut';
import IndentAlert from './StockRPT/IndentAlert';
import StockOutDrillDown from './StockRPT/StockOutDrillDown';
import FacilitySupplyChain from './StockRPT/FacilitySupplyChain';
import POReport from './PO/POReport';
import WHwiseItemStock from './WHwiseItemStock';
import HODIssuance from './Issuance/HODIssuance';
import CStock from './Stock/CStock';
import RCAcceptanceTotal from './RCTender/RCAcceptanceTotal';
import TenderEvaluation from './RCTender/TenderEvaluation';
import Timeline from './QC/timeline';
import FinalUpdate from './QC/QCResultFinalUpdate';
import { BasicBar } from './Charts/BasicBar';
import SupplierLiability from './PO/SupplierLiability';
import SupplierPo from './PO/SupplierPo';
import PriceBidDrill from './RCTender/PriceBidDrill';
import YearWiseRC from './RCTender/YearWiseRC';
import OutofTimeLineDrill from './QC/OutofTimeLineDrill';
import OutofTimeLineDrillLab from './QC/OutofTimeLineDrillLab';
import TenderAlert from './RCTender/TenderAlert';
import YearExpired from './Issuance/YearExpired';
import POStockOutAlert from './PO/POStockOutAlert';
import POAlertDetails from './PO/POAlertDetails';
import Home from './Home';


function Feed({ navigation }) {
  const informaitonAboutUser = useSelector((state) => state.user);
  const theme = useTheme();
  //const isAyush = informaitonAboutUser.whaipermission
  const isAyush = 'N';
  return (


    // <View style={{
    //   flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   backgroundColor: '#ffffff',
    // }}>

    <WelcomeView />

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
      <Text>Notifications Screen</Text>
    </View>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {/* <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.toggleDrawer()}
      /> */}
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

export function MyDrawer() {

  const informaitonAboutUser = useSelector((state) => state.user);
  const isayushVisible = informaitonAboutUser.whaipermission === 'Y';


  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={Feed} />
      {/* <Drawer.Screen name="Notifications" component={Notifications} /> */}
      <Drawer.Screen name="Stock Abstract" component={CStock} />
      <Drawer.Screen name="RC/Acceptance" component={RCAcceptanceTotal} />
      <Drawer.Screen name="Tender Evaluation" component={TenderEvaluation} />
      <Drawer.Screen name="Price Bid Details" component={PriceBidDrill} options={{
        drawerItemStyle: { display: 'none' }
      }} />
      <Drawer.Screen name="Tender Alert" component={TenderAlert} />
    
      <Drawer.Screen name="Item Stock" component={TableComponent} />
      <Drawer.Screen name="WHStock" component={WHwiseItemStock} options={{
        drawerItemStyle: { display: 'none' }
      }} />
    
      <Drawer.Screen name="QC Status Lab" component={Timeline} />
      <Drawer.Screen name="QC Out of Timeline in Lab" component={OutofTimeLineDrill} options={{
        drawerItemStyle: { display: 'none' }
      }} />

<Drawer.Screen name="Batch No Pending In Lab" component={OutofTimeLineDrillLab} options={{
        drawerItemStyle: { display: 'none' }
      }} />



      <Drawer.Screen name="QC Result Pending" component={FinalUpdate} />

      <Drawer.Screen name="PO-Reorder/Stock Alert" component={POStockOutAlert} />
      <Drawer.Screen name="Stock Alerts" component={POAlertDetails} options={{
        drawerItemStyle: { display: 'none' }
      }} />


      {/* <Drawer.Screen name="Stock Out" component={StockOut} />

      {isayushVisible && (
        <Drawer.Screen name="Indent Alert" component={IndentAlert} />
      )} */}
      {/* <Drawer.Screen name="Transaction Report" component={FacilitySupplyChain} /> */}

      <Drawer.Screen name="Pending Payment" component={SupplierLiability} />

      {/* <Drawer.Screen name="Bar Chart" component={BasicBar} /> */}

      {/* <Drawer.Screen name="Add New Receipt" component={WHReceiptItems} options={{
        drawerItemStyle: { display: 'none' }
      }} /> */}
      {/* <Drawer.Screen name="Stock Out Detail" component={StockOutDrillDown} options={{
        drawerItemStyle: { display: 'none' }
      }} /> */}

      <Drawer.Screen name="Pending Payment PO's" component={SupplierPo} options={{
        drawerItemStyle: { display: 'none' }
      }} />
        <Drawer.Screen name="RC Yearwise" component={YearWiseRC} />
        <Drawer.Screen name="Orders" component={POReport} />
      <Drawer.Screen name="Distribution" component={HODIssuance} />
      <Drawer.Screen name="Expired Items Yearwise" component={YearExpired} />
       <Drawer.Screen name="Stock Search" component={Home} /> 
      

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


