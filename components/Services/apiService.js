import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.20:8080', // Adjust this to your API's base URL
});

export const fetchProducts = async () => {
  try {
    const response = await api.get('/Product');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// You can define more API functions here
// export const fetchOtherData = async () => { ... };
