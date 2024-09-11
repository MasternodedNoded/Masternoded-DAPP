import { combineReducers } from "@reduxjs/toolkit";
import poolReducer from "./poolSlices";

// Root reducer combining all reducers
const rootReducer = combineReducers({
  pool: poolReducer,

  // Add other reducers here
});

export default rootReducer;
