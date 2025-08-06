import { createAsyncThunk } from '@reduxjs/toolkit'
import {updateFullNameApi  } from'./api'



// 
export const updateFullName = createAsyncThunk(
  'user/preference-fullname',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await updateFullNameApi(payload);
      console.log(res)
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response ? err.response.data : err.message);
    }
  }
);
