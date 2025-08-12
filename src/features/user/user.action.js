import { createAsyncThunk } from '@reduxjs/toolkit'
import {updateFullNameApi, updatePreferencesApi  } from'./api'


export const preferenceUpdate = createAsyncThunk(
  'user/preference-update',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await updatePreferencesApi(payload);
      console.log(`${res.data} we selected now`)
      return res.data;
    } catch (err) {
      // Use rejectWithValue to pass the error payload to the reducer
      return rejectWithValue(err.response ? err.response.data : err.message);
    }
  }
);


// 
export const updateFullName = createAsyncThunk(
  'user/preference-fullname',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await updateFullNameApi(payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response ? err.response.data : err.message);
    }
  }
);
