// src/components/VerifyOtp.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp } from "../../features/auth/auth.action";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tempTokenFromState = useSelector((state) => state.auth.tempToken);
  const tempToken =
    tempTokenFromState || localStorage.getItem("ygeianNewsTempToken");

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!otp) {
      setError("Please enter the OTP code.");
      return;
    }

    if (!tempToken) {
      setError("No temp token found. Please request a new OTP or login again.");
      return;
    }

    try {
      setLoading(true);
      const payload = { otp };


      const result = await dispatch(verifyOtp(payload)).unwrap();


      navigate("/");
    } catch (err) {
      setError(err?.message || err || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white flex items-center justify-center w-full h-screen">
      <div className="bg-[#F8F9FC] shadow-md rounded-lg w-[540px] h-auto p-6">
        <div className="text-center mb-6">
          <h1 className="text-gray-800 text-[32px] leading-[150%] font-[600]">
            Verify OTP
          </h1>
          <p className="font-[400] text-[14px] leading-[150%] text-[#375E6C]">
            Enter the OTP you received.
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

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <button
            type="submit"
            className="bg-[#132D5E] w-full rounded-full p-3 text-white disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default VerifyOtp;
