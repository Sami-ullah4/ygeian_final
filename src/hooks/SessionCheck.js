import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { CheckSession } from "../features/auth/auth.action"; 
import { useLocation } from "react-router-dom";

// ✅ Custom session check wrapper component
export const CheckSessionWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation(); 

  useEffect(() => {
    dispatch(CheckSession()); 
  }, [dispatch, location]);

  return children;
};
