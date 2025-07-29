import { createAsyncThunk } from "@reduxjs/toolkit";
import { registerApi, loginApi, checkSessionApi , sendingOtpApi  , verifyOtpApi} from "./api";

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
      return rejectWithValue(error.response?.data || error.message);
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
  async (payload, { rejectWithValue }) => {
    console.log("🔍 checkSession thunk triggered"); // ✅ Add this

    try {
      const response = await checkSessionApi(payload);
      if (!rejectWithValue || !response.data) {
        return rejectWithValue("No response data received from server.");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "somethicg wroing in api"
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

      console.log(response)
      if (!response?.data) {
        return rejectWithValue("No response data received from server.");
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || error.message || "Something went wrong in the API."
      );
    }
  }
);

/////varify otp


export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await verifyOtpApi(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "OTP verification failed");
    }
  }
);
