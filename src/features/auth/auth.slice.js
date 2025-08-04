import { createSlice } from "@reduxjs/toolkit";
import {
  register,
  login,
  CheckSession,
  sendingOtp,
  verifyOtp,
  googleLogin,
} from "./auth.action";
//  sdsd

// Load user from localStorage
let userFromStorage = null;
try {
  const userData = localStorage.getItem("ygeianNewsUser");
  if (userData && userData !== "undefined") {
    userFromStorage = JSON.parse(userData);
  }
} catch (error) {
  console.error("Failed to parse user from localStorage:", error);
  localStorage.removeItem("ygeianNewsUser");
}

const tokenFromStorage = localStorage.getItem("ygeianNewsToken");

const initialState = {
  user: userFromStorage,
  token: tokenFromStorage || null,
  error: {},
  isAuthenticated: !!tokenFromStorage,

  // Register
  isRegisterSuccess: false,
  isRegisterLoading: false,
  isRegisterFailed: false,

  // Login
  isLoginSuccess: !!tokenFromStorage,
  isLoginLoading: false,
  isLoginFailed: false,

  // Session
  isCheckSessionSuccess: false,
  isCheckSessionLoading: false,
  isCheckSessionFailed: false,

  // OTP
  otpLoading: false,
  otpSent: false,
  otpError: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      // Only reset flags and temporary states
      state.isRegisterSuccess = false;
      state.isRegisterFailed = false;
      state.isRegisterLoading = false;
      state.isLoginSuccess = false;
      state.isLoginFailed = false;
      state.isLoginLoading = false;
      state.otpSent = false;
      state.otpError = null;
      state.error = {};
      // DO NOT clear token or user info here
    },

    logOut: (state) => {
      // Fully reset the state
      state.isLoginSuccess = false;
      state.isLoginFailed = false;
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("ygeianNewsToken");
      localStorage.removeItem("ygeianNewsUser");
      localStorage.removeItem("tempMail");
    },
  },

  extraReducers: (builder) => {
    // Register
    builder
      .addCase(register.pending, (state) => {
        state.isRegisterLoading = true;
        state.isRegisterFailed = false;
        state.isRegisterSuccess = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isRegisterLoading = false;
        state.isRegisterSuccess = true;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isRegisterLoading = false;
        state.isRegisterFailed = true;
        state.error = action.payload || action.error?.message || action.error;
      });

    // Login
    builder
      .addCase(login.pending, (state) => {
        state.isLoginLoading = true;
        state.isLoginSuccess = false;
        state.isLoginFailed = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { userData, accessToken } = action.payload;
        state.isLoginLoading = false;
        state.isLoginSuccess = true;
        state.user = userData;
        state.token = accessToken;
        state.isAuthenticated = true;
        localStorage.setItem("ygeianNewsToken", accessToken);
        localStorage.setItem("ygeianNewsUser", JSON.stringify(userData));
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoginLoading = false;
        state.isLoginFailed = true;
        state.isLoginSuccess = false;
        state.error = action.payload || action.error?.message || action.error;
      });

    // Google Login
    builder
      .addCase(googleLogin.pending, (state) => {
        state.isLoginLoading = true;
        state.isLoginSuccess = false;
        state.isLoginFailed = false;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        const { userData, accessToken } = action.payload;
        state.isLoginLoading = false;
        state.isLoginSuccess = true;
        state.user = userData;
        state.token = accessToken;
        state.isAuthenticated = true;
        localStorage.setItem("ygeianNewsToken", accessToken);
        localStorage.setItem("ygeianNewsUser", JSON.stringify(userData));
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.isLoginLoading = false;
        state.isLoginSuccess = false;
        state.isLoginFailed = true;
        state.isAuthenticated = false;
        state.error = action.payload || action.error?.message || action.error;
      });

    // Check Session
    builder
      .addCase(CheckSession.pending, (state) => {
        state.isCheckSessionLoading = true;
        state.isCheckSessionFailed = false;
      })
      .addCase(CheckSession.fulfilled, (state, action) => {
        state.isCheckSessionLoading = false;
        state.isCheckSessionSuccess = true;
        state.isAuthenticated = true;

        state.user = action.payload;
      })
      .addCase(CheckSession.rejected, (state, action) => {
        state.isCheckSessionLoading = false;
        state.isCheckSessionFailed = true;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        localStorage.removeItem("ygeianNewsToken");
        localStorage.removeItem("ygeianNewsUser");
        localStorage.removeItem("tempMail");
        state.error = action.payload || action.message || action.error;
      });

    // Send OTP
    builder
      .addCase(sendingOtp.pending, (state) => {
        state.otpLoading = true;
        state.otpSent = false;
        state.otpError = null;
      })
      .addCase(sendingOtp.fulfilled, (state, action) => {
        state.otpLoading = false;
        state.otpSent = true;
        state.isAuthenticated = true;

        state.user = action.payload;
      })
      .addCase(sendingOtp.rejected, (state, action) => {
        state.otpLoading = false;
        state.otpSent = false;
        state.otpError = action.payload || "OTP sending failed";
      });

    // Verify OTP
    builder
      .addCase(verifyOtp.pending, (state) => {
        state.otpLoading = true;
        state.otpError = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.otpLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.otpLoading = false;
        state.otpError = action.payload || "OTP verification failed";
      });
  },
});

export const { resetAuthState, logOut } = authSlice.actions;
export default authSlice.reducer;
