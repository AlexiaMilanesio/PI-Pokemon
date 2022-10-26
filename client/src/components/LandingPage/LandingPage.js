import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="title-container">
        <span className="landing-welcome">Welcome to</span>
        <h1 className="landing-title">Pokemon World</h1>
      </div>
      
      <div className="start-btn-container">
        <Link to="/pokemon">
          <button className="landing-start-btn">Get started</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
