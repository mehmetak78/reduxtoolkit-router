import {configureStore} from "@reduxjs/toolkit";
import {authSlice} from "./authSlice";
import {notificationSlice} from "./notificationSlice";

export const store = configureStore(
  {
    reducer: {
      auth: authSlice.reducer,
      notification: notificationSlice.reducer
    }
  })

