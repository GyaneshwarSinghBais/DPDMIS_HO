import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import axios from 'axios';

const PostList = () => {
  const [postList, setPostList] = useState([]);

  const fetchPostList = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPostList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPostList();
  }, []);

  const renderItem = ({ item }) => (
    <View style={{ padding: 10 }}>
      <Text>{item.userId}</Text>
      <Text>User ID: {item.id}</Text>
      <Text>ID: {item.title}</Text>
      <Text>Completed: {item.body ? 'Yes' : 'No'}</Text>
    </View>
  );

  return (
    <View>
      <FlatList
        data={postList}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />     
    </View>
  );
};

export default PostList;