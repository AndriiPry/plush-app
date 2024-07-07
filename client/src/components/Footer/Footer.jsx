import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="top">
        
        <div className="item">
          <h1>About Plush.fun</h1>
          <span>
            We are a plush toys crowdfunding platform that helps creators and influencers bring custom products to life. The company specializes in producing high-quality plush toys based on characters and designs from popular online creators.  
          </span>
        </div>
        
        <div className="item">
          <h1>How it Works</h1>
          <span>Shipping and Delivery</span>
          <span>Returns and Refunds</span>
          <span>FAQ</span>
          <span>Full Terms and Conditions</span>
          <span>Cookies</span>
        </div>
        
        <div className="item">
          <h1>Customer Support</h1>
          <span>Order Tracking</span>
          <span>Help Center</span>
        </div>


      
      </div>
      <div className="bottom">
        <div className="left">
          <span className="logo">PLUSH.FUN</span>
          <span className="copyright">
            © Copyright 2024. All Rights Reserved
          </span>
        </div>
        <div className="right">
          <img src="/img/payment.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
