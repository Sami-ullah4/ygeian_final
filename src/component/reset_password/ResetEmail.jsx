import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changePassword, updatePassword } from "../../features/auth/auth.action";

const ResetPassword = () => {
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.error("Passwords do not match!");
      return;
    }
    const resetPasswordToken = token;
    dispatch(updatePassword({ password, resetPasswordToken }));
  };

  return (
    <section className="bg-white flex items-center justify-center w-full h-screen">
      <div className="bg-[#F8F9FC] shadow-md rounded-lg w-[540px] h-[460px]  p-6">
        <div className="text-center mb-6">
          <h1 className="text-gray-800 text-[32px] leading-[150%] font-[600]">
            Reset your password
          </h1>
          <p className="font-[400] text-[14px] leading-[150%] text-[#375E6C]">
            Enter a new password for your account
          </p>
        </div>
        <form className="gap-3 flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-md p-3 outline-none focus:border-[#132D5E] focus:ring-0"
            required
          />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border border-gray-300 rounded-md p-3 outline-none focus:border-[#132D5E] focus:ring-0"
            required
          />

          <label htmlFor="token">Enter Token</label>
          <input
            type="text"
            name="token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="border border-gray-300 rounded-md p-3 outline-none focus:border-[#132D5E] focus:ring-0"
            required
          />

          <button
            type="submit"
            className="bg-[#132D5E] w-full rounded-full p-3 text-white"
          >
            Change Password
          </button>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
