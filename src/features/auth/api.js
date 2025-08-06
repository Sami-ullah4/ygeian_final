import { YGEIAN_NEWS } from "../../http/config";

// LoginIn user
export const loginApi = (payload) => YGEIAN_NEWS.post("jwt/login", payload);

//Registering user
export const registerApi = (payload) =>
  YGEIAN_NEWS.post("jwt/register", payload);


//resend_otp
export const sendingOtpApi = (payload) =>
  YGEIAN_NEWS.post("jwt/resend-otp", payload);

// auth.api.js
export const verifyOtpApi = (tempToken) =>
  YGEIAN_NEWS.post("jwt/verify-otp", tempToken);

//check session
export const checkSessionApi = (token) =>
  YGEIAN_NEWS.get("jwt/check-session", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

//googleSingin
export const googleSignIn = (access_token) => {
  return YGEIAN_NEWS.get("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
