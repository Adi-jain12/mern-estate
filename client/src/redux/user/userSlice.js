import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.isLoading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = null;
    },

    signInFail: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    updateUserStart: (state) => {
      state.isLoading = true;
    },

    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = null;
    },

    updateUserFail: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    deleteUserStart: (state) => {
      state.isLoading = true;
    },

    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.isLoading = false;
      state.error = null;
    },

    deleteUserFail: (state, action) => {
      state.error = action.payload;
    },
    signOutUserStart: (state) => {
      state.isLoading = true;
    },

    signOutUserSuccess: (state) => {
      state.currentUser = null;
      state.isLoading = false;
      state.error = null;
    },

    signOutUserFail: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFail,
  updateUserStart,
  updateUserSuccess,
  updateUserFail,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFail,
  signOutUserFail,
  signOutUserStart,
  signOutUserSuccess,
} = userSlice.actions;

export default userSlice.reducer;
