// src/redux/reducers/rootReducer.js
import { combineReducers } from 'redux';
import contactsReducer from './contactsReducer';  // Importă contactsReducer

const rootReducer = combineReducers({
  contacts: contactsReducer,  // Adaugă contactsReducer în rootReducer
});

export default rootReducer;