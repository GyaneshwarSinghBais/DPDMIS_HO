import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import axios from 'axios';

const InsertPosts = () => {
  const [postData, setPostData] = useState({
    userId: 1,
    id: 1,
    title: '',
    body: ''
  });

  const [postResult, setPostResult] = useState(null);

  const handleTitleChange = (text) => {
    setPostData({ ...postData, title: text });
  };

  const handleBodyChange = (text) => {
    setPostData({ ...postData, body: text });
  };

  const handlePost = async () => {
    try {
      const response = await axios.post(
        'https://jsonplaceholder.typicode.com/posts',
        postData
      );
      setPostResult(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Enter title"
        value={postData.title}
        onChangeText={handleTitleChange}
      />
      <TextInput
        placeholder="Enter body"
        value={postData.body}
        onChangeText={handleBodyChange}
      />
      <Button title="Post" onPress={handlePost} />
      {postResult && (
        <View>
          <Text>Post result:</Text>
          <Text>{JSON.stringify(postResult)}</Text>
        </View>
      )}
    </View>
  );
};

export default InsertPosts;
