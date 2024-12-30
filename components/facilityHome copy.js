import * as React from 'react';
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
import { useTheme } from 'react-native-paper';
import WelcomeView from './WelcomeView';
import POReport from './PO/POReport';
import WHwiseItemStock from './WHwiseItemStock';
import HODIssuance from './Issuance/HODIssuance';
import CStock from './Stock/CStock';
import RCAcceptanceTotal from './RCTender/RCAcceptanceTotal';
import TenderEvaluation from './RCTender/TenderEvaluation';
import Timeline from './QC/timeline';
import FinalUpdate from './QC/QCResultFinalUpdate';
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
import Nearexp from './Issuance/Nearexp';
import MedicalCollegeIssuance from './Issuance/MedicalCollegeIssuance';
import NearexpBatchDetails from './Issuance/NearexpBatchDetails';
import NearExpDrugs from './Issuance/NearExpDrugs';
import NearExpBatch from './Issuance/NearExpBatch';
import IndentPending from './Warehouse/IndentPending';
import IndentPendingDetails from './Warehouse/IndentPendingDetails';
import TenderStage from './RCTender/TenderStage';
import DHSStatus from './Postion/DHSStatus';
import DMEStatus from './Postion/DMEStatus';
import AYUSHStatus from './Postion/AYUSHStatus';
import DistPostion from './District/DistPostion';
import FITReport from './Postion/FITReport';
import FitReportDrillDown from './Postion/FitReportDrillDown';
import ReagentStockAndSupplySummary from './Reagent/ReagentStockAndSupplySummary';
import ReagentStateStock from './Reagent/WHwiseReagentStock';
import FundVsExpd from './Postion/FundVsExpd';
import ReagentStockAndSupply from './Reagent/ReagentStockAndSupply';
import GroupItemRCStock from './Stock/GroupItemRCStock';
import Stkdrill from './Stock/Stkdrill';
import DistWiseDhsDmeStockDrill from './distWiseDhsDmeStockDrill';
import DistStockPosition from './Warehouse/DistStockPosition';
import PipeLine from './PO/PipeLine';
import OPDStatus from './Tier4/OPDStatus';
import DoctorStatus from './Tier4/DoctorStatus';
import Diagnosys from './Tier4/Diagnosys';
import StockPositionDrill from './Warehouse/StockPositionDrill';
import WHDistrict from './Stock/WHDistrict';
import WHDistDrillDown from './Stock/WHDistDrillDown';
import PipeLineRec from './PO/PipeLineRec';
import PipeLineIssueRPT from './PO/PipeLineIssueRPT';




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

// function Notifications() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Notifications Screen</Text>
//     </View>
//   );
// }

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close Drawer"
        onPress={() => props.navigation.closeDrawer()}
      ></DrawerItem>
      {/* <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.toggleDrawer()}
      /> */}
    </DrawerContentScrollView>
  );
}
const Drawer = createDrawerNavigator();

