import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../features/auth/auth.slice";
import { useNavigate } from "react-router-dom";
import { updateFullName } from "../../features/user/user.action";

const ProfileAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user?.userData);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Only for UI input
  const [showPassword, setShowPassword] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [message, setMessage] = useState(""); // Message for name change

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || "");
      setEmail(user.email || "");
      setPassword(user.password || "*******"); 
    }
  }, [user]);

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  const handleEditClick = () => {
    if (isEditingName && fullName !== user.fullName) {
      dispatch(updateFullName({ fullName }));
      setMessage("✅ Name updated successfully!");
      setTimeout(() => setMessage(""), 3000); // Clear after 3s
    }
    setIsEditingName(!isEditingName);
  };

  return (
    <section className="m-3">
      <div className="max-w-[744px]">
        <h1 className="leading-[130%] font-[600] text-[20px]">Personal details</h1>

        {/* Success message */}
        {message && (
          <div className="text-green-600 text-sm mt-2 font-medium">{message}</div>
        )}

        <form className="gap-2 flex flex-col" onSubmit={(e) => e.preventDefault()}>

          {/* Full Name */}
          <div className="flex justify-between items-start mt-4">
            <div className="flex flex-col text-sm text-[#6B7280] w-full">
              <label className="text-[#0F172A] text-[14px] font-medium">Full Name</label>
              <input
                name="name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                readOnly={!isEditingName}
                className="text-[#475569] text-[14px] border-none outline-none focus:outline-none"
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

          <hr className="border-t border-gray-200" />

          {/* Email */}
          <div className="flex justify-between items-start">
            <div className="flex flex-col text-sm text-[#6B7280] w-full">
              <label className="text-[#0F172A] text-[14px] font-medium">Email address</label>
              <input
                name="email"
                type="email"
                value={email}
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

          {/* Password (user types manually) */}
          <div className="flex justify-between items-start">
            <div className="flex flex-col text-sm text-[#6B7280] w-full">
              <label className="text-[#0F172A] text-[14px] font-medium">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-[#475569] text-[14px] border px-2 py-1 rounded outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-blue-500 text-xs mt-1 self-start"
              >
                {showPassword ? "Hide Password" : "Show Password"}
              </button>
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
