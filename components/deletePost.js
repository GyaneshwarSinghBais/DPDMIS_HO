import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';

const DeletePost = ({ resourceId }) => {
  const [response, setResponse] = useState(null);

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${resourceId}`);
      setResponse(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Button title="Delete Resource" onPress={handleDelete} />
      {response && (
        <View>
          <Text>Resource deleted successfully!</Text>
          <Text>ID: {response.id}</Text>
          <Text>Title: {response.title}</Text>
        </View>
      )}
    </View>
  );
};

export default DeletePost;
