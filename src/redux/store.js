// src/redux/store.js
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';  // Folosește localStorage pentru persistare
import rootReducer from './reducers/rootReducer';
import { thunk } from 'redux-thunk';

// Configurarea redux-persist
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Crearea store-ului
const store = createStore(
  persistedReducer,
  applyMiddleware(thunk)  // Adaugă middleware pentru thunks
);

const persistor = persistStore(store);

export { store, persistor };