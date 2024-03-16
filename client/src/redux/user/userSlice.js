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
  },
});

export const { signInStart, signInSuccess, signInFail } = userSlice.actions;

export default userSlice.reducer;
