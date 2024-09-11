import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { useDispatch } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
// import * as thunk from 'redux-thunk';
import rootReducer from '../reducers';



const persistConfig = {
  key: 'root',
  storage,

  // Optionally, you can whitelist specific reducers to be persisted
  // whitelist: ['global'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  // middleware: ()=>[...thunk],
});

export default store;

export const persistor = persistStore(store);

export const useAppDispatch = () => useDispatch();