import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import photoReducer from "../features/photos/photoSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    photos: photoReducer,
  },
});
