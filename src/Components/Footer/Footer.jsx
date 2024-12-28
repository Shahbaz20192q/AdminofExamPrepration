import React, { useContext } from "react";
import "./Footer.css";
import { StoreContext } from "../../Context/ContextStore";

const Footer = () => {
  const { setting } = useContext(StoreContext);
  return (
    <footer className="footer header">
      <p> {setting?.name} &copy; copyright all right reserved </p>
    </footer>
  );
};

export default Footer;
