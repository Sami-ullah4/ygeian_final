import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/navLogo.png";
import { IoSearchOutline } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import Button from "../button";
import { Link, useLocation } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiSaveDown2 } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [cardShow, setCardShow] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const location = useLocation();
  const cardRef = useRef(null);
  const buttonRuf = useRef(null);
  const menuBtnRef = useRef(null);
  const { isLoginSuccess } = useSelector((state) => state.auth);
  console.log(isLoginSuccess);

  const handelProfileCard = () => {
    setCardShow((prev) => !prev);
  };
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };
  useEffect(() => {
    setCardShow(false);
  }, [location]);

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

  const user = useSelector((state) => state.auth.user);
  return (
    <nav className="shadow-md bg-white">
      <div className="h-[48px] lg:h-[71px] mx-auto flex items-center justify-between px-4">
        <div className="flex justify-center items-center">
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              className="w-[139px] h-[28px] lg:w-[234px] lg:h-[48px]"
            />
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="cursor-pointer flex items-center justify-center w-[24px] h-[24px] lg:hidden">
          <IoMenu ref={menuBtnRef} onClick={toggleMobileMenu} />
        </div>

        {/* Search input - Only on large screens */}
        <div className="hidden lg:flex items-center justify-center relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-[500px] h-[49px] border-2 border-[#D6E0E4] pl-4 pr-12 rounded-[8px] placeholder:text-[#96A7AD]"
          />
          <IoSearchOutline className="absolute right-4 text-[#96A7AD] w-[24px] h-[24px]" />
        </div>

        <div className="hidden  lg:flex items-center gap-3">
          {!isLoginSuccess && (
            <Link to="/login">
              <button className="w-[47px] h-[48px] text-[16px] text-[#002A3C] font-[500] flex justify-center items-center cursor-pointer">
                Log in
              </button>
            </Link>
          )}

          <Button
            bgColor="bg-[#43B3E5]"
            text="Sign up"
            routDirection={"/signup"}
            borderColor="border-[#43B3E5]"
            textColor="text-white"
          />
          <div className="flex gap-3 justify-center items-center">
            <Link to="/profile-settings/notification">
              <IoNotificationsOutline className="text-[33px] text-[#375E6C] cursor-pointer" />
            </Link>
            {/* profile div */}
            <div className="relative inline-block">
              <div ref={buttonRuf} onClick={handelProfileCard}>
                <div className="border-[1px] border-[#D6E0E4] rounded-full flex justify-center items-center gap-3 p-0.5">
                  {/* <img
                    src={profileIcon}
                    alt="profile"
                    className="w-[36px] h-[36px]"
                  /> */}
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
                      <Link to="/profile-settings/savedArticles">
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
                      <h1 className="font-[400] px-2 text-[12px] text-[#002A3C]">
                        Logout
                      </h1>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
