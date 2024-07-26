import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="top">
        <div className="item">
          <h1>About</h1>
          <span>How it works</span>
          <span>Shipment and Returns</span>
          <span>Terms and Conditions</span>
          <span>What is Plush.fun</span>
      
        </div>
        <div className="item">
          <h1>Support</h1>
          <span>FAQ</span>
          <span>Customer Support</span>
          <span>Stores</span>
          <span>Compare</span>
          <span>Cookies</span>
        </div>



      </div>
      <div className="bottom">
        <div className="left">
          <span className="logo">Plush.fun</span>
          <span className="copyright">
            © Copyright 2024. All Rights Reserved
          </span>
        </div>
       
      </div>
    </div>
  );
};

export default Footer;