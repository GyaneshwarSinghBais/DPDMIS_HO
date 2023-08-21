import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Import the created slice

const store = configureStore({
  reducer: {
    user: userReducer, // Add your reducer here
  },
});

export default store;