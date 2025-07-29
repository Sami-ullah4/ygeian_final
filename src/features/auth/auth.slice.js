import { createSlice } from "@reduxjs/toolkit";
import { register, login, CheckSession, sendingOtp, verifyOtp } from "./auth.action";

// Load user from localStorage
let userFromStorage = null;
try {
  const userData = localStorage.getItem("ygeianNewsUser");
  userFromStorage = userData ? JSON.parse(userData) : null;
} catch (error) {
  console.error("Failed to parse user from localStorage:", error);
}
const tokenFromStorage = localStorage.getItem("ygeianNewsToken");

const initialState = {
  user: userFromStorage,
  token: tokenFromStorage || null,
  error: {},
  isRegisterSuccess: false,
  isRegisterLoading: false,
  isRegisterFailed: false,
  isLoginSuccess: !!tokenFromStorage,
  isLoginLoading: false,
  isLoginFailed: false,
  isCheckSessionSuccess: false,
  isCheckSessionLoading: false,
  isCheckSessionFailed: false,
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
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoginSuccess = false;
      localStorage.removeItem("ygeianNewsToken");
      localStorage.removeItem("ygeianNewsUser");
    },
  },
  extraReducers: (builder) => {
    // ✅ Register
    builder
      .addCase(register.pending, (state) => {
        state.isRegisterLoading = true;
        state.isRegisterFailed = false;
        state.isRegisterSuccess = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        const { userData, accessToken } = action.payload;
        state.isRegisterLoading = false;
        state.isRegisterSuccess = true;
        state.user = userData;
        state.token = accessToken;
        localStorage.setItem("ygeianNewsToken", accessToken);
        localStorage.setItem("ygeianNewsUser", JSON.stringify(userData));
      })
      .addCase(register.rejected, (state, action) => {
        state.isRegisterLoading = false;
        state.isRegisterFailed = true;
        state.error = action.payload || action.error?.message || action.error;
      });

    // ✅ Login
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
        localStorage.setItem("ygeianNewsToken", accessToken);
        localStorage.setItem("ygeianNewsUser", JSON.stringify(userData));
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoginLoading = false;
        state.isLoginSuccess = false;
        state.isLoginFailed = true;
        state.error = action.payload || action.error?.message || action.error;
      });

    // ✅ Check session
    builder
      .addCase(CheckSession.pending, (state) => {
        state.isCheckSessionLoading = true;
        state.isCheckSessionFailed = false;
      })
      .addCase(CheckSession.fulfilled, (state, action) => {
        const { userData, accessToken } = action.payload;
        state.isCheckSessionSuccess = true;
        state.user = userData;
        state.token = accessToken;
        localStorage.setItem("ygeianNewsToken", accessToken);
        localStorage.setItem("ygeianNewsUser", JSON.stringify(userData));
      })
      .addCase(CheckSession.rejected, (state, action) => {
        state.isCheckSessionLoading = false;
        state.isCheckSessionFailed = true;
        state.error = action.payload || action.message || action.error;
      });

    // ✅ Send OTP
    builder
      .addCase(sendingOtp.pending, (state) => {
        state.otpLoading = true;
        state.otpSent = false;
        state.otpError = null;
      })
      .addCase(sendingOtp.fulfilled, (state, action) => {
        state.otpLoading = false;
        state.otpSent = true;
        const { userData, accessToken } = action.payload;
        state.user = userData;
        state.token = accessToken;
        localStorage.setItem("ygeianNewsToken", accessToken);
        localStorage.setItem("ygeianNewsUser", JSON.stringify(userData));
      })
      .addCase(sendingOtp.rejected, (state, action) => {
        state.otpLoading = false;
        state.otpSent = false;
        state.otpError = action.payload || "OTP sending failed";
      });

    // ✅ Verify OTP
    builder
      .addCase(verifyOtp.pending, (state) => {
        state.otpLoading = true;
        state.otpError = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.otpLoading = false;
        const { userData, accessToken } = action.payload;
        state.user = userData;
        state.token = accessToken;
        localStorage.setItem("ygeianNewsToken", accessToken);
        localStorage.setItem("ygeianNewsUser", JSON.stringify(userData));
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.otpLoading = false;
        state.otpError = action.payload || "OTP verification failed";
      });
  },
});

export const { resetAuthState, logout } = authSlice.actions;
export default authSlice.reducer;
