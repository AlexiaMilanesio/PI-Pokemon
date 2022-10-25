import React from "react";
import { Link } from "react-router-dom";
import ErrorLogo from "../../images/not-found-icon.png";
import "./NotFoundPage.css";

const ErrorPage = (props) => {
  return (
    <div className="not-found-page-container">
      <div className="not-found-content-container">
        <div className="error-title">
          <img src={ErrorLogo} alt="" />
          <h1>404</h1>
        </div>
        <h2>Page not found</h2>
        <p>The link you followed may be broken, or the page may have been removed.</p>
        <p>Go back to <Link to="/pokemon" className="error-home-link">Pokemon World Home</Link>.</p>
      </div>
    </div>
  );
};

export default ErrorPage;
