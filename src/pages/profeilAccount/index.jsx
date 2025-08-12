import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { updateFullName } from "../../features/user/user.action";
import { changePassword } from "../../features/auth/auth.action";
import userIcon from "../../../src/assets/icons/user_icon.png";

const ProfileAccount = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user?.userData);
  const token = useSelector((state) => state.auth.user) || {};

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Only for UI input
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingPassowd, setIsEditingPassowd] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || "");
      setEmail(user.email || "");
      setPassword(user.password || "*********");
    }
  }, [user]);

  const handleEditClick = () => {
    if (isEditingName && fullName !== user.fullName) {
      dispatch(updateFullName({ fullName }));
      setMessage("✅ Name updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    }
    setIsEditingName(!isEditingName);
  };

  const hendleChangePassword = () => {
    if (isEditingPassowd && password !== user.password) {
      dispatch(
        changePassword({
          token: token.accessToken,
          newPassword: password,
        })
      );
    }
    setIsEditingPassowd(!isEditingPassowd);
  };

  return (
      <div className="max-w-[744px] flex-col flex gap-3">
        {/* 1 */}
        <div className="flex flex-col gap-4">
          <img
            src={userIcon}
            alt="profile ico"
            className="w-[60px] h-[60px] object-cover "
          />
          <div className="">
            <h1 className="leading-[130%] font-[600] text-[22px] text-[#002A3C]">
              Personal details
            </h1>
            <p className="text-[#375E6C] text-[14px] py-1">{email}</p>
          </div>
        </div>

        {/* Success message */}
        {message && (
          <div className="text-green-600 text-sm mt-2 font-medium">
            {message}
          </div>
        )}
        {/* 2 */}
        <div className="flex flex-col gap-2">
          <div className="pt-[12px] leading-[130%] font-[600] text-[22px] text-[#002A3C]">
            Personal details
          </div>
          <form
            className="gap-2 flex flex-col"
            onSubmit={(e) => e.preventDefault()}
          >
            {/* Full Name */}
            <div className="flex justify-between items-start mt-[3px]">
              <div className="flex flex-col text-sm text-[#6B7280] w-full">
                <label className="text-[#0F172A] text-[14px] font-medium ">
                  Name
                </label>
                <input
                  name="name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  readOnly={!isEditingName}
                  className="text-[#475569] text-[14px] border-none outline-none focus:outline-none mt-[2px]"
                />
              </div>
              <button
                type="button"
                onClick={handleEditClick}
                className="text-[#3B82F6] text-[14px] cursor-pointer"
              >
                {isEditingName ? "Save" : "Edit"}
              </button>
            </div>
            <hr className="border-t border-gray-200 w-full" />

            {/* Email */}
            <div className="flex justify-between items-start  mt-[3px]">
              <div className="flex flex-col text-sm text-[#6B7280] w-full">
                <label className="text-[#0F172A] text-[14px] font-medium ">
                  Email address
                </label>
                <input
                  name="email"
                  type="email"
                  value={email}
                  readOnly
                  className="text-[#475569] text-[14px] border-none outline-none focus:outline-none mt-[2px] "
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

            {/* Password (user types manually) */}
            <div className="flex justify-between items-start">
              <div className="flex flex-col text-sm text-[#6B7280] w-full">
                <label className="text-[#0F172A] text-[14px] font-medium">
                  Password
                </label>
                <input
                  type={"password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-[#475569] text-[14px] border-none px-2 py-1 rounded-none outline-none"
                />
              </div>
              <button
                type="button"
                onClick={hendleChangePassword}
                className="text-[#3B82F6] text-[14px] cursor-pointer"
              >
                {isEditingPassowd ? "Save" : "Edit"}
              </button>
            </div>
            <hr className="border-t border-gray-200" />
          </form>
        </div>
        {/*  */}
        <div>
          <h1 className="pt-[12px] leading-[130%] font-[600] text-[22px] text-[#002A3C]">
            Manage account{" "}
          </h1>
          <h2 className="mt-[10px]  text-[#0F172A] text-[14px] font-medium ">
            Delet account
          </h2>
          <div className="flex mt-[4px] justify-between">
            <p className="text-[#375E6C] text-[14px] py-1">
              Permanently delete your Ygeian Focus account.
            </p>
            <button className="text-[#FF3535] font-[600] text-[16px] leading-[130%]">Delete</button>
          </div>
        </div>
      </div>
  );
};

export default ProfileAccount;
