import {
  AiOutlineCloseCircle,
  AiOutlineDown,
  AiOutlineHeart,
  AiOutlineMenu,
  AiOutlineSearch,
  AiOutlineShopping,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import "./Header.css";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
const Header = () => {
  const [cartQuantity, setCartQuantity] = useState(0);
  const [count, setCount] = useState(0);
  const [itemCount, setItemCount] = useState([]);
  const [itemValue, setItemValue] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [menuShow, setMenuShow] = useState(false);

  const FindValue = () => {
    const getValue = localStorage.getItem("cartTotalQuantity");
    const itemNum = JSON.parse(localStorage.getItem("cartItems"));

    setItemCount(itemNum?.length);
    if (itemCount != null || undefined) {
      setItemValue(itemCount);
    } else {
      setItemValue(0);
    }
    if (getValue !== null) {
      const itemQuantity = getValue;
      setCartQuantity(itemQuantity);
    }
  };

  const SearchApi = async () => {
    if (searchTerm !== "") {
      try {
        await axios.get();
      } catch (error) {}
    }
  };

  const handleMenuShow = ()=>{
    setMenuShow(!menuShow)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    FindValue();
    return () => clearInterval(timer);
  }, [count]);

  return (
    <div className="Header">
      <div className="logo">
        <AiOutlineShoppingCart className="header-icon" />
        <h4 className="logo-text">FlixCart</h4>
      </div>
      <div className="search-bar">
        <input
          type="text"
          name=""
          placeholder="Search for products"
          id="search-bar-input"
        />
        <AiOutlineSearch className="icon" />
      </div>
      <div className="user-account-header">
        <div className="header-auth">
          <p className="header-auth-hello">
            My Account{" "}
            <span>
              <AiOutlineDown className="icon" />
            </span>
          </p>
          <p className="header-auth-hello-text">
            Hello{" "}
            <span>
              <Link className="link" to="/sign-in">
                sign in
              </Link>
            </span>
          </p>
        </div>
        {/* <div className="header-wrapper">
          <AiOutlineHeart className="icon" />
          <span>10</span>
        </div> */}
        <Link to="/cart" className="header-wrapper">
          <AiOutlineShopping className="icon" />
          {cartQuantity <= 0 ? <></> : <span>{cartQuantity}</span>}
        </Link>
        <div className="header-auth">
          <p className="header-auth-hello">
            <span>{itemValue}</span> Items
          </p>
          <p className="header-auth-sign-in">
            $<span>1444.00</span>
          </p>
        </div>
      </div>

      <div className="mobile_screen">
        <AiOutlineMenu className="mobile-menu" onClick={handleMenuShow} />
        <div className="logo">
          <AiOutlineShoppingCart className="header-icon" />
          <h4 className="logo-text">FlixCart</h4>
        </div>
        <div className="search-bar">
          <input
            type="text"
            name=""
            placeholder="Search for products"
            id="search-bar-input"
          />
          <AiOutlineSearch className="icon" />
        </div>
        <Link to="/cart" className="header-wrapper">
          <AiOutlineShopping className="icon" />
          {cartQuantity <= 0 ? <></> : <span>{cartQuantity}</span>}
        </Link>
        <AiOutlineUser className="mobile-user" />
      </div>
      {menuShow && (
        <div className="header-toggle">
          <div className="header-toggle-top">
            <div className="logo">
              <AiOutlineShoppingCart className="header-icon" />
              <h4 className="logo-text">FlixCart</h4>
            </div>
            <AiOutlineCloseCircle onClick={handleMenuShow} className="mobile-menu" />
          </div>
          <div className="header-toggle-body">
            <p>
              <Link className="toggle-links" to="/">Home</Link>
            </p>
            <p>
              <Link className="toggle-links" to="/about-us">About Us</Link>
            </p>
            <p>
              <Link className="toggle-links" to="/shop">Shop</Link>
            </p>
            <p>
              <Link className="toggle-links" to="/blog">Blog</Link>
            </p>
            <p>
              <Link className="toggle-links" to="/">Contact Us</Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;