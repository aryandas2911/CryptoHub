import React, { useContext } from "react";
import "./Navbar.css";

import arrow from "../assets/arrow_icon.png";
import { CoinContext } from "../context/CoinContext";
import { Link } from "react-router-dom";

function Navbar() {
  const { setCurrency } = useContext(CoinContext);

  const currencyHandler = (event) => {
    switch (event.target.value) {
      case "usd": {
        setCurrency({ name: "usd", Symbol: "$" });
        break;
      }
      case "eur": {
        setCurrency({ name: "eur", Symbol: "€" });
        break;
      }
      case "inr": {
        setCurrency({ name: "inr", Symbol: "₹" });
        break;
      }
      default: {
        setCurrency({ name: "usd", Symbol: "$" });
        break;
      }
    }
  };
  return (
    <div className="navbar">
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Link
          to={"/"}
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span className="logo-text">CryptoHub</span>
        </Link>
      </div>
      <ul>
        <Link to={'/'}><li>Home</li></Link>
        <Link to={'/pricing'}><li>Pricing</li></Link>
        <Link to={'/blog'}><li>Blog</li></Link>
        <Link to={'/features'}><li>Features</li></Link>
      </ul>
      <div className="nav-right">
        <select onChange={currencyHandler}>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="inr">INR</option>
        </select>
        <button className="signup-btn">Sign up</button>
      </div>
    </div>
  );
}

export default Navbar;
