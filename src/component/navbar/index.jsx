import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/navLogo.png";
import {
  IoSearchOutline,
  IoMenu,
  IoNotificationsOutline,
} from "react-icons/io5";
import Button from "../button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiSaveDown2 } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../features/auth/auth.slice";

const Navbar = () => {
  const [cardShow, setCardShow] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const cardRef = useRef(null);
  const buttonRuf = useRef(null);
  const menuBtnRef = useRef(null);

  const user = useSelector((state) => state.auth.user);
  const athenticated = useSelector((state) => state.auth.isAuthenticated);

  const handelProfileCard = () => {
    setCardShow((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
    setCardShow(true);
    console.log("show card");
  };

  useEffect(() => {
    setCardShow(false);
  }, [location]);

  const HandelLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOrScroll = (e) => {
      if (
        cardRef.current &&
        !cardRef.current.contains(e.target) &&
        buttonRuf.current &&
        !buttonRuf.current.contains(e.target)
      ) {
        setCardShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOrScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOrScroll);
    };
  }, []);

  const natifiUrl = location.pathname;
  const shouldShowNotification = !natifiUrl.startsWith("/user_profile");

  return (
    <nav className="shadow-md bg-white max-h-[54px] lg:h-[71px] mx-auto flex items-center justify-between px-4">
      <div className="flex justify-center items-center">
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            className="min-w-[11rem] min-h-[2.5rem] max-w-[1rem] max-h-[10rem]  "
          />
        </Link>
      </div>

      {/* Mobile Menu Icon */}
      <div className="cursor-pointer flex items-center justify-center w-[24px] h-[24px] lg:hidden">
        <IoMenu ref={menuBtnRef} onClick={toggleMobileMenu} />
      </div>

      {/* Search input - Only on large screens */}
      <div className="hidden lg:flex items-center justify-center relative ">
        <input
          type="text"
          placeholder="Search..."
          className="
     min-w-[24rem] max-w-[500px] h-[39px] border-2 border-[#D6E0E4]
      pl-4 pr-12 rounded-[8px]
      placeholder:text-[#96A7AD]
      placeholder:font-[300]
      placeholder:text-[16px]
      placeholder:leading-[100%]
    "
        />
        <IoSearchOutline className="absolute right-2 top-1/2 -translate-y-1/2 text-[#96A7AD] w-[24px] h-[24px]" />
      </div>

      <div className="hidden lg:flex items-center gap-3">
        {/* Login button shows only if no token in localStorage */}
        {!localStorage.getItem("ygeianNewsUser") && (
          <Link
            to="/login"
            className="w-[47px] h-[48px] text-[16px] text-[#002A3C] font-[500]
            flex justify-center items-center cursor-pointer"
          >
            {" "}
            Log in
          </Link>
        )}
        {!localStorage.getItem("ygeianNewsUser") && (
          <Button
            bgColor="bg-[#43B3E5]"
            text="Sign up"
            routDirection={"/signup"}
            borderColor="border-[#43B3E5]"
            textColor="text-white"
          />
        )}
        {athenticated && (
          <div className="flex gap-3 justify-center items-center">
            {shouldShowNotification && (
              <Link to="/profile-settings/notification">
                <IoNotificationsOutline className="text-[33px] text-[#375E6C] cursor-pointer" />
              </Link>
            )}
            {/* profile div */}

            <div className="relative inline-block">
              <div ref={buttonRuf} onClick={handelProfileCard}>
                <div className="border-[1px] border-[#D6E0E4] rounded-full flex justify-center items-center gap-3 p-0.5">
                  <RiArrowDropDownLine
                    className={`text-[35px] transform transition-transform duration-300 ${
                      cardShow ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </div>
              </div>

              {/* Dropdown card */}

              {(cardShow || mobileMenuOpen) && (
                <div
                  ref={cardRef}
                  className="absolute right-4 top-[60px] lg:top-[72px] w-[248px] border border-[#D6E0E4] rounded-md shadow-md bg-white z-50"
                >
                  <div className="p-3 flex flex-col gap-4">
                    <div>
                      <h1 className="text-[15px] text-[#002A3C] font-[600] leading-[130%]">
                        {user?.fullName || "guest"}
                      </h1>
                      <p className="font-[400] mt-0.5 text-[12px] leading-[130%] text-[#375E6C]">
                        {user?.email || "abc...@gmail.com"}{" "}
                      </p>
                    </div>

                    <Link to="/user_profile">
                      <button className="cursor-pointer bg-[#E5F5FF] text-[#002A3C] font-[400] text-[12px] leading-[130%] w-full p-2 rounded-full">
                        My profile
                      </button>
                    </Link>

                    <hr className="bg-[#D6E0E4]" />

                    <div>
                      <Link to="/user_profile/SavedArtical">
                        <div className="flex items-center">
                          <CiSaveDown2 className="text-[#002A3C] text-[20px]" />
                          <h1 className="font-[400] px-2 text-[12px] text-[#002A3C]">
                            Saved Articles
                          </h1>
                        </div>
                      </Link>
                      <Link to="/privacy-settings">
                        <div className="flex mt-2 items-center">
                          <IoSettingsOutline className="text-[#002A3C] text-[20px]" />
                          <h1 className="font-[400] px-2 text-[12px] text-[#002A3C]">
                            Settings
                          </h1>
                        </div>
                      </Link>
                    </div>

                    <hr className="bg-[#D6E0E4]" />

                    <div className="flex items-center">
                      <MdLogout className="text-[#002A3C] text-[20px]" />
                      <button
                        onClick={HandelLogout}
                        className="font-[400] px-2 text-[12px] text-[#002A3C]"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
