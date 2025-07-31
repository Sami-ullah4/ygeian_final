import React from "react";
import { GoogleLogin } from "@react-oauth/google";

const GoogleOAuth = () => {
    const handelOnSeccs = (credResponse)=>{
        console.log(credResponse)

    }
  return (
    <div className="w-full">
    <GoogleLogin
      onSuccess={(credentialResponse) => handelOnSeccs(credentialResponse)}
      onError={() => {
        console.log("Login Failed");
      }}
    />
    </div>
  );
};

export default GoogleOAuth;
