import { createSlice } from "@reduxjs/toolkit";
import { updateFullName } from "./user.action";

const initialState = {
  // Full name update states
  isFullNameUpdated: false,
  isFullNameUpdateLoading: false,
  isFullNameUpdateFailed: false,

  // Current user fetch states
  isUserFetched: false,
  isUserFetchLoading: false,
  isUserFetchFailed: false,
  user: {},
  error: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUpdatePreferenceState: (state) => {
      state.isFullNameUpdated = false;
      state.isFullNameUpdateLoading = false;
      state.isFullNameUpdateFailed = false;
      state.isUserFetched = false;
      state.isUserFetchLoading = false;
      state.isUserFetchFailed = false;
      state.error = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateFullName.pending, (state) => {
        state.isFullNameUpdateLoading = true;
      })
      .addCase(updateFullName.fulfilled, (state, action) => {
        state.isFullNameUpdateLoading = false;
        state.isFullNameUpdateFailed = false;
        state.isFullNameUpdated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(updateFullName.rejected, (state, action) => {
        state.isFullNameUpdateLoading = false;
        state.isFullNameUpdated = false;
        state.isFullNameUpdateFailed = true;
        state.error = action.payload?.error || {};
      });
  },
});

export const { resetUpdatePreferenceState } = userSlice.actions;
export default userSlice.reducer;
