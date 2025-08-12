import { createAsyncThunk } from "@reduxjs/toolkit";
import { getNewsApi , toggleSaveNewsApi } from "./api";
import { CheckSession } from "../auth/auth.action";

// Get all news
export const getNews = createAsyncThunk("news/all", async (_, { rejectWithValue }) => {
  try {
    const res = await getNewsApi();
    return res.data;
  } catch (error) {
    return rejectWithValue(
      error.response ? error.response.data : error.message
    );
  }
});

// seved artical
export const toggleSaveNews = createAsyncThunk(
  'news/toggle-save',
  async (_id, { dispatch, rejectWithValue }) => {
    try {
      let token = localStorage.getItem('ygeianNewsToken');
      const res = await toggleSaveNewsApi(_id, token);
      dispatch(CheckSession(token));
      return res.data;
    } catch (err) {
      // Use rejectWithValue to pass the error payload to the reducer
      return rejectWithValue(err.response ? err.response.data : err.message);
    }
  }
);

