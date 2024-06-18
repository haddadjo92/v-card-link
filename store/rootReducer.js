import { combineReducers } from '@reduxjs/toolkit';
// *** reducers ***
import authReducer from './reducers/authReducer'

//COMBINING ALL REDUCERS
const rootReducer = combineReducers({ 
    auth: authReducer
})
export default rootReducer