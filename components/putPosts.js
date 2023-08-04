import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import axios from 'axios';

const PutPosts = () => {
  const [resource, setResource] = useState({
    userId: 1,
    id: 1,
    title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
  });

  const handleInputChange = (key, value) => {
    setResource({ ...resource, [key]: value });
  };

  const handleUpdateResource = () => {
    axios.put(`https://jsonplaceholder.typicode.com/posts/${resource.id}`, resource)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View>
      <TextInput
        value={resource.title}
        onChangeText={(value) => handleInputChange('title', value)}
      />
      <TextInput
        value={resource.body}
        onChangeText={(value) => handleInputChange('body', value)}
      />
      <Button
        title="Update Resource"
        onPress={() => handleUpdateResource()}
      />
    </View>
  );
};

export default PutPosts;
