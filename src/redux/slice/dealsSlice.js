// dealSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../../Api/apiwrapper";


export const fetchDeals = createAsyncThunk(
  "deals/fetchDeals",
  async ({ take = 21, skip = 0, query = "" }) => {
    const response = await apiService.get(
      `deals/top-deals?take=${take}&skip=${skip}&${query}`
    );
    return response.data; // Ensure this contains paginated deals
  }
);

const dealsSlice = createSlice({
  name: "deals",
  initialState: {
    list: [],
    status: "idle",
    error: null,
    hasMore: true, // Assume more data initially
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeals.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDeals.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload.length > 0) {
          state.list = [...state.list, ...action.payload]; // Append new deals
          state.hasMore = action.payload.length === 21; // Check if more data exists
        } else {
          state.hasMore = false;
        }
      })
      .addCase(fetchDeals.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});


export default dealsSlice.reducer;
