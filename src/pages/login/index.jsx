import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";

import { login, googleLogin } from "../../features/auth/auth.action";
import { logOut } from "../../features/auth/auth.slice";

import googleIcon from "../../assets/icons/search 1.png";
import linkedInIcon from "../../assets/icons/linkedin 1.png";
import eyeIcon from "../../assets/icons/Vector (1).png";
import bgImage from "../../assets/bg/login_bg.png";
import gradientOverlay from "../../assets/bg/gradient.png";

const LoginPage = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    isAuthenticated,
    isLoginSuccess,
    isLoginLoading,
    isLoginFailed,
    error,
  } = useSelector((state) => state.auth);

  // Redirect after successful login
  useEffect(() => {
    let timeout;

    if (isLoginSuccess || isLoginFailed) {
      timeout = setTimeout(() => {
        if (isLoginSuccess) {
          navigate("/send_otp");
        } else if (isLoginFailed) {
          console.error("Login failed:", error);
          dispatch(logOut());
          navigate("/login");
        }
        dispatch(logOut());
      }, 3000);
    }

    if (isAuthenticated) {
      console.log("✅ User is authenticated");
      navigate("/");
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [
    isLoginSuccess,
    isLoginFailed,
    error,
    isAuthenticated,
    navigate,
    dispatch,
  ]);
  // Redirect if already authenticated
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     const timeout = setTimeout(() => {
  //       // navigate("/");
  //       dispatch(resetAuthState());
  //     }, 1000);

  //     return () => clearTimeout(timeout);
  //   }
  // }, [isAuthenticated, navigate, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user.email || !user.password) {
      alert("Please fill in both fields");
      return;
    }
    dispatch(login(user));
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("Google login success:", tokenResponse);
      dispatch(googleLogin(tokenResponse.access_token));
    },
    onError: (err) => {
      console.error("Google login failed:", err);
      alert("Google login failed. Please try again.");
    },
  });

  return (
    <section className="flex w-full overflow-hidden">
      {/* Left Side */}
      <div className="flex my-4 flex-col justify-center items-center w-full lg:w-[60%] gap-3">
        <h1 className="font-semibold text-center text-[24px] lg:text-[40px] text-[#002A3C] lg:mb-6">
          Login to Ygeian FOCUS
        </h1>

        {/* Feedback Messages */}
        <div className="w-full max-w-[480px] px-4 text-center">
          {isLoginFailed && (
            <p className="text-red-500">
              {error && (
                <p className="text-red-500 text-sm">
                  {typeof error === "string"
                    ? error
                    : error?.message || error?.error || "Something went wrong"}
                </p>
              )}
            </p>
          )}
          {isLoginLoading && <p className="text-blue-500">Loading...</p>}
          {isLoginSuccess && (
            <p className="text-green-500">User logged in successfully!</p>
          )}
        </div>

        {/* Social Logins */}
        <div className="flex flex-col items-center justify-center gap-3 lg:gap-6">
          <div className="flex flex-col gap-3 w-full px-4 lg:max-w-[640px]">
            <div className="flex flex-col lg:flex-row justify-center items-center gap-5">
              <button
                className="lg:w-[215px] w-full border border-[#D6E0E4] p-3 rounded-full flex items-center justify-center gap-2 hover:bg-gray-50 transition"
                onClick={loginWithGoogle}
              >
                <img src={googleIcon} alt="Google" className="w-6 h-6" />
                <span className="font-semibold text-[#002A3C] text-sm">
                  Login with Google
                </span>
              </button>

              <button className="lg:w-[215px] w-full border border-[#D6E0E4] p-3 rounded-full flex items-center justify-center gap-2 hover:bg-gray-50 transition">
                <img src={linkedInIcon} alt="LinkedIn" className="w-6 h-6" />
                <span className="font-semibold text-[#002A3C] text-sm">
                  Login with LinkedIn
                </span>
              </button>
            </div>

            <p className="text-[#375E6C] text-center hidden lg:block">
              or with email
            </p>
          </div>

          {/* Divider (for mobile) */}
          <div className="lg:hidden w-full px-4 max-w-[480px]">
            <div className="flex items-center gap-2">
              <hr className="flex-1 border-[#D6E0E4]" />
              <span className="text-[#375E6C]">or</span>
              <hr className="flex-1 border-[#D6E0E4]" />
            </div>
          </div>

          {/* Email Login Form */}
          <div className="flex flex-col items-center w-full gap-3 lg:max-w-[480px]">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 w-full px-4"
            >
              <input
                type="text"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="w-full border border-[#D6E0E4] p-3 rounded-xl placeholder:text-[#375E6C] focus:outline-[#43B3E5]"
                placeholder="Email"
              />

              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  className="w-full border border-[#D6E0E4] p-3 pr-12 rounded-xl placeholder:text-[#375E6C] text-sm focus:outline-[#43B3E5]"
                  placeholder="Password"
                />
                <img
                  src={eyeIcon}
                  alt="Toggle password"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer w-6 h-4"
                />
              </div>

              <div className="flex justify-center lg:justify-end">
                <Link
                  to="/resetPassword"
                  className="text-[#43B3E5] text-sm font-semibold hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoginLoading}
                className={`w-full bg-[#132D5E] text-white rounded-full p-3 transition ${
                  isLoginLoading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-[#0F2352]"
                }`}
              >
                {isLoginLoading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Register */}
        <p className="text-[#375E6C] text-sm">
          New to Ygeian FOCUS?{" "}
          <Link to="/signup" className="text-[#43B3E5] hover:underline">
            Register now.
          </Link>
        </p>
      </div>

      {/* Right Side Visual */}
      <div className="relative w-[40%] h-[300px] lg:h-screen hidden lg:block">
        <img src={bgImage} alt="Cover" className="w-full h-full object-cover" />
        <img
          src={gradientOverlay}
          alt="Overlay"
          className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none"
        />
        <h1 className="absolute top-[69%] text-white font-semibold text-3xl lg:text-4xl leading-snug z-20 px-4">
          "Because every decision starts with the right information".
        </h1>
      </div>
    </section>
  );
};

export default LoginPage;
