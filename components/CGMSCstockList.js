import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      //const response = await axios.get('http://localhost:8080/Product');
      const response = await axios.get('http://192.168.1.20:8080/Product');
      //const response = await axios.get('https://192.168.1.20:7247/api/ProductInfo');
      setProducts(response.data);
      console.log(response.data)
    } catch (error) {
      //console.log(error.response.data);
      console.log(error.message);
    }
  };

// const fetchProducts =  () => {
//     axios.get("http://http://192.168.1.12:8080/Product")
//         .then(response=>response.data)
//         .then((data)=>{
//             setProducts(data)
//         });
//   };

  useEffect(() => {
    fetchProducts();
  }, []);

//   const renderItem = ({ item }) => (
//     <View style={styles.product}>
//       <Text style={styles.name}>{item.name}</Text>
//       <Text style={styles.description}>{item.description}</Text>
//       <Text style={styles.price}>Price: {item.price}</Text>
//     </View>
//   );

  return (
    // <View style={styles.container}>
    //   {products.length === 0 ? (
    //     <Text>Loading products...</Text>
    //   ) : (
    //     <FlatList
    //       data={products}
    //       renderItem={renderItem}
    //       keyExtractor={(item) => item.id.toString()}
    //     />
    //   )}
    // </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  product: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: 'green',
  },
});

export default ProductList;
