import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listing: [],
  error: null,
  isLoading: false,
};

const listingSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {},
});

export const {} = listingSlice.actions;

export default listingSlice.reducer;
