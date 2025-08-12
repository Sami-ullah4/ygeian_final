import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import account_icon from "../../assets/icons/account_icon.png";

const baseClass = "text-[16px] text-[#002A3C] font-medium";

const links = [
  { to: "", label: "Account" },
  { to: "spaceiliest_add", label: "Your Specialties" },
  { to: "SavedArtical", label: "Saved Articles" },
  { to: "/profile-settings/billing", label: "Plan and Billing" },
  { to: "/profile-settings/notification", label: "Notifications" },
];

const ProfileSettingsSidebar = () => {
  const listRef = useRef(null);
  let isDragging = false;
  let startX;
  let scrollLeft;

  const startDrag = (x) => {
    if (window.innerWidth >= 1024) return; // disable drag on lg screens
    isDragging = true;
    startX = x - listRef.current.offsetLeft;
    scrollLeft = listRef.current.scrollLeft;
  };

  const stopDrag = () => {
    isDragging = false;
  };

  const duringDrag = (x, e) => {
    if (!isDragging) return;
    e.preventDefault();
    const walk = (x - startX) * 1;
    listRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="overflow-hidden">
      <ul
        ref={listRef}
        onMouseDown={(e) => startDrag(e.pageX)}
        onMouseLeave={stopDrag}
        onMouseUp={stopDrag}
        onMouseMove={(e) => duringDrag(e.pageX, e)}
        onTouchStart={(e) => startDrag(e.touches[0].pageX)}
        onTouchEnd={stopDrag}
        onTouchMove={(e) => duringDrag(e.touches[0].pageX, e)}
        className="list-none flex lg:flex-col lg:gap-2 gap-4 w-full lg:max-w-[259px] overflow-x-auto whitespace-nowrap scrollbar-hide select-none touch-pan-x px-2 lg:overflow-x-hidden"
      >
        {links.map(({ to, label }) => (
          <li key={to} className="flex-shrink-0">
            <NavLink
              to={to}
              className={({ isActive }) =>
                `${baseClass} flex items-center gap-2 whitespace-nowrap px-2 transition-colors ${
                  isActive ? "text-[#43B3E5] font-semibold" : "text-[#002A3C]"
                }`
              }
              end
            >
              <img
                src={account_icon}
                alt="profile icon"
                className="w-[18px] h-[18px] hidden lg:flex"
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
