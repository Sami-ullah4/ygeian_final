import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { forgetPassword } from "../../features/auth/auth.action";
import { Link, useNavigate } from "react-router-dom";

const PasswordResetEmail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const handleOtpSent = (e) => {
    e.preventDefault();
    dispatch(forgetPassword({email}));
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    }
  };

  return (
    <section className="bg-white flex items-center justify-center w-full h-screen">
      <div className="bg-[#F8F9FC] shadow-md rounded-lg w-[540px] h-[350px] p-6">
        <div className="text-center mb-6">
          <h1 className="text-gray-800 text-[32px] leading-[150%] font-[600]">
            Reset you password
          </h1>
          <p className="font-[400] text-[14px] leading-[150%] text-[#375E6C]">
            Enter the email address associated with your account to reset you
            password.
          </p>
        </div>
        <form className="gap-3 flex flex-col" onSubmit={handleOtpSent}>
          <label htmlFor="email">Enter Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleOnChange}
            className="border border-gray-300 rounded-md p-3 outline-none focus:border-[#132D5E] focus:ring-0"
            placeholder="you@example.com"
            required
          />
          <button
            type="submit"
            className="bg-[#132D5E] w-full rounded-full p-3 text-white"
          >
            Send Reset Link
          </button>
        </form>
        <Link to={"/reset_password_email"}>Change password</Link>
      </div>
    </section>
  );
};

export default PasswordResetEmail;
