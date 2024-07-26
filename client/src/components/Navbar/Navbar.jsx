import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Cart from "../Cart/Cart";
import "./Navbar.scss";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const products = useSelector((state) => state.cart.products);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="left">
          <Link className="link" to="/">
            <img src="/img/logo.png" alt="Logo" />
          </Link>
        </div>
        
        <div className="center">
          <div className={`menu ${menuOpen ? "open" : ""}`}>
            <div className="item">
              <Link className="link" to="/products/1">Explore Campaigns</Link>
            </div>
            <div className="item">
              <Link className="link" to="/create">Create a Campaign</Link>
            </div>
          </div>
        </div>
        
        <div className="right">
          <div className="icons">
            <PersonOutlineOutlinedIcon />
            <div className="cartIcon" onClick={() => setOpen(!open)}>
              <ShoppingCartOutlinedIcon />
              <span>{products.length}</span>
            </div>
            <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </div>
          </div>
        </div>
      </div>
      {open && <Cart />}
    </div>
  );
};

export default Navbar;