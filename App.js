import React, { useState } from 'react';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { RootSiblingParent } from 'react-native-root-siblings';
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
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MyDrawer } from './components/facilityHome';
import LoginPage from './components/loginPage';
import store from './components/app/store';
import { Logout } from './components/logout';

//import NavigationConfig from './NavigationConfig';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#E6E6FA',
    secondary: 'yellow',
  },
};

const Stack = createStackNavigator();

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <Provider store={store}>
      <PaperProvider theme={theme} >
      <RootSiblingParent>
        <NavigationContainer>
          {authenticated ?
            (<MyDrawer />) : (
              <Stack.Navigator >
                <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
                <Stack.Screen name="FacilityHome" component={MyDrawer} options={{ headerShown: false }} />
                <Stack.Screen name="Logout" component={Logout} options={{ headerShown: false }} />
              </Stack.Navigator>
            )}
        </NavigationContainer>
        </RootSiblingParent>
      </PaperProvider>
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


