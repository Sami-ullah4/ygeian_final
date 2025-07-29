
import { combineReducers } from "@reduxjs/toolkit";
import  newsSlicer  from "../features/news/news.slice";
import authSlice  from "../features/auth/auth.slice";
import userSlice from"../features/user/user.slice"

const rootReducer = combineReducers({
  news: newsSlicer,
  auth: authSlice,
  user: userSlice,
});

export default rootReducer;
