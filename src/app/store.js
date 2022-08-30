import { configureStore } from '@reduxjs/toolkit'
import userReducer from './hooks/userSlice';
import slideReducer from './hooks/slideSlice';

export default configureStore({
  reducer: {
    inputs: userReducer,
    slides: slideReducer,
  },
})