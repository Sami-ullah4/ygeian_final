import { createSlice } from "@reduxjs/toolkit";
import { preferenceUpdate, updateFullName } from "./user.action";

const initialState = {
  // Full name update states
  isFullNameUpdated: false,
  isFullNameUpdateLoading: false,
  isFullNameUpdateFailed: false,
  isPreferenceUpdated: false,
  isPreferenceUpdateLoading: false,
  isPreferenceUpdateFailed: false,

  user: {},
  error: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUpdatePreferenceState: (state) => {
      state.isPreferenceUpdated = false;
      state.isPreferenceUpdateLoading = false;
      state.isPreferenceUpdateFailed = false;
      state.isFullNameUpdated = false;
      state.isFullNameUpdateLoading = false;
      state.isFullNameUpdateFailed = false;

      state.error = {};
    },
  },
  extraReducers: (builder) => {
    // update preference case
    builder.addCase(preferenceUpdate.pending, (state) => {
      state.isPreferenceUpdateLoading = true;
    });
    builder.addCase(preferenceUpdate.fulfilled, (state) => {
      state.isPreferenceUpdateLoading = false;
      state.isPreferenceUpdateFailed = false;
      state.isPreferenceUpdated = true;
    });
    builder.addCase(preferenceUpdate.rejected, (state, action) => {
      state.isPreferenceUpdateLoading = false;
      state.isPreferenceUpdated = false;
      state.isPreferenceUpdateFailed = true;
      state.error = action.payload.error;
    });
    // 
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
