import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonByName } from "../../redux/actions/actions";
import NavBar from "./NavBar/NavBar";
import "./Header.css";

const Header = (props) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");


  const handleChange = (e) => {
    setName(e.target.value.trim().toLowerCase());
  };

  const handleKeyPress = (e) => {
    if (name) {
      if (e.key === "Enter") handleSearch();
    }
  }
  
  const handleSearch = (e) => {
    dispatch(getPokemonByName(name));
    props.setPage(1);
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
          autoComplete="off"
          name="name"
          value={name}
          onChange={(e) => handleChange(e)}
          onKeyPress={(e) => handleKeyPress(e)}
        />
        <button 
          type="submit" 
          className="search-pokemon-btn" 
          disabled={!name ? true : false}
          onClick={(e) => handleSearch(e)}
        >
          Search
        </button>
      </div>

    </div>
  );
};

export default Header;
