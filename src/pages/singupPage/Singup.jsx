import React, { useEffect, useState } from "react";
// import google from "../../assets/icons/search 1.png";
// import link from "../../assets/icons/linkedin 1.png";
// import eye from "../../assets/icons/Vector (1).png";
import gradient from "../../assets/bg/gradient.png";
import bg from "../../assets/bg/bg_singup.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, sendingOtp, verifyOtp } from "../../features/auth/auth.action";
import { resetAuthState } from "../../features/auth/auth.slice";
import GoogleOAuth from "../../component/googleAuth";

const Signup = () => {
  const [registerData, setRegisterData] = useState({
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    isRegisterSuccess,
    isRegisterLoading,
    isRegisterFailed,
    error,
    otpLoading,
  } = useSelector((state) => state.auth);

  const handleOtpSend = () => {
    if (!registerData.email) {
      alert("Please enter your email to send OTP");
      return;
    }
    dispatch(sendingOtp({ email: registerData.email }));
    setOtpSent(true);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { email, fullName, password, confirmPassword } = registerData;

    if (!email || !fullName || !password || !confirmPassword || !otpCode) {
      alert("Please fill all fields including OTP");
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return;
    }

    // Step 1: Verify OTP
    const otpResult = await dispatch(verifyOtp({ email, otp: otpCode }));
    if (verifyOtp.rejected.match(otpResult)) {
      alert("OTP verification failed. Please try again.");
      return;
    }

    // Step 2: Register user
    dispatch(register({ email, fullName, password, confirmPassword }));
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (isRegisterSuccess) {
      setTimeout(() => {
        navigate("/login");
        dispatch(resetAuthState());
      }, 2000);
    }
  }, [isRegisterSuccess, navigate, dispatch]);

  useEffect(() => {
    dispatch(resetAuthState());
  }, [dispatch]);

  return (
    <section className="flex w-full">
      <div className="flex my-4 flex-col justify-center items-center w-full lg:w-[60%] gap-3">
        <h1 className="text-2xl lg:text-4xl font-semibold text-[#002A3C]">Join Ygeian FOCUS</h1>

        <form onSubmit={handleOnSubmit} className="w-full px-4 max-w-md flex flex-col gap-3">
          <input
            type="email"
            name="email"
            value={registerData.email}
            onChange={handleOnChange}
            placeholder="Email"
            className="border p-3 rounded"
          />
          <button
            type="button"
            onClick={handleOtpSend}
            disabled={otpLoading}
            className="text-sm text-blue-500 self-end"
          >
            {otpLoading ? "Sending..." : "Send OTP"}
          </button>

          {otpSent && (
            <input
              type="text"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              placeholder="Enter OTP"
              className="border p-3 rounded"
            />
          )}

          <input
            type="text"
            name="fullName"
            value={registerData.fullName}
            onChange={handleOnChange}
            placeholder="Full Name"
            className="border p-3 rounded"
          />

          <input
            type="password"
            name="password"
            value={registerData.password}
            onChange={handleOnChange}
            placeholder="Password"
            className="border p-3 rounded"
          />
          {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}

          <input
            type="password"
            name="confirmPassword"
            value={registerData.confirmPassword}
            onChange={handleOnChange}
            placeholder="Confirm Password"
            className="border p-3 rounded"
          />

          <button type="submit" className="bg-[#43B3E5] text-white p-3 rounded">
            Register
          </button>
        </form>
        <GoogleOAuth/>

        {isRegisterLoading && <p className="text-blue-500">Registering...</p>}
        {isRegisterFailed && (
          <p className="text-red-500">
            {typeof error === "string" ? error : "Something went wrong"}
          </p>
        )}
        {isRegisterSuccess && (
          <p className="text-green-500">Registration successful! Redirecting...</p>
        )}

        <p className="text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 underline">
            Login
          </Link>
        </p>
      </div>

      <div className="hidden lg:block relative w-[40%] h-screen">
        <img src={bg} alt="background" className="w-full h-full object-cover" />
        <img src={gradient} alt="gradient" className="absolute top-0 left-0 w-full h-full z-10" />
        <h1 className="absolute bottom-20 left-6 text-white text-3xl font-bold z-20">
          "The latest medical news—personalized for you."
        </h1>
      </div>
    </section>
  );
};

export default Signup;
