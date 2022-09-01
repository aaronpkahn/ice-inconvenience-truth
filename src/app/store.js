import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './hooks/userSlice';
import slideReducer from './hooks/slideSlice';
import { carReducer } from './hooks/carData';

// const carInputReducer = combineReducers({
//   car: carReducer,
//   graph: graphDataReducer,
// });

const reducer = combineReducers({
  inputs: userReducer,
  slides: slideReducer,
  car: carReducer,
})

export default configureStore({ reducer });