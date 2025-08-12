import { createSlice } from "@reduxjs/toolkit";
import { getNews, toggleSaveNews } from "./news.action";

const initialState = {
  news: [],
  isNews: false,
  isNewsLoading: false,
  isNewsFailed: false,
  error: {},

  //seved article
  resetSaveToggle: (state) => {
    state.isSaveToggled = false;
    state.isSaveToggleLoading = false;
    state.isSaveToggleRejected = false;
    state.saveMsg = {};
    state.saveErr = {};
  },
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

    //////////////////////////////////////////////
    // save-toggle case
    builder.addCase(toggleSaveNews.pending, (state) => {
      state.isSaveToggleLoading = true;
    });
    builder.addCase(toggleSaveNews.fulfilled, (state, action) => {
      state.isSaveToggleLoading = false;
      state.isSaveToggleRejected = false;
      state.isSaveToggled = true;
      state.saveMsg = action.payload.message;
    });
    builder.addCase(toggleSaveNews.rejected, (state, action) => {
      state.isSaveToggleLoading = false;
      state.isSaveToggled = false;
      state.isSaveToggleRejected = true;
      state.saveErr = action.payload.error;
    });
  },
});

export default newsSlicer.reducer;
