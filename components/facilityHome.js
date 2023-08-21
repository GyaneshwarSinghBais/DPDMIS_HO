import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { useSelector } from 'react-redux';

import TableComponent from './tableComponent';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import NavigationConfig from '../NavigationConfig';

function Feed({ navigation }) {
  const informaitonAboutUser = useSelector((state) => state.user);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{informaitonAboutUser.firstname}</Text>
      <Text>{informaitonAboutUser.userid}</Text>
      <Text>{informaitonAboutUser.emailid}</Text>
      <Text>{informaitonAboutUser.pwd}</Text>
      <Text>{informaitonAboutUser.usertype}</Text>
      <Text>{informaitonAboutUser.districtid}</Text>
      <Button title="Open drawer" onPress={() => navigation.openDrawer()} />
      <Button title="Toggle drawer" onPress={() => navigation.toggleDrawer()} />     
    </View>
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
      <Drawer.Screen name="Feed" component={Feed} />
      <Drawer.Screen name="Notifications" component={Notifications} />
      <Drawer.Screen name="Drug List" component={TableComponent} />
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