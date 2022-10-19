import React from "react";
import { Link } from "react-router-dom";
import "./NotFoundPage.css";

const ErrorPage = (props) => {
  return (
    <div className="not-found-page-container">
      <div className="not-found-content-container">
        <h1>Error 404</h1>
        <h3>Page not found</h3>
      </div>

      <div className="notfound-btn-container">
        <Link to="/pokemon" className="link">
          <button className="detail-back-btn">
            <ion-icon name="arrow-round-back"></ion-icon>
            <span>Home</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
