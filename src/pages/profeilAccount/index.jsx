import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../features/auth/auth.slice";
import { useNavigate } from "react-router-dom";
import {  updateFullName } from "../../features/user/user.action";

const ProfileAccount = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  const [isEditingName, setIsEditingName] = useState(false);

  const [fullName, setFullName] = useState(
    user?.fullName || user?.userData.fullName || "user name"
  );
  const [email, setEmail] = useState(
    user?.userData?.email || user?.email || "123cd@gemail.com"
  );
  const [password, setPassword] = useState("*****88");

  const handleOnSubmit = (e) => {
    e.preventDefault();
  };

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    if (name === "name") setFullName(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };
  

  return (
    <section className="m-3">
      <div className="max-w-[744px]">
        <h1 className="leading-[130%] font-[600] text-[20px]">
          Personal details
        </h1>
        <form className="gap-2 flex flex-col" onSubmit={handleOnSubmit}>
          {/* Full Name */}
          <div className="flex justify-between items-start">
            <div className="flex flex-col text-sm text-[#6B7280] w-full">
              <label className="text-[#0F172A] text-[14px] font-medium">
                Full Name
              </label>
              <input
                value={fullName}
                onChange={handleOnchange}
                name="name"
                type="text"
                className="text-[#475569] text-[14px] border-none outline-none focus:outline-none"
                readOnly={!isEditingName}
              />
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                if (isEditingName) {
                  dispatch(updateFullName({ fullName }));
                  console.log(updateFullName())
                  setIsEditingName(false);
                } else {
                  setIsEditingName(true);
                }
              }}
              className="text-[#3B82F6] text-[14px] cursor-pointer"
            >
              {isEditingName ? "Save" : "Edit"}
            </button>
          </div>

          <hr className="border-t border-gray-200" />

          {/* Email */}
          <div className="flex justify-between items-start">
            <div className="flex flex-col text-sm text-[#6B7280] w-full">
              <label className="text-[#0F172A] text-[14px] font-medium">
                Email address
              </label>
              <input
                value={email}
                onChange={handleOnchange}
                name="email"
                type="email"
                readOnly
                className="text-[#475569] text-[14px] border-none outline-none focus:outline-none"
              />
            </div>
            <button
              type="button"
              className="text-gray-400 text-[14px] cursor-not-allowed"
              disabled
            >
              Edit
            </button>
          </div>

          <hr className="border-t border-gray-200" />

          {/* Password */}
          <div className="flex justify-between items-start">
            <div className="flex flex-col text-sm text-[#6B7280] w-full">
              <label className="text-[#0F172A] text-[14px] font-medium">
                Password
              </label>
              <input
                value={password}
                onChange={handleOnchange}
                name="password"
                type="password"
                readOnly
                className="text-[#475569] text-[14px] border-none outline-none focus:outline-none"
              />
            </div>
            <button
              type="button"
              className="text-gray-400 text-[14px] cursor-not-allowed"
              disabled
            >
              Edit
            </button>
          </div>
        </form>

        <button
          onClick={handleLogout}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </section>
  );
};

export default ProfileAccount;
