import { YGEIAN_NEWS } from "../../http/config";

//Registering user
export const registerApi = (payload) =>
  YGEIAN_NEWS.post("jwt/register", payload);

// LoginIn user
export const loginApi = (payload) => YGEIAN_NEWS.post("jwt/login", payload);

//check session
export const checkSessionApi = (token) =>
  YGEIAN_NEWS.get("jwt/check-session", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

//sending otp
export const sendingOtpApi = (payload) =>
  YGEIAN_NEWS.post("jwt/resend-otp", payload);

// auth.api.js
export const verifyOtpApi = (payload) =>
  YGEIAN_NEWS.post("jwt/verify-otp", payload);

//googleSingin
export const googleSignIn = (access_token) => {
  return YGEIAN_NEWS.get("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};


///

