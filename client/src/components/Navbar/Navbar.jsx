import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Cart from "../Cart/Cart";
import "./Navbar.scss";
import { makeRequest } from "../../makeRequest";
import { useDispatch } from 'react-redux';
import { addToCart,resetCart } from '../../redux/cartReducer';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const products = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();
 
  
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const successParam = urlSearchParams.get('success');
    const falseParam = urlSearchParams.get('false');
    if(successParam != null){
      handleSuccessAPI()
    }
    if(falseParam != null){
      alert("Some error occured while doing the payment, please try again!");
    }
  }, []);
  
  const handleSuccessAPI = async () => {
    try {
      const res = await makeRequest.post("/products", {
        products,
      });
      const response = res?.data?.message;
      if(response == 'success'){
        dispatch(
          resetCart({})
        )
        
      } else {
        alert(response)
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="center">
          <Link className="link" to="/">
            <img src="/img/logo.png" alt="" width="200" height="70" />
          </Link>
        </div>
        
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </div>
        
        <div className={`left ${menuOpen ? "open" : ""}`}>
          <div className="item">
            <Link className="link" to="/products/1">Explore Campaigns</Link>
          </div>
          <div className="item">
            <Link className="link" to="/products/3">Launch a Campaign</Link>
          </div>
        </div>
        
        <div className="right">
          <div className="icons">
            
            <PersonOutlineOutlinedIcon />
            
            <div className="cartIcon" onClick={() => setOpen(!open)}>
              <ShoppingCartOutlinedIcon />
              <span>{products.length}</span>
            </div>
          </div>
        </div>
      </div>
      {open && <Cart />}
    </div>
  );
};

export default Navbar;