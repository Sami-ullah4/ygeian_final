import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { verifyOtp } from '../../features/auth/auth.action';
import { useNavigate } from 'react-router-dom';

const VerifyOtp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [otp, setOtp] = useState('');

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const payload = {  otp };
    dispatch(verifyOtp(payload));
    navigate("/")
  };

  return (
    <section className="bg-white flex items-center justify-center w-full h-screen">
      <div className="bg-[#F8F9FC] shadow-md rounded-lg w-[540px] h-auto p-6">
        <div className="text-center mb-6">
          <h1 className="text-gray-800 text-[32px] leading-[150%] font-[600]">
            Verify OTP
          </h1>
          <p className="font-[400] text-[14px] leading-[150%] text-[#375E6C]">
            Enter your email and the OTP you received to verify your account.
          </p>
        </div>
        <form className="gap-3 flex flex-col" onSubmit={handleOnSubmit}>
         
          <label htmlFor="otp">OTP Code</label>
          <input
            type="text"
            name="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="border border-gray-300 rounded-md p-3 outline-none focus:border-[#132D5E] focus:ring-0"
            placeholder="Enter OTP"
            required
          />
          <button
            type="submit"
            className="bg-[#132D5E] w-full rounded-full p-3 text-white"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </section>
  );
};

export default VerifyOtp;
