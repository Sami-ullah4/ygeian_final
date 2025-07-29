 import React from "react";
import logo from '../../assets/footerLogo.png'
import { FaFacebookF, FaLinkedin, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <footer className='bg-red-300'>
        {/* Top Footer Section */}
        <section className="bg-[#132D5E] w-full">
          <div className="flex flex-col md:flex-row justify-center md:justify-between items-center m-auto w-[85%] py-2 ">
            
            {/* Logo */}
            <div className="bg-[#132D5E] flex justify-center">
              <img src={logo} alt="Logo" className="w-[150px] h-[30px] object-contain" />
            </div>

            {/* Footer Links */}
            <div className="flex flex-col md:flex-row items-center text-white gap-2 md:gap-4">
              <Link to="/about">About</Link>
              <Link to="/faq">FAQ</Link>
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/terms-of-use">Terms of Use</Link>
              <Link to="/contact">Contact</Link> 
            </div>

          </div>
        </section>

        {/* Bottom Footer Section */}
        <section className='bg-[#002A3C]'>
          <div className="flex flex-col md:flex-row justify-center md:justify-between items-center m-auto w-[85%]  text-[#ffffff] py-2">
            <p>Powered by Ygeian</p>
            <div className='flex gap-5'>
              <FaFacebookF/>
              <FaYoutube />
              <FaLinkedin />
            </div>
          </div>
        </section>
      </footer>
    </>
  );
}

export  default Footer;