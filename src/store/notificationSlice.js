import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  notification: null
}

let notificationTimer;

export const notificationSlice = createSlice(
  {
    name: 'notification',
    initialState,
    reducers: {
      showNotificationAction: (state, action) => {
        state.notification = action.payload
      },
      clearNotificationAction: (state) => {
        state.notification = null;
      },
    }
  }
);

const {showNotificationAction, clearNotificationAction} = notificationSlice.actions;

export const showNotification = (title, message, status) => (dispatch, getState) => {

  const notification = {
    title: title,
    message: message,
    status: status,
  }

  dispatch(showNotificationAction(notification));

  notificationTimer = setTimeout(() => {
    dispatch(clearNotification);
  }, 3000);
}

export const clearNotification = () => (dispatch, getState) => {
  dispatch(clearNotificationAction());
  if (notificationTimer) {
    clearTimeout(notificationTimer);
  }
}
