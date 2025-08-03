import React, { useEffect, useState } from "react";
import gradient from "../../assets/bg/gradient.png";
import bg from "../../assets/bg/bg_singup.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../features/auth/auth.action";
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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isRegisterSuccess, isRegisterLoading, isRegisterFailed, error } =
    useSelector((state) => state.auth);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { email, fullName, password, confirmPassword } = registerData;

    if (!email || !fullName || !password || !confirmPassword) {
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

    //   try {
    //     // Step 1: Verify OTP
    //     const verifyResult = await dispatch(verifyOtp({ email, code: otpCode }));
    //     if (verifyResult.type.includes("rejected")) {
    //       alert("OTP verification failed. Please check your code.");
    //       return;
    //     }
    // Step 2: Register user

    dispatch(register(registerData));
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
        navigate("/send_otp");
        dispatch(resetAuthState());
      }, 3000);
    }
  }, [isRegisterSuccess, navigate, dispatch]);

  useEffect(() => {
    dispatch(resetAuthState());
  }, [dispatch]);

  return (
    <section className="flex w-full">
      <div className="flex my-4 flex-col justify-center items-center w-full lg:w-[60%] gap-3">
        <h1 className="text-2xl lg:text-4xl font-semibold text-[#002A3C]">
          Join Ygeian FOCUS
        </h1>

        <form
          onSubmit={handleOnSubmit}
          className="w-full px-4 max-w-md flex flex-col gap-3"
        >
          <input
            type="email"
            name="email"
            value={registerData.email}
            onChange={handleOnChange}
            placeholder="Email"
            className="border p-3 rounded"
          />

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
          {passwordError && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )}

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

        <GoogleOAuth />

        {isRegisterLoading && <p className="text-blue-500">Registering...</p>}
        {isRegisterFailed && (
          <p className="text-red-500">
            {typeof error === "string" ? error : "Something went wrong"}
          </p>
        )}
        {isRegisterSuccess && (
          <p className="text-green-500">
            Registration successful! Redirecting...
          </p>
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
        <img
          src={gradient}
          alt="gradient"
          className="absolute top-0 left-0 w-full h-full z-10"
        />
        <h1 className="absolute bottom-20 left-6 text-white text-3xl font-bold z-20">
          "The latest medical news—personalized for you."
        </h1>
      </div>
    </section>
  );
};

export default Signup;
