import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  registerApi,
  loginApi,
  checkSessionApi,
  sendingOtpApi,
  verifyOtpApi,
  googleSignIn,
  changePasswordApi,
  forgetPasswordApi,
  updatePasswordApi,
} from "./api";
///////register api//////////////
export const register = createAsyncThunk(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await registerApi(payload);
      if (!res || !res.data) {
        return rejectWithValue("no responce from server");
      }
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "there is some issu in api"
      );
    }
  }
);
///////////////////////////////login api fetched ///////////////////////////////////

export const login = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await loginApi(payload);

      if (!response || !response.data) {
        return rejectWithValue("No response data received from server.");
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "Something went wrong"
      );
    }
  }
);
//////////////////////check session /////////////////////////
export const CheckSession = createAsyncThunk(
  "auth/session",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("ygeianNewsToken");
      if (!token) return rejectWithValue("No token found");

      const response = await checkSessionApi(token);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "Check session failed"
      );
    }
  }
);

////////////////sending otp

export const sendingOtp = createAsyncThunk(
  "auth/otp",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await sendingOtpApi(payload);

      if (!response?.data) {
        return rejectWithValue("No response data received from server.");
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data ||
          error.message ||
          "Something went wrong in the API."
      );
    }
  }
);

/////varify otp

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (tempToken, { rejectWithValue }) => {
    try {
      const response = await verifyOtpApi(tempToken);
      return response.data;
    } catch (error) {
      console.error("verifyOtp error:", error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data?.message || error.message || "OTP verification failed"
      );
    }
  }
);

///googlelogin

export const googleLogin = createAsyncThunk(
  "auth/google",
  async (access_Token, { rejectWithValue }) => {
    try {
      const authData = await googleSignIn(access_Token);

      const userInfo = authData?.data;

      const googleData = {
        email: userInfo.email,
        fullName: userInfo.name,
        image: userInfo.picture,
        provider: "google",
      };
      localStorage.setItem("tempMail", userInfo?.email);
      
      const res = await loginApi(googleData); // Send to your backend

      return res.data; 
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

//change password 
export const changePassword = createAsyncThunk(
  "change/password",
  async ( {url,newPassword }, { rejectWithValue }) => {
    try {
      const response = await changePasswordApi( {url,newPassword} );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "There was an error"
      );
    }
  }
);

//forget password 
export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await forgetPasswordApi(payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response ? err.response.data : err.message);
    }
  }
);

// Update Password
export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async ({password ,resetPasswordToken}, { rejectWithValue }) => {
    console.log(resetPasswordToken)
    try {
      const res = await updatePasswordApi({password ,resetPasswordToken});
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response ? err.response.data : err.message);
    }
  }
);
