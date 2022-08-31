import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './hooks/userSlice';
import slideReducer from './hooks/slideSlice';
import { carDataReducer } from './hooks/carData';

// const carInputReducer = combineReducers({
//   car: carDataReducer,
//   graph: graphDataReducer,
// });

const reducer = combineReducers({
  inputs: userReducer,
  slides: slideReducer,
  car: carDataReducer,
})

export default configureStore({ reducer });