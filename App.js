import React, { useState } from 'react';
import {  View } from 'react-native';
//import Test from './components/test';
// import TodoList from './components/todoList';
// import PostList from './components/postList';
 //import MyDrawer from './components/facilityHome';

//import InsertPosts from './components/insertPosts';
//import PutPosts from './components/putPosts';
 //import DeletePost from './components/deletePost';
 //import ProductList from './components/productList';
//import WeatherTable from './components/weatherTable';
//import StockTable from './components/stockTable';
//import TableComponent from './components/tableComponent';
import Login from './components/loginPage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MyDrawer } from './components/facilityHome';
import LoginPage from './components/loginPage';
//import NavigationConfig from './NavigationConfig';

const Stack = createStackNavigator();

const App = () => {
const [authenticated, setAuthenticated] = useState(false);

  return (
    <NavigationContainer>
      {authenticated ?
    (<MyDrawer /> ):(
    <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginPage}   />
          <Stack.Screen name="FacilityHome" component={MyDrawer}   />
        </Stack.Navigator>  
    )}      
  </NavigationContainer>

    // <View style={{ flex: 1, paddingTop: 50 }}>
      

    // {/* <DeletePost /> */}
    //   {/* <PutPosts /> */}
    //   {/* <InsertPosts /> */}
    //   {/* <PostList /> */}
    //   {/* <TodoList /> */}
    //   {/* <Test /> */}
    //   {/* <ProductList /> */}
    //   {/* <WeatherTable /> */}
    //   {/* <StockTable /> */}
    //   {/* <TableComponent /> */}
    //   <Login />
    //   {/* <NavigationConfig />  */}
    //  {/* <FacilityHome/> */}
    
    // </View>
  );
};

export default App;


