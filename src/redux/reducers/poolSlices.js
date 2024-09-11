import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllPools } from "../../utils/fetchAllPools";

const initialState = {
  availablePoolList: [],
  headerLoading: false,
  isLoading: false,
  error: null,
};

export const getAvailablePoolList = createAsyncThunk(
  "pool/getPoolList",
  async (address) => {
    try {
      const res = await fetchAllPools(address);
      if (res?.status) {
        return res?.data;
      }
      return [];
    } catch (er) {
      console.log(err);
    }
  }
);

const poolSlices = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearPool(state) {
      state.availablePoolList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAvailablePoolList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAvailablePoolList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.availablePoolList = action.payload ?? [];
      })
      .addCase(getAvailablePoolList.rejected, (state) => {
        state.availablePoolList = [];
        state.isLoading = false;
      });
  },
});

export const { clearPool } = poolSlices.actions;
export default poolSlices.reducer;
