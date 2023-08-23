import React, { useState } from 'react';
import { Provider } from 'react-redux';
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
import store from './components/app/store';
import { Logout } from './components/logout';

//import NavigationConfig from './NavigationConfig';

const Stack = createStackNavigator();

const App = () => {
const [authenticated, setAuthenticated] = useState(false);

  return (
    <Provider store={store}>
    <NavigationContainer>
      {authenticated ?
    (<MyDrawer /> ):(
    <Stack.Navigator >
          <Stack.Screen name="Login" component={LoginPage}  options={{ headerShown: false }} />
          <Stack.Screen name="FacilityHome" component={MyDrawer}  options={{ headerShown: false }} />
          <Stack.Screen name="Logout" component={Logout}  options={{ headerShown: false }} />
        </Stack.Navigator>  
    )}      
  </NavigationContainer>
  </Provider>

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


