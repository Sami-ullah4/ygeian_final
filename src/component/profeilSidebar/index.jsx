import React from "react";
import { NavLink } from "react-router-dom";
import account_icon from "../../assets/icons/account_icon.png";

// Optional: You can define this class outside if needed for reusability
const baseClass = "text-[16px] text-[#002A3C] font-medium";

const links = [
  { to: "", label: "Account" },
  { to: "/user_profile/Spaceiliest", label: "Your Specialties" },
  { to: "/profile-settings/savedArticles", label: "Saved Articles" },
  { to: "/profile-settings/billing", label: "Plan and Billing" },
  { to: "/profile-settings/notification", label: "Notifications" },
];

const ProfileSettingsSidebar = () => {
  return (
    <div className="overflow-hidden">
      <ul className="list-none flex lg:flex-col  pl-6 lg:gap-1 gap-8">
        {links.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `${baseClass} flex items-center gap-2 ${isActive ? "text-[#43B3E5] font-semibold" : ""}`
              }
            >
              <img
                src={account_icon}
                alt="profile icon"
                className="w-[18px] h-[18px]"
              />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileSettingsSidebar;
