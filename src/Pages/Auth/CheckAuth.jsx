import React, { useContext, useEffect } from "react";
import { StoreContext } from "../../Context/ContextStore";
import { useNavigate } from "react-router-dom";

const CheckAuth = () => {
  const { user } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    const navigateUser = () => {
      // Check if `user` is an empty object
      if (!user || Object.keys(user).length === 0) {
        navigate("/login");
      }
    };
    navigateUser();
  }, [user, navigate]); // Add `user` and `navigate` to dependency array

  return <div></div>;
};

export default CheckAuth;