export function MyDrawer() {

  const informaitonAboutUser = useSelector((state) => state.user);
  //const isayushVisible = informaitonAboutUser.whaipermission === 'Y';
  const ismdcgmscl = (informaitonAboutUser.approle == "MDCGMSC");
  const isqc = (informaitonAboutUser.approle == "QC");
  const ispo = (informaitonAboutUser.approle == "PO");
  const islogi = (informaitonAboutUser.approle == "Logistics");
  const istender = (informaitonAboutUser.approle == "Tender");
  const isgmt = (informaitonAboutUser.approle == "Technical");
  const isgme = (informaitonAboutUser.approle == "Equipment");
  const isadmin = (informaitonAboutUser.approle == "Admin");
  const isfin = (informaitonAboutUser.approle == "Finance");
  const iscmho = (informaitonAboutUser.approle == "CMHO");
  const isProc = (informaitonAboutUser.approle == "Proc");
  const isColl = (informaitonAboutUser.approle == "Collector");
  const isWH = (informaitonAboutUser.approle == "WH");
  //var approle = informaitonAboutUser.approle;
  //alert(ismdcgmscl+"al:"+isqc);

  return (
    <Drawer.Navigator
      // useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={Feed} />
      {(isqc || ismdcgmscl || isadmin || isgme || isgmt || islogi || ispo || isfin || isProc || isWH || isColl || iscmho) && (<Drawer.Screen name="Stock Abstract" component={CStock} />)}

      {(ismdcgmscl || isqc || isadmin || isgme || isgmt || istender || islogi || ispo || isProc || isWH) && (<Drawer.Screen name="Group/Item Type Stock" component={GroupItemRCStock} />)}
      {(ismdcgmscl || isqc || isadmin || isgme || isgmt || istender || islogi || ispo || isProc || isWH) && (<Drawer.Screen name="Item Info" component={TableComponent} />)}

      {(ismdcgmscl || isadmin || isgme || isgmt || istender || islogi || ispo || isProc) && (<Drawer.Screen name="DHS Status" component={DHSStatus} />)}
      {(ismdcgmscl || isadmin || isgme || isgmt || istender || islogi || ispo || isProc) && (<Drawer.Screen name="DME Status" component={DMEStatus} />)}
      {(ismdcgmscl || isadmin || isgme || isgmt || istender || islogi || ispo || isProc) && (<Drawer.Screen name="AYUSH Status" component={AYUSHStatus} />)}
      {(ismdcgmscl || isadmin || isgme || isgmt || islogi || isProc) && (<Drawer.Screen name="Near Expiry" component={Nearexp} />)}
      {(ismdcgmscl || isadmin || isgme || isgmt || islogi || isProc || isWH) && (<Drawer.Screen name="WH Indent Pending" component={IndentPending} />)}
      {(ismdcgmscl || isadmin || isgme || isgmt || islogi || isProc || isWH) && (<Drawer.Screen name="Issues in Receipt" component={PipeLineIssueRPT} />)} 
      {(ismdcgmscl || isadmin || isgmt || ispo) && (<Drawer.Screen name="Reorder/Stock out" component={POStockOutAlert} />)}
      {(ismdcgmscl || isadmin || isgmt || ispo || islogi || isProc || isWH) && (<Drawer.Screen name="Pipeline Stock" component={PipeLine} />)}
      {(isadmin || isWH) && (<Drawer.Screen name="In-Transit Issues" component={PipeLineRec} />)}
      {(ismdcgmscl || isadmin || isgme || isgmt || istender || islogi || ispo || isProc) && (<Drawer.Screen name="RC/Acceptance" component={RCAcceptanceTotal} />)}
      {(ismdcgmscl || isadmin || isgme || isgmt || istender || isProc) && (<Drawer.Screen name="Tender Stage" component={TenderStage} />)}
      {(ismdcgmscl || isadmin || isgme || isgmt || istender || isProc) && (<Drawer.Screen name="Tender Items" component={TenderEvaluation} />)}
      {(isadmin || isgme || isgmt || istender || isProc) && (<Drawer.Screen name="Tender Alert" component={TenderAlert} />)}
      {(isqc || ismdcgmscl || isadmin || isgme || isgmt) && (<Drawer.Screen name="QC Result Pending(Lab)" component={Timeline} />)}
      {(isqc || isadmin || isgme || isgmt) && (<Drawer.Screen name="QC Result Pending(HO)" component={FinalUpdate} />)}

      {(ismdcgmscl || isadmin || isgmt || isfin) && (<Drawer.Screen name="Fund vs Expenditure" component={FundVsExpd} />)}
      {(ismdcgmscl || isadmin || isgmt || isfin) && (<Drawer.Screen name="Pending For Payment" component={FITReport} />)}
      {(ismdcgmscl || isadmin || isgmt || isfin) && (<Drawer.Screen name="Pending Payment Supplier" component={SupplierLiability} />)}

      {(ismdcgmscl || isadmin || isgme || isgmt || isfin || ispo) && (<Drawer.Screen name="Orders During Year" component={POReport} />)}
      {(ismdcgmscl || isadmin || isgme || isgmt || islogi || isfin) && (<Drawer.Screen name="Distribution" component={HODIssuance} />)}
      {(isqc || ismdcgmscl || isadmin || isgme || isgmt || islogi || ispo || isfin || isProc || isWH) && (<Drawer.Screen name="Medical College/Hospital" component={MedicalCollegeIssuance} />)}
      {(isColl || ismdcgmscl || isadmin || isgmt || islogi || isProc || isWH || iscmho) && (<Drawer.Screen name="District Stock Position" component={DistStockPosition} />)}
      {(ismdcgmscl || isadmin || isgmt || istender) && (<Drawer.Screen name="RC During Year" component={YearWiseRC} />)}
      {/* {(isqc||ismdcgmscl||isadmin||isgme||isgmt||istender||islogi||ispo)  && (<Drawer.Screen name="Search Stock" component={StockList}/>)} */}
      {/* {(isqc||ismdcgmscl||isadmin||isgme||isgmt||istender||islogi||ispo)  && (<Drawer.Screen name="Search RC" component={SearchRC}/>)} */}
      {(ismdcgmscl || isadmin || isfin || isgmt || islogi || isProc) && (<Drawer.Screen name="Expired Items" component={YearExpired} />)}
      {(ismdcgmscl || isadmin || isgme || isfin) && (<Drawer.Screen name="Reagent Stock/Issuance" component={ReagentStateStock} />)}
      {(ismdcgmscl || isadmin || isgme) && (<Drawer.Screen name="Reagent Monitoring" component={ReagentStockAndSupplySummary} />)}
      {/* {(iscmho || isColl) && (<Drawer.Screen name="DHS Facility Status" component={DistPostion} />)} */}
      {(isColl || iscmho) && (<Drawer.Screen name="Patient Distribution (OPD)" component={OPDStatus} />)}
      {(isColl || iscmho) && (<Drawer.Screen name="Doctor's Patient OPD" component={DoctorStatus} />)}
      {(isColl || iscmho) && (<Drawer.Screen name="OPD's Diagnosys" component={Diagnosys} />)}
      {(isColl || iscmho) && (<Drawer.Screen name="Item Information" component={WHDistrict} />)}
      <Drawer.Screen name="Near Exp Item-wise" component={NearExpDrugs} options={{
        drawerItemStyle: { display: 'none' }
      }} />

      <Drawer.Screen name="Near Exp Batch-wise" component={NearExpBatch} options={{
        drawerItemStyle: { display: 'none' }
      }} />

      <Drawer.Screen name="Near Exp Warehouse" component={NearexpBatchDetails} options={{
        drawerItemStyle: { display: 'none' }
      }} />


      <Drawer.Screen name="Stock Alerts" component={POAlertDetails} options={{
        drawerItemStyle: { display: 'none' }
      }} />
      <Drawer.Screen name="Price Bid Details" component={PriceBidDrill} options={{
        drawerItemStyle: { display: 'none' }
      }} />
      <Drawer.Screen name="QC Out of Timeline in Lab" component={OutofTimeLineDrill} options={{
        drawerItemStyle: { display: 'none' }
      }} />
      <Drawer.Screen name="Batch No Pending In Lab" component={OutofTimeLineDrillLab} options={{
        drawerItemStyle: { display: 'none' }
      }} />
      <Drawer.Screen name="Pending Payment PO's" component={SupplierPo} options={{
        drawerItemStyle: { display: 'none' }
      }} />
      <Drawer.Screen name="WHStock" component={WHwiseItemStock} options={{
        drawerItemStyle: { display: 'none' }
      }} />

      <Drawer.Screen name="Indent Pending Details" component={IndentPendingDetails} options={{
        drawerItemStyle: { display: 'none' }
      }} />

      <Drawer.Screen name="Payment Pending File" component={FitReportDrillDown} options={{
        drawerItemStyle: { display: 'none' }
      }} />

      <Drawer.Screen name="Reagent Monitoring Detail" component={ReagentStockAndSupply} options={{
        drawerItemStyle: { display: 'none' }
      }} />

      <Drawer.Screen name="Stock Details" component={Stkdrill} options={{
        drawerItemStyle: { display: 'none' }
      }} />

      <Drawer.Screen name="District Wise DHS & DME Stock" component={DistWiseDhsDmeStockDrill} options={{
        drawerItemStyle: { display: 'none' }
      }} />

<Drawer.Screen name="Facility Stock-out Position" component={StockPositionDrill} options={{
        drawerItemStyle: { display: 'none' }
      }} />

<Drawer.Screen name="Facility Wise Stock Status" component={WHDistDrillDown} options={{
        drawerItemStyle: { display: 'none' }
      }} />

      <Drawer.Screen name="Logout" component={Logout} />
    </Drawer.Navigator>
  );
}


