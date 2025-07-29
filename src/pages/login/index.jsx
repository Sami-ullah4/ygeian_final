import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import google from "../../assets/icons/search 1.png";
import link from "../../assets/icons/linkedin 1.png";
import eye from "../../assets/icons/Vector (1).png";
import bg from "../../assets/bg/login_bg.png";
import gradient from "../../assets/bg/gradient.png";
import { login } from "../../features/auth/auth.action";
import { resetAuthState } from "../../features/auth/auth.slice";

const LoginPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoginSuccess, isLoginLoading, isLoginFailed, error } = useSelector(
    (state) => state?.auth
  );

  useEffect(() => {
    if (isLoginSuccess) {
      setTimeout(() => {
        navigate("/");
        dispatch(resetAuthState());
      }, 1000);
    }
  }, [isLoginSuccess, navigate, dispatch]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!user.email || !user.password) {
      alert("Please fill in both fields");
      return;
    }

    dispatch(login(user));
  };

  return (
    <>
      <section className="flex w-full overflow-hidden">
        {/* Left Side */}
        <div className="flex my-4 flex-col justify-center items-center w-full lg:w-[60%] gap-3">
          <h1 className="font-[600] text-center text-[24px] lg:text-[40px] leading-[150%] text-[#002A3C] lg:mb-6">
            Login to Ygeian FOCUS
          </h1>

          {/* Feedback Messages */}
          <div className="w-full max-w-[480px] px-4 text-center">
            {isLoginFailed && (
              <p className="text-red-500">
                {error?.message ||
                  error ||
                  "Incorrect credentials. Please try again."}
              </p>
            )}
            {isLoginLoading && <p className="text-blue-500">Loading...</p>}
            {isLoginSuccess && (
              <p className="text-green-500">User logged in successfully!</p>
            )}
          </div>

          {/* Social Logins */}
          <div className="flex flex-col lg:flex-col bg-white items-center justify-center gap-3 lg:gap-6">
            <div className="flex flex-col gap-3 w-full px-4 lg:max-w-[640px]">
              <div className="flex flex-col lg:flex-row justify-center items-center gap-5">
                <div className="lg:w-[215px] w-full border border-[#D6E0E4] p-3 rounded-full flex justify-center items-center gap-2 hover:bg-gray-50 transition-colors">
                  <img
                    src={google}
                    alt="Google icon"
                    className="w-[24px] h-[24px]"
                  />
                  <h1 className="font-semibold text-[16px] text-[#002A3C]">
                    Login with Google
                  </h1>
                </div>
                <div className="lg:w-[215px] w-full border border-[#D6E0E4] p-3 rounded-full flex justify-center items-center gap-2 hover:bg-gray-50 transition-colors">
                  <img
                    src={link}
                    alt="LinkedIn icon"
                    className="w-[24px] h-[24px]"
                  />
                  <h1 className="font-semibold text-[16px] text-[#002A3C]">
                    Login with LinkedIn
                  </h1>
                </div>
              </div>
              <p className="text-[#375E6C] text-center hidden lg:block">
                or with email
              </p>
            </div>

            {/* Divider for mobile */}
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
                onSubmit={handleOnSubmit}
                className="flex flex-col gap-4 w-full px-4"
              >
                <input
                  type="text"
                  name="email"
                  value={user.email}
                  onChange={handleOnChange}
                  className="w-full border border-[#D6E0E4] p-3 rounded-[12px] placeholder:text-[#375E6C] focus:outline-[#43B3E5]"
                  placeholder="email"
                />
                <div className="relative w-full">
                  <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleOnChange}
                    className="w-full h-[48px] border border-[#D6E0E4] pr-12 pl-4 rounded-[12px] placeholder:text-[#375E6C] text-[16px] focus:outline-[#43B3E5]"
                    placeholder="Password"
                  />
                  <img
                    src={eye}
                    alt="Toggle visibility"
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer w-[24px] h-[15.51px]"
                  />
                </div>
                <div className="flex justify-center lg:justify-end">
                  <Link
                    to="/resetPassword"
                    className="font-[600] text-[14px] text-[#43B3E5] hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <button
                  type="submit"
                  className="bg-[#132D5E] text-white w-full rounded-full p-3 hover:bg-[#0F2352] transition-colors"
                >
                  Login
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Message */}
          <p className="text-[#375E6C] text-[16px] leading-[150%]">
            New to Ygeian FOCUS?{" "}
            <Link to="/singup" className="text-[#43B3E5] hover:underline">
              Register now.
            </Link>
          </p>
        </div>

        {/* Right Side Image */}
        <div className="relative w-[40%] h-[300px] lg:h-[100vh] hidden lg:block">
          <img src={bg} alt="Cover" className="w-full h-full object-cover" />
          <img
            src={gradient}
            alt="Gradient overlay"
            className="absolute top-0 left-0 w-full h-full object-cover z-10 pointer-events-none"
          />
          <h1 className="absolute top-[69%] text-white font-[600] text-[40px] leading-[130%] z-20 px-4">
            "Because every decision starts with the right information".
          </h1>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
