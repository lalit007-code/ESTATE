import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      (state.currentUser = action.payload),
        (state.error = null),
        (state.loading = false);
    },
    signInError: (state, action) => {
      (state.error = action.payload), (state.loading = false);
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      (state.currentUser = action.payload),
        (state.error = null),
        (state.loading = false);
    },
    updateUserError: (state, action) => {
      (state.error = action.payload), (state.loading = false);
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state) => {
      (state.currentUser = null), (state.error = null), (state.loading = false);
    },
    deleteUserError: (state, action) => {
      (state.error = action.payload), (state.loading = false);
    },
    signOutUserStart: (state) => {
      state.loading = true;
    },
    signOutUserSuccess: (state) => {
      (state.currentUser = null), (state.error = null), (state.loading = false);
    },
    signOutUserError: (state, action) => {
      (state.error = action.payload), (state.loading = false);
    },
  },
});

export const {
  signInError,
  signInSuccess,
  signInStart,
  updateUserError,
  updateUserStart,
  updateUserSuccess,
  deleteUserError,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserError,
  signOutUserStart,
  signOutUserSuccess,
} = userSlice.actions;

export default userSlice.reducer;
