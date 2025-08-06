// features/auth/auth.slice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  register,
  login,
  CheckSession,
  sendingOtp,
  verifyOtp,
  googleLogin,
} from "./auth.action";

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
  tempToken: sessionStorage.getItem("tempMail") || null,

  token: tokenFromStorage || null, // final authenticated token
  error: {},
  isAuthenticated: !!tokenFromStorage,
  isOtpRequired: false,

  // Register
  isRegisterSuccess: false,
  isRegisterLoading: false,
  isRegisterFailed: false,

  // Login
  isLoginSuccess: false,
  isLoginLoading: false,
  isLoginFailed: false,
  isLoginPending: false,
  isOtpVerified: false,

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
      state.isRegisterSuccess = false;
      state.isRegisterFailed = false;
      state.isRegisterLoading = false;

      state.isLoginSuccess = false;
      state.isLoginFailed = false;
      state.isLoginLoading = false;

      state.otpSent = false;
      state.otpError = null;
      state.error = {};
    },

    logOut: (state) => {
      Object.assign(state, {
        isLoginSuccess: false,
        isLoginFailed: false,
        isLoginPending: false,
        isOtpVerified: false,
        user: null,
        token: null,
        isAuthenticated: false,
        isOtpRequired: false,
      });
      localStorage.removeItem("ygeianNewsToken");
      localStorage.removeItem("ygeianNewsUser");
      localStorage.removeItem("tempMail");
    },
    tempCheck: (state) => {
      state.isLoginSuccess = false;
      state.isLoginFailed = false;
      state.isLoginPending = false;
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
        state.error = action.payload || action.error?.message;
      });

    // Login (email/password) -> requires OTP
    builder
      .addCase(login.pending, (state) => {
        state.isLoginLoading = true;
        state.isLoginSuccess = false;
        state.isLoginFailed = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        const accessToken = action.payload?.accessToken || null;
        state.isLoginLoading = false;
        state.isLoginSuccess = true;
        state.isLoginPending = true;
        state.isAuthenticated = false;
        state.isOtpRequired = true;
        state.token = accessToken;
        sessionStorage.setItem("tempMail", accessToken);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoginLoading = false;
        state.isLoginFailed = true;
        state.error = action.payload || action.error?.message;
      });

    // Verify OTP
    builder
      .addCase(verifyOtp.pending, (state) => {
        state.otpLoading = true;
        state.otpError = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        const wrapper = action.payload?.user || action.payload || {};
        const accessToken = wrapper.accessToken || null;
        const userData = wrapper.userData || wrapper.user || wrapper.profile || null;

        state.otpLoading = false;
        state.user = userData || state.user;
        state.token = accessToken || state.token;

        state.isOtpVerified = true;
        state.isLoginPending = false;
        state.isAuthenticated = !!accessToken;
        state.isOtpRequired = false;

        if (accessToken) localStorage.setItem("ygeianNewsToken", accessToken);
        if (userData) localStorage.setItem("ygeianNewsUser", JSON.stringify(userData));
        localStorage.removeItem("tempMail");
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.otpLoading = false;
        state.otpError = action.payload || "OTP verification failed";
      });

    // Google Login -> skip OTP
    builder
      .addCase(googleLogin.pending, (state) => {
        state.isLoginLoading = true;
        state.isLoginSuccess = false;
        state.isLoginFailed = false;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        const accessToken = action.payload?.accessToken || null;
        const userData = action.payload?.userData || action.payload?.user || action.payload?.profile || null;

        state.isLoginLoading = false;
        state.isLoginSuccess = true;
        state.user = userData;
        state.isLoginPending = false;
        state.isAuthenticated = !!accessToken;
        state.token = accessToken;
        state.isOtpRequired = false;

        if (accessToken) localStorage.setItem("ygeianNewsToken", accessToken);
        if (userData) localStorage.setItem("ygeianNewsUser", JSON.stringify(userData));
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.isLoginLoading = false;
        state.isLoginSuccess = false;
        state.isLoginFailed = true;
        state.isAuthenticated = false;
        state.error = action.payload || action.error?.message;
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
        state.error = action.payload || action.error?.message;
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
        state.user = action.payload;
      })
      .addCase(sendingOtp.rejected, (state, action) => {
        state.otpLoading = false;
        state.otpSent = false;
        state.otpError = action.payload || "OTP sending failed";
      });
  },
});

export const { resetAuthState, logOut , tempCheck} = authSlice.actions;
export default authSlice.reducer;
