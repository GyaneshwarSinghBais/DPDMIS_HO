import React from 'react';
import {  View } from 'react-native';
//import Test from './components/test';
import TodoList from './components/todoList';
import PostList from './components/postList';
//import InsertPosts from './components/insertPosts';
//import PutPosts from './components/putPosts';
 //import DeletePost from './components/deletePost';
 //import ProductList from './components/productList';
//import WeatherTable from './components/weatherTable';
//import StockTable from './components/stockTable';
import TableComponent from './components/tableComponent';
// import Login from './components/loginPage';


const App = () => {
  return (
    <View style={{ flex: 1, paddingTop: 50 }}>
    {/* <DeletePost /> */}
      {/* <PutPosts /> */}
      {/* <InsertPosts /> */}
      {/* <PostList /> */}
      {/* <TodoList /> */}
      {/* <Test /> */}
      {/* <ProductList /> */}
      {/* <WeatherTable /> */}
      {/* <StockTable /> */}
      <TableComponent />
      {/* <Login /> */}
    </View>
  );
};

export default App;


