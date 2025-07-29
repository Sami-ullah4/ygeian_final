import { createAsyncThunk } from '@reduxjs/toolkit'
import {updateFullNameApi  } from'./api'



// 
export const updateFullName = createAsyncThunk(
  'user/preference-fullname',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await updateFullNameApi(payload);
      return res.data;
    } catch (err) {
      // Use rejectWithValue to pass the error payload to the reducer
      return rejectWithValue(err.response ? err.response.data : err.message);
    }
  }
);
