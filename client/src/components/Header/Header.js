import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonByName } from "../../redux/actions/actions";
import NavBar from "./NavBar/NavBar";
import "./Header.css";

const Header = (props) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");


  const handleChange = (e) => {
    setName(e.target.value.toLowerCase());
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  }

  const handleSearch = (e) => {
    dispatch(getPokemonByName(name));
    setName("");
  };


  return (
    <div className="header-container">
      <NavBar />

      <div className="search-engine-container">
        <input
          type="search" 
          placeholder="Search pokemon"
          className="search-input"
          name="name"
          value={name}
          onChange={(e) => handleChange(e)}
          onKeyPress={(e) => handleKeyPress(e)}
        />
        <button 
          type="submit" 
          className="search-pokemon-btn" 
          onClick={(e) => handleSearch(e)}
        >
          Search
        </button>
      </div>

    </div>
  );
};

export default Header;
