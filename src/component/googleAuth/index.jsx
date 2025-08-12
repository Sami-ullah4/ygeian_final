import React from "react";
import { GoogleLogin } from "@react-oauth/google";

const GoogleOAuth = () => {
    const handelOnSeccs = ()=>{

    }
  return (
    <div className="w-full">
    <GoogleLogin
      onSuccess={(credentialResponse) => handelOnSeccs(credentialResponse)}
      onError={() => {
      }}
    />
    </div>
  );
};

export default GoogleOAuth;
