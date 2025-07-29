
import React from "react";
import { Link } from "react-router-dom";

const Button = ({ text, bgColor, textColor, borderColor, routDirection }) => {
  return (
    <Link to={routDirection}><button
    className={`w-[116px] h-[48px] cursor-pointer font-medium rounded-full border-[2px] justify-center items-center ${bgColor} ${textColor} ${borderColor} `}
  >
    {text}
  </button></Link>
    
  );
};

export default Button;
