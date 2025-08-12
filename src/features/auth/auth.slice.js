// features/auth/auth.slice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  register,
  login,
  CheckSession,
  sendingOtp,
  verifyOtp,
  googleLogin,
  changePassword,
  forgetPassword,
  updatePassword,
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
  //change password
  ischangePasswordSeccess: false,
  ischangePasswordFailed: false,
  ischangePasswordPanding: false,
  ischangePasswordLoading: false,

  //Forget Paassword
  isForgetPasswordSuccess: false,
  isForgetPasswordLoading: false,
  isForgetPasswordFailed: false,

  //Forget Paassword
  isUpdatePasswordSuccess: false,
  isUpdatePasswordLoading: false,
  isUpdatePasswordFailed: false,
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
    resetResetPasswordState: (state) => {
      state.isForgetPasswordSuccess = false;
      state.isForgetPasswordLoading = false;
      state.isForgetPasswordFailed = false;
      state.error = {};
      state.isUpdatePasswordSuccess = false;
      state.isUpdatePasswordLoading = false;
      state.isUpdatePasswordFailed = false;
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
        const userData =
          wrapper.userData || wrapper.user || wrapper.profile || null;

        state.otpLoading = false;
        state.user = userData || state.user;
        state.token = accessToken || state.token;

        state.isOtpVerified = true;
        state.isLoginPending = false;
        state.isAuthenticated = !!accessToken;
        state.isOtpRequired = false;

        if (accessToken) localStorage.setItem("ygeianNewsToken", accessToken);
        if (userData)
          localStorage.setItem("ygeianNewsUser", JSON.stringify(userData));
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
        const userData =
          action.payload?.userData ||
          action.payload?.user ||
          action.payload?.profile ||
          null;

        state.isLoginLoading = false;
        state.isLoginSuccess = true;
        state.user = userData;
        state.isLoginPending = false;
        state.isAuthenticated = !!accessToken;
        state.token = accessToken;
        state.isOtpRequired = false;

        if (accessToken) localStorage.setItem("ygeianNewsToken", accessToken);
        if (userData)
          localStorage.setItem("ygeianNewsUser", JSON.stringify(userData));
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
    // changePassword cases
    builder
      .addCase(changePassword.pending, (state) => {
        state.isChangePasswordSuccess = false;
        state.isChangePasswordFailed = false;
        state.isChangePasswordPending = true;
        state.isChangePasswordLoading = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        const accessToken = action.payload;
        state.isChangePasswordSuccess = true;
        state.isChangePasswordFailed = false;
        state.isChangePasswordPending = false;
        state.isChangePasswordLoading = false;
        state.user = action.payload;
        state.token = accessToken;
        if (accessToken) localStorage.setItem("ygeianNewsToken", accessToken);
      })
      .addCase(changePassword.rejected, (state) => {
        state.isChangePasswordSuccess = false;
        state.isChangePasswordFailed = true;
        state.isChangePasswordPending = false;
        state.isChangePasswordLoading = false;
      });
    // Add cases for Forget Password
    builder.addCase(forgetPassword.pending, (state) => {
      state.isForgetPasswordLoading = true;
    });
    builder.addCase(forgetPassword.fulfilled, (state) => {
      state.isForgetPasswordSuccess = true;
      state.isForgetPasswordLoading = false;
    });
    builder.addCase(forgetPassword.rejected, (state, action) => {
      state.isForgetPasswordSuccess = false;
      state.isForgetPasswordLoading = false;
      state.isForgetPasswordFailed = true;
      state.error = action.payload;
    });

    // Add cases for Update Password
    builder.addCase(updatePassword.pending, (state) => {
      state.isUpdatePasswordLoading = true;
    });
    builder.addCase(updatePassword.fulfilled, (state) => {
      state.isUpdatePasswordSuccess = true;
      state.isUpdatePasswordLoading = false;
    });
    builder.addCase(updatePassword.rejected, (state, action) => {
      state.isUpdatePasswordSuccess = false;
      state.isUpdatePasswordLoading = false;
      state.isUpdatePasswordFailed = true;
      state.error = action.payload;
    });
  },
});

export const { resetAuthState, logOut, tempCheck } = authSlice.actions;
export default authSlice.reducer;
