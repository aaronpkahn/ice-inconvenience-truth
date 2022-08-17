import { configureStore } from '@reduxjs/toolkit'
import userReducer from './hooks/userSlice';

export default configureStore({
  reducer: {
    inputs: userReducer,
  },
})