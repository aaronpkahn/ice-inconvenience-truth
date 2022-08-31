import { configureStore } from '@reduxjs/toolkit'
import userReducer from './hooks/userSlice';
import slideReducer from './hooks/slideSlice';
import { carDataReducer } from './hooks/carData';

export default configureStore({
  reducer: {
    inputs: userReducer,
    slides: slideReducer,
    car: carDataReducer,
  },
})