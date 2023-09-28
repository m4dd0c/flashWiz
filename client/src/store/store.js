import { configureStore } from "@reduxjs/toolkit";
import auth from "./reducer/authReducer";
import admin from "./reducer/adminReducer";
import cards from "./reducer/cardReducer";
export const store = configureStore({
  reducer: {
    auth,
    admin,
    cards,
  },
});
