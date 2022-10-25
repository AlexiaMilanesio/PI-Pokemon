import React from "react";
import "./Loading.css";

export default function Loading() {
  return (
    <div className="loading-container">
      <p>Loading...</p>
      <div className="loader"></div>
    </div>
  );
}