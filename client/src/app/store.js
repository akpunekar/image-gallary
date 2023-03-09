import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import photoReducer from "../features/photos/photoSlice";

/* Creating a store with the reducers. */
export const store = configureStore({
  reducer: {
    auth: authReducer,
    photos: photoReducer,
  },
});
