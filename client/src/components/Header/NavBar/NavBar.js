import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = (props) => {
  return (
    <div className="nav-container">
      <Link to="/pokemon" className="link">
        <button className="nav-btn">
          {/* <ion-icon name="home" className="nav-icon"></ion-icon> */}
          <span>Home</span>
        </button>
      </Link>
      <Link to="/create" className="link">
        <button className="nav-btn">
          {/* <ion-icon name="create" className="nav-icon"></ion-icon> */}
          <span>Create</span>
        </button>
      </Link>
      <Link to="/about" className="link">
        <button className="nav-btn">
          {/* <ion-icon name="information-circle" className="nav-icon"></ion-icon> */}
          <span>About</span>
        </button>
      </Link>
    </div>
  );
};

export default NavBar;
