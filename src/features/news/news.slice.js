import { createSlice } from "@reduxjs/toolkit";
import { getNews } from "./news.action";


const initialState = {
  news: [],
  isNews: false,
  isNewsLoading: false,
  isNewsFailed: false,
  error: {},

  
};

export const newsSlicer = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get News Cases
    builder
      .addCase(getNews.pending, (state) => {
        state.isNewsLoading = true;
        state.isNewsFailed = false;
        state.error = {};
      })
      .addCase(getNews.fulfilled, (state, action) => {
        state.isNewsLoading = false;
        state.isNewsFailed = false;
        state.isNews = true;
        state.news = action.payload;
      })
      .addCase(getNews.rejected, (state, action) => {
        state.isNewsLoading = false;
        state.isNews = false;
        state.isNewsFailed = true;
        state.error = action.payload;
      });



  },
});

export default newsSlicer.reducer;
