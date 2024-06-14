// store.js
import { configureStore } from '@reduxjs/toolkit';

// Import your reducers here
import rootReducer from './reducers';

const store = configureStore({
  reducer: rootReducer,
  // Add any other middleware or options here
});

export default store;
