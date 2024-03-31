import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "../features/counter/counterSlice";

export default configureStore({
  reducer: {
    api: apiReducer,
  },
});
